import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getConvexClient } from "@/lib/convex";
import { submitQuestion } from "@/lib/langgraph";
import { api } from "@/app/(platform)/convex/_generated/api";
import { AIMessage, HumanMessage, ToolMessage } from "@langchain/core/messages";
import {
  StreamMessage,
  ChatRequestBody,
  SSE_DATA_PREFIX,
  StreamMessageType,
  SSE_LINE_DELIMITER,
} from "@/lib/types";


// Remove or comment out the edge runtime declaration
// export const runtime = "edge";

export const config = {
  runtime: 'nodejs',
  regions: ['iad1'], // Optional: specify regions
};

function sendSSEMessage(
  writer: WritableStreamDefaultWriter<Uint8Array>,
  data: StreamMessage
) {
  const encoder = new TextEncoder();
  return writer.write(
    encoder.encode(
      `${SSE_DATA_PREFIX}${JSON.stringify(data)}${SSE_LINE_DELIMITER}`
    )
  );
}

export const POST = async (req: Request) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { messages, newMessage, chatId, modelId } =
      (await req.json()) as ChatRequestBody;
    const convex = getConvexClient();

    // Create stream with larger queue strategy for better performance
    const stream = new TransformStream({}, { highWaterMark: 1024 });
    const writer = stream.writable.getWriter();

    const response = new Response(stream.readable, {
      headers: {
        "Content-Type": "text/event-stream",
        // "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no", // Disable buffering for nginx which is required for SSE to work properly
      },
    });

    // Handle the streaming response
    (async () => {
      try {
        // Send initial connection established message
        await sendSSEMessage(writer, { type: StreamMessageType.Connected });

        // Send user message to Convex
        await convex.mutation(api.messages.send, {
          chatId,
          content: newMessage,
        });

        // Convert messages to LangChain format
        const langChainMessages = [
          ...messages.map((msg) =>
            msg.role === "user"
              ? new HumanMessage(msg.content)
              : new AIMessage(msg.content)
          ),
          new HumanMessage(newMessage),
        ];

        try {
          // Create the event stream
          const eventStream = await submitQuestion(
            langChainMessages,
            chatId,
            modelId
          );

          // Process the events
          for await (const event of eventStream) {
            // console.log("🔄 Stream Event:", event);
            
            if (event.event === "on_chat_model_stream") {
              const token = event.data.chunk;
              if (token) {
                // Check if token is AIMessageChunk
                const text = typeof token === 'string' ? token : token.content;
                if (text) {
                  // If the text contains model info (starts with "_Model used:"), 
                  // format it differently
                  if (text.includes("_Model used:")) {
                    await sendSSEMessage(writer, {
                      type: StreamMessageType.Token,
                      token: `\n\n<em class="text-gray-500">${text.replace(/_/g, '')}</em>`,
                    });
                  } else {
                    await sendSSEMessage(writer, {
                      type: StreamMessageType.Token,
                      token: text,
                    });
                  }
                }
              }
            } else if (event.event === "on_tool_start") {
              await sendSSEMessage(writer, {
                type: StreamMessageType.ToolStart,
                tool: event.name || "unknown",
                input: event.data.input,
              });
            } else if (event.event === "on_tool_end") {
              const toolMessage = new ToolMessage(event.data.output);
              await sendSSEMessage(writer, {
                type: StreamMessageType.ToolEnd,
                tool: toolMessage.lc_kwargs.name || "unknown",
                output: event.data.output,
              });
            }
          }

          // Send completion message without storing the response
          await sendSSEMessage(writer, { type: StreamMessageType.Done });
        } catch (streamError) {
          console.error("Error in event stream:", streamError);
          
          // Send a more detailed error message to the client
          const errorMessage = streamError instanceof Error 
            ? `Error: ${streamError.message}${streamError.cause ? ` (${JSON.stringify(streamError.cause)})` : ''}`
            : "Stream processing failed";
            
          await sendSSEMessage(writer, {
            type: StreamMessageType.Error,
            error: errorMessage
          });
        }
      } catch (error) {
        console.error("Error in stream:", error);
        await sendSSEMessage(writer, {
          type: StreamMessageType.Error,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      } finally {
        try {
          await writer.close();
        } catch (closeError) {
          console.error("Error closing writer:", closeError);
        }
      }
    })();

    return response;
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Failed to process chat request" } as const,
      { status: 500 }
    );
  }
}
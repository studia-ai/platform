import { Id } from "@/app/(platform)/convex/_generated/dataModel";

// SSE Constants
export const SSE_DATA_PREFIX = "data: " as const;
export const SSE_DONE_MESSAGE = "[DONE]" as const;
export const SSE_LINE_DELIMITER = "\n\n" as const;

export type MessageRole = "user" | "assistant";

export interface Message {
  role: MessageRole;
  content: string;
}

export enum StreamMessageType {
  Token = "token",
  Error = "error",
  Connected = "connected",
  Done = "done",
  ToolStart = "tool_start",
  ToolEnd = "tool_end",
  ModelChange = "model_change",
  EndOfCall = "end_of_call",
}

export interface BaseStreamMessage {
  type: StreamMessageType;
}

export interface TokenMessage extends BaseStreamMessage {
  type: StreamMessageType.Token;
  token: string;
}

export interface ErrorMessage extends BaseStreamMessage {
  type: StreamMessageType.Error;
  error: string;
}

export interface ConnectedMessage extends BaseStreamMessage {
  type: StreamMessageType.Connected;
}

export interface DoneMessage extends BaseStreamMessage {
  type: StreamMessageType.Done;
}

export interface ToolStartMessage extends BaseStreamMessage {
  type: StreamMessageType.ToolStart;
  tool: string;
  input: unknown;
}

export interface ToolEndMessage extends BaseStreamMessage {
  type: StreamMessageType.ToolEnd;
  tool: string;
  output: unknown;
}

export interface ModelChangeMessage {
  type: StreamMessageType.ModelChange;
  model: string;
}

export interface EndOfCallMessage extends BaseStreamMessage {
  type: StreamMessageType.EndOfCall;
}

export type StreamMessage =
  | TokenMessage
  | ErrorMessage
  | ConnectedMessage
  | DoneMessage
  | ToolStartMessage
  | ToolEndMessage
  | ModelChangeMessage
  | EndOfCallMessage;

export interface ChatRequestBody {
  messages: Message[];
  newMessage: string;
  chatId: Id<"chats">;
  modelId: string;
}

export interface OpenRouterModel {
  id: string;
  name: string;
  description?: string;
  category?: string;
}

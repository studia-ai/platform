# Studia.ai - AI-Powered Research Assistant


<div align="center">
  <img src="public/banner.png" alt="Studia.ai Architecture" width="800"/>
</div>



## Overview
Studia.ai is a sophisticated AI agent platform built for research and blockchain development. It combines IBM watsonx.ai and Claude-3.5-Sonnet with specialized tools to provide intelligent responses and perform complex tasks through natural conversation.

## Key Features
- 🤖 **Advanced AI Integration**
  - IBM watsonx.ai Foundation Models
  - Claude-3.5-Sonnet for natural language processing
  - Real-time streaming responses
  - Context-aware conversation management

- 🔍 **Research Tools**
  - YouTube transcript analysis
  - Wikipedia search integration
  - Google Books search
  - Mathematical computations
  - Exchange rate data

- 💻 **Development Features**
  - Smart contract analysis
  - Code review capabilities
  - Security auditing tools
  - DeFi market analysis

- 🎯 **Core Capabilities**
  - Natural language understanding & generation
  - Real-time tool execution
  - Multi-step task completion
  - Context-aware responses

## Tech Stack
- **Frontend**
  - Next.js 15.1
  - React 19
  - TailwindCSS
  - Radix UI Components

- **Backend & Infrastructure**
  - Convex for real-time database
  - LangChain for AI orchestration
  - Clerk for authentication
  - Edge Runtime support

- **AI/ML**
  - IBM watsonx.ai
  - Anthropic's Claude-3.5-Sonnet
  - Custom LangGraph implementation

## Getting Started

### Prerequisites
- Node.js (Latest LTS version)
- npm or yarn
- Required API keys:
  - Clerk
  - Anthropic
  - IBM watsonx.ai
  - Convex

### Installation

**1. Clone the repository**

    git clone https://github.com/studia-ai/studia-ai.git
    cd studia-ai

**2. Install dependencies**

    pnpm install

**3. Set up environment variables**

Create a `.env` file in the root directory:

    CLERK_SECRET_KEY=your_clerk_secret_key
    CLERK_ISSUER_URL=your_clerk_issuer_url
    ANTHROPIC_API_KEY=your_anthropic_api_key
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    CONVEX_DEPLOYMENT=your_convex_deployment
    IBM_WATSONX_API_KEY=your_watsonx_api_key
    SOLANA_TRACKER_API_KEY=your_solana_tracker_api_key
    OPENROUTER_API_KEY=your_openrouter_api_key

**4. Run the development server**

    pnpm dev

The application will be available at `http://localhost:3000`

## Features in Development
- 🔗 **Solana Blockchain Integration**
  - Smart contract interactions
  - Wallet operations
  - Token analysis
  - Portfolio management
  - Multi-signature support
  - Automated transaction scheduling

## Available Scripts

    npm run dev          # Start development server with turbopack
    npm run build        # Build for production
    npm run start        # Start production server
    npm run lint         # Run ESLint
    npm run lint:fix     # Fix ESLint issues

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support
For support, please:
- Open an issue in the GitHub repository
- Join our community Discord
- Follow us on X (Twitter) @StudiaAI

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- IBM watsonx.ai for providing the AI infrastructure
- Anthropic for Claude-3.5-Sonnet
- The Convex team for the backend platform
- Clerk for authentication services
- The Solana Foundation for blockchain support
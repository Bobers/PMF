# EMU - Evolving Marketing Understanding 🦘

AI-powered PMF validation for non-marketers. EMU uses intelligent extraction to analyze your product and automatically generate a validated foundation for your go-to-market strategy, then guides you through a systematic journey to Product-Market Fit.

## Features

### 🚀 AI-Powered Foundation Extraction
- Automatically analyzes your product inputs
- Generates validated pain points with severity scores
- Identifies target audience segments with characteristics
- Maps current solutions and their shortcomings
- Explains why your problem matters with market data

### 🔄 Interactive Validation Flow
- Review and edit AI-generated insights
- Re-roll individual sections for alternative perspectives
- Lock validated sections to build your foundation
- Graceful zoom in/out between overview and detail views

### 📊 5-Phase PMF Journey
1. **Foundation** - AI-powered extraction and validation of core elements
2. **Market Research** - Understand your market, customers, and competition
3. **Strategy Development** - Define positioning, messaging, and pricing
4. **Execution Planning** - Plan channels, campaigns, and resources
5. **Launch & Optimization** - Execute and iterate based on data

### 🎯 Smart Progress System
- Foundation gates access to other phases
- Visual progress indicators at multiple levels
- Section-by-section validation tracking
- Locked phases show requirements clearly

### 📈 Three-Level Navigation
- **Onboarding**: Input your product details
- **Dashboard**: Bird's-eye view of your PMF journey
- **Detail View**: Deep dive into foundation elements

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Bobers/PMF.git
cd PMF
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## How to Use

1. **Define Your Product**: Start by entering your product name, selecting a category, current stage, and describing the target problem.

2. **Navigate the Phases**: Progress through the 4 marketing phases:
   - Foundation & Research (2-3 weeks)
   - Strategy Development (1-2 weeks)
   - Execution Planning (1-2 weeks)
   - Launch & Optimization (Ongoing)

3. **Complete Jobs**: Each phase contains specific jobs with:
   - Actionable tasks (required and optional)
   - Definition of Done criteria
   - Resource templates and guides
   - Output documentation areas

4. **Track Progress**: Monitor your progress at phase, job, and task levels with visual indicators.

5. **Document Outputs**: Save your deliverables and findings for each job to build your complete GTM strategy.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout with metadata
│   └── page.tsx         # Main page component
└── components/
    └── EMUPrototype.tsx # Main EMU framework component
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Created with Claude Code

This project was built using Claude Code, Anthropic's AI-powered development assistant.

---

**Live Demo**: [Visit EMU](https://pmf-validator.vercel.app) (Deploy to see your live version)

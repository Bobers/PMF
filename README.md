# EMU - Evolving Marketing Understanding 🦘

A comprehensive step-by-step guide to finding Product-Market Fit through systematic marketing validation. EMU provides a structured framework with actionable tasks, templates, and resources to help startups build effective go-to-market strategies.

## Features

### 🚀 Product Onboarding
- Multi-category product classification (B2B SaaS, B2C App, Marketplace, etc.)
- Stage-based customization (Idea, Prototype, Beta, Launched)
- Target problem definition

### 📊 4-Phase Marketing Journey
1. **Marketing Foundation & Research** - Understand your market, customers, and competition
2. **Strategy Development** - Define positioning, messaging, and go-to-market approach
3. **Execution Planning** - Plan channels, campaigns, and resources
4. **Launch & Optimization** - Execute and optimize based on data

### 📋 Jobs-to-be-Done Framework
- Structured tasks for each marketing job
- Clear Definition of Done criteria
- Deliverables checklist
- Resource templates and guides

### 📈 Progress Tracking
- Visual timeline with phase completion
- Task-level progress tracking
- Job completion validation
- Output documentation for each deliverable

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

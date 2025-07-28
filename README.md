# PMF Validator 🎯

A comprehensive Product-Market Fit validation tool that helps startups and product teams systematically test their hypotheses through an interactive, gamified experience.

## Features

### 🚀 Product Onboarding
- Multi-category product classification (B2B SaaS, B2C App, Marketplace, etc.)
- Stage-based customization (Idea, Prototype, Beta, Launched)
- Target problem definition

### 🎰 Interactive Hypothesis Generator
- Slot machine interface for generating PMF combinations
- Category-specific variations for problems, solutions, customers, and metrics
- Individual and bulk hypothesis generation

### 📊 4-Phase Validation Journey
1. **Problem Discovery** - Validate the problem exists and is painful
2. **Solution Hypothesis** - Test if your solution addresses the problem
3. **Customer Validation** - Confirm your target customer segments
4. **Value Confirmation** - Measure if customers will pay for the value

### 📈 Progress Tracking
- Visual timeline with completion indicators
- Save and load validation hypotheses
- Historical validation tracking
- Phase-specific validation questions

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

2. **Generate Hypotheses**: Use the slot machine to generate different combinations of:
   - Problems your customers face
   - Solutions you can provide
   - Customer segments to target
   - Success metrics to track

3. **Validate Each Phase**: Progress through the 4 validation phases, using the provided questions to guide your validation experiments.

4. **Track Progress**: Save your hypotheses and track which phases you've validated.

5. **Iterate**: Load previous hypotheses and continue refining based on your learnings.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout with metadata
│   └── page.tsx         # Main page component
└── components/
    └── PMFValidator.tsx # Main PMF validation component
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

**Live Demo**: [Visit PMF Validator](https://pmf-validator.vercel.app) (Deploy to see your live version)

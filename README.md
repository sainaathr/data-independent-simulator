# Data Independence Simulator 🚀

An interactive web-based simulator designed to visualize, evaluate, and experiment with **Database Data Independence** and the **Three-Schema ANSI/SPARC Architecture** (External, Conceptual/Logical, and Internal/Physical levels).

Explore both **Physical Data Independence (PDI)** and **Logical Data Independence (LDI)**, run guided database architecture experiments, test your knowledge with interactive quizzes, practice competitive exam questions (GATE / University DBMS), generate academic reports, and explore comprehensive DBMS curriculum modules.

**Live Deployment**: [https://sainaathr.github.io/data-independent-simulator/](https://sainaathr.github.io/data-independent-simulator/)

---

## 🌟 Key Features

- **Interactive Three-Schema Architecture Simulator**:
  - Test physical storage modifications (indexing, compression, partitioning, storage tiering) and observe how the conceptual and external views remain unaffected.
  - Test logical schema modifications (adding attributes, schema normalization, entity splits) and observe view preservation via mappings and adapters.
- **Dynamic Architecture Visualizer**:
  - Interactive visualization of the ANSI/SPARC layers: External Level (Views), Conceptual Level (Logical Schema), and Internal Level (Physical Storage).
- **Curriculum Learn & Knowledge Base**:
  - In-depth theoretical modules with academic citations, storage engine comparisons, and index structures catalog.
- **Guided Experiments**:
  - Step-by-step experiment modules covering B+ Tree vs Hash Indexing, Normalization trade-offs, and Storage Partitioning impacts.
- **Comprehensive Quiz & Practice**:
  - Interactive quizzes with instant scoring, feedback, and question shuffling.
  - GATE / University DBMS competitive exam mode with timed tests and detailed explanations.
- **Automated Report Generation**:
  - Export experiment logs, architectural schemas, and simulation outcomes directly into **PDF**, **DOCX**, and **TXT** formats.
- **Team Credits & Presentation**:
  - Dedicated team showcase featuring student engineering contributors and faculty guide details.
- **Modern UI / UX**:
  - Built with React 19, TypeScript, Tailwind CSS, Lucide icons, and Recharts.
  - Full Dark / Light mode support with responsive layouts.

---

## 👥 Project Team & Mentorship

- **Faculty Guide**: Dr. Swaminathan A (Assistant Professor, VIT)
- **Student Engineering Team**:
  - **R. Sainaath** (25BCE1960) — Interactive Three-Schema Architecture engine, simulation mechanics, and report generator pipeline.
  - **Naveena Priyan S** (25BCE1778) — Storage methods catalog, LDI/PDI execution logic, curriculum learn module, and academic citations.
  - **Nivesh S** (25BCE1583) — Practice, quizzes, competitive exam system, user manual/help guide, and UI design tokens.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Report Export**: [jspdf](https://github.com/parallax/jsPDF), [docx](https://docx.js.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts & Visualization**: [Recharts](https://recharts.org/)
- **Linter**: [Oxlint](https://oxc.rs/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v20 or higher recommended)
- npm or yarn / pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sainaathr/data-independent-simulator.git
   cd data-independent-simulator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview the production build:
   ```bash
   npm run preview
   ```

---

## 📂 Project Structure

```plaintext
├── public/                 # Static assets (team photos, icons, 404 fallback, .nojekyll)
├── src/
│   ├── assets/             # Brand and theme assets
│   ├── components/         # Reusable UI & layout components (Cards, Badges, Modals, etc.)
│   ├── context/            # Simulation & Theme contexts
│   ├── data/               # Quiz, competitive exam datasets, and simulator knowledge
│   ├── lib/                # Simulation logic & report generator utilities
│   ├── pages/              # Simulator, Dashboard, Concepts, Learn, Report, Help, DevelopedBy, Quizzes, History
│   ├── types/              # TypeScript interfaces and data models
│   ├── App.tsx             # Route definitions with basename routing
│   ├── index.css           # Global styles and Tailwind configuration
│   └── main.tsx            # Application entry point
├── .github/workflows/      # Automated GitHub Pages CI/CD workflow
├── package.json            # Project dependencies & scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration with base path support
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

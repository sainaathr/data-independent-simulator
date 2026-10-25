# Data Independence Simulator 🚀

An interactive web-based simulator designed to visualize and experiment with **Database Data Independence** and the **Three-Schema ANSI/SPARC Architecture** (External, Conceptual/Logical, and Internal/Physical levels).

Explore both **Physical Data Independence (PDI)** and **Logical Data Independence (LDI)**, run guided database architecture experiments, test your knowledge with interactive quizzes, and practice competitive exam questions (GATE / University DBMS).

---

## 🌟 Key Features

- **Interactive Schema Simulator**:
  - Test physical storage modifications (indexing, compression, partitioning, storage tiering) and observe how the conceptual and external views remain unaffected.
  - Test logical schema modifications (adding columns, schema normalization, entity splits) and observe view preservation via mappings and adapters.
- **Three-Schema Architecture Visualizer**:
  - Dynamic visualization of the ANSI/SPARC layers: External Level (Views), Conceptual Level (Logical Schema), and Internal Level (Physical Storage).
- **Guided Experiments**:
  - Step-by-step experiment modules covering B+ Tree vs Hash Indexing, Normalization trade-offs, and Storage Partitioning impacts.
- **Comprehensive Quiz & Practice**:
  - Interactive quizzes with instant scoring, feedback, and question shuffling.
  - GATE / University DBMS competitive exam mode with timed tests and detailed explanations.
- **Analytics & History**:
  - Track simulation runs, experiment completions, and quiz performance metrics.
- **Modern UI / UX**:
  - Built with React 19, TypeScript, Tailwind CSS, Lucide icons, and Recharts.
  - Full Dark / Light mode support with responsive layouts.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts & Visualization**: [Recharts](https://recharts.org/)
- **Linter**: [Oxlint](https://oxc.rs/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
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
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images and design assets
│   ├── components/         # Reusable UI & layout components
│   │   ├── layout/         # Header, Navigation, AppLayout
│   │   └── ui/             # Card, Button, Modal, Badge, etc.
│   ├── context/            # Simulation & Theme contexts
│   ├── data/               # Quiz & competitive exam datasets
│   ├── lib/                # Simulation logic & engine utilities
│   ├── pages/              # Simulator, Dashboard, Concepts, Quizzes, History
│   ├── types/              # TypeScript interfaces and models
│   ├── App.tsx             # Route definitions
│   ├── index.css           # Global styles and Tailwind configuration
│   └── main.tsx            # Application entry point
├── package.json            # Project dependencies & scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

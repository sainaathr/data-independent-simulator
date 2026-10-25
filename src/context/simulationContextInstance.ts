import { createContext } from 'react'

// This file exists solely to create and export the context object
// so that SimulationContext.tsx (provider) and useSimulation.ts (hook)
// can both import it without circular dependencies.
// SimulationContextValue is typed via `any` here and cast properly in useSimulation.ts.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SimulationContext = createContext<any>(null)

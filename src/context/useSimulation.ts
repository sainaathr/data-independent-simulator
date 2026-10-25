import { useContext } from 'react'
import { SimulationContext } from './simulationContextInstance'
import type { SimulationContextValue } from './SimulationContext'

export type { SimulationContextValue }

export function useSimulation(): SimulationContextValue {
  const ctx = useContext(SimulationContext)
  if (!ctx) {
    throw new Error('useSimulation must be used inside <SimulationProvider>')
  }
  return ctx
}

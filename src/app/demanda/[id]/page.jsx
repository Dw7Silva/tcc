import { notFound } from 'next/navigation'
import demandasMock from '@/mockup/demandas'

export default function DemandaRota({ params }) {
  const { id } = params
  const demanda = demandasMock.find((d) => d.demanda_id === Number(id))

  if (!demanda) {
    return notFound()
  }

  return demanda
}

import { partidas } from '../app-repository'

export const validarIndexPartida = id => {
  const index = partidas.findIndex(partida => id === partida.id)
  if (index === -1) {
    return false
  }
  return true
}

import { partidas } from './app-repository'

export const validarIndexPartida = (index, res) => {
  const id = partidas.findIndex(partida => index === partida.id)
  if (id === -1) {
    res.status(404).send('Partida não encontrada')
  }
}

import { partidas } from './app-repository'

export const validarIndexPartida = (req, res, next) => {
  const { id } = req.params

  const index = partidas.findIndex(partida => id === partida.id)

  if (index === -1) {
    res.status(404).send('Partida não encontrada')
    res.end()
  } else {
    next()
  }
}

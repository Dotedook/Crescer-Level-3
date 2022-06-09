import { partidas } from './app-repository'

export const validarIndexPartida = (req, res, next) => {
  const { id } = req.params
  const index = partidas.findIndex(partida => id === partida.id)

  if (index === -1) {
    return res.send(404, 'Não existe uma partida com o ID informado!')
  }
  next()
}

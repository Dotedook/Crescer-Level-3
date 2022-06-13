import { partidas } from './app-repository'

export const validarIndexPartida = (req, res, next) => {
  const { id } = req.params
  const index = partidas.findIndex(partida => id === partida.id)

  if (index === -1) {
    return res.status(404).send('Não existe uma partida com o ID informado!')
  }
  next()
}

export const autenticarTime = (req, res, next) => {
  const jogouAlgumaPartida = partidas.some(
    partida =>
      partida.casa.time == req.headers.authorization ||
      partida.visitante.time == req.headers.authorization
  )

  if (!jogouAlgumaPartida) {
    return res.send(404, 'Não há registros sobre o time informado!')
  }

  next()
}

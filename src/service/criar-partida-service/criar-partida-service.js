import { partidas } from '../../repository/app-repository'
import { calcularResultado } from '../../utils/app-utils'
const { randomUUID } = require('crypto')

export const criarPartida = (req, res) => {
  const novaPartida = { id: randomUUID(), ...req.body }

  const partidaComResultado = calcularResultado(novaPartida)

  partidas.push(partidaComResultado)

  res.send(partidaComResultado)
}

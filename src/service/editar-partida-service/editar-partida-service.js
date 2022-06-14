import { partidas } from '../../repository/app-repository'
import { buscarIndexPartida, calcularResultado, buscarPartidaPorId } from '../../utils/app-utils'

export const editarPartida = (req, res) => {
  const { id } = req.params
  const indexPartida = buscarIndexPartida(id)
  const novaPartida = { ...partidas[indexPartida], ...req.body }

  const partidaComResultado = calcularResultado(novaPartida)

  partidas[indexPartida] = partidaComResultado

  res.send(partidas[indexPartida])
}

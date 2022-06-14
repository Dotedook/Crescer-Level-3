import { partidas } from '../../repository/app-repository'
import { buscarIndexPartida } from '../../utils/app-utils'

export const deletarPartida = (req, res) => {
  const { id } = req.params
  const indexPartida = buscarIndexPartida(id)

  partidas.splice(indexPartida, 1)

  res.send(partidas)
}

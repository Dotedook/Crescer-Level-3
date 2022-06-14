import { partidas } from '../../repository/app-repository'

export const getPartidas = (req, res) => {
  res.send(partidas)
}

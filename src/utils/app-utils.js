import { partidas } from '../repository/app-repository'

export const calcularResultado = partida => {
  const { visitante, casa } = partida

  partida.isEmpate = false

  if (visitante.pontuacao > casa.pontuacao) {
    partida.vencedor = visitante.time
  } else if (casa.pontuacao > visitante.pontuacao) {
    partida.vencedor = casa.time
  } else {
    partida.isEmpate = true
    partida.vencedor = null
  }

  return partida
}

export const buscarPartidaPorId = id => {
  return partidas.find(partida => id === partida.id)
}

export const buscarIndexPartida = id => {
  return partidas.findIndex(partida => id === partida.id)
}

export const buscarPartidasTimePorEsporte = (nomeTime, esporte) => {
  return partidas.filter(partida => {
    return (
      (partida.casa.time === nomeTime || partida.visitante.time === nomeTime) &&
      partida.esporte === esporte
    )
  })
}

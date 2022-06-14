import { partidas, tabelas } from '../repository/app-repository'

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

export const buscarIndexTabelaPorEsporte = esportePartida => {
  const indexTabela = tabelas.findIndex(tabela => tabela.esporte === esportePartida)

  if (indexTabela === -1) {
    return tabelas.length - 1
  }

  return indexTabela
}

export const validacoesTime = {
  golsFeitos: (partida, nomeTime) =>
    partida.casa.time === nomeTime ? partida.casa.pontuacao : partida.visitante.pontuacao,
  golsTomados: (partida, nomeTime) =>
    partida.casa.time === nomeTime ? partida.visitante.pontuacao : partida.casa.pontuacao,
  vitorias: (partida, nomeTime) => (partida.vencedor === nomeTime ? 1 : 0),
  derrotas: (partida, nomeTime) =>
    partida.vencedor !== null && partida.vencedor !== nomeTime ? 1 : 0,
  empates: partida => (partida.isEmpate ? 1 : 0),
}

export const buscarIndexTimeNaTabela = (esporte, nomeTime) => {
  const indexTabela = buscarIndexTabelaPorEsporte(esporte)
  return tabelas[indexTabela].times.findIndex(time => time.time === nomeTime)
}

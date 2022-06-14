import { tabelas } from '../../repository/app-repository'
import {
  buscarIndexTabelaPorEsporte,
  buscarPartidasTimePorEsporte,
  validacoesTime,
  buscarIndexTimeNaTabela,
} from '../../utils/app-utils'
import { valoresPontuacao, valorInicialTabelaTime } from '/constants'

export const incluirTimeNaTabela = (req, res) => {
  const { partidaComResultado } = req
  const indexTabelaDoEsporte = buscarIndexTabelaPorEsporte(partidaComResultado.esporte)
  const timesNaPartida = [partidaComResultado.casa, partidaComResultado.visitante]

  timesNaPartida.forEach(timePartida => {
    const timeParaAdicionarNaTabela = calcularPontuacaoDoTimeNaTabela(
      timePartida.time,
      partidaComResultado.esporte
    )
    if (!verificaTimeEstaNaTabela(timePartida.time, indexTabelaDoEsporte)) {
      tabelas[indexTabelaDoEsporte].times.push(timeParaAdicionarNaTabela)
    } else {
      const indexTimeNaTabela = buscarIndexTimeNaTabela(
        partidaComResultado.esporte,
        timePartida.time
      )

      tabelas[indexTabelaDoEsporte].times[indexTimeNaTabela] = timeParaAdicionarNaTabela
    }
  })

  ordenarTabelaTime(indexTabelaDoEsporte)
  res.send(partidaComResultado)
}

const verificaTimeEstaNaTabela = (nomeTime, indexTabela) => {
  return tabelas[indexTabela]?.times.some(timeTabela => timeTabela?.time === nomeTime)
}

const calcularPontuacaoDoTimeNaTabela = (nomeTime, esporte) => {
  const partidasTimePorEsporte = buscarPartidasTimePorEsporte(nomeTime, esporte)

  const timeComPontuacaoCalculada = partidasTimePorEsporte.reduce((acumulador, partidaAtual) => {
    return {
      pontos: acumulador.pontos + calcularPontosTime(partidaAtual, nomeTime),
      vitorias: acumulador.vitorias + validacoesTime.vitorias(partidaAtual, nomeTime),
      derrotas: acumulador.derrotas + validacoesTime.derrotas(partidaAtual, nomeTime),
      empates: acumulador.empates + validacoesTime.empates(partidaAtual),
    }
  }, valorInicialTabelaTime)

  const novoTimeComPontuacaoCalculada = { time: nomeTime, ...timeComPontuacaoCalculada }
  return novoTimeComPontuacaoCalculada
}

const calcularPontosTime = (partida, nomeTime) => {
  if (partida.vencedor === nomeTime) {
    return valoresPontuacao.vitoria
  } else if (partida.isEmpate) {
    return valoresPontuacao.empate
  }
  return valoresPontuacao.derrota
}

const ordenarTabelaTime = indexTabela => {
  const tabelaOrdenada = tabelas[indexTabela].times.sort((a, b) => {
    if (a.pontos > b.pontos) return -1
    if (a.pontos < b.pontos) return 1
    return 0
  })

  tabelas[indexTabela].times = tabelaOrdenada
}

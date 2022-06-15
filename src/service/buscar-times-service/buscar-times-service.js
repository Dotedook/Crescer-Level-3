import { partidas } from '../../repository/app-repository'
import { VALOR_INICIAL_INFORMACOES_TIME } from '../../constants'

export const getTime = (req, res) => {
  const nomeTime = req.headers.authorization

  const resposta = getTimeComInformacoes(nomeTime)

  res.send(resposta)
}

export const getTimeComInformacoes = nomeTime => {
  const partidasTime = buscarPartidasTime(nomeTime)

  const informacoesTime = buscarInformacoesTime(partidasTime, nomeTime)

  const resposta = {
    nome: nomeTime,
    partidasJogadas: partidasTime.length,
    ...informacoesTime,
  }
  return resposta
}

const buscarPartidasTime = nomeTime => {
  return partidas.filter(partida => {
    return (
      partida.casa.time.toUpperCase() === nomeTime.toUpperCase() ||
      partida.visitante.time.toUpperCase() === nomeTime.toUpperCase()
    )
  })
}

const buscarInformacoesTime = (partidasTime, nomeTime) => {
  return partidasTime.reduce((infosTime, partidaAtual) => {
    return {
      pontosFeitos: infosTime.pontosFeitos + validacoesTime.pontosFeitos(partidaAtual, nomeTime),
      pontosTomados: infosTime.pontosTomados + validacoesTime.pontosTomados(partidaAtual, nomeTime),
      vitorias: infosTime.vitorias + validacoesTime.vitorias(partidaAtual, nomeTime),
      derrotas: infosTime.derrotas + validacoesTime.derrotas(partidaAtual, nomeTime),
      empates: infosTime.empates + validacoesTime.empates(partidaAtual),
    }
  }, VALOR_INICIAL_INFORMACOES_TIME)
}

const validacoesTime = {
  pontosFeitos: (partida, nomeTime) =>
    partida.casa.time === nomeTime ? partida.casa.pontuacao : partida.visitante.pontuacao,
  pontosTomados: (partida, nomeTime) =>
    partida.casa.time === nomeTime ? partida.visitante.pontuacao : partida.casa.pontuacao,
  vitorias: (partida, nomeTime) => (partida.vencedor === nomeTime ? 1 : 0),
  derrotas: (partida, nomeTime) =>
    partida.vencedor !== null && partida.vencedor !== nomeTime ? 1 : 0,
  empates: partida => (partida.isEmpate ? 1 : 0),
}

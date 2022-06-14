import { partidas } from '../../repository/app-repository'
import { valorInicialInformacoesTime } from '../../constants'
import { validacoesTime } from '/utils/app-utils'

export const getTime = (req, res) => {
  const nomeTime = req.headers.authorization

  const resposta = getTimeComInformacoes(nomeTime)

  res.send(resposta)
}

const getTimeComInformacoes = nomeTime => {
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
      pontosFeitos: infosTime.pontosFeitos + validacoesTime.golsFeitos(partidaAtual, nomeTime),
      pontosTomados: infosTime.pontosTomados + validacoesTime.golsTomados(partidaAtual, nomeTime),
      vitorias: infosTime.vitorias + validacoesTime.vitorias(partidaAtual, nomeTime),
      derrotas: infosTime.derrotas + validacoesTime.derrotas(partidaAtual, nomeTime),
      empates: infosTime.empates + validacoesTime.empates(partidaAtual),
    }
  }, valorInicialInformacoesTime)
}

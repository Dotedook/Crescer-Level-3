import { partidas } from '../../repository/app-repository'

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
    return partida.casa.time.toUpperCase() === nomeTime.toUpperCase() || partida.visitante.time.toUpperCase() === nomeTime.toUpperCase()
  })
}

const buscarInformacoesTime = (partidasTime, nomeTime) => {
  return partidasTime.reduce((infosTime, partidaAtual) => {
    return {
      golsFeitos: infosTime.golsFeitos + validacoesTime.golsFeitos(partidaAtual, nomeTime),
      golsTomados: infosTime.golsTomados + validacoesTime.golsTomados(partidaAtual, nomeTime),
      vitorias: infosTime.vitorias + validacoesTime.vitorias(partidaAtual, nomeTime),
      derrotas: infosTime.derrotas + validacoesTime.derrotas(partidaAtual, nomeTime),
      empates: infosTime.empates + validacoesTime.empates(partidaAtual),
    }
  }, valorInicialInformacoesTime)
}

const valorInicialInformacoesTime = {
  golsFeitos: 0,
  golsTomados: 0,
  vitorias: 0,
  derrotas: 0,
  empates: 0,
}

const validacoesTime = {
  golsFeitos: (partida, nomeTime) =>
    partida.casa.time === nomeTime ? partida.casa.pontuacao : partida.visitante.pontuacao,
  golsTomados: (partida, nomeTime) =>
    partida.casa.time === nomeTime ? partida.visitante.pontuacao : partida.casa.pontuacao,
  vitorias: (partida, nomeTime) => (partida.vencedor === nomeTime ? 1 : 0),
  derrotas: (partida, nomeTime) =>
    partida.vencedor !== null && partida.vencedor !== nomeTime ? 1 : 0,
  empates: partida => (partida.isEmpate ? 1 : 0),
}

import { validationResult } from 'express-validator'
import { partidas } from './app-repository'

export const validarSchema = (req, res, next) => {
  const erros = validationResult(req)
  if (!erros.isEmpty()) {
    return res.status(400).json({ errors: erros.array() })
  }
  next()
}

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

export const buscarPartidasTime = nomeTime => {
  return partidas.filter(partida => {
    return partida.casa.time === nomeTime || partida.visitante.time === nomeTime
  })
}

export const validacoesTime = {
  golsFeitos: (partida, nomeTime) =>
    partida.casa.time === nomeTime ? partida.casa.pontuacao : partida.visitante.pontuacao,
  golsTomados: (partida, nomeTime) =>
    partida.casa.time === nomeTime ? partida.visitante.pontuacao : partida.casa.pontuacao,
  vitorias: (partida, nomeTime) => (partida.vencedor === nomeTime ? 1 : 0),
  derrotas: (partida, nomeTime) => (partida.vencedor !== nomeTime ? 1 : 0),
  empates: partida => (partida.isEmpate ? 1 : 0),
}

export const buscarInformacoesTime = (partidasTime, nomeTime) => {
  return partidasTime.reduce((acumulador, partidaAtual, index) => {
    if (index == 0) {
      return {
        golsFeitos: validacoesTime.golsFeitos(partidaAtual, nomeTime),
        golsTomados: validacoesTime.golsTomados(partidaAtual, nomeTime),
        vitorias: validacoesTime.vitorias(partidaAtual, nomeTime),
        derrotas: validacoesTime.derrotas(partidaAtual, nomeTime),
        empates: validacoesTime.empates(partidaAtual),
      }
    }

    return {
      golsFeitos: acumulador?.golsFeitos + validacoesTime.golsFeitos(partidaAtual, nomeTime),
      golsTomados: acumulador?.golsTomados + validacoesTime.golsTomados(partidaAtual, nomeTime),
      vitorias: acumulador?.vitorias + validacoesTime.vitorias(partidaAtual, nomeTime),
      derrotas: acumulador?.derrotas + validacoesTime.derrotas(partidaAtual, nomeTime),
      empates: acumulador?.empates + validacoesTime.empates(partidaAtual),
    }
  }, {})
}

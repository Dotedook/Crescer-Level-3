import { getTimeComInformacoes } from '../buscar-times-service/buscar-times-service'
import { partidas } from '/repository/app-repository'

export const getLideres = (req, res) => {
  const esporte = req.headers.esporte.toUpperCase()
  const partidasEsporte = partidas.filter(partida => partida.esporte.toUpperCase() === esporte)

  const nomeTimesEsporte = getNomeTimesEsporte(partidasEsporte)
  
  const listaTimesOrdenada = getListaTimesOrdenada(nomeTimesEsporte)

  res.send(listaTimesOrdenada)
}

const getNomeTimesEsporte = partidasEsporte => {
  return partidasEsporte.reduce((listaNomeTimes, valorAtual) => {
    if (
      !listaNomeTimes.some(
        nomeTime => nomeTime.toUpperCase() === valorAtual.casa.time.toUpperCase()
      )
    ) {
      listaNomeTimes.push(valorAtual.casa.time)
    }
    if (
      !listaNomeTimes.some(
        nomeTime => nomeTime.toUpperCase() === valorAtual.visitante.time.toUpperCase()
      )
    ) {
      listaNomeTimes.push(valorAtual.visitante.time)
    }

    return listaNomeTimes
  }, [])
}

const getListaTimesOrdenada = nomeTimesEsporte => {
  return nomeTimesEsporte.map(nomeTime => getTimeComInformacoes(nomeTime)).sort(ordenarTime)
}

const ordenarTime = (timeA, timeB) => {
  if (timeA.vitorias > timeB.vitorias) {
    return -1
  }
  if (timeB.vitorias > timeA.vitorias) {
    return 1
  }
  return 0
}

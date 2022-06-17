import { getTimeComInformacoes } from '../buscar-times-service/buscar-times-service'
import { partidas } from '/repository/app-repository'

export const getLideres = (req, res) => {
  const esporte = req.headers.esporte.toUpperCase()
  const parametroBusca = req.parametroBusca

  const partidasEsporte = partidas.filter(partida => partida.esporte.toUpperCase() === esporte)

  const nomeTimesEsporte = getNomeTimesEsporte(partidasEsporte)

  const listaTimesOrdenada = getListaTimesOrdenada(nomeTimesEsporte, parametroBusca)

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

const getListaTimesOrdenada = (nomeTimesEsporte, parametro) => {
  return nomeTimesEsporte
    .map(nomeTime => getTimeComInformacoes(nomeTime))
    .sort((a, b) => {
      return ordenarTime(a, b, parametro)
    })
}

const ordenarTime = (timeA, timeB, parametro) => {
  if (timeA[`${parametro}`] > timeB[`${parametro}`]) {
    return -1
  }
  if (timeB[`${parametro}`] > timeA[`${parametro}`]) {
    return 1
  }
  return 0
}

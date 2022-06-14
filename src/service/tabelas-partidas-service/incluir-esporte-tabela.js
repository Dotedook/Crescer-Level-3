import { tabelas } from '/repository/app-repository'

export const incluirEsporteTabela = (req, res, next) => {
  const esporte = req.partidaComResultado.esporte
  if (!verificaEsporteExiste(esporte)) {
    tabelas.push({ esporte, times: [] })
  }
  next()
}

const verificaEsporteExiste = nomeEsporte => {
  return tabelas.some(tabela => tabela.esporte === nomeEsporte)
}

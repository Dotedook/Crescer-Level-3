const request = require('supertest')
let api
let partidaPadrao
let tokenAdmin

beforeEach(() => {
  const { app } = require('../../../src/controller/app')
  const { partidas } = require('../../../src/repository/app-repository')
  const { tokenAdmins } = require('../../../src/repository/app-repository')
  partidas.splice(0, partidas.length)
  api = app
  tokenAdmin = tokenAdmins[0]
  partidaPadrao = {
    data: '2020/05/05',
    esporte: 'Futebol',
    isEmpate: false,
    vencedor: 'Brasil',
    casa: {
      time: 'Brasil',
      pontuacao: 2,
    },
    visitante: {
      time: 'Alemanha',
      pontuacao: 0,
    },
  }
})

describe('Testes buscar partidas', () => {
  test('Deve retornar um array vazio se não fizer chamadas POST', async () => {
    const statusEsperado = 200
    const tamanhoArrayEsperado = 0

    const response = await request(api).get('/partidas')

    expect(response.status).toBe(statusEsperado)
    expect(response.body.length).toBe(tamanhoArrayEsperado)
  })

  test('Deve retornar o array de partidas corretamente depois de fazer chamadas POST', async () => {
    const tamanhoArrayEsperado = 1
    const statusEsperado = 200
    await request(api).post('/partidas').send(partidaPadrao).set({ Authorization: tokenAdmin })

    const response = await request(api).get('/partidas')

    expect(response.status).toBe(statusEsperado)
    expect(response.body.length).toBe(tamanhoArrayEsperado)
  })
})

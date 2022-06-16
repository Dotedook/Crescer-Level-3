const request = require('supertest')
let api
let partidaPadrao
let tokenAdmin

beforeEach(() => {
  const { app } = require('../../src/controller/app')
  const { partidas } = require('../../src/repository/app-repository')
  const { tokenAdmins } = require('../../src/repository/app-repository')
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

describe('Testes auth security', () => {
  test('Deve retornar erro quando autorização for inválida', async () => {
    const statusEsperado = 401
    const mensagemEsperada = 'Você não tem autorização para realizar esta operação!'

    const responsePost = await request(api)
      .post('/partidas')
      .send(partidaPadrao)
      .set({ Authorization: 'testeAuthorization' })

    expect(responsePost.status).toBe(statusEsperado)
    expect(responsePost.text).toBe(mensagemEsperada)
  })
})

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

describe('Testes criar partida', () => {
  test('Deve adicionar corretamente uma nova partida', async () => {
    const statusEsperado = 200

    const responsePost = await request(api)
      .post('/partidas')
      .send(partidaPadrao)
      .set({ Authorization: tokenAdmin })
    const responseGet = await request(api).get('/partidas')
    const { id, ...partidaRecebidaSemId } = responseGet.body[0]

    expect(responsePost.status).toBe(statusEsperado)
    expect(responseGet.status).toBe(statusEsperado)
    expect(responseGet.body[0].id).not.toBeNull()
    expect(partidaRecebidaSemId).toEqual(partidaPadrao)
  })

  test('Deve adicionar mais de uma partida com ids Diferentes', async () => {
    const tamanhoArrayEsperado = 2

    await request(api).post('/partidas').send(partidaPadrao).set({ Authorization: tokenAdmin })
    await request(api).post('/partidas').send(partidaPadrao).set({ Authorization: tokenAdmin })
    const responseGet = await request(api).get('/partidas')

    expect(responseGet.body[0]).not.toEqual(responseGet.body[1])
    expect(responseGet.body.length).toEqual(tamanhoArrayEsperado)
  })
})

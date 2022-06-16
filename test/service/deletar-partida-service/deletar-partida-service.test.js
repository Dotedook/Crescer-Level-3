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

describe('Testes deletar partida', () => {
  test('Deve deletar corretamente uma partida', async () => {
    const statusEsperado = 200
    const tamanhoEsperado = 0

    await request(api).post('/partidas').send(partidaPadrao).set({ Authorization: tokenAdmin })
    const idPartida = (await request(api).get('/partidas')).body[0].id

    const responseDel = await request(api)
      .del(`/partidas/${idPartida}`)
      .set({ Authorization: tokenAdmin })
    const responseGet = await request(api).get('/partidas')

    expect(responseDel.status).toBe(statusEsperado)
    expect(responseGet.body.length).toEqual(tamanhoEsperado)
  })

  test('Deve lançar erro se não houver nenhuma partida com o ID informado', async () => {
    const idPartida = 0
    const statusEsperado = 404
    const mensagemEsperada = 'Não existe uma partida com o ID informado!'

    const responseDel = await request(api)
      .del(`/partidas/${idPartida}`)
      .set({ Authorization: tokenAdmin })

    expect(responseDel.status).toEqual(statusEsperado)
    expect(responseDel.text).toBe(mensagemEsperada)
  })
})

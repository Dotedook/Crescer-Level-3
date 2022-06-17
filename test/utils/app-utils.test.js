import { buscarPartidaPorId } from '/utils/app-utils'

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

describe('Teste utils', () => {
  test('Deve retornar partida corretamente pelo id', async () => {
    await request(api).post('/partidas').send(partidaPadrao).set({ Authorization: tokenAdmin })

    const responseGet = await request(api).get('/partidas')

    const { id, ...partidaSemId } = buscarPartidaPorId(responseGet.body[0].id)

    expect(partidaSemId).toEqual(partidaPadrao)
  })

  // test('Deve retornar os times ordenados pela derrota corretamente', async () => {
  //   const resultadoEsperado = [
  //     {
  //       nome: 'Alemanha',
  //       partidasJogadas: 2,
  //       pontosFeitos: 0,
  //       pontosTomados: 4,
  //       vitorias: 0,
  //       derrotas: 2,
  //       empates: 0,
  //     },
  //     {
  //       nome: 'Brasil',
  //       partidasJogadas: 2,
  //       pontosFeitos: 4,
  //       pontosTomados: 0,
  //       vitorias: 2,
  //       derrotas: 0,
  //       empates: 0,
  //     },
  //   ]

  //   await request(api).post('/partidas').send(partidaPadrao).set({ Authorization: tokenAdmin })
  //   await request(api).post('/partidas').send(partidaPadrao).set({ Authorization: tokenAdmin })

  //   const response = await request(api)
  //     .get('/lideres')
  //     .set({ Authorization: tokenAdmin, esporte: 'FUtebol', parametro: 'derrotas' })

  //   expect(response).toEqual(resultadoEsperado)
  // })

  // test('Deve retornar partida corretamente pelo id', async () => {
  //   await request(api).post('/partidas').send(partidaPadrao).set({ Authorization: tokenAdmin })

  //   const responseGet = await request(api).get('/partidas')

  //   const { id, ...partidaSemId } = buscarPartidaPorId(responseGet.body[0].id)

  //   expect(partidaSemId).toEqual(partidaPadrao)
  // })

  // test('Deve retornar partida corretamente pelo id', async () => {
  //   await request(api).post('/partidas').send(partidaPadrao).set({ Authorization: tokenAdmin })

  //   const responseGet = await request(api).get('/partidas')

  //   const { id, ...partidaSemId } = buscarPartidaPorId(responseGet.body[0].id)

  //   expect(partidaSemId).toEqual(partidaPadrao)
  // })
})

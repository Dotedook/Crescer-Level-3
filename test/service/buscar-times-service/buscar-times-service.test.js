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

describe('Testes buscar informações time', () => {
  test('Deve trazer informações do time corretamente quando informado apenas uma partida', async () => {
    const resultadoEsperado = {
      nome: 'Brasil',
      partidasJogadas: 1,
      pontosFeitos: 2,
      pontosTomados: 0,
      vitorias: 1,
      derrotas: 0,
      empates: 0,
    }
    const statusEsperado = 200

    await request(api).post('/partidas').send(partidaPadrao).set({ Authorization: tokenAdmin })
    const responsePost = await request(api).get('/time').set({ Authorization: 'Brasil' })

    expect(responsePost.status).toBe(statusEsperado)
    expect(responsePost.body).toEqual(resultadoEsperado)
  })

  test('Deve trazer informações do time corretamente quando informado duas partidas diferentes', async () => {
    const resultadoEsperado = {
      nome: 'Alemanha',
      partidasJogadas: 2,
      pontosFeitos: 6,
      pontosTomados: 4,
      vitorias: 1,
      derrotas: 1,
      empates: 0,
    }
    const segundaPartidaEnviada = {
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
        pontuacao: 6,
      },
    }
    const statusEsperado = 200

    await request(api).post('/partidas').send(partidaPadrao).set({ Authorization: tokenAdmin })

    await request(api)
      .post('/partidas')
      .send(segundaPartidaEnviada)
      .set({ Authorization: tokenAdmin })
    const responsePost = await request(api).get('/time').set({ Authorization: 'Alemanha' })

    expect(responsePost.status).toBe(statusEsperado)
    expect(responsePost.body).toEqual(resultadoEsperado)
  })

  test('Deve trazer informações de empate corretamente', async () => {
    const resultadoEsperado = {
      nome: 'Brasil',
      partidasJogadas: 2,
      pontosFeitos: 4,
      pontosTomados: 2,
      vitorias: 1,
      derrotas: 0,
      empates: 1,
    }
    const segundaPartidaEnviada = {
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
        pontuacao: 2,
      },
    }
    const statusEsperado = 200

    await request(api).post('/partidas').send(partidaPadrao).set({ Authorization: tokenAdmin })

    await request(api)
      .post('/partidas')
      .send(segundaPartidaEnviada)
      .set({ Authorization: tokenAdmin })
    const responsePost = await request(api).get('/time').set({ Authorization: 'Brasil' })

    expect(responsePost.status).toBe(statusEsperado)
    expect(responsePost.body).toEqual(resultadoEsperado)
  })

  test('Deve trazer informações de empate corretamente', async () => {
    const mensagemEsperada = 'Não há registros sobre o time informado!'
    const statusEsperado = 404

    const responsePost = await request(api).get('/time').set({ Authorization: 'Brasil' })

    expect(responsePost.status).toBe(statusEsperado)
    expect(responsePost.text).toEqual(mensagemEsperada)
  })
})

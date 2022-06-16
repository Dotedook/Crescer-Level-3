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

describe('Testes buscar lideres por esporte', () => {
  test('Deve retornar os lideres corretamente quando esporte informado', async () => {
    const resultadoEsperado = [
      {
        nome: 'Brasil',
        partidasJogadas: 2,
        pontosFeitos: 4,
        pontosTomados: 0,
        vitorias: 2,
        derrotas: 0,
        empates: 0,
      },
      {
        nome: 'Alemanha',
        partidasJogadas: 2,
        pontosFeitos: 0,
        pontosTomados: 4,
        vitorias: 0,
        derrotas: 2,
        empates: 0,
      },
    ]
    const statusEsperado = 200

    const partidaPadraoComEsporteDiferente = { ...partidaPadrao, esporte: 'Vôlei' }

    await request(api).post('/partidas').send(partidaPadrao).set({ Authorization: tokenAdmin })
    await request(api).post('/partidas').send(partidaPadrao).set({ Authorization: tokenAdmin })
    await request(api)
      .post('/partidas')
      .send(partidaPadraoComEsporteDiferente)
      .set({ Authorization: tokenAdmin })

    const response = await request(api).get('/lideres').set({ esporte: 'Futebol' })

    expect(response.status).toBe(statusEsperado)
    expect(response.body).toEqual(resultadoEsperado)
  })

  test('Deve retornar os lideres corretamente com partidas variadas', async () => {
    const resultadoEsperado = [
      {
        nome: 'Brasil',
        partidasJogadas: 3,
        pontosFeitos: 7,
        pontosTomados: 8,
        vitorias: 1,
        derrotas: 1,
        empates: 1,
      },
      {
        nome: 'India',
        partidasJogadas: 1,
        pontosFeitos: 5,
        pontosTomados: 2,
        vitorias: 1,
        derrotas: 0,
        empates: 0,
      },
      {
        nome: 'Alemanha',
        partidasJogadas: 1,
        pontosFeitos: 0,
        pontosTomados: 2,
        vitorias: 0,
        derrotas: 1,
        empates: 0,
      },
      {
        nome: 'Argentina',
        partidasJogadas: 1,
        pontosFeitos: 3,
        pontosTomados: 3,
        vitorias: 0,
        derrotas: 0,
        empates: 1,
      },
    ]
    const statusEsperado = 200

    const partidasVariadas = [
      {
        data: '2021/05/05',
        esporte: 'Futebol',
        casa: {
          time: 'India',
          pontuacao: 5,
        },
        visitante: {
          time: 'Brasil',
          pontuacao: 2,
        },
      },
      {
        data: '2020/05/05',
        esporte: 'Futebol',
        casa: {
          time: 'Brasil',
          pontuacao: 3,
        },
        visitante: {
          time: 'Argentina',
          pontuacao: 3,
        },
      },
    ]
    const tamanhoEsperado = 4

    await request(api).post('/partidas').send(partidaPadrao).set({ Authorization: tokenAdmin })
    await request(api)
      .post('/partidas')
      .send(partidasVariadas[0])
      .set({ Authorization: tokenAdmin })
    await request(api)
      .post('/partidas')
      .send(partidasVariadas[1])
      .set({ Authorization: tokenAdmin })

    const response = await request(api).get('/lideres').set({ esporte: 'Futebol' })
    console.log(response.body)

    expect(response.status).toBe(statusEsperado)
    expect(response.body).toEqual(resultadoEsperado)
    expect(response.body.length).toBe(tamanhoEsperado)
  })
})

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
        partidasJogadas: 3,
        pontosFeitos: 6,
        pontosTomados: 0,
        vitorias: 3,
        derrotas: 0,
        empates: 0,
      },
      {
        nome: 'Alemanha',
        partidasJogadas: 3,
        pontosFeitos: 0,
        pontosTomados: 6,
        vitorias: 0,
        derrotas: 3,
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

    const response = await request(api)
      .get('/lideres')
      .set({ Authorization: tokenAdmin, esporte: 'Futebol', parametro: 'vitorias' })

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

    const response = await request(api)
      .get('/lideres')
      .set({ Authorization: tokenAdmin, esporte: 'Futebol', parametro: 'vitorias' })

    expect(response.status).toBe(statusEsperado)
    expect(response.body).toEqual(resultadoEsperado)
    expect(response.body.length).toBe(tamanhoEsperado)
  })

  test('Deve retornar erro quando não houver registros do esporte informado', async () => {
    const statusEsperado = 404
    const mensagemEsperada = 'Não há registros sobre o esporte informado!'

    await request(api).post('/partidas').send(partidaPadrao).set({ Authorization: tokenAdmin })

    const response = await request(api)
      .get('/lideres')
      .set({ Authorization: tokenAdmin, esporte: 'volei', parametro: 'vitorias' })

    expect(response.status).toBe(statusEsperado)
    expect(response.text).toEqual(mensagemEsperada)
  })

  test('Deve retornar erro quando não o parametro for informado errado', async () => {
    const statusEsperado = 400
    const mensagemEsperada = 'Você informou um parametro errado.'

    await request(api).post('/partidas').send(partidaPadrao).set({ Authorization: tokenAdmin })

    const response = await request(api)
      .get('/lideres')
      .set({ Authorization: tokenAdmin, esporte: 'futebol', parametro: 'parametroErrado' })

    expect(response.status).toBe(statusEsperado)
    expect(response.text).toEqual(mensagemEsperada)
  })

  test('Deve retornar os times ordenados pela derrota corretamente', async () => {
    const resultadoEsperado = [
      {
        nome: 'Alemanha',
        partidasJogadas: 2,
        pontosFeitos: 0,
        pontosTomados: 4,
        vitorias: 0,
        derrotas: 2,
        empates: 0,
      },
      {
        nome: 'Brasil',
        partidasJogadas: 2,
        pontosFeitos: 4,
        pontosTomados: 0,
        vitorias: 2,
        derrotas: 0,
        empates: 0,
      },
    ]
    const statusEsperado = 200

    await request(api).post('/partidas').send(partidaPadrao).set({ Authorization: tokenAdmin })
    await request(api).post('/partidas').send(partidaPadrao).set({ Authorization: tokenAdmin })

    const response = await request(api)
      .get('/lideres')
      .set({ Authorization: tokenAdmin, esporte: 'futebol', parametro: 'derrotas' })

    expect(response.status).toBe(statusEsperado)
    expect(response.body).toEqual(resultadoEsperado)
  })

  test('Deve retornar os times ordenados pela partidas Jogadas corretamente', async () => {
    const novaPartida = {
      data: '2020/05/05',
      esporte: 'Futebol',
      casa: {
        time: 'Brasil',
        pontuacao: 2,
      },
      visitante: {
        time: 'Argentina',
        pontuacao: 0,
      },
    }
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
        pontosFeitos: 0,
        pontosTomados: 2,
        vitorias: 0,
        derrotas: 1,
        empates: 0,
      },
    ]

    const statusEsperado = 200

    await request(api).post('/partidas').send(partidaPadrao).set({ Authorization: tokenAdmin })
    await request(api).post('/partidas').send(novaPartida).set({ Authorization: tokenAdmin })

    const response = await request(api)
      .get('/lideres')
      .set({ Authorization: tokenAdmin, esporte: 'futebol', parametro: 'partidasJogadas' })

    expect(response.status).toBe(statusEsperado)
    expect(response.body).toEqual(resultadoEsperado)
  })

  test('Deve retornar os times ordenados pelos pontos feitos corretamente', async () => {
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

    await request(api).post('/partidas').send(partidaPadrao).set({ Authorization: tokenAdmin })
    await request(api).post('/partidas').send(partidaPadrao).set({ Authorization: tokenAdmin })

    const response = await request(api)
      .get('/lideres')
      .set({ Authorization: tokenAdmin, esporte: 'futebol', parametro: 'pontosFeitos' })

    expect(response.status).toBe(statusEsperado)
    expect(response.body).toEqual(resultadoEsperado)
  })

  test('Deve retornar os times ordenados pelos pontos Tomados corretamente', async () => {
    const resultadoEsperado = [
      {
        nome: 'Alemanha',
        partidasJogadas: 2,
        pontosFeitos: 0,
        pontosTomados: 4,
        vitorias: 0,
        derrotas: 2,
        empates: 0,
      },
      {
        nome: 'Brasil',
        partidasJogadas: 2,
        pontosFeitos: 4,
        pontosTomados: 0,
        vitorias: 2,
        derrotas: 0,
        empates: 0,
      },
    ]
    const statusEsperado = 200

    await request(api).post('/partidas').send(partidaPadrao).set({ Authorization: tokenAdmin })
    await request(api).post('/partidas').send(partidaPadrao).set({ Authorization: tokenAdmin })

    const response = await request(api)
      .get('/lideres')
      .set({ Authorization: tokenAdmin, esporte: 'futebol', parametro: 'pontosTomados' })

    expect(response.status).toBe(statusEsperado)
    expect(response.body).toEqual(resultadoEsperado)
  })

  test('Deve retornar os times ordenados pela partidas Jogadas corretamente', async () => {
    const novaPartida = {
      data: '2020/05/05',
      esporte: 'Futebol',
      casa: {
        time: 'Brasil',
        pontuacao: 2,
      },
      visitante: {
        time: 'Argentina',
        pontuacao: 2,
      },
    }
    const resultadoEsperado = [
      {
        nome: 'Brasil',
        partidasJogadas: 2,
        pontosFeitos: 4,
        pontosTomados: 2,
        vitorias: 1,
        derrotas: 0,
        empates: 1,
      },
      {
        nome: 'Argentina',
        partidasJogadas: 1,
        pontosFeitos: 2,
        pontosTomados: 2,
        vitorias: 0,
        derrotas: 0,
        empates: 1,
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
    ]

    const statusEsperado = 200

    await request(api).post('/partidas').send(partidaPadrao).set({ Authorization: tokenAdmin })
    await request(api).post('/partidas').send(novaPartida).set({ Authorization: tokenAdmin })

    const response = await request(api)
      .get('/lideres')
      .set({ Authorization: tokenAdmin, esporte: 'futebol', parametro: 'empates' })

    expect(response.status).toBe(statusEsperado)
    expect(response.body).toEqual(resultadoEsperado)
  })
})

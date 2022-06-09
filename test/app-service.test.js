const request = require('supertest')
let api
let partidaPadrao

beforeEach(() => {
  const { app } = require('../src/app')
  const { partidas } = require('../src/app-repository')
  partidas.splice(0, partidas.length)
  api = app
  partidaPadrao = {
    visitante: 'Grêmio',
    casa: 'Internacional',
    placarVisitante: 10,
    placarCasa: 0,
  }
})

describe('Testes chamada GET', () => {
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
    await request(api).post('/partidas').send(partidaPadrao)

    const response = await request(api).get('/partidas')

    expect(response.status).toBe(statusEsperado)
    expect(response.body.length).toBe(tamanhoArrayEsperado)
  })
})

describe('Testes chamada POST', () => {
  test('Deve adicionar corretamente uma nova partida', async () => {
    const statusEsperado = 200

    const responsePost = await request(api).post('/partidas').send(partidaPadrao)
    const responseGet = await request(api).get('/partidas')
    const { id, ...partidaRecebidaSemId } = responseGet.body[0]

    expect(responsePost.status).toBe(statusEsperado)
    expect(responseGet.status).toBe(statusEsperado)
    expect(responseGet.body[0].id).not.toBeNull()
    expect(partidaRecebidaSemId).toEqual(partidaPadrao)
  })

  test('Deve adicionar mais de uma partida com ids Diferentes', async () => {
    const tamanhoArrayEsperado = 2

    await request(api).post('/partidas').send(partidaPadrao)
    await request(api).post('/partidas').send(partidaPadrao)
    const responseGet = await request(api).get('/partidas')

    expect(responseGet.body[0]).not.toEqual(responseGet.body[1])
    expect(responseGet.body.length).toEqual(tamanhoArrayEsperado)
  })
})

describe('Testes chamada PUT', () => {
  test('Deve Alterar corretamente um visitante', async () => {
    const statusEsperado = 200
    const novoVisitante = 'Palmeiras'
    await request(api).post('/partidas').send(partidaPadrao)
    const idPartida = (await request(api).get('/partidas')).body[0].id

    const responsePut = await request(api)
      .put(`/partidas/${idPartida}`)
      .send({ visitante: novoVisitante })
    const responseGet = await request(api).get('/partidas')

    expect(responsePut.status).toBe(statusEsperado)
    expect(responseGet.body[0].visitante).toEqual(novoVisitante)
  })

  test('Deve Alterar corretamente uma partida inteira menos o ID', async () => {
    const novaPartida = {
      visitante: 'Palmeiras',
      casa: 'Vasco Da Gama',
      placarVisitante: 8,
      placarCasa: 10,
    }
    const statusEsperado = 200
    await request(api).post('/partidas').send(partidaPadrao)
    const idPartida = (await request(api).get('/partidas')).body[0].id

    const responsePut = await request(api).put(`/partidas/${idPartida}`).send(novaPartida)
    const responseGet = await request(api).get('/partidas')
    const { id, ...partidaRecebidaSemId } = responseGet.body[0]

    expect(responsePut.status).toBe(statusEsperado)
    expect(partidaRecebidaSemId).toEqual(novaPartida)
    expect(responseGet.body[0].id).toEqual(idPartida)
  })

  test('Deve lançar erro se não houver nenhuma partida com o ID informado', async () => {
    const novaPartida = {
      visitante: 'Palmeiras',
      casa: 'Vasco Da Gama',
      placarVisitante: 8,
      placarCasa: 10,
    }
    const idPartida = 0
    const statusEsperado = 400
    const mensagemEsperada = 'Partida não encontrada!'

    const responsePut = await request(api).put(`/partidas/${idPartida}`).send(novaPartida)

    expect(responsePut.status).toEqual(statusEsperado)
    expect(responsePut.body.errors[0].msg).toBe(mensagemEsperada)
  })
})

describe('Testes chamada DELETE', () => {
  test('Deve deletar corretamente uma partida', async () => {
    const statusEsperado = 200
    const tamanhoEsperado = 0
    await request(api).post('/partidas').send(partidaPadrao)
    const idPartida = (await request(api).get('/partidas')).body[0].id

    const responseDel = await request(api).del(`/partidas/${idPartida}`)
    const responseGet = await request(api).get('/partidas')

    expect(responseDel.status).toBe(statusEsperado)
    expect(responseGet.body.length).toEqual(tamanhoEsperado)
  })

  test('Deve lançar erro se não houver nenhuma partida com o ID informado', async () => {
    const idPartida = 0
    const statusEsperado = 400
    const mensagemEsperada = 'Partida não encontrada!'

    const responseDel = await request(api).del(`/partidas/${idPartida}`)

    expect(responseDel.status).toEqual(statusEsperado)
    expect(responseDel.body.errors[0].msg).toBe(mensagemEsperada)
  })
})

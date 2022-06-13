const request = require('supertest')
let api
let partidaPadrao
let tokenAdmin

beforeEach(() => {
  const { app } = require('../src/app')
  const { partidas } = require('../src/app-repository')
  const { tokenAdmins } = require('../src/app-repository')
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
    await request(api).post('/partidas').send(partidaPadrao).set({ Authorization: tokenAdmin })

    const response = await request(api).get('/partidas')

    expect(response.status).toBe(statusEsperado)
    expect(response.body.length).toBe(tamanhoArrayEsperado)
  })
})

describe('Testes chamada POST', () => {
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

describe('Testes chamada PUT', () => {
  test('Deve Alterar corretamente um visitante', async () => {
    const statusEsperado = 200
    const novoVisitante = 'Palmeiras'
    await request(api).post('/partidas').send(partidaPadrao).set({ Authorization: tokenAdmin })
    const idPartida = (await request(api).get('/partidas')).body[0].id

    const responsePut = await request(api)
      .put(`/partidas/${idPartida}`)
      .send({ visitante: novoVisitante })
      .set({ Authorization: tokenAdmin })
    const responseGet = await request(api).get('/partidas')

    expect(responsePut.status).toBe(statusEsperado)
    expect(responseGet.body[0].visitante).toEqual(novoVisitante)
  })

  test('Deve Alterar corretamente uma partida inteira menos o ID', async () => {
    const novaPartida = {
      data: '2020/05/05',
      esporte: 'Futebol',
      isEmpate: false,
      vencedor: 'Dinamarca',
      casa: {
        time: 'Dinamarca',
        pontuacao: 3,
      },
      visitante: {
        time: 'Russia',
        pontuacao: 2,
      },
    }
    const statusEsperado = 200
    await request(api).post('/partidas').send(partidaPadrao).set({ Authorization: tokenAdmin })
    const idPartida = (await request(api).get('/partidas')).body[0].id

    const responsePut = await request(api)
      .put(`/partidas/${idPartida}`)
      .send(novaPartida)
      .set({ Authorization: 'eduardoToken' })

    const responseGet = await request(api).get('/partidas')
    console.log(responseGet.body)
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
    const statusEsperado = 404
    const mensagemEsperada = 'Não existe uma partida com o ID informado!'

    const responsePut = await request(api)
      .put(`/partidas/${idPartida}`)
      .send(novaPartida)
      .set({ Authorization: tokenAdmin })

    expect(responsePut.status).toEqual(statusEsperado)
    expect(responsePut.text).toBe(mensagemEsperada)
  })
})

describe('Testes chamada DELETE', () => {
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

describe('Testes validações schema', () => {
  test('Deve retornar array de erros quando pontuação não informada', async () => {
    const partidaComErro = {
      data: '2020/05/05',
      esporte: 'Futebol',
      casa: {
        time: 'Brasil',
        pontuacao: 2,
      },
      visitante: {
        time: 'Alemanha',
      },
    }
    const statusEsperado = 400
    const errosEsperados = [
      {
        msg: 'A pontuação do visitante deve ser informada!',
        param: 'visitante.pontuacao',
        location: 'body',
      },
    ]

    const responsePost = await request(api)
      .post('/partidas')
      .send(partidaComErro)
      .set({ Authorization: tokenAdmin })

    expect(responsePost.status).toBe(statusEsperado)
    expect(errosEsperados.length).toBe(responsePost.body.errors.length)
    expect(errosEsperados[0]).toEqual(responsePost.body.errors[0])
  })
})

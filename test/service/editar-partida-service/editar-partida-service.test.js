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

describe('Testes editar partida', () => {
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

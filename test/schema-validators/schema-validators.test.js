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

describe('Testes validações schema', () => {
  test('Deve retornar erro quando autorização não informada', async () => {
    const statusEsperado = 400
    const mensagemEsperada = 'O token de autenticacao deve ser informado!'

    const responsePost = await request(api).post('/partidas').send(partidaPadrao)

    expect(responsePost.status).toBe(statusEsperado)
    expect(responsePost.body.errors[0].msg).toBe(mensagemEsperada)
  })

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
    expect(responsePost.body.errors.length).toBe(errosEsperados.length)
    expect(responsePost.body.errors[0]).toEqual(errosEsperados[0])
  })
})

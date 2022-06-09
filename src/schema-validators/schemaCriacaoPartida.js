export const schemaCriacaoPartida = {
  id: {
    in: ['body', 'headers', 'cookies', 'query'],
    isEmpty: true,
    errorMessage: 'O ID deve vir como parâmetro para editar uma partida!',
  },
  data: {
    in: ['body'],
    notEmpty: true,
    isDate: true,
    errorMessage: 'A data informada é inválida!',
  },
  esporte: {
    in: ['body'],
    notEmpty: true,
    errorMessage: 'O esporte deve ser informado!',
    trim: true,
  },
  isEmpate: {
    in: ['body'],
    isEmpty: true,
    errorMessage: 'O empate não deve ser informado!',
  },
  vencedor: {
    in: ['body'],
    isEmpty: true,
    errorMessage: 'O vencedor não deve ser informado!',
  },
  // casa: {
  //   time: {
  //     in: ['body'],
  //     notEmpty: true,
  //     errorMessage: 'O time deve ser informado!',
  //     trim: true,
  //   },
  //   pontuacao: {
  //     in: ['body'],
  //     notEmpty: true,
  //     isInt: true,
  //     errorMessage: 'A pontuação deve ser um número inteiro!',
  //     toInt: true,
  //   },
  // },
  // visitante: {
  //   time: {
  //     in: ['body'],
  //     notEmpty: true,
  //     errorMessage: 'O time deve ser informado!',
  //     trim: true,
  //   },
  //   pontuacao: {
  //     in: ['body'],
  //     notEmpty: true,
  //     isInt: true,
  //     errorMessage: 'A pontuação deve ser um número inteiro!',
  //     toInt: true,
  //   },
  // },
}

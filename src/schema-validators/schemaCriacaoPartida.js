export const schemaCriacaoPartida = {
  id: {
    in: ['body', 'headers', 'cookies', 'query'],
    isEmpty: true,
    errorMessage: 'O ID deve vir como parâmetro para editar uma partida!',
  },
  data: {
    in: ['body'],
    isDate: true,
    errorMessage: 'A data informada é inválida!',
  },
  esporte: {
    in: ['body'],
    notEmpty: true,
    errorMessage: 'O esporte deve ser informado!',
    trim: true,
  },
  'casa.time': {
    in: ['body'],
    notEmpty: true,
    errorMessage: 'O time da casa deve ser informado!',
    trim: true,
  },
  'casa.pontuacao': {
    in: ['body'],
    notEmpty: { bail: true },
    isInt: {
      options: { min: 0 },
      errorMessage: 'A pontuação da casa deve ser um inteiro acima ou igual 0',
    },
    errorMessage: 'A pontuação da casa deve ser informada!',
    toInt: true,
  },
  'visitante.time': {
    in: ['body'],
    notEmpty: true,
    errorMessage: 'O time do visitante deve ser informado!',
    trim: true,
  },
  'visitante.pontuacao': {
    in: ['body'],
    notEmpty: { bail: true },
    isInt: {
      options: { min: 0 },
      errorMessage: 'A pontuação do visitante deve ser um inteiro acima ou igual 0',
    },
    errorMessage: 'A pontuação do visitante deve ser informada!',
    toInt: true,
  },
}

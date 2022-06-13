export const schemaEdicaoPartida = {
  id: {
    in: ['body', 'headers', 'cookies', 'query'],
    isEmpty: true,
    errorMessage: 'O ID deve vir como parâmetro para editar uma partida!',
  },
  data: {
    in: ['body'],
    isDate: true,
    optional: { options: { nullable: true } },
    errorMessage: 'A data informada é inválida!',
  },
  esporte: {
    in: ['body'],
    optional: { options: { nullable: true } },
    trim: true,
  },
  'casa.time': {
    in: ['body'],
    optional: { options: { nullable: true } },
    custom: {
      options: (_, { req }) => req.body.casa.pontuacao.toString(),
      errorMessage: 'A pontuação da casa deve ser informada!',
    },
    trim: true,
  },
  'casa.pontuacao': {
    in: ['body'],
    optional: { options: { nullable: true } },
    isInt: {
      bail: true,
      options: { min: 0 },
      errorMessage: 'A pontuação da casa deve ser um inteiro acima ou igual a 0!',
    },
    custom: {
      options: (_, { req }) => req.body.casa.time,
      errorMessage: 'O nome da casa deve ser informado!',
    },
    toInt: true,
  },
  'visitante.time': {
    in: ['body'],
    optional: { options: { nullable: true } },
    custom: {
      options: (_, { req }) => req.body.visitante.pontuacao.toString(),
      errorMessage: 'A pontuação do visitante deve ser informada!',
    },
    trim: true,
  },
  'visitante.pontuacao': {
    in: ['body'],
    optional: { options: { nullable: true } },
    isInt: {
      bail: true,
      options: { min: 0 },
      errorMessage: 'A pontuação do visitante deve ser um inteiro acima ou igual a 0!',
    },
    custom: {
      options: (_, { req }) => req.body.visitante.time,
      errorMessage: 'O nome do visitante deve ser informada!',
    },
    toInt: true,
  },
}

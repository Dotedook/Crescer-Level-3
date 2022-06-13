export const schemaEdicaoTime = {
  'casa.time': {
    in: ['body'],
    optional: { options: { nullable: true } },
    trim: true,
  },
  'casa.pontuacao': {
    in: ['body'],
    isInt: true,
    optional: { options: { nullable: true } },
    errorMessage: 'A pontuação deve ser um número inteiro!',
    toInt: true,
  },
  'visitante.time': {
    in: ['body'],
    optional: { options: { nullable: true } },
    trim: true,
  },
  'visitante.pontuacao': {
    in: ['body'],
    isInt: true,
    optional: { options: { nullable: true } },
    errorMessage: 'A pontuação deve ser um número inteiro!',
    toInt: true,
  },
}

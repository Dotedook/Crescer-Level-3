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
  isEmpate: {
    in: ['body'],
    isEmpty: true,
    optional: { options: { nullable: true } },
    errorMessage: 'O empate não deve ser informado!',
  },
  vencedor: {
    in: ['body'],
    isEmpty: true,
    optional: { options: { nullable: true } },
    errorMessage: 'O vencedor não deve ser informado!',
  },
  casa: {
    in: ['body'],
    isEmpty: true,
    optional: { options: { nullable: true } },
    errorMessage: 'A casa não deve ser informada!',
  },
  visitante: {
    in: ['body'],
    isEmpty: true,
    optional: { options: { nullable: true } },
    errorMessage: 'O visitante não deve ser informado!',
  },
}

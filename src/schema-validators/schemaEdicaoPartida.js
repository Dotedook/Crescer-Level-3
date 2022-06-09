import { validarIndexPartida } from './validarIndexPartida'

export const schemaEdicaoPartida = {
  visitante: {
    in: ['body'],
    optional: { options: { nullable: true } },
    trim: true,
  },
  casa: {
    in: ['body'],
    optional: { options: { nullable: true } },
    trim: true,
  },
  placarVisitante: {
    in: ['body'],
    optional: { options: { nullable: true } },
    isInt: true,
    errorMessage: 'Propriedade Placar visitante deve ser apenas inteiros',
    toInt: true,
  },
  placarCasa: {
    in: ['body'],
    optional: { options: { nullable: true } },
    isInt: true,
    errorMessage: 'Propriedade Placar visitante deve ser apenas inteiros',
    toInt: true,
  },
  id: {
    custom: {
      options: (value, { location }) => {
        if (location == 'params') {
          const indexValido = validarIndexPartida(value)
          if (indexValido) {
            return true
          }
          throw new Error('Partida não encontrada!')
        } else {
          throw new Error('Não é possível editar o ID')
        }
      },
    },
  },
}

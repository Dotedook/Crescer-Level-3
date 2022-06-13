export const schemaBuscarTime = {
  Authorization: {
    in: ['headers'],
    notEmpty: true,
    errorMessage: 'O token de autenticacao deve ser informado!',
  },
}

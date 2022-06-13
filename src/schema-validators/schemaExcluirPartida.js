export const schemaExcluirPartida = {
  id: {
    in: ['body', 'headers', 'cookies', 'query'],
    isEmpty: true,
    errorMessage: 'O ID deve vir como parâmetro para excluir uma partida!',
  },
  authorization: {
    in: ['headers'],
    notEmpty: true,
    errorMessage: 'O token de autenticacao deve ser informado!',
  },
}

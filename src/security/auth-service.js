import { tokenAdmins } from '../app-repository'

export const autenticarUsuario = (req, res, next) => {
  if (!tokenAdmins.includes(req.headers.authorization)) {
    return res.send(401, 'Você não tem autorização para realizar esta operação!')
  }
  next()
}

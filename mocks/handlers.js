import { rest } from 'msw'
import list from './response/list.json'
import id from './response/id.json'

const BASE = 'https://pokeapi.co/api/v2'
export const handlers = [
  rest.get(`${BASE}/pokemon`, (req, res, ctx) => {
    return res(
      ctx.json(list)
    )
  }),
  rest.get(`${BASE}/pokemon/:id`, (req, res, ctx) => {
    return res(
      ctx.json(id)
    )
  }),
]
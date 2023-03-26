import { rest } from 'msw'
import list from './response/list.json'
import id from './response/id.json'

const BASE = 'https://pokeapi.co/api/v2'
export const handlers = [
  rest.get(`${BASE}/pokemon`, (req, res, ctx) => {

    const error = req.url.searchParams.get('error')
    // Example: http://localhost:3000/your_page_url?error=true
    if (error) {
      // Query param was found, so return an error response.
      return res(
        ctx.status(error),
        ctx.json({ message: 'Oops! Something went terribly wrong.' })
      );
    }
    return res(
      ctx.json(list)
    )
  }),
  rest.get(`${BASE}/pokemon/:id`, (req, res, ctx) => {

    // Check if the '?error=true' query param has been 
    // included in the page url.
    const pageParams = new URLSearchParams(window.location.search);
    const error = pageParams.get('error');

    // Example: http://localhost:3000/your_page_url?error=true
    if (error) {
      // Query param was found, so return an error response.
      return res(
        ctx.status(error),
        ctx.json({ message: 'Oops! Something went terribly wrong.' })
      );
    }
    return res(
      ctx.json(id)
    )
  }),
]
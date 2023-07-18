import { rest } from 'msw'
import bookSearchData from './bookSearchResults.json'
import { vi } from 'vitest'

const bookSearchDataNoResults = {
  kind: "books#volumes",
  totalItems: 0
}

export const STUBBED_API_URL = 'http://localhost:8888'

export const getBookHandler = vi.fn((req, res, ctx) => {
  if(req.url.searchParams.get('q') === 'conan')
    return res(ctx.status(200), ctx.json(bookSearchData))
  return res(ctx.status(200), ctx.json(bookSearchDataNoResults))
})

export const addBookHandler = vi.fn((req, res, ctx) => {
  return res(ctx.status(200), ctx.json({}))
})

export const removeBookHandler = vi.fn((req, res, ctx) => {
  return res(ctx.status(200), ctx.json({}))
})

export const loginHandler = vi.fn((req, res, ctx) => {
  return res(ctx.status(200), ctx.json({}))
})

export const signupHandler = vi.fn((req, res, ctx) => {
  return res(ctx.status(200), ctx.json({}))
})

export const logoutHandler = vi.fn((req, res, ctx) => {
  return res(ctx.status(200), ctx.json({}))
})

export const handlers = [
  rest.get('https://www.googleapis.com/books/v1/volumes', getBookHandler),
  rest.post(STUBBED_API_URL + '/api/book', addBookHandler),
  rest.delete(STUBBED_API_URL + '/api/book', removeBookHandler),
  rest.post(STUBBED_API_URL + '/api/auth/login', loginHandler),
  rest.post(STUBBED_API_URL + '/api/auth/logout', logoutHandler),
  rest.post(STUBBED_API_URL + '/api/auth/signup', signupHandler),
]
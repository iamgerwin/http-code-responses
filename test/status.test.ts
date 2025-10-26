import { describe, it, expect } from 'vitest'
import {
  StatusCodes,
  ReasonPhrases,
  getReasonPhrase,
  getStatusCode,
  isStatusCode,
  type StatusCode,
} from '../src/index'

describe('StatusCodes', () => {
  it('includes common 2xx codes', () => {
    expect(StatusCodes.OK).toBe(200)
    expect(StatusCodes.CREATED).toBe(201)
    expect(StatusCodes.NO_CONTENT).toBe(204)
  })

  it('includes common 4xx codes', () => {
    expect(StatusCodes.BAD_REQUEST).toBe(400)
    expect(StatusCodes.NOT_FOUND).toBe(404)
    expect(StatusCodes.UNPROCESSABLE_CONTENT).toBe(422)
  })

  it('includes common 5xx codes', () => {
    expect(StatusCodes.INTERNAL_SERVER_ERROR).toBe(500)
    expect(StatusCodes.SERVICE_UNAVAILABLE).toBe(503)
  })

  it('exposes backward-compatible aliases', () => {
    expect(StatusCodes.UNPROCESSABLE_ENTITY).toBe(422)
    expect(StatusCodes.PAYLOAD_TOO_LARGE).toBe(413)
    expect(StatusCodes.REQUEST_URI_TOO_LONG).toBe(414)
  })
})

describe('ReasonPhrases and helpers', () => {
  it('maps codes to reason phrases', () => {
    expect(ReasonPhrases[StatusCodes.NOT_FOUND]).toBe('Not Found')
    expect(ReasonPhrases[StatusCodes.OK]).toBe('OK')
    expect(ReasonPhrases[StatusCodes.SERVICE_UNAVAILABLE]).toBe('Service Unavailable')
  })

  it('getReasonPhrase returns expected values', () => {
    expect(getReasonPhrase(404)).toBe('Not Found')
    expect(getReasonPhrase(422)).toBe('Unprocessable Content')
    expect(getReasonPhrase(9999)).toBeUndefined()
  })

  it('getStatusCode resolves by name', () => {
    expect(getStatusCode('OK')).toBe(200)
    expect(getStatusCode('INTERNAL_SERVER_ERROR')).toBe(500)
    expect(getStatusCode('DOES_NOT_EXIST')).toBeUndefined()
  })

  it('isStatusCode identifies known codes', () => {
    const code: number = 200
    const unknown: number = 1337
    const resultKnown: boolean = isStatusCode(code)
    const resultUnknown: boolean = isStatusCode(unknown)

    expect(resultKnown).toBe(true)
    expect(resultUnknown).toBe(false)

    // TS usage: ensure type compatibility
    const ensureTypeGuard = (c: number) => {
      if (isStatusCode(c)) {
        const typed: StatusCode = c
        expect(typeof typed).toBe('number')
      }
    }
    ensureTypeGuard(200)
  })
})


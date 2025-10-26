**http-code-responses**

Readable HTTP status code constants with reason phrases and helpers.

- Concise constants for every standard HTTP status code
- Reason phrases mapped to each code (e.g., 404 → "Not Found")
- Tiny, zero-runtime-dependency, ESM + CJS + TypeScript types
- Familiar naming inspired by Symfony HttpFoundation's Response constants

Installation

- npm: `npm i http-code-responses`
- pnpm: `pnpm add http-code-responses`
- yarn: `yarn add http-code-responses`

Usage

JavaScript (ESM)

import { StatusCodes, ReasonPhrases, getReasonPhrase } from 'http-code-responses'

// In an Express handler
app.get('/health', (req, res) => {
  res.status(StatusCodes.OK).send('ok')
})

console.log(ReasonPhrases[StatusCodes.NOT_FOUND]) // "Not Found"
console.log(getReasonPhrase(422)) // "Unprocessable Content"

JavaScript (CommonJS)

const { StatusCodes, ReasonPhrases, getReasonPhrase } = require('http-code-responses')

res.status(StatusCodes.CREATED).json({ id })
console.log(ReasonPhrases[StatusCodes.BAD_REQUEST])
console.log(getReasonPhrase(503))

TypeScript

import { StatusCodes, type StatusCode, type StatusName } from 'http-code-responses'

function send(code: StatusCode) {
  // code is type-safe and autocompletes
}

send(StatusCodes.NO_CONTENT)
const name: StatusName = 'INTERNAL_SERVER_ERROR'

API

- `StatusCodes`: object with named constants (e.g., `OK`, `CREATED`, `NOT_FOUND`, `INTERNAL_SERVER_ERROR`). Also includes common aliases like `UNPROCESSABLE_ENTITY`, `PAYLOAD_TOO_LARGE`, `REQUEST_URI_TOO_LONG`.
- `ReasonPhrases: Record<number, string>`: maps a code to its standard reason phrase.
- `getReasonPhrase(code: number): string | undefined`: returns the reason phrase if known.
- `getStatusCode(name: string): number | undefined`: returns the code for a given constant name.
- `isStatusCode(value: number): value is StatusCode`: type guard for known codes.

Notes

- Constants and phrases are aligned with modern HTTP specifications and the Symfony Response constants (e.g., 413 "Content Too Large", 422 "Unprocessable Content"). Some historic aliases are provided for compatibility.

License

- You can set the license of your choice before publishing (the `license` field in `package.json` is intentionally blank).


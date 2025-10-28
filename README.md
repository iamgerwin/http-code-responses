<div align="center">

# 🚀 http-code-responses

**Readable HTTP status code constants with reason phrases and helpers**

[![npm version](https://img.shields.io/npm/v/http-code-responses?style=flat-square&color=blue)](https://www.npmjs.com/package/http-code-responses)
[![npm downloads](https://img.shields.io/npm/dm/http-code-responses?style=flat-square&color=green)](https://www.npmjs.com/package/http-code-responses)
[![CI](https://img.shields.io/github/actions/workflow/status/iamgerwin/http-code-responses/ci.yml?style=flat-square&label=CI)](https://github.com/iamgerwin/http-code-responses/actions/workflows/ci.yml)
[![codecov](https://img.shields.io/codecov/c/github/iamgerwin/http-code-responses?style=flat-square&token=)](https://codecov.io/gh/iamgerwin/http-code-responses)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square)](https://www.typescriptlang.org/)
[![bundle size](https://img.shields.io/bundlephobia/minzip/http-code-responses?style=flat-square)](https://bundlephobia.com/package/http-code-responses)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [API](#-api) • [Roadmap](#-roadmap) • [Contributing](#-contributing)

</div>

---

## ✨ Features

- ✅ **Concise constants** for every standard HTTP status code
- 📝 **Reason phrases** mapped to each code (e.g., `404` → `"Not Found"`)
- 🪶 **Tiny footprint** - zero runtime dependencies
- 📦 **Universal** - ESM + CJS + TypeScript types
- 🔍 **Type-safe** - Full TypeScript support with autocomplete
- 🎯 **Familiar naming** - Inspired by Symfony HttpFoundation's Response constants
- ⚡ **Tree-shakeable** - Only bundle what you use
- 🧪 **Well-tested** - 100% code coverage

## 📦 Installation

```bash
# npm
npm install http-code-responses

# pnpm
pnpm add http-code-responses

# yarn
yarn add http-code-responses

# bun
bun add http-code-responses
```

## 🚀 Usage

### JavaScript (ESM)

```javascript path=null start=null
import { StatusCodes, ReasonPhrases, getReasonPhrase } from 'http-code-responses'

// Express.js example
app.get('/health', (req, res) => {
  res.status(StatusCodes.OK).send('ok')
})

// Get reason phrases
console.log(ReasonPhrases[StatusCodes.NOT_FOUND]) // "Not Found"
console.log(getReasonPhrase(422)) // "Unprocessable Content"
```

### JavaScript (CommonJS)

```javascript path=null start=null
const { StatusCodes, ReasonPhrases, getReasonPhrase } = require('http-code-responses')

res.status(StatusCodes.CREATED).json({ id })
console.log(ReasonPhrases[StatusCodes.BAD_REQUEST]) // "Bad Request"
console.log(getReasonPhrase(503)) // "Service Unavailable"
```

### TypeScript

```typescript path=null start=null
import { StatusCodes, type StatusCode, type StatusName } from 'http-code-responses'

function sendResponse(code: StatusCode) {
  // code is type-safe with full autocomplete support
  return { statusCode: code }
}

sendResponse(StatusCodes.NO_CONTENT)

const statusName: StatusName = 'INTERNAL_SERVER_ERROR'
```

### Framework Examples

<details>
<summary><b>Express.js</b></summary>

```javascript path=null start=null
import express from 'express'
import { StatusCodes, getReasonPhrase } from 'http-code-responses'

const app = express()

app.get('/api/users/:id', async (req, res) => {
  const user = await findUser(req.params.id)
  
  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({
      error: getReasonPhrase(StatusCodes.NOT_FOUND)
    })
  }
  
  res.status(StatusCodes.OK).json(user)
})
```
</details>

<details>
<summary><b>Fastify</b></summary>

```javascript path=null start=null
import Fastify from 'fastify'
import { StatusCodes } from 'http-code-responses'

const fastify = Fastify()

fastify.get('/api/health', async (request, reply) => {
  return reply.code(StatusCodes.OK).send({ status: 'healthy' })
})
```
</details>

<details>
<summary><b>Next.js API Routes</b></summary>

```typescript path=null start=null
import { NextApiRequest, NextApiResponse } from 'next'
import { StatusCodes } from 'http-code-responses'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
      error: 'Method not allowed'
    })
  }
  
  res.status(StatusCodes.CREATED).json({ success: true })
}
```
</details>

<details>
<summary><b>Hono</b></summary>

```typescript path=null start=null
import { Hono } from 'hono'
import { StatusCodes } from 'http-code-responses'

const app = new Hono()

app.post('/api/data', async (c) => {
  const data = await c.req.json()
  // Process data...
  return c.json({ success: true }, StatusCodes.CREATED)
})
```
</details>

## 📖 API

### `StatusCodes`

Object with named constants for all standard HTTP status codes.

```typescript path=null start=null
StatusCodes.OK                      // 200
StatusCodes.CREATED                 // 201
StatusCodes.NO_CONTENT              // 204
StatusCodes.BAD_REQUEST             // 400
StatusCodes.UNAUTHORIZED            // 401
StatusCodes.FORBIDDEN               // 403
StatusCodes.NOT_FOUND               // 404
StatusCodes.INTERNAL_SERVER_ERROR   // 500
// ... and many more
```

Also includes common aliases:
- `UNPROCESSABLE_ENTITY` (422)
- `PAYLOAD_TOO_LARGE` (413)
- `REQUEST_URI_TOO_LONG` (414)

### `ReasonPhrases`

```typescript path=null start=null
ReasonPhrases: Record<number, string>
```

Maps status codes to their standard reason phrases.

```typescript path=null start=null
ReasonPhrases[200] // "OK"
ReasonPhrases[404] // "Not Found"
ReasonPhrases[500] // "Internal Server Error"
```

### `getReasonPhrase(code: number)`

Returns the reason phrase for a given status code.

```typescript path=null start=null
getReasonPhrase(200)  // "OK"
getReasonPhrase(404)  // "Not Found"
getReasonPhrase(9999) // undefined (unknown code)
```

### `getStatusCode(name: string)`

Returns the numeric code for a given constant name.

```typescript path=null start=null
getStatusCode('OK')        // 200
getStatusCode('NOT_FOUND') // 404
getStatusCode('INVALID')   // undefined
```

### `isStatusCode(value: number)`

Type guard to check if a number is a known status code.

```typescript path=null start=null
if (isStatusCode(code)) {
  // TypeScript knows code is a valid StatusCode
  console.log(getReasonPhrase(code))
}
```

## 🗺️ Roadmap

We're constantly improving `http-code-responses`. Here's what's on the horizon:

### 🎯 Planned Features

- [ ] **Status Code Categories** - Helper functions to check code types:
  - `isInformational(code)` - 1xx codes
  - `isSuccess(code)` - 2xx codes
  - `isRedirection(code)` - 3xx codes
  - `isClientError(code)` - 4xx codes
  - `isServerError(code)` - 5xx codes

- [ ] **Custom Status Codes** - Support for non-standard codes used by specific services:
  - Cloudflare status codes (520-527)
  - AWS-specific codes
  - Custom enterprise codes

- [ ] **Response Builders** - Convenient response object factories:
  ```typescript
  createErrorResponse(StatusCodes.NOT_FOUND, { details: '...' })
  createSuccessResponse(StatusCodes.OK, data)
  ```

- [ ] **HTTP/2 & HTTP/3 Support** - Additional status codes and features specific to newer protocols

- [ ] **Localization** - Reason phrases in multiple languages:
  ```typescript
  getReasonPhrase(404, 'es') // "No Encontrado"
  getReasonPhrase(404, 'fr') // "Non Trouvé"
  ```

- [ ] **Status Code Recommendations** - Helper to suggest appropriate status codes:
  ```typescript
  suggestStatusCode({ operation: 'create', success: true }) // 201
  suggestStatusCode({ operation: 'delete', success: true }) // 204
  ```

- [ ] **OpenAPI/Swagger Integration** - Generate OpenAPI response schemas from status codes

- [ ] **Middleware Helpers** - Framework-specific middleware for common patterns:
  - Auto-set reason phrases in response headers
  - Status code validation
  - Logging with status code context

### 💡 Nice to Have

- [ ] CLI tool for status code lookup
- [ ] Browser extension for quick reference
- [ ] Interactive documentation site
- [ ] Performance benchmarks vs alternatives
- [ ] Code generation for other languages (Python, Go, Rust)

### 🚀 Recently Completed

- ✅ Full TypeScript support with type guards
- ✅ ESM + CJS dual package support
- ✅ Zero runtime dependencies
- ✅ 100% test coverage
- ✅ Modern HTTP specification alignment

**Want to contribute?** Check out our [Contributing Guide](#-contributing) or open an issue to discuss new features!

## 🤔 Why http-code-responses?

### The Problem

```javascript path=null start=null
// ❌ Magic numbers are hard to read
res.status(422).json({ error: 'Invalid data' })

// ❌ Easy to make typos
res.status(StatusCodes.UNPROCESSABLE_ENTITTY).json(...)

// ❌ Inconsistent across projects
const NOT_FOUND = 404 // defined in every project
```

### The Solution

```javascript path=null start=null
// ✅ Readable, typed, consistent
import { StatusCodes } from 'http-code-responses'

res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ error: 'Invalid data' })
```

### Comparison

| Feature | http-code-responses | http-status-codes | statuses |
|---------|---------------------|-------------------|----------|
| TypeScript Support | ✅ Full | ⚠️ Partial | ❌ No |
| ESM + CJS | ✅ | ✅ | ✅ |
| Reason Phrases | ✅ | ✅ | ✅ |
| Type Guards | ✅ | ❌ | ❌ |
| Helper Functions | ✅ | ⚠️ Limited | ✅ |
| Bundle Size | 🪶 <2KB | ~3KB | ~2KB |
| Zero Dependencies | ✅ | ✅ | ✅ |
| Active Maintenance | ✅ | ⚠️ Sporadic | ✅ |

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and add tests
4. **Run tests**: `npm test`
5. **Check types**: `npm run typecheck`
6. **Commit your changes**: `git commit -m 'feat: add amazing feature'`
7. **Push to the branch**: `git push origin feature/amazing-feature`
8. **Open a Pull Request**

### Development Setup

```bash
# Clone the repository
git clone https://github.com/iamgerwin/http-code-responses.git
cd http-code-responses

# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Check TypeScript types
npm run typecheck

# Build the project
npm run build
```

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `test:` - Test changes
- `chore:` - Tooling/config changes

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 💖 Acknowledgments

- Inspired by [Symfony HttpFoundation](https://symfony.com/doc/current/components/http_foundation.html)
- HTTP status code specifications from [IANA](https://www.iana.org/assignments/http-status-codes/)
- Built with [TypeScript](https://www.typescriptlang.org/), [tsup](https://tsup.egoist.dev/), and [Vitest](https://vitest.dev/)

## 🔗 Related Projects

- [http-status-codes](https://github.com/prettymuchbryce/http-status-codes) - Alternative HTTP status code library
- [statuses](https://github.com/jshttp/statuses) - HTTP status utility

---

<div align="center">

**Made with ❤️ by developers, for developers**

If you find this package useful, please consider giving it a ⭐ on [GitHub](https://github.com/iamgerwin/http-code-responses)!

</div>

# Middleware

## Jargon to review

Separation of concerns (READ)
Clean Code: A Handbook of Agile Software Craftsmanship

_We do not write code for the computer, code is a communication device, a way to reveal our intentions to the next developer_

**EVERYTHING IS MIDDLEWARE**

## Types of middlware

- built-in: included with express, ex: `express.json()`
- third party: must be installed using `npm`
- custom: we code these!

## Types (based on hot it's being used)

- global: runs on every request
- local: use for a specific set of routes only

order matters, it goes top to bottom, left to right

[YouTube of this lecture](https://www.youtube.com/watch?v=1aNyT6PNt8E&feature=youtu.be)

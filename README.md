# graphql-joda-types

[![npm](https://img.shields.io/npm/v/graphql-joda-types.svg)](https://www.npmjs.com/package/graphql-joda-types)
[![main](https://github.com/meetup/graphql-joda-types/actions/workflows/main.yml/badge.svg)](https://github.com/meetup/graphql-joda-types/actions/workflows/main.yml)
[![Coverage Status](https://coveralls.io/repos/github/meetup/graphql-joda-types/badge.svg?branch=master)](https://coveralls.io/github/meetup/graphql-joda-types?branch=master)

This is a small JavaScript library allowing you to use the date/time types from [`js-joda`][js-joda] in your [GraphQL][] resolvers.

(We recommend `js-joda` for all JavaScript date/time code, but if you disagree, consider [graphql-iso-date][] instead of this package.)

## Supported Types

The following `js-joda` types are currently supported:

- [`LocalDate`](https://js-joda.github.io/js-joda/esdoc/class/src/LocalDate.js~LocalDate.html)
- [`LocalDateTime`](https://js-joda.github.io/js-joda/esdoc/class/src/LocalDateTime.js~LocalDateTime.html)
- [`LocalTime`](https://js-joda.github.io/js-joda/esdoc/class/src/LocalTime.js~LocalTime.html)
- [`ZonedDateTime`](https://js-joda.github.io/js-joda/esdoc/class/src/ZonedDateTime.js~ZonedDateTime.html)
- [`ZoneId`](https://js-joda.github.io/js-joda/esdoc/class/src/ZoneId.js~ZoneId.html)

## Usage

Installation is straightforward:

```bash
yarn add graphql-joda-types   # or use npm
```

You can then write something like the following in your schema:

```graphql
scalar LocalDate
scalar ZonedDateTime
scalar ZoneId

type User {
  id: ID!
  name: String
  birthday: LocalDate
  timezone: ZoneId
  createdAt: ZonedDateTime
  updatedAt: ZonedDateTime
}
```

And then in your GraphQL server:

```js
import { LocalDate, ZonedDateTime, ZoneId } from 'graphql-joda-types';
import { makeExecutableSchema } from 'graphql-tools';

const schema = makeExecutableSchema({
  resolvers: {
    LocalDate,
    ZonedDateTime,
    ZoneId,
    // ...
  },
});
```

You will then be able to use `js-joda` date and time types as you expect in your other resolvers: input types will automatically be parsed to the appropriate object types, and when your resolvers return these types to clients, they will be stringified properly.

[js-joda]: https://github.com/js-joda/js-joda
[graphql]: https://graphql.org/
[graphql-iso-date]: https://www.npmjs.com/package/graphql-iso-date

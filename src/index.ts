import { GraphQLScalarType, Kind } from 'graphql';
import * as joda from '@js-joda/core';

export const LocalDate = new GraphQLScalarType({
  name: 'LocalDate',
  description:
    'A date string, such as 2018-07-01, serialized in ISO8601 format',
  serialize: (value): string => {
    if (value instanceof joda.LocalDate) {
      return value.toString();
    }
    if (typeof value === 'string') {
      joda.LocalDate.parse(value); // will throw if it's invalid
      return value;
    }
    throw new TypeError(
      `${name} can not represent invalid type ${JSON.stringify(value)}`
    );
  },
  parseValue: (value): joda.LocalDate => {
    if (typeof value === 'string') {
      return joda.LocalDate.parse(value);
    }
    throw new TypeError(
      `${name} can not represent non-string type ${JSON.stringify(value)}`
    );
  },
  parseLiteral: (ast): joda.LocalDate => {
    if (ast.kind !== Kind.STRING) {
      throw new TypeError(
        `${name} can not represent non-string type ${JSON.stringify(ast)}`
      );
    }
    return joda.LocalDate.parse(ast.value);
  },
});

export const LocalDateTime = new GraphQLScalarType({
  name: 'LocalDateTime',
  description:
    'A date and time, such as 2018-07-01T12:00:00, without a timezone, serialized in ISO8601 format',
  serialize: (value): string => {
    if (value instanceof joda.LocalDateTime) {
      return value.toString();
    }
    if (typeof value === 'string') {
      joda.LocalDateTime.parse(value); // will throw if it's invalid
      return value;
    }
    throw new TypeError(
      `${name} can not represent invalid type ${JSON.stringify(value)}`
    );
  },
  parseValue: (value): joda.LocalDateTime => {
    if (typeof value === 'string') {
      return joda.LocalDateTime.parse(value);
    }
    throw new TypeError(
      `${name} can not represent non-string type ${JSON.stringify(value)}`
    );
  },
  parseLiteral: (ast): joda.LocalDateTime => {
    if (ast.kind !== Kind.STRING) {
      throw new TypeError(
        `${name} can not represent non-string type ${JSON.stringify(ast)}`
      );
    }
    return joda.LocalDateTime.parse(ast.value);
  },
});

export const LocalTime = new GraphQLScalarType({
  name: 'LocalTime',
  description: 'A time string, such as 12:00:00, serialized in ISO8601 format',
  serialize: (value): string => {
    if (value instanceof joda.LocalTime) {
      return value.toString();
    }
    if (typeof value === 'string') {
      joda.LocalTime.parse(value); // will throw if it's invalid
      return value;
    }
    throw new TypeError(
      `${name} can not represent invalid type ${JSON.stringify(value)}`
    );
  },
  parseValue: (value): joda.LocalTime => {
    if (typeof value === 'string') {
      return joda.LocalTime.parse(value);
    }
    throw new TypeError(
      `${name} can not represent non-string type ${JSON.stringify(value)}`
    );
  },
  parseLiteral: (ast): joda.LocalTime => {
    if (ast.kind !== Kind.STRING) {
      throw new TypeError(
        `${name} can not represent non-string type ${JSON.stringify(ast)}`
      );
    }
    return joda.LocalTime.parse(ast.value);
  },
});

export const ZonedDateTime = new GraphQLScalarType({
  name: 'ZonedDateTime',
  description:
    'A specific moment in time, such as 2018-07-01T12:00:00-04:00, serialized in ISO8601 format',
  serialize: (value): string => {
    if (value instanceof joda.ZonedDateTime) {
      return value.toString();
    }
    if (typeof value === 'string') {
      joda.ZonedDateTime.parse(value); // will throw if it's invalid
      return value;
    }
    throw new TypeError(
      `${name} can not represent invalid type ${JSON.stringify(value)}`
    );
  },
  parseValue: (value): joda.ZonedDateTime => {
    if (typeof value === 'string') {
      return joda.ZonedDateTime.parse(value);
    }
    throw new TypeError(
      `${name} can not represent non-string type ${JSON.stringify(value)}`
    );
  },
  parseLiteral: (ast): joda.ZonedDateTime => {
    if (ast.kind !== Kind.STRING) {
      throw new TypeError(
        `${name} can not represent non-string type ${JSON.stringify(ast)}`
      );
    }
    return joda.ZonedDateTime.parse(ast.value);
  },
});

export const ZoneId = new GraphQLScalarType({
  name: 'ZoneId',
  description:
    'A timezone ID from the IANA timezone database, such as America/New_York or UTC',
  serialize: (value): string => {
    if (value instanceof joda.ZoneId) {
      return value.toString();
    }
    if (typeof value === 'string') {
      joda.ZoneId.of(value); // will throw if it's invalid
      return value;
    }
    throw new TypeError(
      `${name} can not represent invalid type ${JSON.stringify(value)}`
    );
  },
  parseValue: (value): joda.ZoneId => {
    if (typeof value === 'string') {
      return joda.ZoneId.of(value);
    }
    throw new TypeError(
      `${name} can not represent non-string type ${JSON.stringify(value)}`
    );
  },
  parseLiteral: (ast): joda.ZoneId => {
    if (ast.kind !== Kind.STRING) {
      throw new TypeError(
        `${name} can not represent non-string type ${JSON.stringify(ast)}`
      );
    }
    return joda.ZoneId.of(ast.value);
  },
});

export const Duration = new GraphQLScalarType({
  name: 'Duration',
  description: 'A time-based amount of time, such as "34.5 seconds"',
  serialize: (value): string => {
    if (value instanceof joda.Duration) {
      return value.toString();
    }
    if (typeof value === 'string') {
      joda.Duration.parse(value); // will throw if it's invalid
      return value;
    }
    throw new TypeError(
      `${name} can not represent invalid type ${JSON.stringify(value)}`
    );
  },
  parseValue: (value): joda.Duration => {
    if (typeof value === 'string') {
      return joda.Duration.parse(value);
    }
    throw new TypeError(
      `${name} can not represent non-string type ${JSON.stringify(value)}`
    );
  },
  parseLiteral: (ast): joda.Duration => {
    if (ast.kind !== Kind.STRING) {
      throw new TypeError(
        `${name} can not represent non-string type ${JSON.stringify(ast)}`
      );
    }
    return joda.Duration.parse(ast.value);
  },
});

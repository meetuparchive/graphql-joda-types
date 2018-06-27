// @flow
import { GraphQLScalarType, Kind } from 'graphql';
import type { GraphQLScalarTypeConfig } from 'graphql';
import * as joda from 'js-joda';

const jodaToGraphql = <T>(
  name: string,
  jodaType: Class<T>, // eslint-disable-line no-undef
  parser: string => T
) => {
  const parse = (value: string): T => {
    try {
      return parser(value);
    } catch (e) {
      throw new TypeError(
        `${name} can not represent an invalid string ${value}`
      );
    }
  };

  const config: GraphQLScalarTypeConfig<T, string> = {
    name,
    serialize: (value): string => {
      if (value instanceof jodaType) {
        return value.toString();
      }
      if (typeof value === 'string') {
        parse(value); // will throw if it's invalid
        return value;
      }
      throw new TypeError(
        `${name} can not represent invalid type ${JSON.stringify(value)}`
      );
    },
    parseValue: (value): T => {
      if (typeof value === 'string') {
        return parse(value);
      }
      throw new TypeError(
        `${name} can not represent non-string type ${JSON.stringify(value)}`
      );
    },
    parseLiteral: (ast): T => {
      if (ast.kind !== Kind.STRING) {
        throw new TypeError(
          `${name} can not represent non-string type ${String(
            ast.value != null ? ast.value : null
          )}`
        );
      }
      return parse(ast.value);
    },
  };

  return new GraphQLScalarType(config);
};

export const LocalDate = jodaToGraphql(
  'LocalDate',
  joda.LocalDate,
  joda.LocalDate.parse
);
export const LocalDateTime = jodaToGraphql(
  'LocalDateTime',
  joda.LocalDateTime,
  joda.LocalDateTime.parse
);
export const LocalTime = jodaToGraphql(
  'LocalTime',
  joda.LocalTime,
  joda.LocalTime.parse
);
export const ZonedDateTime = jodaToGraphql(
  'ZonedDateTime',
  joda.ZonedDateTime,
  joda.ZonedDateTime.parse
);
export const ZoneId = jodaToGraphql('ZoneId', joda.ZoneId, joda.ZoneId.of);

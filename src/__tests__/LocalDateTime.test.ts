import { Kind } from 'graphql';
import * as joda from 'js-joda';
import { LocalDateTime } from '../index';

describe('LocalDateTime', () => {
  it('has a description', () => {
    expect(LocalDateTime.description).toMatchSnapshot();
  });

  it('parses valid datetimes', () => {
    expect(LocalDateTime.parseValue('2018-07-01T20:00:00')).toEqual(
      joda.LocalDateTime.of(2018, 7, 1, 20)
    );

    expect(
      LocalDateTime.parseLiteral(
        {
          kind: Kind.STRING,
          value: '2018-07-01T20:00:00',
        },
        null
      )
    ).toEqual(joda.LocalDateTime.of(2018, 7, 1, 20));
  });

  it('rejects invalid datetimes', () => {
    expect(() =>
      LocalDateTime.parseValue('2018-07-01')
    ).toThrowErrorMatchingSnapshot();
  });

  it('rejects undefined and throws', () => {
    expect(() =>
      LocalDateTime.parseValue(undefined)
    ).toThrowErrorMatchingSnapshot();
  });

  it('serializes dates', () => {
    expect(
      LocalDateTime.serialize(joda.LocalDateTime.of(2018, 7, 1, 20))
    ).toEqual('2018-07-01T20:00');
  });

  it('serializes strings (by passing them through)', () => {
    expect(LocalDateTime.serialize('2018-07-01T20:00:00')).toEqual(
      '2018-07-01T20:00:00'
    );
  });

  it('refuses to serialize strings that are not valid dates', () => {
    expect(() =>
      LocalDateTime.serialize('some garbage')
    ).toThrowErrorMatchingSnapshot();
  });
});

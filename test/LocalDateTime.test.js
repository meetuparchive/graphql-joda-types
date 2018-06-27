import { Kind } from 'graphql';
import * as joda from 'js-joda';
import { LocalDateTime } from '../src';

describe('LocalDateTime', () => {
  it('has a description', () => {
    expect(LocalDateTime.description).toMatchSnapshot();
  });

  it('parses valid datetimes', () => {
    expect(LocalDateTime.parseValue('2018-07-01T20:00:00')).toEqual(
      joda.LocalDateTime.of(2018, 7, 1, 20)
    );

    expect(
      LocalDateTime.parseLiteral({
        kind: Kind.STRING,
        value: '2018-07-01T20:00:00',
      })
    ).toEqual(joda.LocalDateTime.of(2018, 7, 1, 20));
  });

  it('rejects invalid datetimes', () => {
    expect(() =>
      LocalDateTime.parseValue('2018-07-01')
    ).toThrowErrorMatchingSnapshot();
  });

  it('parses undefined to undefined', () => {
    expect(LocalDateTime.parseValue(undefined)).toBeUndefined();
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

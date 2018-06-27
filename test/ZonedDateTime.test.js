import { Kind } from 'graphql';
import * as joda from 'js-joda';
import { ZonedDateTime } from '../src';

describe('ZonedDateTime', () => {
  it('has a description', () => {
    expect(ZonedDateTime.description).toMatchSnapshot();
  });

  it('parses valid datetimes', () => {
    expect(ZonedDateTime.parseValue('2018-07-01T20:21:22-04:00')).toEqual(
      joda.ZonedDateTime.of(
        2018,
        7,
        1,
        20,
        21,
        22,
        0,
        joda.ZoneOffset.ofHours(-4)
      )
    );

    expect(
      ZonedDateTime.parseLiteral({
        kind: Kind.STRING,
        value: '2018-07-01T20:21:22-04:00',
      })
    ).toEqual(
      joda.ZonedDateTime.of(
        2018,
        7,
        1,
        20,
        21,
        22,
        0,
        joda.ZoneOffset.ofHours(-4)
      )
    );
  });

  it('rejects invalid datetimes', () => {
    expect(() =>
      ZonedDateTime.parseValue('2018-07-01')
    ).toThrowErrorMatchingSnapshot();
  });

  it('parses undefined to undefined', () => {
    expect(ZonedDateTime.parseValue(undefined)).toBeUndefined();
  });

  it('serializes dates', () => {
    expect(
      ZonedDateTime.serialize(
        joda.ZonedDateTime.of(
          2018,
          7,
          1,
          20,
          21,
          22,
          0,
          joda.ZoneOffset.ofHours(-4)
        )
      )
    ).toEqual('2018-07-01T20:21:22-04:00');
  });

  it('serializes strings (by passing them through)', () => {
    expect(ZonedDateTime.serialize('2018-07-01T20:00:00Z')).toEqual(
      '2018-07-01T20:00:00Z'
    );
  });

  it('refuses to serialize strings that are not valid dates', () => {
    expect(() =>
      ZonedDateTime.serialize('some garbage')
    ).toThrowErrorMatchingSnapshot();
  });
});

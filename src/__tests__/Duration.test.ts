import { Kind } from 'graphql';
import * as joda from '@js-joda/core';
import { Duration } from '../index';

describe('Duration', () => {
  it('has a description', () => {
    expect(Duration.description).toMatchSnapshot();
  });

  it('parses valid durations', () => {
    expect(Duration.parseValue('PT4H')).toEqual(
      joda.Duration.of(4, joda.ChronoUnit.HOURS)
    );

    expect(
      Duration.parseLiteral(
        {
          kind: Kind.STRING,
          value: 'PT9M',
        },
        null
      )
    ).toEqual(joda.Duration.of(9, joda.ChronoUnit.MINUTES));
  });

  it('rejects invalid durations', () => {
    expect(() =>
      Duration.parseValue('2018-07-01')
    ).toThrowErrorMatchingSnapshot();
  });

  it('rejects undefined and throws', () => {
    expect(() => Duration.parseValue(undefined)).toThrowErrorMatchingSnapshot();
  });

  it('serializes durations', () => {
    expect(
      Duration.serialize(joda.Duration.of(4, joda.ChronoUnit.HOURS))
    ).toEqual('PT4H');
  });

  it('serializes strings (by passing them through)', () => {
    expect(Duration.serialize('PT4H')).toEqual('PT4H');
  });

  it('refuses to serialize strings that are not valid durations', () => {
    expect(() =>
      Duration.serialize('some garbage')
    ).toThrowErrorMatchingSnapshot();
  });
});

import { Kind } from 'graphql';
import * as joda from '@js-joda/core';
import { LocalTime } from '../index';

describe('LocalTime', () => {
  it('has a description', () => {
    expect(LocalTime.description).toMatchSnapshot();
  });

  it('parses valid times', () => {
    expect(LocalTime.parseValue('20:21:22')).toEqual(
      joda.LocalTime.of(20, 21, 22)
    );

    expect(
      LocalTime.parseLiteral({ kind: Kind.STRING, value: '20:21:22' }, null)
    ).toEqual(joda.LocalTime.of(20, 21, 22));
  });

  it('rejects invalid times', () => {
    expect(() =>
      LocalTime.parseValue('some garbage')
    ).toThrowErrorMatchingSnapshot();
  });

  it('rejects undefined and throws', () => {
    expect(() =>
      LocalTime.parseValue(undefined)
    ).toThrowErrorMatchingSnapshot();
  });

  it('serializes times', () => {
    expect(LocalTime.serialize(joda.LocalTime.of(20, 21, 22))).toEqual(
      '20:21:22'
    );
  });

  it('serializes strings (by passing them through)', () => {
    expect(LocalTime.serialize('20:00:00')).toEqual('20:00:00');
  });

  it('refuses to serialize strings that are not valid times', () => {
    expect(() =>
      LocalTime.serialize('some garbage')
    ).toThrowErrorMatchingSnapshot();
  });
});

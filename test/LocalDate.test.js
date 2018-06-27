import { Kind } from 'graphql';
import * as joda from 'js-joda';
import { LocalDate } from '../src';

describe('LocalDate', () => {
  it('has a description', () => {
    expect(LocalDate.description).toMatchSnapshot();
  });

  it('parses valid dates', () => {
    expect(LocalDate.parseValue('2018-07-01')).toEqual(
      joda.LocalDate.of(2018, 7, 1)
    );

    expect(
      LocalDate.parseLiteral({ kind: Kind.STRING, value: '2018-07-01' })
    ).toEqual(joda.LocalDate.of(2018, 7, 1));
  });

  it('rejects invalid dates', () => {
    expect(() =>
      LocalDate.parseValue('some garbage')
    ).toThrowErrorMatchingSnapshot();
  });

  it('parses undefined to undefined', () => {
    expect(LocalDate.parseValue(undefined)).toBeUndefined();
  });

  it('serializes dates', () => {
    expect(LocalDate.serialize(joda.LocalDate.of(2018, 7, 1))).toEqual(
      '2018-07-01'
    );
  });

  it('serializes strings (by passing them through)', () => {
    expect(LocalDate.serialize('2018-07-01')).toEqual('2018-07-01');
  });

  it('refuses to serialize strings that are not valid dates', () => {
    expect(() =>
      LocalDate.serialize('some garbage')
    ).toThrowErrorMatchingSnapshot();
  });
});

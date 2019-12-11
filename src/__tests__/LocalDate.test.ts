import { IntValueNode, Kind, ValueNode } from 'graphql';
import * as joda from 'js-joda';
import { LocalDate } from '../index';

describe('LocalDate', () => {
  it('has a description', () => {
    expect(LocalDate.description).toMatchSnapshot();
  });

  it('parses valid dates', () => {
    expect(LocalDate.parseValue('2018-07-01')).toEqual(
      joda.LocalDate.of(2018, 7, 1)
    );

    expect(
      LocalDate.parseLiteral({ kind: Kind.STRING, value: '2018-07-01' }, null)
    ).toEqual(joda.LocalDate.of(2018, 7, 1));
  });

  it('rejects invalid dates', () => {
    expect(() =>
      LocalDate.parseValue('some garbage')
    ).toThrowErrorMatchingSnapshot();
  });

  it('rejects non-string types', () => {
    expect(() => LocalDate.parseValue(2018)).toThrowErrorMatchingSnapshot();
    expect(() =>
      LocalDate.parseLiteral({ kind: Kind.INT, value: '20180701' }, null)
    ).toThrowErrorMatchingSnapshot();
    expect(() => LocalDate.serialize(2018)).toThrowErrorMatchingSnapshot();
  });

  it('rejects undefined and throws', () => {
    expect(() =>
      LocalDate.parseValue(undefined)
    ).toThrowErrorMatchingSnapshot();
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

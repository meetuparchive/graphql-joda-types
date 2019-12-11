import { Kind } from 'graphql';
import * as joda from 'js-joda';
import { ZoneId } from '../index';

const UTC = joda.ZoneId.of('UTC');

describe('ZoneId', () => {
  it('has a description', () => {
    expect(ZoneId.description).toMatchSnapshot();
  });

  it('parses UTC', () => {
    expect(ZoneId.parseValue('UTC')).toEqual(UTC);

    expect(
      ZoneId.parseLiteral({ kind: Kind.STRING, value: 'UTC' }, null)
    ).toEqual(UTC);
  });

  it('rejects invalid zones', () => {
    expect(() =>
      ZoneId.parseValue('some garbage')
    ).toThrowErrorMatchingSnapshot();
  });

  it('rejects undefined and throws', () => {
    expect(() => ZoneId.parseValue(undefined)).toThrowErrorMatchingSnapshot();
  });

  it('serializes zones', () => {
    expect(ZoneId.serialize(UTC)).toEqual('UTC');
  });

  it('serializes strings (by passing them through)', () => {
    expect(ZoneId.serialize('UTC')).toEqual('UTC');
  });

  it('refuses to serialize strings that are not valid zones', () => {
    expect(() =>
      ZoneId.serialize('some garbage')
    ).toThrowErrorMatchingSnapshot();
  });
});

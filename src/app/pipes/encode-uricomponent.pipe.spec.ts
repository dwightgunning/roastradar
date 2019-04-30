import { EncodeURIComponentPipe } from './encode-uricomponent.pipe';

describe('EncodeURIComponentPipe', () => {
  it('create an instance', () => {
    const pipe = new EncodeURIComponentPipe();
    expect(pipe).toBeTruthy();
  });

  it('ignores non-strings', () => {
    const pipe = new EncodeURIComponentPipe();
    const nonStrings = [
      5,
      7.7,
      {a: 'a', b: 'b'},
      ['one', 'two', 'three'],
      () => null
    ];
    nonStrings.forEach((nonString) => {
      expect(pipe.transform(nonString)).toEqual(nonString);
    });
  });

  it('transforms strings', () => {
    const testValue = 'my/string/to/encode';
    const expectedResult = encodeURIComponent(testValue);

    const pipe = new EncodeURIComponentPipe();
    expect(pipe.transform(testValue)).toEqual(expectedResult);
  });
});

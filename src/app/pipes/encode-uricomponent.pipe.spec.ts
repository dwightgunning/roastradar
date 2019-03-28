import { EncodeURIComponentPipe } from './encode-uricomponent.pipe';

describe('EncodeURIComponentPipe', () => {
  it('create an instance', () => {
    const pipe = new EncodeURIComponentPipe();
    expect(pipe).toBeTruthy();
  });
});

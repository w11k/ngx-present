import { maxDepth } from './utils';

describe('module utils', () => {
  describe('function maxDepth', () => {
    it('should be created', () => {
      const actual = maxDepth([]);

      expect(actual).toEqual(0);
    });

  });

  beforeEach(() => {});

});

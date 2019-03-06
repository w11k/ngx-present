import { flattenDeep, limitDepth, mapDeep, max, maxDepth, min } from './utils';

describe('module utils', () => {
  describe('function maxDepth', () => {
    it('should return 0 for empty array', () => {
      const actual = maxDepth([]);

      expect(actual).toEqual(0);
    });

    it('should return 1 for single level', () => {
      const actual = maxDepth([1]);

      expect(actual).toEqual(1);
    });

    it('should return 2 for two levels', () => {
      const actual = maxDepth([1, [1]]);

      expect(actual).toEqual(2);
    });

    it('should return x for x levels', () => {
      const x = Math.floor(Math.random() * 100);

      const list: RecursiveArray<number> = [1];

      let last: RecursiveArray<number> = list;
      for (let i = 0; i < x - 1; i++) {
        const newLast = [1];
        last.push(newLast);
        last = newLast;
      }

      const actual = maxDepth(list);

      expect(actual).toEqual(x);
    });

  });

  describe('function min', () => {
    it('should return 0', () => {
      const actual = min(0, 1);
      expect(actual).toEqual(0);
    });

    it('should return 0 for positive values sorted', () => {
      const actual = min(0, 1, 2);
      expect(actual).toEqual(0);
    });

    it('should return 0 for positive values sorted reversed', () => {
      const actual = min(2, 1, 0);
      expect(actual).toEqual(0);
    });

    it('should return 0 for positive values unsorted', () => {
      const actual = min(2, 0, 1);
      expect(actual).toEqual(0);
    });

    it('should return -2 for negative values sorted', () => {
      const actual = min(0, -1, -2);
      expect(actual).toEqual(-2);
    });

    it('should return -2 for negative values sorted reversed', () => {
      const actual = min(-2, -1, 0);
      expect(actual).toEqual(-2);
    });

    it('should return -2 for negative values unsorted', () => {
      const actual = min(-2, 0, -1);
      expect(actual).toEqual(-2);
    });

    it('should return -2 for negative and positive values sorted', () => {
      const actual = min(0, 1, -2);
      expect(actual).toEqual(-2);
    });

    it('should return -2 for negative and positive values sorted reversed', () => {
      const actual = min(-2, 0, 1);
      expect(actual).toEqual(-2);
    });

    it('should return -2 for negative values unsorted', () => {
      const actual = min(0, -2, 1);
      expect(actual).toEqual(-2);
    });


    it('should return Number.MIN_SAFE_INTEGER', () => {
      const actual = min(0, 1, Number.MAX_SAFE_INTEGER, -2, Number.MIN_SAFE_INTEGER);
      expect(actual).toEqual(Number.MIN_SAFE_INTEGER);
    });
  });

  describe('function max', () => {
    it('should return 1', () => {
      const actual = max(0, 1);
      expect(actual).toEqual(1);
    });

    it('should return 2 for positive values sorted', () => {
      const actual = max(0, 1, 2);
      expect(actual).toEqual(2);
    });

    it('should return 2 for positive values sorted reversed', () => {
      const actual = max(2, 1, 0);
      expect(actual).toEqual(2);
    });

    it('should return 2 for positive values unsorted', () => {
      const actual = max(2, 0, 1);
      expect(actual).toEqual(2);
    });

    it('should return 0 for negative values sorted', () => {
      const actual = max(0, -1, -2);
      expect(actual).toEqual(0);
    });

    it('should return 0 for negative values sorted reversed', () => {
      const actual = max(-2, -1, 0);
      expect(actual).toEqual(0);
    });

    it('should return 0 for negative values unsorted', () => {
      const actual = max(-2, 0, -1);
      expect(actual).toEqual(0);
    });

    it('should return 1 for negative and positive values sorted', () => {
      const actual = max(0, 1, -2);
      expect(actual).toEqual(1);
    });

    it('should return 1 for negative and positive values sorted reversed', () => {
      const actual = max(-2, 0, 1);
      expect(actual).toEqual(1);
    });

    it('should return 1 for negative values unsorted', () => {
      const actual = max(0, -2, 1);
      expect(actual).toEqual(1);
    });


    it('should return Number.MAX_SAFE_INTEGER', () => {
      const actual = max(0, 1, Number.MAX_SAFE_INTEGER, -2, Number.MIN_SAFE_INTEGER);
      expect(actual).toEqual(Number.MAX_SAFE_INTEGER);
    });

  });

  describe('function flattenDeep', () => {
    it('should return empty array for empty array', () => {
      const actual = flattenDeep([]);

      expect(actual).toEqual([]);
    });

    it('should return flat array for flat array', () => {
      const actual = flattenDeep([1, 2, 3]);

      expect(actual).toEqual([1, 2, 3]);
    });

    it('should return array with 2 elements for two levels', () => {
      const actual = flattenDeep([1, [1]]);

      expect(actual).toEqual([1, 1]);
    });

    it('should include all nested elements', () => {
      const actual = flattenDeep([1, [2, 3, [4, 5, [6, 7]]]]);

      expect(actual).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

  });

  describe('function mapDeep', () => {
    it('should return empty array for empty array', () => {
      const actual = mapDeep<number, string>([], (x) => x.toFixed(0));

      expect(actual).toEqual([]);
    });

    it('should return flat array for flat array', () => {
      const actual = mapDeep<number, string>([1, 2, 3], x => x.toFixed(0));

      expect(actual).toEqual(['1', '2', '3']);
    });

    it('should return array with two string on two levels', () => {
      const actual = mapDeep<number, string>([1, [1]], x => x.toFixed(0));

      expect(actual).toEqual(['1', ['1']]);
    });

    it('should include all nested elements', () => {
      const actual = mapDeep<number, string>([1, [2, 3, [4, 5, [6, 7]]]], x => x.toFixed(0));

      expect(actual).toEqual(['1', ['2', '3', ['4', '5', ['6', '7']]]]);
    });

  });

  describe('function limitDepth', () => {
    it('should return empty array for empty array', () => {
      const actual = limitDepth([], 9);

      expect(actual).toEqual([]);
    });

    it('should return empty array for flat array and 0', () => {
      const actual = limitDepth([1, 2, 3], 0);

      expect(actual).toEqual([]);
    });

    it('should return empty array for nested array and 0', () => {
      const actual = limitDepth([1, 2, [3, 4]], 0);

      expect(actual).toEqual([]);
    });

    it('should return flat array for flat array', () => {
      const actual = limitDepth([1, 2, 3], 9);

      expect(actual).toEqual([1, 2, 3]);
    });

    it('should return flat array for flat array and 1', () => {
      const actual = limitDepth([1, 2, 3], 1);

      expect(actual).toEqual([1, 2, 3]);
    });

    it('should return flat array for nested array and 1', () => {
      const actual = limitDepth([1, 2, [3, 4]], 1);

      expect(actual).toEqual([1, 2]);
    });

    it('should return 2 level array for 3 level array and 2', () => {
      const actual = limitDepth([1, 2, [3, 4], [5, [6, 7]]], 2);

      expect(actual).toEqual([1, 2, [3, 4], [5]]);
    });

  });
});

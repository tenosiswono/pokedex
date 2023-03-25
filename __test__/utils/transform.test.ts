import { capitalizeWord, padWithZeros } from '../../utils/transform';

describe('capitalizeWord', () => {
  it('should capitalize the first letter of a word', () => {
    expect(capitalizeWord('hello')).toBe('Hello');
    expect(capitalizeWord('world')).toBe('World');
    expect(capitalizeWord('hello-world')).toBe('Hello-World');
    expect(capitalizeWord('')).toBe('');
  });

  it('should convert all other letters to lowercase', () => {
    expect(capitalizeWord('HAPPY')).toBe('Happy');
    expect(capitalizeWord('eVeNtS')).toBe('Events');
  });
});

describe('padWithZeros', () => {
  it('should add leading zeros to a number', () => {
    expect(padWithZeros(5, 3)).toBe('005');
    expect(padWithZeros(123, 5)).toBe('00123');
    expect(padWithZeros(987654321, 5)).toBe('987654321');
  });

  it('should return the original number if the number of digits is less than or equal to the length of the number', () => {
    expect(padWithZeros(42, 1)).toBe('42');
    expect(padWithZeros(42, 2)).toBe('42');
    expect(padWithZeros(42, 3)).toBe('042');
  });
});

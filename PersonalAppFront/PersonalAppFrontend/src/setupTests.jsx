import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Polyfills for Jest environment
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock fetch for tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    text: () => Promise.resolve('Mock instructions content')
  })
);

// Clear fetch mock before each test
beforeEach(() => {
  fetch.mockClear();
});
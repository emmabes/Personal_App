import { getRandomFood, getNextHead, checkCollision } from '../../../src/services/snake/snakeLogic.js';

describe('Snake Game Logic', () => {
  test('getNextHead returns correct position based on direction', () => {
    const head = { x: 10, y: 10 };
    expect(getNextHead(head, 'UP')).toEqual({ x: 10, y: 9 });
    expect(getNextHead(head, 'DOWN')).toEqual({ x: 10, y: 11 });
    expect(getNextHead(head, 'LEFT')).toEqual({ x: 9, y: 10 });
    expect(getNextHead(head, 'RIGHT')).toEqual({ x: 11, y: 10 });
  });

  test('checkCollision detects wall collisions', () => {
    const gridSize = 20;
    const snake = [{ x: 5, y: 5 }];
    expect(checkCollision({ x: -1, y: 10 }, gridSize, snake)).toBe(true);
    expect(checkCollision({ x: 20, y: 10 }, gridSize, snake)).toBe(true);
    expect(checkCollision({ x: 10, y: -1 }, gridSize, snake)).toBe(true);
    expect(checkCollision({ x: 10, y: 20 }, gridSize, snake)).toBe(true);
    expect(checkCollision({ x: 10, y: 10 }, gridSize, snake)).toBe(false);
  });

  test('checkCollision detects self collision', () => {
    const gridSize = 20;
    const snake = [{ x: 10, y: 11 }, { x: 10, y: 12 }];
    expect(checkCollision({ x: 10, y: 11 }, gridSize, snake)).toBe(true);
    expect(checkCollision({ x: 10, y: 10 }, gridSize, snake)).toBe(false);
  });

  test('getRandomFood does not generate food on snake body', () => {
    const gridSize = 2; // Tiny grid
    const snake = [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }];
    // Only (1,1) is available
    const food = getRandomFood(gridSize, snake);
    expect(food).toEqual({ x: 1, y: 1 });
  });
});

import { jest } from '@jest/globals';

jest.mock('../../../src/services/ttc/iconService.jsx', () => ({
  iconList: ['icon1.png', 'icon2.png', 'icon3.png', 'icon4.png', 'icon5.png', 'icon6.png', 'icon7.png', 'icon8.png', 'icon9.png', 'icon10.png', 'icon11.png', 'icon12.png', 'icon13.png'],
  renderIcon: () => null,
}));

import { initializeGame, checkMatch } from '../../../src/services/memory/memoryLogic.js';

describe('Memory Game Logic', () => {
  test('initializes game with correct number of cards for 4x4', () => {
    const cards = initializeGame(4);
    expect(cards.length).toBe(16);
    
    // Check for pairs
    const icons = cards.map(c => c.icon);
    const uniqueIcons = [...new Set(icons)];
    expect(uniqueIcons.length).toBe(8);
    
    // Each icon should appear twice
    uniqueIcons.forEach(icon => {
      const count = icons.filter(i => i === icon).length;
      expect(count).toBe(2);
    });
  });

  test('initializes game with a golden card for 3x3', () => {
    const cards = initializeGame(3);
    expect(cards.length).toBe(9);
    
    const goldenCard = cards.find(c => c.isGolden);
    expect(goldenCard).toBeDefined();
    expect(goldenCard.pairId).toBe('golden');
  });

  test('checkMatch returns true for same pairId', () => {
    const card1 = { pairId: 'pair-1' };
    const card2 = { pairId: 'pair-1' };
    expect(checkMatch(card1, card2)).toBe(true);
  });

  test('checkMatch returns false for different pairId', () => {
    const card1 = { pairId: 'pair-1' };
    const card2 = { pairId: 'pair-2' };
    expect(checkMatch(card1, card2)).toBe(false);
  });
});

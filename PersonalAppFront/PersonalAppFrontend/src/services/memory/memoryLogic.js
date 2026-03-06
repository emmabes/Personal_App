import { iconList } from '../ttc/iconService.jsx';

/**
 * Shuffles an array using Fisher-Yates algorithm
 */
const shuffle = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

/**
 * Initializes the memory game board based on size
 * @param {number} size - Grid size (3, 4, 5, or 6)
 */
export const initializeGame = (size) => {
  const totalCards = size * size;
  const isOdd = totalCards % 2 !== 0;
  const pairCount = Math.floor(totalCards / 2);
  
  // Get available icons (excluding X and O which are usually text)
  const gameIcons = iconList.filter(icon => icon !== 'X' && icon !== 'O');
  
  // Pick random icons for pairs
  const selectedIcons = shuffle(gameIcons).slice(0, pairCount);
  
  let cards = [];
  // Create pairs
  selectedIcons.forEach((icon, index) => {
    const pairId = `pair-${index}`;
    cards.push({ id: `${pairId}-a`, icon, pairId, isFlipped: false, isMatched: false });
    cards.push({ id: `${pairId}-b`, icon, pairId, isFlipped: false, isMatched: false });
  });
  
  // Handle odd grid size with a "Golden Card"
  if (isOdd) {
    const goldenIcon = gameIcons.find(icon => !selectedIcons.includes(icon)) || gameIcons[0];
    cards.push({ 
      id: 'golden-card', 
      icon: goldenIcon, 
      pairId: 'golden', 
      isFlipped: false, 
      isMatched: false,
      isGolden: true 
    });
  }
  
  return shuffle(cards);
};

/**
 * Checks if two cards match
 */
export const checkMatch = (card1, card2) => {
  if (!card1 || !card2) return false;
  return card1.pairId === card2.pairId;
};

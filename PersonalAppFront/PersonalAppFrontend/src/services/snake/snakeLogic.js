/**
 * Generates a random position for the food that isn't on the snake's body.
 */
export const getRandomFood = (gridSize, snake) => {
  let newFood;
  while (true) {
    newFood = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize)
    };
    // Check if food is on snake body
    const onSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
    if (!onSnake) break;
  }
  return newFood;
};

/**
 * Moves the snake head based on direction.
 */
export const getNextHead = (head, direction) => {
  const nextHead = { ...head };
  switch (direction) {
    case 'UP': nextHead.y -= 1; break;
    case 'DOWN': nextHead.y += 1; break;
    case 'LEFT': nextHead.x -= 1; break;
    case 'RIGHT': nextHead.x += 1; break;
    default: break;
  }
  return nextHead;
};

/**
 * Checks for wall or self-collision.
 */
export const checkCollision = (head, gridSize, snake) => {
  // Wall collision
  if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
    return true;
  }
  // Self collision (check if head is on any body segment)
  return snake.some(segment => segment.x === head.x && segment.y === head.y);
};

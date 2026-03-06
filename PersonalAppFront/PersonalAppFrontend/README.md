# Personal App Frontend (React + Vite)

The web user interface for the personal portfolio application. Built with React and Vite for a fast, modern development experience.

## Quick Start

To run the application locally:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

## Testing

This project includes a comprehensive test suite (47+ tests) using **Jest** and **React Testing Library**.

To run all tests:
```bash
npm test
```

Tests cover:
- Game logic for Tic Tac Toe and Memory Game
- UI Component behavior and rendering
- Service layer operations (icons, logic, etc.)

## Building for Production

To create a production build:
```bash
npm run build
```

The output will be in the `dist/` directory, which is what the CI/CD pipeline deploys to AWS S3.

## Key Features
- **Games**: Interactive Tic Tac Toe, Memory Game, Snake, and Sudoku with advanced CSS animations.
- **Responsive Design**: Mobile and desktop optimized layouts.
- **CI/CD Integrated**: Automatically deployed to AWS CloudFront on git push.

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Instructions from '../../../src/components/ttc/Instructions.jsx';

// Mock fetch
global.fetch = jest.fn();

const mockProps = {
  showInstructions: false,
  onClose: jest.fn()
};

describe('Instructions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetch.mockResolvedValue({
      text: () => Promise.resolve('Basic Game:\n• Click a cell\n\nClick anywhere to close')
    });
  });

  test('renders nothing when showInstructions is false', () => {
    const { container } = render(<Instructions {...mockProps} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders modal when showInstructions is true', async () => {
    const props = { ...mockProps, showInstructions: true };
    const { getByText } = render(<Instructions {...props} />);
    
    await waitFor(() => {
      expect(getByText('How to Play')).toBeInTheDocument();
    });
  });

  test('loads and displays instructions content', async () => {
    const props = { ...mockProps, showInstructions: true };
    const { getByText } = render(<Instructions {...props} />);
    
    await waitFor(() => {
      expect(getByText('Basic Game:')).toBeInTheDocument();
      expect(getByText('• Click a cell')).toBeInTheDocument();
    });
  });

  test('calls onClose when overlay clicked', async () => {
    const props = { ...mockProps, showInstructions: true };
    const { container } = render(<Instructions {...props} />);
    
    await waitFor(() => {
      const overlay = container.querySelector('.instructions-overlay');
      fireEvent.click(overlay);
      expect(mockProps.onClose).toHaveBeenCalled();
    });
  });

  test('does not close when modal content clicked', async () => {
    const props = { ...mockProps, showInstructions: true };
    const { container } = render(<Instructions {...props} />);
    
    await waitFor(() => {
      const modal = container.querySelector('.instructions-modal');
      fireEvent.click(modal);
      expect(mockProps.onClose).not.toHaveBeenCalled();
    });
  });
});
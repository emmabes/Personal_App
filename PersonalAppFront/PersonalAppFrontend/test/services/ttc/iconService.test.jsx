import React from 'react';
import { render } from '@testing-library/react';
import { iconMap, iconList, renderIcon } from '../../../src/services/ttc/iconService.jsx';

describe('Icon Service', () => {
  test('iconMap contains expected icons', () => {
    expect(iconMap['bear.png']).toBeDefined();
    expect(iconMap['goku.png']).toBeDefined();
    expect(Object.keys(iconMap)).toHaveLength(8);
  });

  test('iconList matches iconMap keys', () => {
    expect(iconList).toEqual(Object.keys(iconMap));
  });

  test('renderIcon returns text symbol for X/O', () => {
    const { container } = render(renderIcon('X', 'X'));
    expect(container.querySelector('.text-symbol')).toHaveTextContent('X');
  });

  test('renderIcon returns image for custom icons', () => {
    const { container } = render(renderIcon('X', 'bear.png'));
    const img = container.querySelector('.player-icon');
    expect(img).toBeInTheDocument();
    expect(img).toHaveClass('mirrored');
  });

  test('renderIcon mirrors X player icons', () => {
    const { container } = render(renderIcon('X', 'bear.png'));
    expect(container.querySelector('.player-icon')).toHaveClass('mirrored');
  });

  test('renderIcon does not mirror O player icons', () => {
    const { container } = render(renderIcon('O', 'bear.png'));
    expect(container.querySelector('.player-icon')).not.toHaveClass('mirrored');
  });
});
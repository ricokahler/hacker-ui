/** @pragma export */
import { getContrast, readableColor } from 'polished';
import { DynamicColorPalette } from './types';

const hasBadSurfaceContrast = (a: string, b: string) => getContrast(a, b) < 1.5;
const hasUnreadableContrast = (a: string, b: string) => getContrast(a, b) < 3;

function createDynamicColorPalette(
  color: string,
  onColor: string,
): DynamicColorPalette {
  const asBackground = hasBadSurfaceContrast(color, onColor)
    ? readableColor(onColor)
    : color;

  const bgContrast = readableColor(asBackground);

  const onSurface = hasUnreadableContrast(color, onColor)
    ? readableColor(onColor)
    : color;

  return {
    asBackground,
    bgContrast,
    onSurface,
  };
}

export default createDynamicColorPalette;

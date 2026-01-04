import type { TypographyProps } from '../types';

const handleFontFamily = ({ tag }: TypographyProps) => {
  if (tag) return 'jakarta';
  return 'inter';
};

export default handleFontFamily;

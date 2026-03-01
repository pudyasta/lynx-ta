import { FontFamily } from '../types';

const handleFontFamily = (fontFamily: FontFamily) => {
  if (fontFamily === FontFamily.jakarta) return 'font-jakarta';
  return 'fontinter';
};

export default handleFontFamily;

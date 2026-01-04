import { fontWeightBold } from '../constant';

import type { TypographyProps } from '../types';

const handleFontWeight = ({
  bold,
}: Pick<
  TypographyProps,
  'body' | 'bold' | 'tag' | 'link' | 'micro' | 'uppercase'
>) => {
  // switch (true) {
  //   case (body === 'display-1' && bold) || (body === 'paragraph-1' && bold):
  //     return fontWeightExtraBold;
  //   case (body === 'display-2' && bold) || (body === 'paragraph-2' && bold):
  //     return fontWeightExtraBold;
  //   case (body === 'display-3' && bold) || (body === 'paragraph-3' && bold):
  //     return fontWeightExtraBold;
  //   case body === 'display-3' && uppercase:
  //     return fontWeightExtraBold;
  //   case tag === 1 ||
  //     tag === 2 ||
  //     tag === 3 ||
  //     tag === 4 ||
  //     tag === 5 ||
  //     tag === 6:
  //     return fontWeightExtraBold;
  //   case micro && bold:
  //     return fontWeightExtraBold;
  //   case Boolean(link) || bold:
  //     return fontWeightBold;
  //   default:
  //     return fontWeightRegular;
  // }
  if (bold) {
    return fontWeightBold;
  }
};

export default handleFontWeight;

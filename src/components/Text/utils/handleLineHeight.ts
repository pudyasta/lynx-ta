import {
  lineHeightLv4,
  lineHeightLv3,
  lineHeightLv2,
  lineHeightLv7,
  lineHeightLv5,
  lineHeightLv1,
  lineHeightLv6,
  lineHeightLv9,
  lineHeightMicro,
} from '../constant';
import type { TypographyProps } from '../types';

const handleLineHeight = ({
  body,
  tag,
  micro,
  caption,
  large,
}: Pick<TypographyProps, 'body' | 'tag' | 'micro' | 'caption' | 'large'>) => {
  switch (true) {
    case body === 'display-1':
      return lineHeightLv4;
    case body === 'display-2':
      return lineHeightLv3;
    case body === 'display-3':
      return lineHeightLv2;
    case body === 'paragraph-1':
      return lineHeightLv7;
    case body === 'paragraph-2':
      return lineHeightLv5;
    case body === 'paragraph-3':
      return lineHeightLv3;
    case body === 4:
      return lineHeightLv1;
    case body === 3 || caption:
      return lineHeightLv2;
    case body === 1 || large:
      return lineHeightLv4;
    case tag === 6:
      return lineHeightLv3;
    case tag === 5:
      return lineHeightLv4;
    case tag === 4:
      return lineHeightLv5;
    case tag === 3:
      return lineHeightLv6;
    case tag === 2:
      return lineHeightLv7;
    case tag === 1:
      return lineHeightLv9;
    case micro:
      return lineHeightMicro;
    default:
      return lineHeightLv3;
  }
};

export default handleLineHeight;

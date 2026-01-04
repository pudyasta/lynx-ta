import { Colors } from '@/constant/style';
import type { TypographyProps } from '../types';

const handleColor = ({
  color,
  link,
  tag,
  main,
  disabled,
}: Pick<TypographyProps, 'color' | 'link' | 'tag' | 'main' | 'disabled'>) => {
  if (color) return color;
  switch (true) {
    case Boolean(link) && !tag:
      return Colors.Primary;

    case disabled:
      return Colors.Disabled;
    default:
      return Colors.Accent;
  }
};

export default handleColor;

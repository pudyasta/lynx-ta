import handleFontWeight from './utils/handleFontWeight';
import handleFontSize from './utils/handleFontSize';
import handleLineHeight from './utils/handleLineHeight';
import handleLetterSpacing from './utils/handleLetterSpacing';
import handleColor from './utils/handleColor';
import type { TypographyProps } from './types';
import handleFontFamily from './utils/handleFontFamily';

const Text = ({
  asSpan = false,
  body,
  bold = false,
  caption = false,
  children,
  color,
  disabled = false,
  large = false,
  link = '',
  main = false,
  margin = '',
  micro = false,
  tag,
  uppercase = false,
  onClick = () => {},
  size,
  className = '',
  style = {},
}: TypographyProps) => {
  return (
    <text
      style={{
        fontFamily: handleFontFamily({ tag }),
        display: link || asSpan ? 'linear' : 'block',
        position: 'relative',
        fontSize: `${handleFontSize({ size })}px`,
        lineHeight: `${handleLineHeight({ body, tag, micro, caption, large })}px`,
        color: handleColor({ color, link, tag, main, disabled }),
        letterSpacing: `${handleLetterSpacing({ body, tag, uppercase })}px`,
        textDecoration: link ? 'none' : 'initial',
        textTransform: uppercase ? 'uppercase' : 'none',
        fontWeight: handleFontWeight({ bold }),

        ...(margin ? { margin } : {}),
        ...style,
      }}
      bindtap={!disabled ? onClick : undefined}
      className={className}
    >
      {children}
    </text>
  );
};

export default Text;

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export type ColorPalette = {
  Primary: string;
  Secondary: string;
  Accent: string;
  Success: string;
  Error: string;
  Neutral: string;
  Background: string;
  Disabled: string;
};

const LightColors: ColorPalette = {
  Primary: '#1A73E8',
  Secondary: '#FFC107',
  Accent: '#E8F0FE',
  Success: '#28A745',
  Error: '#DC3545',
  Neutral: '#202124',
  Background: '#F8F9FA',
  Disabled: '#9AA0A6',
};

const DarkColors: ColorPalette = {
  Primary: '#8AB4F8',
  Secondary: '#FDD663',
  Accent: '#2D2E31',
  Success: '#81C995',
  Error: '#F28B82',
  Neutral: '#E8EAED',
  Background: '#121212',
  Disabled: '#5F6368',
};

export const Colors: ColorPalette = {
  get Primary() {
    return lynx.__globalProps.appTheme === Theme.Light
      ? LightColors.Primary
      : DarkColors.Primary;
  },
  get Secondary() {
    return lynx.__globalProps.appTheme === Theme.Light
      ? LightColors.Secondary
      : DarkColors.Secondary;
  },
  get Accent() {
    return lynx.__globalProps.appTheme === Theme.Light
      ? LightColors.Accent
      : DarkColors.Accent;
  },
  get Success() {
    return lynx.__globalProps.appTheme === Theme.Light
      ? LightColors.Success
      : DarkColors.Success;
  },
  get Error() {
    return lynx.__globalProps.appTheme === Theme.Light
      ? LightColors.Error
      : DarkColors.Error;
  },
  get Neutral() {
    return lynx.__globalProps.appTheme === Theme.Light
      ? LightColors.Neutral
      : DarkColors.Neutral;
  },
  get Background() {
    return lynx.__globalProps.appTheme === Theme.Light
      ? LightColors.Background
      : DarkColors.Background;
  },

  get Disabled() {
    return lynx.__globalProps.appTheme === Theme.Light
      ? LightColors.Disabled
      : DarkColors.Disabled;
  },
};

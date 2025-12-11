/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#7C3AED'; // GymPass purple
const tintColorDark = '#A78BFA'; // Light purple for dark mode

export const Colors = {
  light: {
    text: '#1A1A1A',
    background: '#FFFFFF', // Pure white background like GymPass
    tint: tintColorLight,
    icon: '#6B7280',
    tabIconDefault: '#9CA3AF',
    tabIconSelected: tintColorLight,
    primary: '#7C3AED', // GymPass primary purple
    secondary: '#EC4899', // GymPass pink accent
    cardBackground: '#F8F9FA', // Subtle off-white for cards
    inputBackground: '#FFFFFF',
    inputBorder: '#E0E0E0',
    buttonPrimary: '#7C3AED',
    buttonSecondary: '#EC4899',
    divider: '#F0F0F0',
  },
  dark: {
    text: '#F9FAFB',
    background: '#111827', // Dark blue-gray
    tint: tintColorDark,
    icon: '#9CA3AF',
    tabIconDefault: '#6B7280',
    tabIconSelected: tintColorDark,
    primary: '#A78BFA', // Light purple for dark mode
    secondary: '#F472B6', // Light pink for dark mode
    cardBackground: '#1F2937',
    inputBackground: '#1F2937',
    inputBorder: '#374151',
    buttonPrimary: '#7C3AED',
    buttonSecondary: '#EC4899',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

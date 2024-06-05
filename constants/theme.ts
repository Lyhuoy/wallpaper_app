import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

export const theme = {
  colors: {
    whith: '#fff',
    black: '#000',
    grayBg: '#e5e5e5',
    neutral: (opacity: number) => `rgba(10, 10, 10, ${opacity})`,
  },

  fontWeights: {
    medium: '500',
    semibold: '600',
    bold: 'bold',
  },

  radius: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
  },
};
// mypreset.ts
import { definePreset } from '@primeuix/themes';
import Lara from '@primeuix/themes/aura';

export const MyPreset = definePreset(Lara, {
  semantic: {
    primary: {
      50: '{blue.50}',
      100: '{blue.100}',
      200: '{blue.200}',
      300: '{blue.300}',
      400: '{blue.400}',
      500: '{blue.500}',
      600: '{blue.600}',
      700: '{blue.700}',
      800: '{blue.800}',
      900: '{blue.900}',
      950: '{blue.950}'
    },
    success: '{green.500}',
    info: '{cyan.500}',
    warning: '{yellow.500}',
    danger: '{red.500}'
  },
  surface: {
    0: '{gray.50}',
    100: '{gray.100}',
    200: '{gray.200}',
    300: '{gray.300}',
    400: '{gray.400}',
    500: '{gray.500}'
  },
  neutral: {
    50: '{gray.50}',
    100: '{gray.100}',
    200: '{gray.200}',
    300: '{gray.300}',
    400: '{gray.400}',
    500: '{gray.500}',
    600: '{gray.600}',
    700: '{gray.700}'
  }
});

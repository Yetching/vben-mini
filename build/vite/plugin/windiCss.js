import windiCss from 'vite-plugin-windicss';

export function configWindiCss() {
  return windiCss({
    safelist: 'no-select',
    preflight: {
      enableAll: true,
    },
  });
}

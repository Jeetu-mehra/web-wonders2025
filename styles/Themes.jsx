export const light = {
  body: '#fff',
  text: '#202020', // black shade
  bodyRgba: '255, 255, 255',
  textRgba: '32, 32, 32',
  grey: '#bebebe',

  // Font sizes
  fontxs: '0.75rem',
  fontsm: '0.875rem',
  fontmd: '1rem', // 1rem = 16px
  fontlg: '1.25rem',
  fontxl: '2rem',
  fontxxl: '3rem',
  fontxxxl: '5rem',
  fontBig: '10rem',

  // Spacing
  navHeight: '5rem',
  
  // Breakpoints
  breakpoints: {
    xs: '30em',  // 480px
    sm: '40em',  // 640px
    md: '48em',  // 768px
    lg: '64em',  // 1024px
    xl: '80em',  // 1280px
  }
};

export const dark = {
  body: '#202020',
  text: '#fff',
  bodyRgba: '32, 32, 32',
  textRgba: '255, 255, 255',
  grey: '#bebebe',

  // Font sizes (same as light)
  fontxs: '0.75rem',
  fontsm: '0.875rem',
  fontmd: '1rem',
  fontlg: '1.25rem',
  fontxl: '2rem',
  fontxxl: '3rem',
  fontxxxl: '5rem',
  fontBig: '10rem',

  // Spacing (same as light)
  navHeight: '5rem',
  
  // Breakpoints (same as light)
  breakpoints: {
    xs: '30em',
    sm: '40em',
    md: '48em',
    lg: '64em',
    xl: '80em',
  }
};

// Default export
export default dark;
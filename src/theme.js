import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196f3', // أزرق أكثر حيوية
      light: '#64b5f6',
      dark: '#1976d2',
    },
    secondary: {
      main: '#f50057', // أحمر أكثر جاذبية
      light: '#ff4081',
      dark: '#c51162',
    },
    background: {
      default: '#f4f4f4', // خلفية فاتحة وناعمة
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      'Cairo', // خط عربي
      'Roboto',
      'Arial',
      'sans-serif'
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    body1: {
      lineHeight: 1.6,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none', // إبقاء حالة النص كما هي
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)', // تأثير التكبير عند التحويم
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          transition: 'box-shadow 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 12px rgba(0,0,0,0.15)',
          },
        },
      },
    },
  },
});

export default theme;

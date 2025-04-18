import { createTheme } from '@mui/material/styles';

const getDesignTokens = (mode) => ({
    palette: {
        mode,
        primary: {
            main: '#D8901E', // Button and accent color
            contrastText: '#fff',
        },
        ...(mode === 'light'
        ? {
            background: {
                default: '#EBA22F', // main container color
                paper: '#F7E1B3',   // inner box color
            },
            text: {
                primary: '#000000',
                secondary: '#3B2418',
            },
            custom: {
                tertiary: '#EFB978', // toggle button color
            },
            }
        : {
            background: {
                default: '#3B2418',  // dark main
                paper: '#5E3F32',    // dark secondary
            },
            text: {
                primary: '#FFFFFF',
                secondary: '#F7E1B3',
            },
            custom: {
                tertiary: '#917A70', // dark toggle button color
            },
        }),
    },
    typography: {
        fontFamily: 'Karla, sans-serif',
        h1: {
            fontFamily: 'Inria Serif, serif',
            fontSize: '36px',
        },
        h2: {
            fontFamily: 'Inria Serif, serif',
        },
        h3: {
            fontFamily: 'Inria Serif, serif',
            fontSize: '18px',
        },
        h4: {
            fontFamily: 'Inria Serif, serif',
        },
        subtitle1: {
            fontFamily: 'Inria Serif, sans-serif',
        },
        body1: {
            fontFamily: 'Karla, sans-serif',
        },
        button: {
            fontFamily: 'Karla, sans-serif',
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& label.Mui-focused': {
                        color: '#D8901E',
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#D8901E',
                        },
                        '&:hover fieldset': {
                            borderColor: '#D8901E',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#D8901E',
                        },
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: '#D8901E',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#c0781b',
                    },
                },
            },
        },
    },
});

export default getDesignTokens;
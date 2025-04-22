import { createTheme } from '@mui/material/styles';

const getDesignTokens = (mode) => ({
    palette: {
        mode,
        ...(mode === 'light'
        ? {
            primary: {
                main: '#EFB978', // button and accent color
                contrastText: '#fff',
                accent: "#D8901E",
            },
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
                suggestions: '#fff6e5',
                suggestionsDivider: '#e0c896',
                suggestionsHover: '#F7E1B3',
                windowButtonHover: '#c4ad7e',
                locationCardHover: '#F4C478',
            },
            }
        : {
            primary: {
                main: '#917A70', // dark button and accent color
                contrastText: '#fff',
                accent: "#B88C7A"
            },
            background: {
                default: '#3B2418',  // dark main
                paper: '#5E3F32',    // dark secondary
            },
            text: {
                primary: '#FFFFFF',
                secondary: '#F9F4F2',
            },
            custom: {
                tertiary: '#917A70', // dark toggle button color
                suggestions: '#795E53',
                suggestionsDivider: '#3B2418',
                suggestionsHover: '#5E3F32',
                locationCardHover: '#6A3D26',
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
                root: ({ theme }) => ({
                    '& label.Mui-focused': {
                        color: theme.palette.primary.accent,
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: theme.palette.primary.accent,
                        },
                        '&:hover fieldset': {
                            borderColor: theme.palette.primary.accent,
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: theme.palette.primary.accent,
                        },
                    },
                }),
            },
        },
        MuiButton: {
            styleOverrides: {
                root: ({ theme }) => ({
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.text.primary,
                    '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                    },
                }),
            },
        },
    },
});

export default getDesignTokens;
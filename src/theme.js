import { createTheme } from '@mui/material/styles';

const theme = createTheme({
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
    palette: {
        primary: {
            main: '#D8901E', // Orange tone for buttons and focused textfields
            contrastText: '#fff',
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

export default theme;
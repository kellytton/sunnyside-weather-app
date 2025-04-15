import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'Karla, sans-serif', // default base font

        h1: {
            fontFamily: 'Inria Serif, serif',
            fontSize: '36px'
        },
        h2: {
            fontFamily: 'Inria Serif, serif',
        },
        h3: {
            fontFamily: 'Inria Serif, serif',
            fontSize: '18px'
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
});

export default theme;

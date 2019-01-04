import { createMuiTheme } from '@material-ui/core/styles';
import { deepPurple, indigo, red } from '@material-ui/core/colors';

export default createMuiTheme({
    palette: {
        primary: {
            main: indigo.A700
        },
        secondary: {
            main: deepPurple.A700
        },
        error: {
            main: red.A700
        },
        contrastThreshold: 4,
        tonalOffset: 0.2,
        type: 'light'
    },
    typography: {
        useNextVariants: true
    }
});
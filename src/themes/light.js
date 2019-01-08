import { createMuiTheme } from '@material-ui/core/styles';
import { deepOrange, amber, red } from '@material-ui/core/colors';

export default createMuiTheme({
    palette: {
        primary: {
            main: deepOrange.A700
        },
        secondary: {
            main: amber[800]
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
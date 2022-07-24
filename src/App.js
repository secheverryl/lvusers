import logo from './logo.svg';
import './App.css';
import UserTable from './Components/UserTable/UserTable.tsx';
import ButtonMenu from './Components/ButtonMenu/ButtonMenu.tsx';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './Reducers/user.tsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const store = createStore(
  reducers,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

/* TSX expansion
// module augmentation
declare module '@mui/material/styles' {
  interface Theme {
      status: {
          danger: string;
      };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
      status?: {
          danger?: string;
      };
  }

  interface PaletteColorOptions {
      main?: string;
      darker?: string;
      light?: string;
      contrastText?: string;
  }

  interface PaletteOptions {
      neutral?: {
          main?: string;
          contrastText?: string;
      }
  }
}*/

function App() {

  const theme = createTheme({
    status: {
      danger: '#e53e3e',
    },
    palette: {
      primary: {
        main: '#243356',
        darker: '#808080'
      },
      secondary: {
        light: '#000000',
        main: '#d7d9db',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#ed1f24',
      },
      neutral: {
        main: '#2547a0',
        contrastText: '#ffffff'
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <ButtonMenu></ButtonMenu>
        <UserTable></UserTable>
      </Provider>
    </ThemeProvider>
  );
}

export default App;

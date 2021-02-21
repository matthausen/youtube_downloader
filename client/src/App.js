import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SearchBar from './components/SearchBar';
import './App.css';

const THEME = createMuiTheme({
  typography: {
    "fontFamily": `"GoogleSans", "Roboto", "Helvetica", sans-serif`,
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
  }
});

function App() {
  return (
    <MuiThemeProvider theme={THEME}>
      <div className="App">
        <SearchBar />
      </div>
    </MuiThemeProvider>
  );
}

export default App;
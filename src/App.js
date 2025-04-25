import './App.css';
import TodoList from './component/TodoList';
import { createTheme, ThemeProvider} from "@mui/material/styles";


const theme = createTheme({
  typography: {
    fontFamily: ["Amiri"],
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <TodoList />
      </div>
    </ThemeProvider>
  );
}

export default App;

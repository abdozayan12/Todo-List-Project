import "./App.css";
import TodoList from "./component/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodoContext } from "./context/TodosContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { colors } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: ["Amiri"],
  },
  palette: {
    primary: {
      main: "#004d40",
    },
  },
});

const initialToDos = [
  {
    id: uuidv4(),
    title: "read",
    body: "sdvfdsgrs",
    isComplete: false,
  },
  {
    id: uuidv4(),
    title: "study",
    body: "fgkgcjhfd",
    isComplete: false,
  },
];

function App() {
  const [todos, setToDos] = useState(initialToDos);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <TodoContext.Provider value={{ todos, setToDos }}>
          <TodoList />
        </TodoContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;

import "./App.css";
import TodoList from "./component/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodoContext } from "./context/TodosContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";


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
    title: "اهلا بك",
    body: "إضغط تعديل لتغير تفاصيل المهمه او قم باضافه مهمات جديده",
    isComplete: false,
  }
];

function App() {
  const getInitialTodos = () => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    return storedTodos || initialToDos;
  };
  const [todos, setToDos] = useState(getInitialTodos);
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

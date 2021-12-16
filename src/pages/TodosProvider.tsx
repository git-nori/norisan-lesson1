import { useCallback, useState } from "react";
import { createAppContext } from "../app/hooks";

type Todo = {
  id: number;
  title: string;
  isDone: boolean;
};

type TodosContextType = {
  todos: Array<Todo>;
  addTodo: (title: Todo["title"]) => void;
  changeIsDone: (id: Todo["id"], isDone: Todo["isDone"]) => void;
  deleteTodo: (id: Todo["id"]) => void;
  deleteTodos: VoidFunction;
};

type TodosProviderProps = {
  initialValue: Array<Todo>;
};

const [useTodosContext, TodosContextProvider] =
  createAppContext<TodosContextType>();

export const TodosProvider: React.FC<TodosProviderProps> = ({
  initialValue,
  children,
}) => {
  const [todos, setTodos] = useState<Array<Todo>>(initialValue);
  const addTodo = useCallback(
    (title: Todo["title"]) => {
      const id =
        todos.map((todo) => todo.id).reduce((a, b) => Math.max(a, b), 0) + 1;
      const newTodo: Todo = {
        id,
        title,
        isDone: false,
      };
      setTodos([...todos, newTodo]);
    },
    [todos]
  );
  const changeIsDone = useCallback(
    (id: Todo["id"], isDone: Todo["isDone"]) => {
      const updatedTodos = todos.map((todo) =>
        todo.id !== id
          ? todo
          : {
              ...todo,
              isDone,
            }
      );
      setTodos(updatedTodos);
    },
    [todos]
  );
  const deleteTodo = useCallback(
    (id: Todo["id"]) => {
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    },
    [todos]
  );
  const deleteTodos: VoidFunction = useCallback(() => {
    const updatedTodos = todos.filter((todo) => !todo.isDone);
    setTodos(updatedTodos);
  }, [todos]);

  return (
    <TodosContextProvider
      value={{
        addTodo,
        deleteTodo,
        deleteTodos,
        todos,
        changeIsDone,
      }}
    >
      {children}
    </TodosContextProvider>
  );
};

export { useTodosContext };

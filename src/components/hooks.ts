import { useCallback, useState } from "react";

export type Todo = {
  id: number;
  title: string;
  isDone: boolean;
};

export const useTodos = (initialValue: Array<Todo>) => {
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

  return { todos, addTodo, changeIsDone, deleteTodo, deleteTodos };
};

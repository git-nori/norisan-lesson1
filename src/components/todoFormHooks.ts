import { useCallback, useState } from "react";
import { useTodosContext } from "../pages/TodosProvider";

export const useForm = () => {
  const [title, setTitle] = useState("");
  const { addTodo } = useTodosContext();
  const handleSubmit = useCallback(
    (title) => {
      addTodo(title);
      setTitle("");
    },
    [addTodo]
  );

  return { title, setTitle, handleSubmit };
};

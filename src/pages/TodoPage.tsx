import { useState } from "react";
import { TodoList } from "../components";
import { useTodos } from "../components/hooks";

export const TodoPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const { todos, addTodo, changeIsDone, deleteTodo, deleteTodos } = useTodos(
    []
  );
  const onSubmitTodo = () => {
    addTodo(title);
    setTitle("");
  };

  return (
    <>
      <div>
        <input
          type="text"
          onChange={(e) => setTitle(e.currentTarget.value)}
          value={title}
        />
        <button onClick={onSubmitTodo}>ADD</button>
      </div>
      <div>
        <TodoList
          todos={todos}
          changeIsDone={changeIsDone}
          deleteTodo={deleteTodo}
          deleteTodos={deleteTodos}
        />
      </div>
    </>
  );
};

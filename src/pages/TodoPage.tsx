import { useState } from "react";
import { TodoList, TodoListProps } from "../components";
import { Todo } from "../components/TodoTile";

export const TodoPage: React.FC = () => {
  const [todos, setTodos] = useState<TodoListProps["todos"]>([]);
  const [title, setTitle] = useState("");
  const addTodo = () => {
    const newTodo: Todo = {
      id: todos.map((todo) => todo.id).reduce((a, b) => Math.max(a, b), 0) + 1,
      title,
      isDone: false,
    };
    setTodos([...todos, newTodo]);
    setTitle("");
  };
  const changeIsDone: TodoListProps["changeIsDone"] = (id, checked) => {
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) return;
    const updatedTodos = todos.map((todo) =>
      todo.id !== id
        ? todo
        : {
            ...todo,
            isDone: checked,
          }
    );
    setTodos(updatedTodos);
  };
  const deleteTodo: TodoListProps["deleteTodo"] = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };
  const deleteTodos: VoidFunction = () => {
    const updatedTodos = todos.filter((todo) => !todo.isDone);
    setTodos(updatedTodos);
  };

  return (
    <>
      {/* 各componentを読んで画面作る */}
      <div>
        <input
          type="text"
          onChange={(e) => setTitle(e.currentTarget.value)}
          value={title}
        />
        <button onClick={addTodo}>ADD</button>
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

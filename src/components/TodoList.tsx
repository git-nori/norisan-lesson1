import { useTodos } from "./hooks";
import { TodoTile, TodoTileProps } from "./TodoTile";

export type TodoListProps = {
  todos: Array<TodoTileProps["todo"]>;
  changeIsDone: TodoTileProps["changeIsDone"];
  deleteTodo: TodoTileProps["deleteTodo"];
  deleteTodos: ReturnType<typeof useTodos>["deleteTodos"];
};

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  changeIsDone,
  deleteTodo,
  deleteTodos,
}) => {
  return (
    <>
      <table>
        <tbody>
          {todos.map((todo) => (
            <TodoTile
              key={todo.id}
              todo={todo}
              changeIsDone={changeIsDone}
              deleteTodo={deleteTodo}
            />
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={deleteTodos}>DELETE ALL</button>
      </div>
    </>
  );
};

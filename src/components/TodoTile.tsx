import { Todo, useTodos } from "./hooks";

export type TodoTileProps = {
  todo: Todo;
  changeIsDone: ReturnType<typeof useTodos>["changeIsDone"];
  deleteTodo: ReturnType<typeof useTodos>["deleteTodo"];
};

export const TodoTile: React.FC<TodoTileProps> = ({
  todo,
  changeIsDone,
  deleteTodo,
}) => {
  return (
    <tr key={todo.id}>
      <td>
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={(e) => changeIsDone(todo.id, e.currentTarget.checked)}
        />
      </td>
      <td>{todo.title}</td>
      <td>
        <button onClick={() => deleteTodo(todo.id)}>DELETE</button>
      </td>
    </tr>
  );
};

import { useTodosContext } from "../pages/TodosProvider";

export type TodoTileProps = {
  todo: ReturnType<typeof useTodosContext>["todos"][number];
};

export const TodoTile: React.FC<TodoTileProps> = ({ todo }) => {
  const { changeIsDone, deleteTodo } = useTodosContext();

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

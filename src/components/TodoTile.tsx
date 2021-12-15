export type Todo = {
  id: number;
  title: string;
  isDone: boolean;
};

export type TodoTileProps = {
  todo: Todo;
  changeIsDone: (id: number, checked: boolean) => void;
  deleteTodo: (id: number) => void;
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

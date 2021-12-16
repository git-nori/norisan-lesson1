import { useTodosContext } from "../../../pages/TodosProvider";
import { TodoTile } from "../../molecules/TodoTile";

export const TodoList: React.FC = () => {
  const { todos, deleteTodos } = useTodosContext();

  return (
    <>
      <table>
        <tbody>
          {todos.map((todo) => (
            <TodoTile key={todo.id} todo={todo} />
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={deleteTodos}>DELETE ALL</button>
      </div>
    </>
  );
};

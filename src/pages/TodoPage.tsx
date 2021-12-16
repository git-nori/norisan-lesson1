import { TodoForm } from "../components/organisms/TodoForm";
import { TodoList } from "../components/organisms/TodoList";
import { TodosProvider } from "./TodosProvider";

export const TodoPage: React.FC = () => {
  return (
    <TodosProvider initialValue={[]}>
      <div>
        <TodoForm />
      </div>
      <div>
        <TodoList />
      </div>
    </TodosProvider>
  );
};

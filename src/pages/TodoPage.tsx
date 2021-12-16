import { TodoList } from "../components";
import { TodoForm } from "../components/TodoForm";
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

import { renderHook, act } from "@testing-library/react-hooks";
import {
  TodosContextType,
  TodosProvider,
  useTodosContext,
} from "./TodosProvider";

const todo1: TodosContextType["todos"][number] = {
  id: 1,
  title: "title1",
  isDone: false,
};
const todo2: TodosContextType["todos"][number] = {
  id: 2,
  title: "title2",
  isDone: true,
};
const todo3: TodosContextType["todos"][number] = {
  id: 3,
  title: "title3",
  isDone: true,
};
const testTodos = [todo1, todo2, todo3];

describe("useTodos", () => {
  const wrapper: React.FC = ({ children }) => (
    <TodosProvider initialValue={testTodos}> {children}</TodosProvider>
  );

  describe("addTodo", () => {
    it("指定したタイトルのtodoが作成される事, isDoneの初期値がfalseである事", () => {
      const { result } = renderHook(() => useTodosContext(), { wrapper });

      act(() => {
        result.current.addTodo("test4");
      });

      expect(result.current.todos[3]).toEqual(
        expect.objectContaining({
          title: "test4",
          isDone: false,
        })
      );
    });
  });
  describe("changeIsDone", () => {
    it("指定したIDのisDoneが更新される事", () => {
      const { result } = renderHook(() => useTodosContext(), { wrapper });

      act(() => {
        result.current.changeIsDone(todo1.id, !todo1.isDone);
      });

      expect(result.current.todos[0].isDone).toStrictEqual(!todo1.isDone);
    });
  });
  describe("deleteTodo", () => {
    it("引数で指定したidのtodoが削除される事", () => {
      const { result } = renderHook(() => useTodosContext(), { wrapper });

      act(() => {
        result.current.deleteTodo(todo2.id);
      });

      expect(result.current.todos).toHaveLength(2);
      expect(result.current.todos).toStrictEqual(
        expect.arrayContaining([
          expect.objectContaining(testTodos[0]),
          expect.objectContaining(testTodos[2]),
        ])
      );
    });
  });
  describe("deleteTodos", () => {
    it("isDoneがtrueのtodoが削除される事", () => {
      const { result } = renderHook(() => useTodosContext(), { wrapper });

      act(() => {
        result.current.deleteTodos();
      });

      expect(result.current.todos).toHaveLength(1);
      expect(result.current.todos).toEqual(
        expect.arrayContaining([expect.objectContaining(testTodos[0])])
      );
    });
  });
});

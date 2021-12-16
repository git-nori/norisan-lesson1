import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import { useForm } from "./hooks";
import { useTodosContext } from "../../../pages/TodosProvider";

jest.mock("../../../pages/TodosProvider.tsx");
const mockUseTodosContext = useTodosContext as jest.Mock;

describe("useForm", () => {
  const mockAddTodo = jest.fn();

  beforeEach(() => {
    mockUseTodosContext.mockReturnValue({ addTodo: mockAddTodo });
  });

  it("handleSubmitで正しい関数が呼ばれる事", () => {
    const { result } = renderHook(() => useForm());

    act(() => {
      result.current.setTitle("test");
    });
    expect(result.current.title).toStrictEqual("test");

    act(() => {
      result.current.handleSubmit("test");
    });

    expect(mockAddTodo).toBeCalledWith("test");
    expect(result.current.title).toStrictEqual("");
  });
});

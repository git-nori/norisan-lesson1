import { createContext, useContext } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// createContextに初期値を渡さないでも警告が出ないようにcreateContextをラップする
export const createAppContext = <ContextType>() => {
  const ctx = createContext<ContextType | undefined>(undefined);
  const useCtx = () => {
    const c = useContext(ctx);
    if (!c) throw new Error("useCtx must be inside a Provider with a value");
    return c;
  };
  return [useCtx, ctx.Provider] as const;
};

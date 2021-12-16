import { useForm } from "./hooks";

export const TodoForm: React.FC = () => {
  const { title, setTitle, handleSubmit } = useForm();

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setTitle(e.currentTarget.value)}
        value={title}
      />
      <button onClick={() => handleSubmit(title)}>ADD</button>
    </div>
  );
};

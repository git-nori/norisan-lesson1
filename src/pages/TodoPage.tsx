import { useState, useEffect } from "react";
type Task = {
    task: string;
    readonly id: number;
};
interface Task2 {
    task: string;
}
// interface inIdTask {
//     task: string;
//     id: number;
// }

export const TodoPage: React.FC = () => {
    const [text, setText] = useState("");

    const [tasks, setTasks] = useState<Task[]>([]);
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };
    const addTask = () => {
        if (!text) return;
        const newTask = {
            task: text,
            id: new Date().getTime(),
        };
        const oldTasks = tasks.slice();
        oldTasks.unshift(newTask);
        setTasks(oldTasks);
        // setTasks([newTask, ...tasks]); これと同義↑
        setText("");

    };

    return (
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    addTask();
                }}
            >
                <input
                    type="text"
                    value={text}
                    onChange={(e) => handleOnChange(e)}
                />
                <input
                    type="submit"
                    value="submit"
                    onSubmit={addTask}
                    className="submit"
                />
                <div>
                    <p>現在のtext state実況中↓</p>
                    <p>{text}</p>
                </div>
                <p>現在のTasksの中身↓</p>
                <ul>
                    {tasks.map((task) => {

                        return (
                            <li key={task.id}>
                                
                                <p>{task.task}</p>
                          </li>
                        );
                    })}
                </ul>
            </form>
        </>
    );
};

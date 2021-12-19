import { useState, useEffect } from "react";
type Task = {
    task: string;
};
interface Task2 {
    task: string;
}

export const TodoPage: React.FC = () => {
    const [text, setText] = useState("");

    const [tasks, setTasks] = useState<Task[]>([]);
    const addTask = () => {
        if (!text) return;
        const newTask: Task = {
            task: text
        };
        const oldTasks = tasks.slice();
        oldTasks.unshift(newTask);
        setTasks(oldTasks);
        // setTasks([newTask, ...tasks]); これと同義↑

    };

    return (
        <>
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <input type="submit" value="submit" onSubmit={(e) => e.preventDefault} className="submit" />
                <div>{text}</div>
            </form>
        </>
    );
};

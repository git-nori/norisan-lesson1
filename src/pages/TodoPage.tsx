import { useState, useEffect } from "react";
type Task = {
    task: string;
    readonly id: number;
    //↑文字通り読み取り専用で変更できませんので
};

interface Task2 {
    task: string;
    id: number;
}

//↑typeとinterfaceの違いは割とある。宣言か代入なのか。詳しくはメモを見て。

// const sample : string = "サンプル" ⇦ 変数横：型名　のことをアノーテーションという

export const TodoPage: React.FC = () => {
    const [text, setText] = useState("");

    const [tasks, setTasks] = useState<Task[]>([]);
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };
    const handleEditChange = (id: number, value: string) => {
        const deepCopy: Task[] = JSON.parse(JSON.stringify(tasks));
        // ↑sliceやスプレッド構文はシャローコピーの為、editする関数には不向き。ディープコピーのjsonを使う。ただし、注意が必要

        const newTasks = deepCopy.map((task) => {
            if (task.id === id) {
                task.task = value;
            }
            return task;
        });
        console.log("======tasks=====");
        tasks.map((task) => console.log(`id:${task.id}, task:${task.task}`)
        );
        console.log("========deepcopy======");
        deepCopy.map((task) => console.log(`id:${task.id}, task:${task.task}`));

        setTasks(newTasks);
    }
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
                                <input type="text" value={task.task} onChange={(e) => handleEditChange(task.id, e.target.value)} />
                            </li>
                        );
                    })}
                </ul>
            </form>
        </>
    );
};

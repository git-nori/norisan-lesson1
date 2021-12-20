import { useState, useEffect } from "react";
import { checkServerIdentity } from "tls";
import { getAllJSDocTagsOfKind } from "typescript";
type Task = {
    task: string;
    readonly id: number;
    //↑文字通り読み取り専用で変更できませんので
    check: boolean;
    remove: boolean;
};

interface Task2 {
    task: string;
    id: number;
}

type Filter = "all" | "checked" | "unchecked" | "remove";

//↑typeとinterfaceの違いは割とある。宣言か代入なのか。詳しくはメモを見て。

// const sample : string = "サンプル" ⇦ 変数横：型名　のことをアノーテーションという

export const TodoPage: React.FC = () => {
    const [text, setText] = useState("");

    const [tasks, setTasks] = useState<Task[]>([]);

    const [filter, setFilter] = useState<Filter>('all');
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
    const handleOnCheck = (id: number, check: boolean) => {
        const deepCopy: Task[] = JSON.parse(JSON.stringify(tasks));
        //↑ディープコピーした後の型定義忘れずに
        const newTasks = deepCopy.map((task) => {
            if (task.id === id) {
                task.check = !check
            }
            return task;
        })
        setTasks(newTasks);

    }
    const handleOnRemove = (id: number, remove: boolean) => {
        const deepCopy: Task[] = JSON.parse(JSON.stringify(tasks));
        const newTasks = deepCopy.map((task) => {
            if (task.id === id) {
                task.remove = !remove;
            }
            return task;
        })
        setTasks(newTasks);
    }
    const addTask = () => {
        if (!text) return;
        const newTask = {
            task: text,
            id: new Date().getTime(),
            check: false,
            remove: false,
        };
        const oldTasks = tasks.slice();
        oldTasks.unshift(newTask);
        setTasks(oldTasks);
        // setTasks([newTask, ...tasks]); これと同義↑
        setText("");
    };
    const handleOnEmpty = () => {
        const newTasks = tasks.filter((task) => !task.remove);
        setTasks(newTasks);
    }
    const filterTasks = tasks.filter((task) => {
        switch (filter) {
            case "all":
                return !task.remove;
            // break;
            //↑削除されてないもの全て
            case "checked":
                return task.check && !task.remove;
            // break;
            // ↑完了ずみ、かつ、削除されてないもの全て
            case "unchecked":
                return !task.check && !task.remove;
            //↑未完了、かつ、削除されていないもの全て
            // break;
            case "remove":
                return task.remove;
            // ↑削除されたもの全て
            // break;
            default:
                return task;
            // break;
        }
    });
    const filterTasks2 = tasks.filter((task) => {
        if (filter === "all") {
            console.log("all!");

            return !task.remove;
        } else if (filter === "checked") {
            console.log("check!");
            return task.check && !task.remove;
        } else if (filter === "unchecked") {
            console.log("unchecked");
            return !task.check && !task.remove;
        } else if (filter === "remove") {
            console.log("remove");

            return task.remove;
        } else {
            console.log("該当なし");

            return task;
        }
    });

    return (
        <>
            <select
                defaultValue="all"
                onChange={(e) => setFilter(e.target.value as Filter)}
            >
                <option value="all">すべてのタスク</option>
                <option value="checked">完了したタスク</option>
                <option value="unchecked">現在のタスク</option>
                <option value="remove">ごみ箱</option>
            </select>
            {filter === "remove" ? (
                <button onClick={handleOnEmpty} disabled={tasks.filter((task) => task.remove).length === 0}>ゴミ箱を空にする</button>
            ) : (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        addTask();
                    }}
                >
                    <input
                        type="text"
                        value={text}
                        disabled={filter === "checked"}
                        onChange={(e) => handleOnChange(e)}
                    />
                    <input
                        type="submit"
                        value="submit"
                        onSubmit={addTask}
                        disabled={filter === "checked"}
                        className="submit"
                    />
                </form>
            )}
            <div>
                <p>現在のtext state実況中↓</p>
                <p>{text}</p>
            </div>
            <p>現在のTasksの中身↓</p>
            <ul>
                {filterTasks2.map((task) => {
                    return (
                        <li key={task.id}>
                            <input
                                type="checkbox"
                                checked={task.check}
                                disabled={task.remove}
                                onChange={() => handleOnCheck(task.id, task.check)}
                            />
                            <input
                                type="text"
                                value={task.task}
                                disabled={task.check || task.remove}
                                onChange={(e) => handleEditChange(task.id, e.target.value)}
                            />
                            <button onClick={() => handleOnRemove(task.id, task.remove)}>
                                {task.remove ? "復元" : "削除"}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

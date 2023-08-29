import React from "react";
import IconCross from "./icons/IconCross";
import IconCheck from "./icons/IconCheck";

const TodoItem = React.forwardRef(
    ({ todo, toggleTodo, removeTodo, ...props }, ref) => {
        const { id, title, completed } = todo;

        return (
            <article
                {...props}
                ref={ref}
                className="flex items-center gap-4 border-b-[1.5px] border-b-gray-300 px-4 py-4 transition-all duration-700 dark:border-b-gray-500 dark:bg-slate-800"
            >
                <button
                    className={`h-5 w-5 flex-none rounded-full border-2 ${
                        completed
                            ? "flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                            : "inline-block"
                    }`}
                    onClick={() => toggleTodo(id)}
                >
                    {completed && <IconCheck />}
                </button>
                <p
                    className={`flex-grow text-gray-700 dark:text-gray-400 ${
                        completed && "line-through"
                    }`}
                >
                    {title}
                </p>
                <button className="flex-none" onClick={() => removeTodo(id)}>
                    <IconCross />
                </button>
            </article>
        );
    }
);

export default TodoItem;

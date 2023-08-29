import { DragDropContext } from "@hello-pangea/dnd";

import { useEffect, useState } from "react";
import Header from "./components/Header";
import TodoComputed from "./components/TodoComputed";
import TodoCreate from "./components/TodoCreate";
import TodoFilter from "./components/TodoFilter";
import TodoList from "./components/TodoList";

const initialStateTodo = JSON.parse(localStorage.getItem("todos")) || [];

const sort = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const App = () => {
    const [todos, setTodos] = useState(initialStateTodo);

    useEffect(() => {
        localStorage.todos = JSON.stringify(todos);
    }, [todos]);

    const createTodo = (title) => {
        const newTodo = {
            id: Date.now(),
            title: title.trim(),
            completed: false,
        };

        setTodos([...todos, newTodo]);
    };

    const toggleTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const removeTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const countTodosLeft = todos.filter((todo) => !todo.completed).length;

    const clearCompleted = () => {
        setTodos(todos.filter((todo) => !todo.completed));
    };

    const [filter, setFilter] = useState("all");

    const changeFilter = (filter) => {
        setFilter(filter);
    };

    const filteredTodos = () => {
        switch (filter) {
            case "all":
                return todos;
            case "active":
                return todos.filter((todo) => !todo.completed);
            case "completed":
                return todos.filter((todo) => todo.completed);
            default:
                return todos;
        }
    };

    const handleDragEnd = (result) => {
        const { destination, source } = result;
        if (!destination) return;
        if (
            source.index === destination.index &&
            source.droppableId === destination.droppableId
        )
            return;

        setTodos((prevTodos) =>
            sort(prevTodos, source.index, destination.index)
        );
    };

    return (
        <div
            className="min-h-screen bg-gray-100 
        bg-[url('./assets/images/bg-mobile-light.jpg')] bg-contain bg-no-repeat transition-all duration-700 dark:bg-slate-900 
        dark:bg-[url('./assets/images/bg-mobile-dark.jpg')]
        md:bg-[url('./assets/images/bg-desktop-light.jpg')]
        md:dark:bg-[url('./assets/images/bg-desktop-dark.jpg')]"
        >
            <Header />
            <main className="container mx-auto mt-8 px-4 md:max-w-xl">
                <TodoCreate createTodo={createTodo} />

                <DragDropContext onDragEnd={handleDragEnd}>
                    <TodoList
                        todos={filteredTodos()}
                        toggleTodo={toggleTodo}
                        removeTodo={removeTodo}
                    />
                </DragDropContext>

                <TodoComputed
                    countTodosLeft={countTodosLeft}
                    clearCompleted={clearCompleted}
                />

                <TodoFilter changeFilter={changeFilter} filter={filter} />
            </main>

            <footer className="mt-8 text-center transition-all duration-700 dark:text-gray-400">
                Drag and drop to reorder list
            </footer>
        </div>
    );
};

export default App;

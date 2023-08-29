import { Droppable, Draggable } from "@hello-pangea/dnd";

import TodoItem from "./TodoItem";

const TodoList = ({ todos, toggleTodo, removeTodo }) => {
    return (
        <Droppable droppableId="todos">
            {(droppableProvided) => (
                <div
                    ref={droppableProvided.innerRef}
                    {...droppableProvided.droppableProps}
                    className="mt-8 overflow-hidden rounded-t-md bg-white transition-all duration-700 dark:bg-slate-800 "
                >
                    {todos.map((todo, index) => (
                        <Draggable
                            key={todo.id}
                            index={index}
                            draggableId={todo.id.toString()}
                        >
                            {(draggableProvided) => (
                                <TodoItem
                                    todo={todo}
                                    toggleTodo={toggleTodo}
                                    removeTodo={removeTodo}
                                    ref={draggableProvided.innerRef}
                                    {...draggableProvided.dragHandleProps}
                                    {...draggableProvided.draggableProps}
                                />
                            )}
                        </Draggable>
                    ))}
                    {droppableProvided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default TodoList;

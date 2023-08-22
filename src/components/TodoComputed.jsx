const TodoComputed = ({ countTodosLeft, clearCompleted }) => {
    return (
        <section className="flex justify-between rounded-b-md bg-white p-4 transition-all duration-700 dark:bg-slate-800">
            <span className="text-gray-500">{countTodosLeft} items left</span>
            <button className="text-gray-500" onClick={clearCompleted}>
                Clear completed
            </button>
        </section>
    );
};

export default TodoComputed;

import TodoForm from "./components/TodoForm";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../src/app/todoSlice";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  console.log(todos);
  const [task, setTask] = useState("");

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirm) {
      dispatch(deleteTodo(id));
      toast.error("deleted successfully");
    }
  };

  const handleUpdate = (id, title) => {
    setTask({ id, title });
  };

  return (
    <div className="w-10/12 md:w-1/2 lg:w-1/3 h-auto p-10 mt-10 text-stone-900 text-center mx-auto bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Todo List ★</h1>
      <TodoForm task={task} setTask={setTask} />
      <div className="mt-5">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex justify-between items-center border-b border-gray-300 py-2"
          >
            <p>{todo.title}</p>
            <div className="flex gap-3">
              <button
                className="text-red-500"
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </button>
              <button
                className="text-blue-500"
                onClick={() => handleUpdate(todo.id, todo.title)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer
        position="bottom-right"
        pauseOnHover={false}
        autoClose={2000}
        hideProgressBar={true}
        theme="colored"
        transition={Slide}
      />
    </div>
  );
}

export default App;

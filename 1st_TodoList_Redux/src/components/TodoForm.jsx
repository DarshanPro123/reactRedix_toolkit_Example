import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addTodo, updateTodo } from "../app/todoSlice";

const TodoForm = ({ task, setTask }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (task.id) {
      reset({ id: task.id, todo: task.title });
    }
  }, [task, reset]);

  const handleData = (data) => {
    if (task.id) {
      dispatch(
        updateTodo({
          id: task.id,
          title: data.todo,
        })
      );
      toast.info("Task updated successfully");
      setTask({});
    } else {
      dispatch(addTodo(data.todo));
      toast.success("Task added successfully");
    }
    reset({ id: "", todo: "" });
  };

  return (
    <form onSubmit={handleSubmit(handleData)}>
      <input
        className="w-10/12 md:w-1/2 lg:w-1/2 h-10 mt-5 px-4 py-2 border border-gray-300 "
        type="text"
        placeholder="Add a todo..."
        {...register("todo", { required: true })}
      />
      {errors.todo && (
        <div className="text-red-500">This field is required</div>
      )}
      <input
        type="submit"
        value={task.id ? "Update" : "Add"}
        className="border border-gray-700 bg-gray-600 hover:bg-gray-800 cursor-pointer text-gray-50 px-4 py-2 "
      />
    </form>
  );
};

export default TodoForm;

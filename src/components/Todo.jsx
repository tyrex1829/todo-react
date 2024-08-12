import { Input } from "antd";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrashCan,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";

function Todo() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const handleClick = () => {
    if (input.trim() !== "") {
      const newTodo = {
        id: uuidv4(),
        title: input,
      };
      setTodos([...todos, newTodo]);
    }
    setInput("");
  };

  const editTodo = (id, title) => {
    setEditMode(true);

    setEditId(id);
    setEditTitle(title);

    const findTodo = todos.find((i) => i.id === id);
    const updatedTitle = findTodo.title;
  };

  const updateTodo = () => {
    const updatedTodos = todos.map((i) => {
      if (i.id === editId) {
        return { ...i, title: editTitle };
      }
      return i;
    });

    setTodos(updatedTodos);
    setEditMode(false);
    setEditId(null);
    setEditTitle("");
  };

  const deleteTodo = (id) => {
    const UpdatedTodos = todos.filter((i) => i.id !== id);
    setTodos(UpdatedTodos);
  };

  return (
    <>
      <div className="bg-blue-600 max-w-screen-md mx-auto rounded-xl mt-8 px-12 py-6 shadow-xl text-slate-100 flex flex-col items-center gap-8">
        <h1 className="text-5xl font-black">Todo List</h1>
        <div className="flex flex-col gap-3 items-center max-w-full">
          <Input
            className=" w-96"
            placeholder="Todo..."
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />

          {editMode ? (
            <div className="flex gap-2 justify-center">
              <Input
                value={editTitle}
                onChange={(e) => {
                  setEditTitle(e.target.value);
                }}
              />
              <button
                className="py-1 px-2 bg-orange-300 hover:bg-orange-400 text-slate-700 shadow rounded"
                onClick={updateTodo}
              >
                <FontAwesomeIcon icon={faArrowsRotate} />
              </button>
            </div>
          ) : (
            <button
              className="py-2 px-4 bg-red-500 rounded-lg w-20 hover:bg-red-600 shadow-lg font-medium"
              onClick={handleClick}
            >
              Add
            </button>
          )}
        </div>
      </div>
      <ul className="mb-12">
        {todos.map((i) => (
          <li
            className="max-w-screen-md mx-auto rounded-xl mt-4 px-12 py-6 shadow-xl bg-slate-200 text-xl font-semibold flex justify-between items-center relative group"
            key={i.id}
          >
            <div className="relative w-full max-w-xs">
              <span className="truncate block">
                {i.title.length > 15 ? i.title.slice(0, 15) + "..." : i.title}
              </span>
              {i.title.length > 15 && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-200 text-black p-2 border  rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  {i.title}
                </div>
              )}
            </div>

            <div className="flex justify-between gap-5">
              <button
                onClick={() => {
                  editTodo(i.id, i.title);
                }}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
              <button
                onClick={() => {
                  deleteTodo(i.id);
                }}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todo;

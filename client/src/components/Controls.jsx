import React, { useContext, useState } from "react";
import { Modal } from "flowbite-react";
import { UserContext } from "../UserContext";
import {
  HiOutlineXCircle,
  HiCheckBadge,
  HiInformationCircle,
} from "react-icons/hi2";
import { MdOutlineWarning } from "react-icons/md";

const CreateTodo = () => {
  const [openModal, setOpenModal] = useState(false);
  const [clearModal, setClearModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { user, addTodo, clearCompletedTodos, showAlert } =
    useContext(UserContext);

  // Handling add todo
  const handleAdd = async () => {
    try {
      addTodo(user._id, title, description);
      setTitle("");
      setDescription("");
      showAlert({
        color: "green",
        icon: HiCheckBadge,
        title: "Todo added successfully",
        description: null,
      });
    } catch (error) {
      console.error(error);
      showAlert({
        color: "failure",
        icon: HiOutlineXCircle,
        title: "Failed to add todo",
        description: null,
      });
    }
  };

  // Handling clear completed todos
  const handleClear = async () => {
    try {
      const todos = user?.todos;
      if (todos.length === 0) {
        showAlert({
          color: "info",
          icon: HiInformationCircle,
          title: "No todos to clear!",
          description: null,
        });
        setClearModal(false);
        return;
      }
      const completedTodos = user?.todos?.filter(
        (todo) => todo.isCompleted === true,
      );
      if (completedTodos && completedTodos.length === 0) {
        showAlert({
          color: "warning",
          icon: MdOutlineWarning,
          title: "No completed todos to clear!",
          description: null,
        });
        setClearModal(false);
        return;
      }
      clearCompletedTodos(user._id);
      setClearModal(false);
      showAlert({
        color: "success",
        icon: HiCheckBadge,
        title: "Todos cleared successfully",
        description: null,
      });
    } catch (error) {
      console.error(error);
      showAlert({
        color: "failure",
        icon: HiOutlineXCircle,
        title: "Failed to clear todos",
        description: null,
      });
    }
  };

  return (
    <>
      <div className="font-supercell mb-4 mt-8 flex flex-row items-center justify-center space-x-2 px-2 tracking-wide lg:mb-8 lg:mt-20">
        <button
          onClick={() => setOpenModal(true)}
          className="flex rounded-md border-0 bg-blue-500 p-2 text-white hover:bg-blue-600 focus:border-0 focus:ring-0 md:p-3 lg:p-4"
        >
          <img
            src="/plus-icon.svg"
            alt=""
            className="size-4 md:size-5 lg:size-6"
          />
          <span className="pl-2 text-sm md:text-base lg:text-xl">Add Todo</span>
        </button>
        <button
          onClick={() => setClearModal(true)}
          className="flex rounded-md border-0 bg-blue-500 p-2 text-white hover:bg-blue-600 focus:border-0 focus:ring-0 md:p-3 lg:p-4"
        >
          <img src="/broom.svg" alt="" className="size-4 md:size-5 lg:size-6" />
          <span className="pl-2 text-sm md:text-base lg:text-xl">
            Clear Completed
          </span>
        </button>
      </div>
      <Modal
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}
        className="bg-slate-950 bg-opacity-90 pt-20 md:pt-0"
      >
        <Modal.Header className="font-supercell px-4 py-2 rounded-t-md bg-blue-500">
          <span className="text-white">Add new todo</span>
        </Modal.Header>
        <Modal.Body className="bg-blue-200 font-supercell">
          <form action="#">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="mb-4 w-full rounded-md border-2 border-gray-200 p-2 focus:outline-none focus:ring-0"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="mb-4 w-full resize-none rounded-md border-2 border-gray-200 p-2 focus:outline-none focus:ring-0"
            ></textarea>
          </form>
        </Modal.Body>
        <Modal.Footer className="bg-blue-200">
          <button
            className="font-supercell flex rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            type="submit"
            onClick={() => {
              handleAdd();
              setOpenModal(false);
            }}
          >
            Create
          </button>
          <button
            className="font-supercell flex rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={clearModal}
        onClose={() => setClearModal(false)}
        dismissible
        className="bg-slate-950 bg-opacity-90 pt-20 md:pt-0"
      >
        <Modal.Header className="font-supercell px-4 py-2 bg-blue-500">
          <span className="text-white">Clear todos</span>
        </Modal.Header>
        <Modal.Body className="bg-blue-200 font-supercell">
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-black">
              Are you sure you want to clear the completed todos?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                className="font-supercell rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                onClick={() => handleClear()}
              >
                Yes, Clear
              </button>
              <button
                className="font-supercell rounded-md bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600"
                onClick={() => setClearModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateTodo;

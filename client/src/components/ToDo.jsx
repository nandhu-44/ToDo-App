import React, { useContext, useState } from "react";
import { Modal } from "flowbite-react";
import { UserContext } from "../UserContext";
import { HiCheckBadge, HiOutlineXCircle } from "react-icons/hi2";
import { FaListCheck } from "react-icons/fa6";

const ToDo = ({ _id, title, description, isCompleted, createdAt }) => {
  const { user, editTodo, deleteTodo, showAlert } = useContext(UserContext);
  const [status, setStatus] = useState(isCompleted);
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  const [newTitle, setTitle] = useState(title);
  const [newDescription, setDescription] = useState(description);

  // Handling edit todo
  const handleEdit = async () => {
    const userId = user._id;
    const response = await editTodo(
      userId,
      _id,
      newTitle,
      newDescription,
      status,
    );
    if (response.status === 200) {
      setTitle(newTitle);
      setDescription(newDescription);
      showAlert({
        color: "success",
        icon: HiCheckBadge,
        title: "Todo updated successfully",
        description: null,
      });
    } else {
      showAlert({
        color: "failure",
        icon: HiOutlineXCircle,
        title: "Failed to update todo",
        description: null,
      });
    }
  };

  // Handling delete todo
  const handleDelete = async () => {
    const userId = user._id;
    const response = await deleteTodo(userId, _id);
    if (response.status === 200) {
      setTitle(newTitle);
      setDescription(newDescription);
      showAlert({
        color: "success",
        icon: HiCheckBadge,
        title: "Todo deleted successfully",
        description: null,
      });
    } else {
      showAlert({
        color: "failure",
        icon: HiOutlineXCircle,
        title: "Failed to delete todo",
        description: null,
      });
    }
  };

  // Handling complete todo
  const handleComplete = async () => {
    const userId = user._id;
    const response = await editTodo(
      userId,
      _id,
      newTitle,
      newDescription,
      !status,
    );
    if (response.status === 200) {
      setStatus(!status);
      showAlert({
        color: "success",
        icon: HiCheckBadge,
        title: "Todo updated successfully",
        description: null,
      });
    } else {
      showAlert({
        color: "failure",
        icon: HiOutlineXCircle,
        title: "Failed to update todo",
        description: null,
      });
    }
  };

  return (
    <div
      id={_id}
      className={`my-2 flex items-center justify-between rounded-md p-4 text-white ${
        status ? "bg-green-500" : "bg-blue-500"
      }`}
    >
      <div className="flex cursor-pointer flex-row justify-center">
        <FaListCheck className="m-1 size-4 md:m-2 md:size-5 lg:m-3 lg:size-6" />
        <div
          className={`flex flex-col ${status ? "line-through" : ""}`}
          onClick={() => setDetailsModal(true)}
        >
          <h1 className="font-supercell text-sm md:text-base lg:text-xl">
            {title}
          </h1>
          <p className="text-xs font-light italic text-gray-200">
            (Tap to view)
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <button
          className="m-1 rounded-md bg-amber-500  p-[5px] text-white lg:p-2"
          onClick={() => setShowModal(true)}
        >
          <img
            src="/pencil-icon.svg"
            className="size-4 md:size-5 lg:size-6"
            alt=""
          />
        </button>
        <button
          className="rounded-md bg-red-500 p-[5px] text-white lg:p-2"
          onClick={() => setDeleteModal(true)}
        >
          <img
            src="/dustbin.svg"
            className="size-4 md:size-5 lg:size-6"
            alt=""
          />
        </button>
        <input
          type="checkbox"
          name="completed"
          checked={status}
          onChange={handleComplete}
          className="m-3 size-4 rounded-sm border-0 bg-white p-2 ring-0 focus:border-0 focus:accent-green-400 focus:outline-none focus:ring-0 md:size-5 lg:size-6"
        />
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        dismissible
        className="bg-slate-950 bg-opacity-90 pt-20 md:pt-0"
      >
        <Modal.Header className="font-supercell rounded-t-md bg-blue-500 px-4 py-2">
          <span className="text-white">Edit Todo</span>
        </Modal.Header>
        <Modal.Body className="bg-blue-200">
          <form action="#">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="font-supercell mb-4 w-full rounded-md border-2 border-gray-600 p-2 focus:outline-none focus:ring-0"
            />
            <textarea
              value={newDescription}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="font-supercell mb-4 w-full resize-none rounded-md border-2 border-gray-600 p-2 focus:outline-none focus:ring-0"
            ></textarea>
          </form>
        </Modal.Body>
        <Modal.Footer className="rounded-b-md bg-blue-200">
          <button
            className="font-supercell flex rounded-md bg-amber-500 px-4 py-2 text-white hover:bg-amber-600"
            type="submit"
            onClick={() => {
              handleEdit();
              setShowModal(false);
            }}
          >
            Update
          </button>
          <button
            className="font-supercell flex rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            onClick={() => {
              setShowModal(false);
              setTitle(title);
            }}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={deleteModal}
        onClose={() => setDeleteModal(false)}
        dismissible
        className="bg-slate-950 bg-opacity-90 pt-20 md:pt-0"
      >
        <Modal.Header className="font-supercell rounded-t-md bg-blue-500 px-4 py-2">
          <span className="text-red-700">
            Delete <span className="text-white">"{title}" ?</span>
          </span>
        </Modal.Header>
        <Modal.Body className="rounded-b-md bg-blue-200">
          <div className="text-center">
            <h3 className="font-supercell mb-5 text-lg font-normal">
              Are you sure you want to delete "{title}" ?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                className="font-supercell rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                onClick={handleDelete}
              >
                Confirm
              </button>
              <button
                className="font-supercell rounded-md bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600"
                onClick={() => setDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={detailsModal}
        onClose={() => setDetailsModal(false)}
        dismissible
        className="bg-slate-950 bg-opacity-90 pt-20 md:pt-0"
      >
        <Modal.Header className="font-supercell rounded-t-md bg-blue-500 px-4 py-2">
          <span className="text-white">{title}</span>
        </Modal.Header>
        <Modal.Body className="rounded-b-md bg-blue-200">
          <div className="container">
            <h3 className="font-supercell mb-5 text-lg font-normal">
              {description}
            </h3>
            <p className="font-supercell py-2 text-xs md:text-sm lg:text-base font-thin text-gray-600">
              {createdAt
                ? `Created on ` + extractDateData(createdAt)
                : "Created at : N/A"}
            </p>
            <button
              className="font-supercell rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              onClick={() => setDetailsModal(false)}
            >
              Close
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

const extractDateData = (date) => {
  const newDate = new Date(date);
  const month = newDate.toLocaleString("default", { month: "long" });
  const day = newDate.getDate();
  const year = newDate.getFullYear();
  const time = newDate.toLocaleTimeString();
  return `${month} ${day}, ${year} at ${time}`;
};

export default ToDo;

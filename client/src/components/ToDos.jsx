import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import ToDo from "./ToDo";

const ToDos = () => {
  const { user } = useContext(UserContext);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setTodos(user?.todos);
  }, [user]);

  return (
    <div className="flex flex-col-reverse px-3 md:px-12 lg:px-56">
      {todos?.map((todo) => (
        <ToDo
          key={todo._id}
          _id={todo._id}
          title={todo.title}
          description={todo.description}
          isCompleted={todo?.isCompleted}
          createdAt={todo?.createdAt}
        />
      ))}
    </div>
  );
};

export default ToDos;

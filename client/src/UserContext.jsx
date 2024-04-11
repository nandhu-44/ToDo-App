import { createContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const remember = localStorage.getItem("remember");
    const userData = remember ? localStorage.getItem("user") : sessionStorage.getItem("user");
    if (userData) {
      setIsAuth(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  // User Handling

  // Login
  const login = async (email, password, remember) => {
    const response = await axios.post(`${backendURL}/api/users/login`, {
      email,
      password,
    });

    const data = response.data;
    if (remember) {
      localStorage.setItem("remember", true);
    }
    if (data.status === 200) {
      setIsAuth(true);
      setUser(data.user);
      remember
        ? localStorage.setItem("user", JSON.stringify(data.user))
        : sessionStorage.setItem("user", JSON.stringify(data.user));
    }
    return data;
  };

  // Register
  const register = async (name, email, password) => {
    const response = await axios.post(`${backendURL}/api/users/register`, {
      name,
      email,
      password,
    });
    const data = response.data;
    if (data.status === 201) {
      setIsAuth(true);
      setUser(data.user);
      const remember = localStorage.getItem("remember");
      remember
        ? localStorage.setItem("user", JSON.stringify(data.user))
        : sessionStorage.setItem("user", JSON.stringify(data.user));
    }
    return data;
  };

  // Logout
  const logout = () => {
    setIsAuth(false);
    setUser(null);
    const remember = localStorage.getItem("remember");
    remember
      ? localStorage.removeItem("user")
      : sessionStorage.removeItem("user");
    localStorage.removeItem("remember");
  };

  // Forgot Password
  const forgotPassword = async (email) => {
    const response = await axios.post(
      `${backendURL}/api/users/forgot-password`,
      { email },
    );
    return response?.data;
  };

  // Check Reset Token
  const checkResetToken = async (userId, resetToken) => {
    const response = await axios.post(
      `${backendURL}/api/users/check-reset-token`,
      { userId, resetToken },
    );
    return response?.data;
  };

  // Reset Password
  const resetPassword = async (userId, resetToken, password) => {
    const response = await axios.post(
      `${backendURL}/api/users/reset-password`,
      { userId, resetToken, password },
    );
    return response?.data;
  };

  // Todo Handling

  // Add Todo
  const addTodo = async (userId, title, description) => {
    const response = await axios.post(`${backendURL}/api/todos/addTodo`, {
      userId,
      title,
      description,
    });
    const data = response.data;
    if (data.status === 201) {
      setUser(data.user);
      const remember = localStorage.getItem("remember");
      remember
        ? localStorage.setItem("user", JSON.stringify(data.user))
        : sessionStorage.setItem("user", JSON.stringify(data.user));
    }
    return data;
  };

  // Edit Todo
  const editTodo = async (userId, todoId, title, description, isCompleted) => {
    const response = await axios.put(`${backendURL}/api/todos/editTodo`, {
      userId,
      todoId,
      title,
      description,
      isCompleted,
    });
    const data = response.data;
    if (data.status === 200) {
      setUser(data.user);
      const remember = localStorage.getItem("remember");
      remember
        ? localStorage.setItem("user", JSON.stringify(data.user))
        : sessionStorage.setItem("user", JSON.stringify(data.user));
    }
    return data;
  };

  // Delete Todo
  const deleteTodo = async (userId, todoId) => {
    const response = await axios.delete(`${backendURL}/api/todos/deleteTodo`, {
      data: {
        userId,
        todoId,
      },
    });
    const data = response.data;
    if (data.status === 200) {
      setUser(data.user);
      const remember = localStorage.getItem("remember");
      remember
        ? localStorage.setItem("user", JSON.stringify(data.user))
        : sessionStorage.setItem("user", JSON.stringify(data.user));
    }
    return data;
  };

  // Clear Completed Todos
  const clearCompletedTodos = async (userId) => {
    const response = await axios.delete(
      `${backendURL}/api/todos/clearCompletedTodos`,
      {
        data: {
          userId,
        },
      },
    );
    const data = response.data;
    if (data.status === 200) {
      setUser(data.user);
      const remember = localStorage.getItem("remember");
      remember
        ? localStorage.setItem("user", JSON.stringify(data.user))
        : sessionStorage.setItem("user", JSON.stringify(data.user));
    }
    return data;
  };

  // Alert Component Handling

  const [alertData, setAlertData] = useState({});

  const showAlert = ({ color, icon, title, description, timeout = 1500 }) => {
    setAlertData({ color, icon, title, description, show: true });
    setTimeout(() => {
      setAlertData({});
    }, timeout);
  };

  return (
    <UserContext.Provider
      value={{
        login,
        register,
        logout,
        isAuth,
        user,
        setIsAuth,
        setUser,
        addTodo,
        editTodo,
        deleteTodo,
        clearCompletedTodos,
        alertData,
        showAlert,
        forgotPassword,
        checkResetToken,
        resetPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

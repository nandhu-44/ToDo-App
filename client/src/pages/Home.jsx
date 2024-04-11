import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import Header from "../components/Header";
import CreateTodo from "../components/Controls";
import ToDos from "../components/ToDos";
import AlertComponent from "../components/AlertComponent";

const Home = () => {
  window.scrollTo(0, 0);
  const { alertData } = useContext(UserContext);
  return (
    <>
      <Header />
      {alertData.show && <AlertComponent {...alertData} />}
      <CreateTodo />
      <ToDos />
    </>
  );
};

export default Home;

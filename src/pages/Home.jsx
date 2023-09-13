import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Context, server } from "../main";
import TodoItems from "../components/TodoItems";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [title, SetTitle] = useState("");
  const [Description, SetDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const { isAuthenticated } = useContext(Context);

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      setRefresh(!refresh);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/task/${id}`, {
        withCredentials: true,
      });
      setRefresh(!refresh);

      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${server}/task/new`,
        { title, description: Description },
        { withCredentials: true }
      );
      toast.success(data.message);
      setLoading(false);
      setRefresh(!refresh);
      SetDescription("");
      SetTitle("");
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${server}/task/mytask`, {
        withCredentials: true,
      })
      .then((res) => setTasks(res.data.task))
      .catch((e) => toast.error(e.response.data.message));
  }, [refresh]);

  if(!isAuthenticated) return <Navigate to={"/login"}/>;

  return (
    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={submitHandler}>
            <input
              value={title}
              onChange={(e) => SetTitle(e.target.value)}
              type="text"
              placeholder="Title"
              required
            />
            <input
              value={Description}
              onChange={(e) => SetDescription(e.target.value)}
              type="text"
              placeholder="Description "
              required
            />
            <button disabled={loading} type="submit">
              Add Task
            </button>
          </form>
        </section>
      </div>
      <section className="todosContainer">
        {tasks.map((i) => (
          <TodoItems
            key={i._id}
            title={i.title}
            description={i.description}
            isCompleted={i.isCompleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            id={i._id}
          />
        ))}
      </section>
    </div>
  );
};

export default Home;

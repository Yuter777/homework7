import React, { useState } from "react";
import fetchData from "./api";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [dataType, setDataType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDataByType = async (type) => {
    setLoading(true);
    try {
      const result = await fetchData(type);
      setData(result);
      setDataType(type);
    } catch (error) {
      setError(
        "Maʼlumotlarni olishda xatolik yuz berdi. Iltimos keyinroq qayta urinib ko'ring."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="box-user">
        <h1 className="text-user">USERS</h1>
        <div className="buttons">
          <button onClick={() => fetchDataByType("posts")}>Posts</button>
          <button onClick={() => fetchDataByType("todos")}>Todos</button>
          <button onClick={() => fetchDataByType("albums")}>Albums</button>
        </div>
      </div>
      {loading ? (
        <div className="loader"></div>
      ) : // <img
      //   className="loader"
      //   src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
      // />
      error ? (
        <p>{error}</p>
      ) : (
        <div className="data">
          <h2 className="data-type">
            {dataType
              ? dataType.charAt(0).toUpperCase() + dataType.slice(1)
              : ""}
          </h2>
          <div className="card">
            <ul>
              {data.map((item) => (
                <li key={item.id}>
                  {dataType === "posts" && (
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  )}
                  {dataType === "todos" && (
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.completed ? "Completed" : "Not Completed"}</p>
                    </div>
                  )}
                  {dataType === "albums" && (
                    <div>
                      <h3>{item.title}</h3>
                      <p>User ID: {item.userId}</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

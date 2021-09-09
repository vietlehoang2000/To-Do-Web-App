import React, { useState, useEffect } from "react";

import Items from "./items";
import Search from "./search";
import { Tasks } from "../../utilities/data/task";
import NewTask from "../new-tasks/new-item";

import "./home.css";

export default function Home() {
  const [appPage, setAppPage] = useState("home");
  const [checkStatus, setCheckStatus] = useState(false);
  const [tasks, setTasks] = useState([]);

  let data = JSON.parse(localStorage.getItem("data") || "[]");

  function identifyCheckBoxStatus() {
    if (
      tasks.some((item) => {
        return item.isChecked === true;
      })
    ) {
      setCheckStatus(true);
    } else {
      setCheckStatus(false);
    }
  }

  function prioritizeTasks(chosenData) {
    for (let i = 0; i < chosenData.length; i++) {
      for (let x = 0; x < chosenData.length; x++) {
        if (
          new Date(chosenData[i].dueDate.split(" ")[0].replace(/-/g, "/")) <
          new Date(chosenData[x].dueDate.split(" ")[0].replace(/-/g, "/"))
        ) {
          let flag = chosenData[i];
          chosenData[i] = chosenData[x];
          chosenData[x] = flag;
        }
      }
    }
    identifyCheckBoxStatus();
    localStorage.setItem("data", JSON.stringify(chosenData));
    setTasks(chosenData);
  }

  useEffect(() => {
    if (data.length === 0) {
      prioritizeTasks(Tasks);
      localStorage.setItem("data", JSON.stringify(Tasks));
    } else {
      prioritizeTasks(data);
    }
  }, []);

  function returnCheckBox() {
    let refTasks = [...tasks];
    refTasks.map((refItem) => {
      refItem.isChecked = false;
      return null;
    });
    prioritizeTasks(refTasks);
    setCheckStatus(false);
  }

  function removeMultipleTasks() {
    let refTasks = [...tasks];
    refTasks.map((refItem) => {
      if (refItem.isChecked === true) {
        const currentTime = new Date();
        refItem.deletedAt = currentTime;
      }
      return null;
    });
    prioritizeTasks(refTasks);
  }

  return (
    <>
      {appPage === "home" ? (
        <div className="home">
          <div className="items-list">
            <h1>To Do List</h1>
            <button
              className="btn btn__md btn--new"
              onClick={() => setAppPage("newItem")}
            >
              Add new task
            </button>
            <Search prioritizeTasks={prioritizeTasks} setTasks={setTasks} tasks={tasks}></Search>
            {tasks.map((item) => {
              if (item.deletedAt === "") {
                return (
                  <Items
                    prioritizeTasks={prioritizeTasks}
                    key={item.id}
                    setTasks={setTasks}
                    tasks={tasks}
                    item={item}
                    checkStatus={checkStatus}
                  ></Items>
                );
              }
              return null;
            })}
          </div>
          <div className={`bulk-remove ${checkStatus}`}>
            <h4>Bulk Action:</h4>
            <div>
              <button
                className="btn btn__md btn--done"
                style={{ marginRight: "15px" }}
                onClick={() => returnCheckBox()}
              >
                Done
              </button>
              <button
                className="btn btn__md btn--remove"
                onClick={() => removeMultipleTasks()}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <NewTask prioritizeTasks={prioritizeTasks} tasks={tasks} setAppPage={setAppPage} setTasks={setTasks}></NewTask>
      )}
    </>
  );
}

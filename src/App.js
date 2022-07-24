import "./App.css";
import { useState } from "react";

function App() {
  const [task, setTask] = useState(""); //'task' est une tache a ajouter
  const [taskList, setTaskList] = useState([]); //'taskList' est un ensemble donnée associées à chaque 'task', on appelera cet ensemble 'tasko'"
  const [input, setInput] = useState("");
  const [darktheme, setDarktheme] = useState(false);
  const searchedTaskList = taskList.filter(
    (tasko) => tasko[1].indexOf(input) >= 0
  );

  //un 'tasko' est un tableau, contenant [0]=>l'index du 'tasko'
  //                                   [1]=>une task sous forme de string
  //                                   [2]=>un Boolean correspondant a "l'état" de la checkbox
  //ci-dessous, la fonction qui push un 'tasko' dans la 'taskList'
  const handleSubmit = (event) => {
    event.preventDefault();
    const checkTask = (tasko) => {
      return tasko[1] === task;
    };
    if (taskList.length === 0 || taskList.find(checkTask) === undefined) {
      const coptaskList = [...taskList];
      coptaskList.unshift([taskList.length, task]);
      const steptaskList = [];
      coptaskList.map((tasko, index) => {
        steptaskList.push([index, tasko[1], tasko[2] || false]);
      });
      setTaskList(steptaskList);
    } else {
      alert("tache déja enregistrée");
    }
  };
  //ci-dessous, la fonction qui enregistre le nom d'une 'task'
  const handleTaskChange = (event) => {
    const value = event.target.value;
    setTask(value);
  };
  //ci-dessous, la fonction qui modifie les paramètres true/false des checkboxs et
  //la position de leur 'tasko' respectif dans la 'taskList'
  const checker = (index) => {
    const checkList = [...taskList];
    checkList[index].splice(2, 1, !checkList[index][2]);
    if (!checkList[index][2]) {
      let stepTasko = checkList.filter((tasko) => tasko[0] === index);
      checkList.splice(stepTasko[0][0], 1);
      checkList.unshift(stepTasko[0]);
      checkList.map((tasko, index) => {
        tasko.splice(0, 1, index);
      });
      setTaskList(checkList);
    } else if (checkList[index][2]) {
      let stepTasko = checkList.filter((tasko) => tasko[0] === index);
      checkList.splice(stepTasko[0][0], 1);
      checkList.push(stepTasko[0]);
      checkList.map((tasko, index) => {
        tasko.splice(0, 1, index);
      });
      setTaskList(checkList);
    }
  };
  //ci-dessous, la fonction qui supprime un 'tasko' de la 'tasklist'
  const deleter = (task) => {
    const coptaskList = [...taskList];
    coptaskList.map((tasko, index) => {
      task === tasko[1] && coptaskList.splice(index, 1);
    });
    coptaskList.map((tasko, index) => {
      tasko.splice(0, 1, index);
    });
    setTaskList(coptaskList);
  };
  //eeet zééé baartiiii!!!
  return (
    <body className={!darktheme ? "daytheme" : "darktheme"}>
      <main className="App">
        <h1>To Do List</h1>
        <section className="allTasks">
          <div className="scrollable">
            {searchedTaskList.length === 0 ? (
              <p>Nofing toudou 😕</p>
            ) : (
              searchedTaskList.map((tasko, index) => {
                return (
                  //une div('tasko') composé dune check box, d'un <p> contenant la 'task' et un bouton "suprimer"
                  <div
                    className={tasko[2] ? "taskDone" : "taskToDo"}
                    key={index}
                  >
                    <input //la checkbox
                      className="checkbox"
                      checked={taskList[index][2]}
                      type="checkbox"
                      onChange={() => {
                        checker(index);
                      }}
                    />
                    <p className="task">{tasko[1]}</p>
                    <button
                      className="trash" //suprime le 'tasko'
                      onClick={() => {
                        tasko[2] === true //ne permet la supression que si la 'task' est "accomplie"
                          ? deleter(tasko[1])
                          : alert("cette tache n'est pas accomplitte");
                      }}
                    >
                      <i class="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </section>
        <section className="menu">
          <button className="ghost"></button>
          <div className={darktheme ? "listendark" : "listen"}>
            <article className="taskAddHolder">
              <form className="taskAdder" onSubmit={handleSubmit}>
                <input
                  className="textincome"
                  name="tasktoadd"
                  type="text"
                  value={task}
                  placeholder="add a task here"
                  onChange={handleTaskChange}
                />
                <input
                  className="add" //créé un 'tasko' a partir d'une 'task' et le push dans la 'taskList'
                  type="submit"
                  value="+"
                />
              </form>
            </article>
            <article className="searchbar">
              <input
                className="textincome"
                name="search"
                type="text"
                placeholder="vous recherchez une tache?"
                value={input}
                onChange={(event) => {
                  setInput(event.target.value);
                }}
              />
              <p className="loupe">
                <i class="fa-solid fa-magnifying-glass"></i>
              </p>
            </article>
          </div>
          <div className="theme">
            <img src="./themebackground.jpeg" />
            <article className="themebar">
              <button
                className={darktheme ? "darkthemecommand" : "themecommand"}
                onClick={() => {
                  setDarktheme(!darktheme);
                }}
              ></button>
            </article>
          </div>
        </section>
      </main>
      <footer></footer>
    </body>
  );
}

export default App;

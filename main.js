
//held the selctors

let input= document.querySelector(".input");
let submit= document.querySelector(".add");
let tasksDiv= document.querySelector(".tasks");

//empty array to store tasks
arrayOfTasks= [];





//check if there a data in the local storage

if(window.localStorage.getItem("tasks")){
  arrayOfTasks= JSON.parse(window.localStorage.getItem("tasks"));
}

//get data from local storage
getDataFromLocalStorage();

// add task

submit.onclick=function(event){
  event.preventDefault();
  if(input.value!==""){
    addTaskToArray(input.value) // add task to array
  }
  input.value="";
}

// click on task element

  tasksDiv.addEventListener("click", (e)=>{
    //delete
    if(e.target.classList.contains("del")){
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.remove();
    }
    //update
    if(e.target.classList.contains("task")){
      toggleStatusTaskWith(e.target.getAttribute("data-id"))
      e.target.classList.toggle("done");
    }
  }) 


function addTaskToArray(tasksText){
  // task data
  const task={
    id: Date.now(),
    title:tasksText,
    completed: false,
  };
  // push tasks to array of tasks
  arrayOfTasks.push(task);

  //add elements to page

  addElementsToPageFrom(arrayOfTasks);

    //add tasks to local storage

  addTasksToLocalStorageFrom(arrayOfTasks);

};

function addElementsToPageFrom(arrayOfTasks){
  //empty tasks div
  tasksDiv.innerHTML="";

  arrayOfTasks.forEach((task) => {
    //create main div
    let div= document.createElement("div");
    tasksDiv.appendChild(div);
    div.className="task";
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    let span = document.createElement("span");
    span.className= "del";
    span.appendChild(document.createTextNode("Delete"));
    div.append(span);
  });
}


function addTasksToLocalStorageFrom(arrayOfTasks){
  window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks))
}


function getDataFromLocalStorage(){
  let data= window.localStorage.getItem("tasks");
  if(data){
    let tasks= JSON.parse(data);
    addElementsToPageFrom(tasks)
  }
}

function deleteTaskWith(taskId){
  arrayOfTasks= arrayOfTasks.filter((task)=> task.id != taskId);
  addTasksToLocalStorageFrom(arrayOfTasks);
}


function toggleStatusTaskWith(taskId){
  for(let i=0; i< arrayOfTasks.length; i++){
    if(arrayOfTasks[i].id=== taskId){
      arrayOfTasks[i].completed== false? ( arrayOfTasks[i].completed= true) : (arrayOfTasks[i].completed= false);
    }
  }
  addTasksToLocalStorageFrom(arrayOfTasks)
}
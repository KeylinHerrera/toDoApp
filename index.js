//TO DO APP
import yo from 'yo-yo'
import uuid from 'uuid'

var state = [];
var el = list(state, add)
 
function list (items, onclick) {
  var input = yo`<input type="text" id="todoVal">`
  return yo`<div>
    <h1> To Do App</h1>
    ${input}
    <button id="addTodoButt" onclick=${onclick}>Add New Activity</button>
    <h4>To Do</h4>
    <ul>
      ${items.filter(function(el, i) {
      return el.status !== 'done';
      }).map(function (item) {
        return yo`<li id="${item.id}">${item.value}<button onclick=${done}>Done</button></li>`
      })}
    </ul>
    <h4>Done</h4>
    <ul>
      ${items.filter(function(el, i) {
      return el.status !== 'pending';
      }).map(function (item) {
        return yo`<li id="${item.id}">${item.value}<button onclick=${deleteToDo}>Done</button></li>`
      })}
    </ul>
  </div>`
}

function add () {
  //Random ID
  var num = uuid()

  //Object todo
  var todo = {};
    todo.id = uuid();
    todo.value = document.getElementById('todoVal').value;
    todo.status = 'pending';
    state = [
      ...state,
      todo
    ];

  //Construct a New List
  var newList = list(state, add)
  yo.update(el, newList)
}
 
function done (ev) {
  //Add Random ID
  var id = ev.target.parentNode.getAttribute('id')
    state.map(function(item) {
      console.log(state)
      if (item.id == id){
        item.status = 'done';
      }
    });

 var newList = list(state, add)
  yo.update(el, newList)
}

function deleteToDo (ev) {
  //Add Random ID
  var id = ev.target.parentNode.getAttribute('id')
    state = state.filter(function(el, i) {
      return id !== el.id;
    });

  //Construct a New List
  var newList = list(state, add)
  yo.update(el, newList)
}

document.body.appendChild(el)
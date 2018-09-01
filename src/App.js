import React, { Component } from 'react';
import TaskList from './TaskList'
import TaskPanel from './TaskPanel'
import TaskFilters from './TaskFilters'
import logo from './fanicn.png'
import './app.css';

const handleIndex = (idx,len,inc) => {
  let newIdx = idx + inc;
  if (newIdx > len - 1) {
    return newIdx - len
  } else if (newIdx < 0) {
    return len + newIdx
  } else {
    return newIdx
  }
}

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      tasks: {
        'task-1': {id:'task-1',text:'Eat',completed:false},
        'task-2': {id:'task-2',text:'Run',completed:false},
        'task-3': {id:'task-3',text:'Code',completed:false},
        'task-4': {id:'task-4',text:'Clean',completed:false}
      },
      taskOrder: ['task-1','task-2','task-3','task-4'],
      input: '',
      taskCount: 4,
      selectedTask: 'task-1',
      doneFilter: 'All'
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.selectTask = this.selectTask.bind(this)
    this.toggleCompleted = this.toggleCompleted.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
    this.changeDoneFilter = this.changeDoneFilter.bind(this)
    this.changeTaskName = this.changeTaskName.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    // console.log(document.getElementById("inputfield").value)
    if (this.state.input !== '') {
      let oldState = this.state;
      let newState = oldState
      newState.taskCount += 1
      let newId = 'task-' + newState.taskCount.toString()
      newState.taskOrder = newState.taskOrder.concat([newId])
      newState.tasks[newId] = {id: newId, text: this.state.input,completed:false}
      newState.input = ''
      this.setState(newState)
    }
  }

  handleChange(e) {
    this.setState({input: e.target.value})
  }

  changeTaskName(e) {
    let newState = this.state
    newState.tasks[newState.selectedTask].text = e.target.value
    this.setState(newState)
  }

  selectTask(id) {
    this.setState({selectedTask: id});
  }

  toggleCompleted(id) {
    let newState = this.state;
    newState.tasks[id].completed = !newState.tasks[id].completed
    this.setState(newState);
    console.log(this.state.tasks)
  }

  deleteTask(id) {
    let newState = this.state;
    delete newState.tasks[id];
    newState.taskOrder = newState.taskOrder.filter((t)=>t !== id)
    this.setState(newState)
    console.log(newState.tasks)
    console.log(newState.taskOrder)
  }

  changeDoneFilter(f) {
    this.setState({doneFilter: f})
  }

  handleKeys(e) {
    // console.log(e.key)
    if (document.getElementById("inputfield") != document.activeElement) {

    if (e.key == "ArrowUp") {
      let oldIndex = this.state.taskOrder.indexOf(this.state.selectedTask)
      // let newIndex = oldIndex - 1;
      let newIndex = handleIndex(oldIndex,this.state.taskOrder.length,-1)
      let newOrder = this.state.taskOrder.slice(0);
      newOrder.splice(oldIndex,1)
      newOrder.splice(newIndex,0,this.state.selectedTask)
      // console.log(newOrder)
      // console.log(this.state.taskOrder)
      this.setState({taskOrder: newOrder})
    } else if (e.key=="ArrowDown") {
      let oldIndex = this.state.taskOrder.indexOf(this.state.selectedTask)
      let newIndex = handleIndex(oldIndex,this.state.taskOrder.length,1)
      let newOrder = this.state.taskOrder.slice(0);
      newOrder.splice(oldIndex,1)
      newOrder.splice(newIndex,0,this.state.selectedTask)
      // console.log(newOrder)
      // console.log(this.state.taskOrder)
      this.setState({taskOrder: newOrder})
    } else if (e.key == "x" || e.key == "Backspace") {
      this.deleteTask(this.state.selectedTask)
    } else if (e.key == "c") {
      this.toggleCompleted(this.state.selectedTask)
    } else if (e.key == "j") {
      let newSelectedTask = this.state.taskOrder[handleIndex(this.state.taskOrder.indexOf(this.state.selectedTask),this.state.taskOrder.length,1)]
      this.setState({selectedTask: newSelectedTask})
    } else if (e.key == "k") {
      let newSelectedTask = this.state.taskOrder[handleIndex(this.state.taskOrder.indexOf(this.state.selectedTask),this.state.taskOrder.length,-1)]
      this.setState({selectedTask: newSelectedTask})
    } else {
      document.getElementById("inputfield").focus()
    }
  }
  }

  componentWillMount(){
    document.addEventListener('keydown', this.handleKeys.bind(this))
}

  render() {
    // document.addEventListener('keyup', this.handleKeys.bind(this))
    // console.log(this.state.taskOrder)
    return (
      <div className="App">
        <div className="listColumn taskFilter">
          <TaskFilters changeDoneFilter={this.changeDoneFilter} doneFilter={this.state.doneFilter}/>
        </div>
        <div className="listColumn taskList">
        <img src={logo} height="60" width="60"/><br/>
            <form onSubmit={this.handleSubmit} >
              <input id="inputfield" onChange={this.handleChange} value={this.state.input}></input>
            </form>
            <TaskList taskOrder = {this.state.taskOrder} tasks={this.state.tasks} selectedTask={this.state.selectedTask} selectTask = {this.selectTask} doneFilter = {this.state.doneFilter}/>
        </div>
        <div className="listColumn">
          <h2 className="columnTitle">ⓘ</h2>
          <TaskPanel selectedTask={this.state.selectedTask} toggleCompleted={this.toggleCompleted} deleteTask={this.deleteTask} taskInfo = {this.state.tasks[this.state.selectedTask]} changeTaskName={this.changeTaskName}/>
        </div>
      </div>
    );
  }
}

export default App;

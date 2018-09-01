import React, { Component } from 'react';
import TaskItem from './TaskItem'
import './app.css'

class TaskList extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let filteredtasks = [];
    if (this.props.doneFilter == "Open") {
      filteredtasks = this.props.taskOrder.filter((t)=>this.props.tasks[t].completed==false)
    } else if (this.props.doneFilter == "Done") {
      filteredtasks = this.props.taskOrder.filter((t)=>this.props.tasks[t].completed==true)
    } else {
      filteredtasks = this.props.taskOrder
    } 

    const taskdivs = filteredtasks.map((t) => <TaskItem text={this.props.tasks[t].text} key={t} selectedTask = {this.props.selectedTask} selectTask = {this.props.selectTask} id={t} completed={this.props.tasks[t].completed}/>)
    return (
      <div>{taskdivs}</div>
    )
  }
}

export default TaskList;
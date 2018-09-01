import React, { Component } from 'react';

class TaskItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let taskClass = ""
    if (this.props.selectedTask == this.props.id) {
      taskClass = "taskItemSelected"
    } else {
      taskClass = "taskItem"
    }
    if (this.props.completed == true) {
      taskClass += " completedTask"
    }

    return (
      <div className={taskClass} onClick = {()=>this.props.selectTask(this.props.id)}>{this.props.text}</div>
    )
  }
}

export default TaskItem;
import React, { Component } from 'react';

class TaskPanel extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    try {
      return (
        <div className="taskPanel">
          <div><input value={this.props.taskInfo.text} onChange={this.props.changeTaskName}></input></div>
          <div>ID: {this.props.selectedTask}</div>
          <div className="panelRow">
            <button className="controlButton" onClick={()=>this.props.toggleCompleted(this.props.selectedTask)}>✓</button><button className="controlButton" onClick={()=>this.props.deleteTask(this.props.selectedTask)}>X</button>
          </div>
        </div>
      )
    } catch (error) {
      return (
        <div className="taskPanel">
          <div><input value="" onChange={this.props.changeTaskName}></input></div>
          <div>ID: {this.props.selectedTask}</div>
          <div className="panelRow">
            <button className="controlButton" onClick={()=>this.props.toggleCompleted(this.props.selectedTask)}>✓</button><button className="controlButton" onClick={()=>this.props.deleteTask(this.props.selectedTask)}>X</button>
          </div>
        </div>
      )
    }

  }
}

export default TaskPanel;
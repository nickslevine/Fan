import React, { Component } from 'react';

class TaskFilters extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="filters">
        <div onClick={()=>this.props.changeDoneFilter("All")} className={this.props.doneFilter == "All" ? "selectedFilter": ""}>All</div>
        <div onClick={()=>this.props.changeDoneFilter("Open")} className={this.props.doneFilter == "Open" ? "selectedFilter": ""}>Open</div>
        <div onClick={()=>this.props.changeDoneFilter("Done")} className={this.props.doneFilter == "Done" ? "selectedFilter": ""}>Done</div>
      </div>
    )
  }
}

export default TaskFilters;
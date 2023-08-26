import React, { Component } from "react";
import Cell from "./../Cell";

export default class index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const ListCell = this.props.rowValue.map((item, index) => {
      return (
        <Cell
          handleChangeNumber={this.props.handleChangeNumber}
          key={index + "-" + item.val}
          disabled={item.fixed}
          value={item.val}
          x={this.props.x}
          y={index}
          color={item.color}
          bgColor={item.bgColor}
        ></Cell>
      );
    });

    return <div className="row">{ListCell}</div>;
  }
}

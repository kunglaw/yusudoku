import React, { Component } from "react";
import "./Cell.css";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };

    this.handleChangeCellText = this.handleChangeCellText.bind(this);
  }

  componentDidMount() {
    if (this.checkNumber(this.props.value)) {
      this.setState({
        value: this.props.value,
      });
    }
  }

  handleChangeCellText(value) {
    if (this.checkNumber(value)) {
      this.setState({
        value: value,
      });
    }
  }

  checkNumber(value) {
    if ((value > 9 || value < 1) && value !== "") {
      return false;
    }
    return true;
  }

  render() {
    return (
      <div className="col" style={{ margin: 0, padding: 0 }}>
        <input
          style={{ width: "50%" }}
          disabled={this.props.disabled}
          type="number"
          maxLength="1"
          size="1"
          max="9"
          value={this.state.value}
          onChange={(event) => {
            this.handleChangeCellText(event.target.value);
            // console.log("cell => ", {
            //   val: Number(event.target.value),

            //   fixed: this.props.disabled,
            //   location: [this.props.x, this.props.y],
            // });
            this.props.handleChangeNumber({
              val: Number(event.target.value),

              fixed: this.props.disabled,
              location: [this.props.x, this.props.y],
              bgColor: this.props.bgColor,
              color: this.props.color,
            });
          }}
          style={{
            backgroundColor: this.props.bgColor,
            color: this.props.color,
          }}
        ></input>
      </div>
    );
  }
}

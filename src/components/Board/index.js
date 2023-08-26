import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";

import BoardRow from "../BoardRow";

import SudokuLib from "./../../lib/SudokuLib";
import sudokuGenerator from "./../../lib/sudokuGenerator";

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: "easy",
      emptyList: [],
      board: [],
    };

    this.generateBoard = this.generateBoard.bind(this);
    this.handleChangeBoard = this.handleChangeBoard.bind(this);
    this.handleChangeLevel = this.handleChangeLevel.bind(this);
    this.handleChangeNumber = this.handleChangeNumber.bind(this);
  }

  componentDidMount() {
    this.generateBoard();
  }

  generateBoard() {
    var randNum = Math.floor(Math.random() * 4 + 1);

    const sudokuCase = sudokuGenerator[`${this.state.level}`][randNum];
    var result = [];
    var temp = [];
    var indexRow = 0;
    var x = 0;
    var y = 0;
    var objItem = {};
    var bgColor = "";

    sudokuCase.split("").forEach((item, index) => {
      var fixed = false;
      if (Number(item) > 0) {
        fixed = true;
      }
      objItem = {
        val: Number(item),
        fixed: fixed,
        location: [x, y],
        bgColor: "",
        color: "",
      };

      if ((x >= 0 && x <= 2) || (x >= 6 && x <= 8)) {
        if (y >= 3 && y <= 5) {
          objItem.bgColor = "#C0C0C0";
        }
      } else if (x >= 3 && x <= 5) {
        if ((y >= 0 && y <= 2) || (y >= 6 && y <= 8)) {
          objItem.bgColor = "#C0C0C0";
        }
      }

      // console.log("objItem => ", x, y, objItem.bgColor);

      if ((index + 1) % 9 === 0) {
        //console.log(item, index);

        temp.push(objItem);
        result.push(temp);
        x = x + 1;
        temp = [];
        y = 0;
        indexRow++;
      } else {
        temp.push(objItem);
        y = y + 1;
      }
    });

    console.log(result);

    this.setState({
      board: result,
    });
  }

  handleChangeBoard() {
    this.generateBoard();
  }

  handleChangeLevel(value) {
    this.setState(
      {
        level: value,
      },
      () => {
        this.generateBoard();
      }
    );
  }

  handleChangeNumber(value) {
    const thisBoard = [...this.state.board];
    const x = value.location[0];
    const y = value.location[1];
    thisBoard[x][y] = value;

    const checkObj = new SudokuLib();

    const resultCheck = checkObj.checkAll(thisBoard, thisBoard[x][y]);

    if (
      !resultCheck.isCheckCol ||
      !resultCheck.isCheckGroup ||
      !resultCheck.isCheckRow
    ) {
      thisBoard[x][y]["color"] = "red";
    } else {
      thisBoard[x][y]["color"] = "";
    }

    this.setState({
      board: thisBoard,
    });
  }

  render() {
    var BoardList = "";

    if (this.state.board.length === 9) {
      BoardList = this.state.board.map((item, index) => {
        return (
          <BoardRow
            handleChangeNumber={this.handleChangeNumber}
            key={index}
            rowValue={item}
            x={index}
          ></BoardRow>
        );
      });
    }

    return (
      <div>
        <Card.Header className="container">
          <div style={{ marginBottom: 20, width: "30%", float: "left" }}>
            <div className="row">
              <div className="col-md-6 pull-right">
                <Button className=" " onClick={this.generateBoard}>
                  Change Case
                </Button>
              </div>
              <div className="col-md-6 pull-right">
                <select
                  className=" form-control"
                  value={this.state.level}
                  onChange={(event) => {
                    this.handleChangeLevel(event.target.value);
                  }}
                >
                  <option value="easy"> Easy </option>
                  <option value="medium"> Medium </option>
                  <option value="hard"> Hard </option>
                </select>
              </div>
            </div>
          </div>
          <div className="clearfix"></div>
        </Card.Header>

        <div className="clearfix">&nbsp;</div>
        <div className="container">{BoardList}</div>
        <div className="clearfix"></div>
      </div>
    );
  }
}

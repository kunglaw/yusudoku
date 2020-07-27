export default class SudokuLib {
  constructor() {
    this.result = {
      isCheckRow: true,
      isCheckCol: true,
      isCheckGroup: true,
    };
  }

  checkHorizontal(board, cell) {
    var result = {};
    var x = cell.location[0];
    var y = cell.location[1];
    var rowData = board[x];

    rowData.forEach((item, index) => {
      if (index !== y && cell.val === item.val) {
        result = { ...this.result };
        result.isCheckRow = false;
        this.result = result;
        return false;
      }
    });

    return true;
  }

  checkVertical(board, cell) {
    //console.log(board, cell);
    var result = {};
    var x = cell.location[0];
    var y = cell.location[1];

    board.forEach((item, index) => {
      //console.log(" ==> ", item[y], cell);
      if (index != x && item[y].val === cell.val) {
        //console.log("ding dong => ", index, item[y], cell.val);
        result = { ...this.result };
        result.isCheckCol = false;
        this.result = result;
        return false;
      }
    });

    return true;
  }

  checkGroup(board, cell) {
    var result = {};
    var x = cell.location[0];
    var y = cell.location[1];

    var range = {
      xStart: 0,
      xFinish: 0,
      yStart: 0,
      yFinish: 0,
    };

    if (x >= 0 && x <= 2) {
      if (y >= 0 && y <= 2) {
        range = {
          xStart: 0,
          xFinish: 2,
          yStart: 0,
          yFinish: 2,
        };
      } else if (y >= 3 && y <= 5) {
        range = {
          xStart: 0,
          xFinish: 2,
          yStart: 3,
          yFinish: 5,
        };
      } else if (y >= 6 && y <= 8) {
        range = {
          xStart: 0,
          xFinish: 2,
          yStart: 6,
          yFinish: 8,
        };
      }
    } else if (x >= 3 && x <= 5) {
      if (y >= 0 && y <= 2) {
        range = {
          xStart: 3,
          xFinish: 5,
          yStart: 0,
          yFinish: 2,
        };
      } else if (y >= 3 && y <= 5) {
        range = {
          xStart: 3,
          xFinish: 5,
          yStart: 3,
          yFinish: 5,
        };
      } else if (y >= 6 && y <= 8) {
        range = {
          xStart: 3,
          xFinish: 5,
          yStart: 6,
          yFinish: 8,
        };
      }
    } else if (x >= 6 && x <= 8) {
      if (y >= 0 && y <= 2) {
        range = {
          xStart: 6,
          xFinish: 8,
          yStart: 0,
          yFinish: 2,
        };
      } else if (y >= 3 && y <= 5) {
        range = {
          xStart: 6,
          xFinish: 8,
          yStart: 3,
          yFinish: 5,
        };
      } else if (y >= 6 && y <= 8) {
        range = {
          xStart: 6,
          xFinish: 8,
          yStart: 6,
          yFinish: 8,
        };
      }
    }

    for (var i = range.xStart; i <= range.xFinish; i++) {
      for (var j = range.yStart; j <= range.yFinish; j++) {
        if (board[i][j].val === cell.val && !(i === x && j === y)) {
          result = { ...this.result };
          result.isCheckGroup = false;
          this.result = result;
          return false;
        }
      }
    }

    return true;
  }

  checkAll(board, cell) {
    this.checkHorizontal(board, cell);
    this.checkVertical(board, cell);
    this.checkGroup(board, cell);

    return this.result;
  }
}

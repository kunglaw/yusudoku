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
    return true;
  }

  checkAll(board, cell) {
    this.checkHorizontal(board, cell);
    this.checkVertical(board, cell);
    this.checkGroup(board, cell);

    return this.result;
  }
}

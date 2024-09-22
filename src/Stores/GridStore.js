import { makeObservable, observable, action, computed } from 'mobx';
import { ALGORITHMS } from '../Constants/Constants';

class GridStore {
  // essential states
  _grid = [];
  _rows;
  _columns;
  // takes coordinates of start element and end element 
  _start = null;
  _end = null;

  // states keeping track of actions
  _isAnimating = false;
  _isMousePressed = false;
  _activeMode = null;

  // state keeping track of algorithm to be used
  // by default we will use BFS
  _algo = ALGORITHMS.BFS;

  // state to keep track of speed of visualisation
  _interval = 1;

  constructor(_rows, _columns) {
    this._rows = _rows;
    this._columns = _columns;

    makeObservable(this, {
      _grid: observable.ref,
      _start: observable,
      _end: observable,
      _isAnimating: observable,
      _rows: observable,
      _columns: observable,
      _isMousePressed: observable,
      _activeMode: observable,
      _algo: observable,
      _interval: observable,
      resetGrid: action,
      setStart: action,
      setEnd: action,
      toggleCell: action,
      setIsAnimating: action,
      setIsMousePressed: action,
      setActiveMode: action,
      setAlgo: action,
      setInterval: action,
      grid: computed,
      start: computed,
      end: computed,
      isAnimating: computed,
      rows: computed,
      columns: computed,
      isMousePressed: computed,
      activeMode: computed,
      algo: computed,
      interval: computed
    });

    this.resetGrid();
  }

  resetGrid() {
    this._isAnimating = false;
    this._start = null;
    this._end = null;
    // creating the 2d array 
    this._grid = Array(this._rows)
      .fill()
      .map(() => Array(this._columns).fill(0));
  }

  setStart(value) {
    if (value === null) this._start = value;
    this._start = value;
  }

  setEnd(value) {
    if (value === null) this._end = value;
    this._end = value;
  }

  toggleCell(row, col) {
    this._grid[row][col] = this._grid[row][col] === 0 ? 1 : 0;
  }

  setIsAnimating(bool) {
    this._isAnimating = bool;
  }

  setIsMousePressed(bool) {
    this._isMousePressed = bool;
  }

  setActiveMode(value) {
    this._activeMode = value;
  }

  setAlgo(value) {
    this._algo = value;
  }

  setInterval(value) {
    this._interval = value;
  }

  get grid() {
    return this._grid;
  }

  get start() {
    return this._start;
  }

  get end() {
    return this._end;
  }

  get isAnimating() {
    return this._isAnimating;
  }

  get rows() {
    return this._rows;
  }

  get columns() {
    return this._columns;
  }

  get isMousePressed() {
    return this._isMousePressed;
  }

  get activeMode() {
    return this._activeMode;
  }

  get algo() {
    return this._algo;
  }

  get interval() {
    return this._interval;
  }
}

export default GridStore;

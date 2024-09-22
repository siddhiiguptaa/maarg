const DFS = (grid, start, end) => {
  const directions = [
    [0, 1, 10],
    [0, -1, 10],
    [1, 0, 10],
    [-1, 0, 10],
  ];

  const n = grid.length;
  const m = grid[0].length;

  let path = [];
  const visitedNodes = [];
  let shortestPath = [];

  const visitedNodesMap = Array(n)
    .fill()
    .map(() => Array(m).fill(0));

  const dfs = (row, col) => {
    if (
      row < 0 ||
      col < 0 ||
      row >= n ||
      col >= m ||
      grid[row][col] === 1 ||
      visitedNodesMap[row][col] === 1
    ) {
      return false;
    }

    if (row === end[0] && col === end[1]) {
      visitedNodes.push([row, col]);
      path.push([row, col]);
      shortestPath = path;
      return true;
    }

    visitedNodesMap[row][col] = 1;
    path.push([row, col]);
    visitedNodes.push([row, col]);

    for (const [dr, dc] of directions) {
      if(dfs(row + dr, col + dc)) return true;
    }

    path.pop();
    return false;
  };

  dfs(start[0], start[1]);

  return {
    path: shortestPath,
    visitedNodes
  }
};

export default DFS;

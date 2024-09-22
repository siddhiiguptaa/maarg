const BFS = (grid, start, end) => {
  const directions = [
    [0, 1, 10],
    [0, -1, 10],
    [1, 0, 10],
    [-1, 0, 10],
  ];

  const n = grid.length;
  const m = grid[0].length;

  const path = [];
  const visitedNodes = [];

  const visitedNodesMap = Array(n).fill().map(() => Array(m).fill(0));
  const parent = Array(n).fill().map(() => Array(m).fill(null));

  const queue = [];
  queue.push(start);
  visitedNodesMap[start[0]][start[1]] = 1;

  while (queue.length > 0) {
    const position = queue.shift();

    visitedNodes.push(position);
 
    if (position[0] === end[0] && position[1] === end[1]) {
      let node_iterator = position;

      while (node_iterator) {
        path.push(node_iterator);
        node_iterator = parent[node_iterator[0]][node_iterator[1]];
      }

      path.reverse();
      return {
        path,
        visitedNodes,
      };
    }

    for (const [dr, dc] of directions) {
      const newRow = dr + position[0];
      const newCol = dc + position[1];

      if (
        newRow >= 0 &&
        newCol >= 0 &&
        newRow < n &&
        newCol < m &&
        grid[newRow][newCol] !== 1 &&
        visitedNodesMap[newRow][newCol] !== 1
      ) {
        parent[newRow][newCol] = position;
        queue.push([newRow, newCol]);
        visitedNodesMap[newRow][newCol] = 1;
      }
    }
  }

  return {
    path,
    visitedNodes,
  };
};

export default BFS;

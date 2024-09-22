const Djikstra = (grid, start, end) => {
    const directions = [
        [0, 1, 10],
        [0, -1, 10],
        [1, 0, 10],
        [-1, 0, 10],
        [1, 1, 14],
        [1, -1, 14],
        [-1, 1, 14],
        [-1, -1, 14]
    ];

    const n = grid.length;
    const m = grid[0].length;

    const distance = Array(n).fill().map(() => Array(m).fill(Infinity));
    const parent = Array(n).fill().map(() => Array(m).fill(null));

    distance[start[0]][start[1]] = 0;

    const path = [];
    const visitedNodes = [];

    const priority_queue = [];
    priority_queue.push({
        position: start,
        distance: 0
    });

    while (priority_queue.length > 0) {
        priority_queue.sort((a, b) => a.distance - b.distance);
        const node = priority_queue.shift();
        
        const { position, distance: dist } = node;
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
                visitedNodes
            };
        }

        for (const [dr, dc, wt] of directions) {
            const newRow = dr + position[0];
            const newCol = dc + position[1];

            if (
                newRow >= 0 &&
                newCol >=0 &&
                newRow < n && 
                newCol < m && 
                grid[newRow][newCol]!==1
            ) {
                const newDist = wt + dist;
                if (newDist < distance[newRow][newCol]) {
                    distance[newRow][newCol] = newDist;
                    parent[newRow][newCol] = position;
                    priority_queue.push({
                        position: [newRow, newCol], 
                        distance: newDist
                    });
                }
            }
        }
    }

    return {
        path,
        visitedNodes
    };
}

export default Djikstra;
const network = {
  Alice: ["Bob", "Charlie"],
  Bob: ["Alice", "David"],
  Charlie: ["Alice", "Eve"],
  David: ["Bob"],
  Eve: ["Charlie"]
};

// dfs로 구현.
function friendRecommendations(network, user) {
  let visited = [];
  let stack = [user];
  let answer = new Set();

  visited.push(user);

  while (stack.length > 0) {
    let currentUser = stack.pop();

    for (let friend of network[currentUser]) {
      if (!visited.includes(friend)) {
        visited.push(friend);
        stack.push(friend);
      }

      if (friend !== user && !network[user].includes(friend)) {
        answer.add(friend);
      }
    }
  }

  return Array.from(answer);
}

console.log(friendRecommendations(network, "Alice"));

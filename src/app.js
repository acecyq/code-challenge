const myTree = {
  id: 0,
  childNodes: [
    {
      id: 1,
      childNodes: [
        {
          id: 2,
          childNodes: [],
        },
        {
          id: 3,
          childNodes: [],
        },
      ],
    },
    {
      id: 4,
      childNodes: [],
    },
    {
      id: 5,
      childNodes: [
        {
          id: 6,
          childNodes: [
            {
              id: 7,
              childNodes: [
                {
                  id: 8,
                  childNodes: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const solution = (input) => {
  const root = input;
  console.log('ID:', root.id);
  const children = [...root.childNodes];

  while (children.length) {
      const node = children.shift();
      console.log('ID:', node.id);
      children.push(...node.childNodes);
  }
}

solution(myTree);
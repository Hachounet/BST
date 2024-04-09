/* eslint-disable import/extensions */
/* eslint-disable no-console */
import Tree from './tree.mjs';

const unsortedArray = [
  1, 7, 4, 6, 18, 19, 10, 11, 12, 13, 145, 15, 16, 17, 18, 22, 23, 8, 9, 4, 3,
  5, 7, 9, 67, 6345, 324,
];

const newTree = new Tree(unsortedArray);

console.log(newTree.prettyPrint(newTree.root));
console.log(newTree.isBalanced());

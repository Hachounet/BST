/* eslint-disable import/extensions */
/* eslint-disable no-console */
import Tree from './tree.mjs';

function generateRandomsInArray(maxLimit = 100) {
  const randomsArray = [];
  while (randomsArray.length !== 100) {
    const random = Math.floor(Math.random() * (maxLimit + 1));
    randomsArray.push(random);
  }
  return randomsArray;
}

function DriverScript() {
  const randomArray = generateRandomsInArray(100);
  randomArray.push(105, 110, 111, 112, 113, 114, 115, 116);
  const newTree = new Tree(randomArray);
  console.log(newTree.prettyPrint(newTree.root));
  const isBalanced = newTree.isBalanced();
  console.log(isBalanced);
}

DriverScript();

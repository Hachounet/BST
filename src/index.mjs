/* eslint-disable import/extensions */
/* eslint-disable no-console */
import Tree from './tree.mjs';

function randomNumbersArray(numbOfnumbs) {
  const result = [];
  for (let i = 0; i <= numbOfnumbs; i += 1) {
    let randomNumber = Math.random() * 100;
    randomNumber = Math.floor(randomNumber);
    result.push(randomNumber);
  }
  return result;
}

function driverScript() {
  const array = randomNumbersArray(100);
  console.log(array);
  const newTree = new Tree(array);
  console.log(newTree.prettyPrint(newTree.root));
  console.log(newTree.isBalanced(newTree.root));
  newTree.insert(105);
  newTree.insert(106);
  newTree.insert(107);
  newTree.insert(108);
  newTree.insert(109);
  newTree.insert(110);
  console.log(newTree.isBalanced(newTree.root));
  newTree.rebalance();
  console.log(newTree.isBalanced(newTree.root));
  console.log('This is levelOrder :');
  console.log(newTree.levelOrder());
  console.log('This is Postorder :');
  console.log(newTree.postOrder(newTree.root));
  console.log('This is inOrder :');
  console.log(newTree.inOrder(newTree.root));
  console.log('This is PreOrder : ');
  console.log(newTree.preOrder(newTree.root));
}

driverScript();

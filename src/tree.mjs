/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import Node from './node.mjs';

export default class Tree {
  constructor(array) {
    this.cleanedArray = this.mergeSort(this.removeDuplicates(array));
    console.log(this.cleanedArray);
    this.root = this.buildTree(
      this.cleanedArray,
      0,
      this.cleanedArray.length - 1
    );
  }

  buildTree(array, start, end) {
    if (start > end) {
      return null;
    }
    const mid = Math.floor((start + end) / 2);
    const newRoot = new Node(array[mid]);
    newRoot.left = this.buildTree(array, 0, mid - 1);
    newRoot.right = this.buildTree(array, mid + 1);
    return newRoot;
  }

  prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  removeDuplicates(array) {
    const uniqueSet = new Set(array);
    const backToArray = [...uniqueSet];
    return backToArray;
  }

  mergeSort(array) {
    const mid = Math.floor(array.length / 2);
    if (array.length <= 1) return array;

    const leftPart = this.mergeSort(array.slice(0, mid));
    const rightPart = this.mergeSort(array.slice(mid));

    return this.merge(leftPart, rightPart);
  }

  merge(leftPart, rightPart) {
    const result = [];

    while (leftPart.length && rightPart.length) {
      if (leftPart[0] < rightPart[0]) {
        result.push(leftPart.shift());
      } else {
        result.push(rightPart.shift());
      }
    }
    return [...result, ...leftPart, ...rightPart];
  }
}

/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import Node from './node.mjs';

export default class Tree {
  constructor(array) {
    this.cleanedArray = this.mergeSort(this.cleanArray(array));
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

    newRoot.left = this.buildTree(array, start, mid - 1);
    newRoot.right = this.buildTree(array, mid + 1, end);
    return newRoot;
  }

  insert(value) {
    let currentNode = this.root;
    while (currentNode !== null) {
      if (value > currentNode.data) {
        if (currentNode.right === null) {
          currentNode.right = new Node(value);
          break;
        } else {
          currentNode = currentNode.right;
        }
      } else if (value < currentNode.data) {
        if (currentNode.left === null) {
          currentNode.left = new Node(value);
          break;
        } else {
          currentNode = currentNode.left;
        }
      } else {
        break;
      }
    }
  }

  deleteItem(value) {
    let previousNode = null;
    let currentNode = this.root;
    while (currentNode !== null && value !== currentNode.data) {
      previousNode = currentNode;
      if (value > currentNode.data) {
        currentNode = currentNode.right;
      } else {
        currentNode = currentNode.left;
      }
    }
    if (currentNode === null) {
      return;
    }
    if (currentNode.left !== null && currentNode.right !== null) {
      let successor = currentNode.right;
      let successorParent = currentNode;
      while (successor.left !== null) {
        successorParent = successor;
        successor = successor.left;
      }
      currentNode.data = successor.data;
      currentNode = successor;
      previousNode = successorParent;
    }
    let childNode;
    if (currentNode.left !== null) {
      childNode = currentNode.left;
    } else {
      childNode = currentNode.right;
    }
    if (previousNode === null) {
      this.root = childNode;
    } else if (currentNode === previousNode.left) {
      previousNode.left = childNode;
    } else {
      previousNode.right = childNode;
    }
  }

  find(value) {
    let currentNode = this.root;
    while (currentNode !== null) {
      if (value === currentNode.data) {
        return currentNode;
      }
      if (value > currentNode.data) {
        currentNode = currentNode.right;
      } else if (value < currentNode.data) currentNode = currentNode.left;
    }
    return null;
  }

  levelOrder(callback = null) {
    if (!this.root) return [];
    const result = [];
    const queue = [this.root];

    while (queue.length > 0) {
      const currentLevelSize = queue.length;
      const currentLevelValues = [];

      for (let i = 0; i < currentLevelSize; i += 1) {
        const node = queue.shift();
        if (callback) {
          callback(node);
        } else {
          currentLevelValues.push(node.data);
        }
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
      if (!callback) {
        result.push(currentLevelValues);
      }
    }
    return callback ? undefined : result;
  }

  inOrder(callback = null) {
    if (!this.root) return [];
    const result = [];
    const currentNode = this.root;

    function goThrough(node) {
      if (node.left) {
        goThrough(node.left);
      }
      if (callback) {
        callback(node);
      } else {
        result.push(node.data);
      }
      if (node.right) {
        goThrough(node.right);
      }
    }
    goThrough(currentNode);
    return callback ? undefined : result;
  }

  preOrder(callback = null) {
    if (!this.root) return [];
    const result = [];
    const currentNode = this.root;

    function goThrough(node) {
      if (callback) {
        callback(node);
      } else {
        result.push(node.data);
      }
      if (node.left) {
        goThrough(node.left);
      }
      if (node.right) {
        goThrough(node.right);
      }
    }
    goThrough(currentNode);
    return callback ? undefined : result;
  }

  postOrder(callback = null) {
    if (!this.root) return [];
    const result = [];

    function goThrough(node) {
      if (node.left) {
        goThrough(node.left);
      }
      if (node.right) {
        goThrough(node.right);
      }
      if (callback) {
        callback(node);
      } else {
        result.push(node.data);
      }
    }

    goThrough(this.root);

    return callback ? undefined : result;
  }

  height(node) {
    let currentNode = this.find(node);
    if (!currentNode) {
      return 'Node is null.';
    }
    let counterLeft = 0;
    let counterRight = 0;

    while (currentNode.left !== null && currentNode.right !== null) {
      if (currentNode.left !== null) {
        currentNode = currentNode.left;
        counterLeft += 1;
      }
      if (currentNode.right !== null) {
        currentNode = currentNode.right;
        counterRight += 1;
      }
    }
    return Math.max(counterLeft, counterRight) + 1;
  }

  depth(node) {
    const nodeToFind = this.find(node);
    if (!nodeToFind) {
      return 'Node is null';
    }
    let currentNode = this.root;
    let counter = 0;
    while (currentNode !== null) {
      if (nodeToFind.data > currentNode.data) {
        counter += 1;
        currentNode = currentNode.right;
      } else {
        counter += 1;
        currentNode = currentNode.left;
      }
      if (nodeToFind.data === currentNode.data) {
        return counter;
      }
    }
    return -1;
  }

  isBalanced() {
    function goToLeft(node) {
      if (!node) return 0;
      return Math.max(goToLeft(node.left), goToLeft(node.right)) + 1;
    }

    function goToRight(node) {
      if (!node) return 0;
      return Math.max(goToRight(node.left), goToRight(node.right)) + 1;
    }

    function isSubtreeBalanced(node) {
      if (!node) return true;

      const leftDepth = goToLeft(node.left);
      const rightDepth = goToRight(node.right);

      if (
        Math.abs(leftDepth - rightDepth) <= 1 &&
        isSubtreeBalanced(node.left) &&
        isSubtreeBalanced(node.right)
      ) {
        return true;
      }

      return false;
    }

    if (isSubtreeBalanced(this.root)) {
      return 'Tree is balanced.';
    }
    return 'Tree is not balanced.';
  }

  rebalance() {
    const newArray = this.inOrder(this.root);
    this.root = this.buildTree(newArray, 0, newArray.length - 1);
  }

  // ------------------ Utility functions for building Tree ---------------------------------------- //

  cleanArray(array) {
    const cleanedArray = this.removeDuplicates(array);
    return cleanedArray;
  }

  removeDuplicates(array) {
    const uniqueSet = new Set(array);
    const backToArray = [...uniqueSet];
    return backToArray;
  }

  mergeSort(array) {
    const mid = Math.floor(array.length / 2);
    if (array.length < 2) {
      return array;
    }
    const leftPart = array.slice(0, mid);
    const rightPart = array.slice(mid);

    return this.merge(this.mergeSort(leftPart), this.mergeSort(rightPart));
  }

  merge(leftPart, rightPart) {
    const arr = [];
    while (leftPart.length && rightPart.length) {
      if (leftPart[0] < rightPart[0]) {
        arr.push(leftPart.shift());
      } else {
        arr.push(rightPart.shift());
      }
    }
    return [...arr, ...leftPart, ...rightPart];
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
}

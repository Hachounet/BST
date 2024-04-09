/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import Node from './node.mjs';

export default class Tree {
  constructor(array) {
    this.cleanedArray = this.cleanArray(array);
    this.root = this.buildTree(array, 0, array.length - 1);
    console.log(this.root);
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
        // La valeur existe déjà dans l'arbre, vous pouvez choisir de gérer cela comme vous le souhaitez
        break;
      }
    }
  }

  delete(value) {
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

  // eslint-disable-next-line consistent-return
  find(value) {
    let currentNode = this.root;

    while (currentNode !== null && value !== currentNode.data) {
      if (value > currentNode.data) {
        currentNode = currentNode.right;
      } else {
        currentNode = currentNode.left;
      }
    }
    if (currentNode === null) {
      return 'No item found with this value.';
    }
    return currentNode;
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

    function goDeep(node) {
      if (callback) {
        callback(node);
      } else {
        result.push(node.data);
      }
      if (node.left) {
        goDeep(node.left);
      }
      if (node.right) {
        goDeep(node.right);
      }
    }
    goDeep(currentNode);
    return callback ? undefined : result;
  }

  postOrder(callback = null) {
    if (!this.root) return [];
    const result = [];
    const currentNode = this.root;

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
    goThrough(currentNode);
    return callback ? undefined : result;
  }

  height(node) {
    let currentNode = this.find(node);
    let counterLeft = 0;
    let counterRight = 0;
    if (!currentNode) return 'No node.';
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
    if (!nodeToFind) return 'Error. This node is null.';
    let currentNode = this.root;
    let counter = 0;
    while (currentNode !== nodeToFind) {
      if (nodeToFind.data > currentNode.data) {
        currentNode = currentNode.right;
      } else {
        currentNode = currentNode.left;
      }
      counter += 1;
    }
    return counter;
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

    const leftDepth = goToLeft(this.root);
    const rightDepth = goToRight(this.root);

    if (Math.abs(leftDepth - rightDepth) <= 1) {
      return 'Tree is balanced.';
    }
    return 'Tree is not balanced.';
  }

  rebalance() {}

  // ------------------------------------ Utility functions to clean, merge Array before building the tree. ---------------------------------------- //

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
    // eslint-disable-next-line no-console
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  cleanArray(array) {
    const sortedArray = this.mergeSort(array);
    const uniqueValues = new Set();
    const resultArray = [];

    sortedArray.forEach((item) => {
      if (!uniqueValues.has(item)) {
        uniqueValues.add(item);
        resultArray.push(item);
      }
    });

    return resultArray;
  }

  removeDuplicate(array) {
    const uniqueValues = new Set();
    const resultArray = [];

    array.forEach((item) => {
      if (!uniqueValues.has(item)) {
        uniqueValues.add(item);
        resultArray.push(item);
      }
    });

    return resultArray;
  }

  mergeSort(array) {
    // Créer une copie de l'array initial
    const woArray = array.slice();
    const mid = Math.floor(woArray.length / 2);

    if (woArray.length < 2) {
      return woArray;
    }
    const leftPart = woArray.slice(0, mid);
    const rightPart = woArray.slice(mid);

    return this.merge(this.mergeSort(leftPart), this.mergeSort(rightPart));
  }

  merge(leftPart, rightPart) {
    const array = [];
    while (leftPart.length && rightPart.length) {
      if (leftPart[0] < rightPart[0]) {
        array.push(leftPart.shift());
      } else {
        array.push(rightPart.shift());
      }
    }
    return [...array, ...leftPart, ...rightPart];
  }
}

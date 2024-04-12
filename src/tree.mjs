/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import Node from './node.mjs';

export default class Tree {
  constructor(array) {
    this.cleanedArray = this.mergeSort(this.removeDuplicates(array));
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
    const newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
    }
    let currentNode = this.root;
    while (currentNode !== null) {
      if (value === currentNode.data) {
        return undefined;
      }
      if (value < currentNode.data) {
        if (currentNode.left === null) {
          currentNode.left = newNode;
        }
        currentNode = currentNode.left;
      } else {
        if (currentNode.right === null) {
          currentNode.right = newNode;
        }
        currentNode = currentNode.right;
      }
    }
    return 'Inserted.';
  }

  deleteItem(value) {
    this.root = this.deleteRec(this.root, value);
  }

  // eslint-disable-next-line consistent-return
  deleteRec(currentNode, value) {
    if (currentNode === null) {
      return currentNode;
    }
    if (value === currentNode.data) {
      if (currentNode.left === null && currentNode.right === null) {
        return null;
      }
      if (currentNode.left === null) {
        return currentNode.right;
      }
      if (currentNode.right === null) {
        return currentNode.left;
      }
      const temporaryNode = this.kthSmallestNode(currentNode.right);
      currentNode.data = temporaryNode.data;

      currentNode.right = this.deleteRec(currentNode.right, temporaryNode.data);
      return currentNode;
    }
    if (value < currentNode.data) {
      currentNode.left = this.deleteRec(currentNode.left, value);
      return currentNode;
    }
    currentNode.right = this.deleteRec(currentNode.right, value);
    return currentNode;
  }

  kthSmallestNode(node) {
    while (!node.left === null) {
      node = node.left;
    }
    return node;
  }

  find(value) {
    let currentNode = this.root;

    while (currentNode !== null) {
      if (currentNode.data > value) {
        currentNode = currentNode.left;
      } else if (currentNode.data < value) {
        currentNode = currentNode.right;
      }
      if (currentNode === null) {
        return null;
      }
      if (currentNode.data === value) {
        return currentNode;
      }
    }
    return 'Function finished.';
  }

  levelOrder(callback) {
    const result = [];
    const queue = [];
    const currentNode = this.root;
    if (currentNode === null) {
      return null;
    }
    queue.push(currentNode);

    while (queue.length >= 1) {
      if (queue[0].left !== null) {
        queue.push(queue[0].left);
      }
      if (queue[0].right !== null) {
        queue.push(queue[0].right);
      }
      if (callback) {
        callback(queue[0]);
      } else {
        result.push(queue[0].data);
        queue.shift();
      }
    }

    return result;
  }

  inOrder(tree, callback) {
    const result = [];
    function inorderTraverse(node) {
      if (!node) return;
      inorderTraverse(node.left);
      if (callback) {
        callback(node);
      } else {
        result.push(node.data);
      }
      inorderTraverse(node.right);
    }
    inorderTraverse(tree);
    return result;
  }

  preOrder(tree, callback) {
    const result = [];
    function preOrderTraverse(node) {
      if (!node) return;
      if (callback) {
        callback(node);
      } else {
        result.push(node.data);
      }
      preOrderTraverse(node.left);
      preOrderTraverse(node.right);
    }
    preOrderTraverse(tree);
    return result;
  }

  postOrder(tree, callback) {
    const result = [];
    function postOrderTraverse(node) {
      if (!node) return;
      postOrderTraverse(node.left);
      postOrderTraverse(node.right);
      if (callback) {
        callback(node);
      } else {
        result.push(node.data);
      }
    }
    postOrderTraverse(tree);
    return result;
  }

  height(node) {
    const currentNode = this.find(node);
    if (!currentNode) {
      return null;
    }
    if (currentNode.left === null && currentNode.right === null) {
      return 0;
    }

    const counterLeft = this.calcHeigh(currentNode.left, 0);
    const counterRight = this.calcHeigh(currentNode.right, 0);

    const result = Math.max(counterLeft, counterRight);
    return `Height is ${result}`;
  }

  calcHeigh(node, result) {
    if (node === null) {
      return result;
    }
    result += 1;

    const result1 = this.calcHeigh(node.left, result);

    const result2 = this.calcHeigh(node.right, result);

    if (result1 > result2) {
      return result1;
    }
    return result2;
  }

  depth(node) {
    const cNode = this.find(node);
    const result = this.goDeeper(this.root, cNode, 0);
    return result;
  }

  goDeeper(root, cNode, result) {
    const rootNode = root;
    const currentNode = cNode;
    if (rootNode === null || currentNode === null) {
      return null;
    }
    if (rootNode.data === currentNode.data) {
      return result;
    }
    result += 1;
    const depth1 = this.goDeeper(rootNode.right, currentNode, result);

    const depth2 = this.goDeeper(rootNode.left, currentNode, result);

    if (depth1 > depth2) {
      return depth1;
    }
    return depth2;
  }

  isBalanced(node) {
    const rootNode = node;
    const resultLeft = this.isBalancedRec(rootNode.left, 0);
    const resultRight = this.isBalancedRec(rootNode.right, 0);
    console.log(resultLeft, resultRight);
    if (Math.abs(resultLeft - resultRight) > 1) {
      return 'Tree is not balanced.';
    }
    return 'Tree is balanced.';
  }

  isBalancedRec(rootNode, result) {
    if (rootNode === null) {
      return result;
    }
    result += 1;
    const result1 = this.isBalancedRec(rootNode.right, result);
    const result2 = this.isBalancedRec(rootNode.left, result);

    if (result1 > result2) {
      return result1;
    }
    return result2;
  }

  rebalance() {
    const array = this.inOrder(this.root);
    this.root = this.buildTree(array, 0, array.length - 1);
    this.prettyPrint(this.root);
    const resultBalance = this.isBalanced(this.root);
    return resultBalance;
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

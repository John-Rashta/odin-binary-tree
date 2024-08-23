import treeManagement from "./treeObj.mjs";

function Tree(arr) {
    if (!Array.isArray(arr)) {
        return;
    }

    const getRoot = function getRootOfTree() {
        return root;
    }

    const buildTree = function buildATreeFromUnsortedArray(arr) {
        let newArr = treeManager.sortTheArray(arr);

        return treeManager.makeTheTree(newArr, 0, newArr.length - 1);
    }

    const insert = function insertValueIntoTree(value) {
        treeManager.insertValue(root, value);
    }

    const deleteItem = function deleteValueFromTree(value) {
        if (!treeManager.findValue(value)) {
            return;
        }

        treeManager.deleteValue(root, value);
    }

    const find = function findValueInTree(value) {
        return treeManager.findValue(root, value);
    }

    const levelOrder = function levelOrderIterateThroughTree(funcToCall) {
        if (typeof funcToCall != "function") {
            throw new Error("Callback is required");
        }

        treeManager.levelOrderIteration(root, funcToCall);
    }

    const preOrder = function preOrderIterateThroughTree(funcToCall) {
        if (typeof funcToCall != "function") {
            throw new Error("Callback is required");
        }

        treeManager.preOrderIteration(root, funcToCall);
    }

    const inOrder = function inOrderIterateThroughTree(funcToCall) {
        if (typeof funcToCall != "function") {
            throw new Error("Callback is required");
        }

        treeManager.inOrderIteration(root, funcToCall);
    }

    const postOrder = function postOrderIterateThroughTree(funcToCall) {
        if (typeof funcToCall != "function") {
            throw new Error("Callback is required");
        }

        treeManager.postOrderIteration(root, funcToCall);
    }

    const height = function getHeightOfNode(node) {
        if (!treeManager.findValue(node.value)) {
            return;
        }

        return treeManager.getHeight(node);

    }

    const depth = function getDepthOfNode(node) {
        if (!treeManager.findValue(node.value)) {
            return;
        }

        return treeManager.getDepth(root, node);
    }

    const isBalanced = function checkIfTreeIsBalanced() {
        let leftSide = treeManager.getHeight(root.left);
        let rightSide = treeManager.getHeight(root.right);
        let difference = leftSide - rightSide;

        if (difference === -1 || difference === 0 || difference === 1) {
            return true;
        }

        return false;
    }

    const rebalance = function rebalanceTreeFromScratch() {
        const tempArray = [];
        treeManager.levelOrderIteration(root, (node) => tempArray.push(node.value));
        const sortedArray = treeManager.sortTheArray(tempArray);
        root = treeManager.makeTheTree(sortedArray, 0 ,sortedArray.length - 1);
    }

    const treeManager = treeManagement();

    let root = buildTree(arr);

    return {
        getRoot,
        buildTree,
        insert,
        deleteItem,
        find,
        levelOrder,
        preOrder,
        inOrder,
        postOrder,
        height,
        depth,
        isBalanced,
        rebalance,
    }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };


const newTree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 87, 11, 44, 36, 98]);

console.log(newTree.isBalanced())
newTree.insert(55);
newTree.insert(111);
newTree.insert(102);
newTree.insert(142);
newTree.insert(122);
console.log(newTree.isBalanced())

newTree.rebalance();
console.log(newTree.isBalanced())
newTree.insert(2);
newTree.deleteItem(67)
newTree.deleteItem(87)
newTree.insert(38);
newTree.deleteItem(55)
newTree.deleteItem(7)
newTree.deleteItem(142)
newTree.deleteItem(111)

prettyPrint(newTree.getRoot());
console.log(newTree.depth(newTree.find(3)))

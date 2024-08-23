import Node from "./nodeObj.mjs";

const makeTheTree = function buildATreeFromSortedArray(arr, start, end) {
    if (start > end) {
        return null;
         
       }
        
        let mid = Math.floor((start + end) / 2);
        let root = new Node(arr[mid]);
        root.left = makeTheTree(arr, start, mid-1);
        root.right = makeTheTree(arr, mid+1, end);
        return root;
};

const sortTheArray = function sortArrayToBuildTheTree(arr) {
    return arr.filter((value, index, itself) => {
        return index == itself.indexOf(value);
      }).sort((a, b) => a - b);
};

const insertValue = function insertValueIntoArray(root, value) {
    if (root.value === value) {
        return;
    }

    if (root.value > value) {
        if (root.left === null) {
            root.left = new Node(value);
            return;
        }

        insertValue(root.left, value);
    }else if (root.value < value) {
        if (root.right === null) {
            root.right = new Node(value);
            return;
        }

        insertValue(root.right, value);
    }
};

const findValue = function findValueInTheTree(root, value) {
    if (root === null || root.value === value) {
        return root;
    }

    if (root.value > value) {
        return findValue(root.left, value);
    }else if (root.value < value) {
        return findValue(root.right, value);
    }

};

const getHeight = function getHeightOfGivenNode(node) {
    if (node === null) {
        return -1;
    }

    let leftHeight = getHeight(node.left);
    let rightHeight = getHeight(node.right);

    if (leftHeight > rightHeight) {
        return leftHeight + 1;
    }

    return rightHeight + 1;
}

const getDepth = function getDepthOfNode(root, node) {
    if (root === node) {
        return 0;
    }

    if (root.value > node.value) {
        return getDepth(root.left, node) + 1;
    }else if (root.value < node.value) {
        return getDepth(root.right, node) + 1;
    }
}

const deleteHelper = function helpDeleteValuesByHavingAllOptions(root) {
    if (root.left === null) {
        root.value = root.right.value;
        root.left  = root.right.left;
        root.right = root.right.right;
        return [null, null];
    }

    if (root.right === null) {
        root.value = root.left.value;
        root.right = root.left.right;
        root.left = root.left.left;
        return [null, null];
    }

    let replacementNode = root.right;
    while (replacementNode !== null && replacementNode.left !== null) {
        replacementNode = replacementNode.left;
    }

    root.value = replacementNode.value;
    if (root.right.right === null && root.right.left === null) {
        root.right = null;
        return [null, null];

    }
    return [root.right, replacementNode.value];
}

const deleteValue = function deleteValueFromTree(root, value) {
    if (root === null) {
        return;
    }

    if (root.value === value) {
        const [newRoot, newValue] = deleteHelper(root);
        if (!newRoot) {
            return;
        }
        deleteValue(newRoot, newValue);
    }else if (root.value > value) {
        if (root.left.value === value & root.left.right === null & root.left.left === null) {
            root.left = null;
            return;
        }
        deleteValue(root.left, value);
    }else if (root.value < value) {
        if (root.right.value === value & root.right.right === null & root.right.left === null) {
            root.right = null;
            return;
        }
        deleteValue(root.right, value);
    }
}

const levelOrderIteration = function levelOrderIterateOverTree(root, funcToCall) {
    if (root === null) {
        return;
    }

    const arr = [];
    arr.push(root);

    while(arr.length != 0) {
        let currentNode = arr[0];
        funcToCall(currentNode);

        if (currentNode.left != null) {
            arr.push(currentNode.left); 
        }
        if (currentNode.right != null) {
            arr.push(currentNode.right);
        }
        arr.shift();
    }
}

const preOrderIteration = function preOrderIterateOverTree(root, funcToCall) {
    if (root === null) {
        return;
    }

    funcToCall(root);
    preOrderIteration(root.left, funcToCall);
    preOrderIteration(root.right, funcToCall);
}

const inOrderIteration = function inOrderIterateOverTree(root, funcToCall) {
    if (root === null) {
        return;
    }

    inOrderIteration(root.left, funcToCall);
    funcToCall(root);
    inOrderIteration(root.right, funcToCall);
}

const postOrderIteration = function postOrderIterateOverTree(root, funcToCall) {
    if (root === null) {
        return;
    }

    postOrderIteration(root.left, funcToCall);
    postOrderIteration(root.right, funcToCall);
    funcToCall(root);
}


export default function treeManagement() {
    return {
        makeTheTree,
        sortTheArray,
        insertValue,
        findValue,
        getHeight,
        getDepth,
        deleteValue,
        levelOrderIteration,
        preOrderIteration,
        inOrderIteration,
        postOrderIteration,
    }
}
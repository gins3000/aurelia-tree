import { TreeNodeData, updateArray, updateObject } from "./au-tree-helpers";

export function unselectAll(root: TreeNodeData) {
  return updateNodes(root, (n) => !!n.selected, { selected: false });
}

export function expandAll(root: TreeNodeData) {
  return updateNodes(root, (n) => !!n.children && !n.expanded, { expanded: true });
}

export function collapseAll(root: TreeNodeData) {
  return updateNodes(root, (n) => !!n.children && !!n.expanded, { expanded: false });
}

export function updateNode(root: TreeNodeData, address: string, update: Partial<TreeNodeData>) {
  return updateNodeRecursive(root, parseAddress(address), update);
}

export function updateNodes(
  root: TreeNodeData,
  condition: (node: TreeNodeData) => boolean,
  update: Partial<TreeNodeData>
): TreeNodeData {
  const updates: Partial<TreeNodeData>[] = [{
    children: root.children && updateArray(root.children, (c) => updateNodes(c, condition, update))
  }];

  if (condition(root)) {
    updates.push(update);
  }

  return updateObject(root, ...updates);
}

function updateNodeRecursive(
  node: TreeNodeData,
  remainingAddress: number[],
  update: Partial<TreeNodeData>
): TreeNodeData {
  if (!remainingAddress.length) {
    return updateObject(node, update);
  }

  const firstIndex = remainingAddress[0];
  const newChildren = node.children && updateArray(node.children, (c, i) =>
    i === firstIndex ? updateNodeRecursive(c, remainingAddress.slice(1), update) : c
  );

  return updateObject(node, { children: newChildren });
}

function parseAddress(addressString: string): number[] {
  return (addressString ? addressString.split("/") : []).map((a) => parseInt(a, 10));
}

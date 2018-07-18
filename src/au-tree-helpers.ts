export interface TreeNodeData {
  name: string;
  children?: TreeNodeData[];
  expanded?: boolean;
  selected?: boolean;
  extraData?: any
}

export interface TreeRoot {
  data: TreeNodeData;
  unselectAll: () => Promise<void> | void;
  updateNode: (address: string, update: Partial<TreeNodeData>) => Promise<void> | void;
}

export function updateObject<T extends {}>(original: T, ...updates: Partial<T>[]): T {
  return updates.some((u) =>
    Object.entries(u).some(([k, v]) => (original as any)[k] !== v)
  ) ? Object.assign(original, ...updates) : original;
}

export function updateArray<T>(original: T[], update: (item: T, index: number) => T): T[] {
  let dirty = false;
  const newArray = original.map((x, i) => {
    const newX = update(x, i);
    if (newX !== x) { dirty = true; }
    return newX;
  });

  return dirty ? newArray : original;
}

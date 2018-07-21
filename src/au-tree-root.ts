import { customElement, bindable, Disposable } from "aurelia-framework";
import { TreeRoot, TreeNodeData, updateArray, updateObject } from "./au-tree-helpers";

@customElement("au-tree-root")
export class AuTreeRoot implements TreeRoot {
  @bindable() public data!: TreeNodeData;
  @bindable() public dataChangeCallback = (newData: TreeNodeData) => this.data = newData
  @bindable() public nodeViewModel?: string;
  public cursorPosition = "";

  private selectedNodes = new Set<string>();
  private disposables: Disposable[] = [];

  public attached() {
    // TODO
  }

  public detached() {
    this.disposables.forEach((d) => d.dispose());
  }

  public unselectAll() {
    const newData = Array.from(this.selectedNodes).reduce<TreeNodeData>(
      (data, s) => this.updateNodeRecursive(data, parseAddress(s), s, { selected: false }),
      this.data
    );
    this.selectedNodes.clear();
    this.dataChangeCallback(newData);
  }

  public updateNode(address: string, update: Partial<TreeNodeData>) {
    this.dataChangeCallback(this.updateNodeRecursive(this.data, parseAddress(address), address, update));
  }

  private updateNodeRecursive(
    node: TreeNodeData,
    remainingAddress: number[],
    fullAddress: string,
    update: Partial<TreeNodeData>
  ): TreeNodeData {
    if (!remainingAddress.length) {
      if (update.selected === true) {
        this.selectedNodes.add(fullAddress);
        this.cursorPosition = fullAddress;
      } else if (update.selected === false) {
        this.selectedNodes.delete(fullAddress);
      }

      return updateObject(node, update);
    }

    const firstIndex = remainingAddress[0];
    const newChildren = node.children && updateArray(node.children, (c, i) =>
      i === firstIndex ? this.updateNodeRecursive(c, remainingAddress.slice(1), fullAddress, update) : c
    );

    return updateObject(node, { children: newChildren });
  }
}

function parseAddress(addressString: string): number[] {
  return (addressString ? addressString.split("/") : []).map((a) => parseInt(a, 10));
}

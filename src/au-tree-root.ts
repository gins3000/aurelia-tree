import { customElement, bindable, Disposable } from "aurelia-framework";
import { TreeRoot, TreeNodeData, updateArray, updateObject } from "./au-tree-helpers";

@customElement("au-tree-root")
export class AuTreeRoot implements TreeRoot {
  @bindable() public data!: TreeNodeData;
  @bindable() public dataChangeCallback = (newData: TreeNodeData) => this.data = newData
  public cursorPosition = "";

  private selectedNodes = new Set<string>();
  private disposables: Disposable[] = [];

  public attached() {
  }

  public detached() {
    this.disposables.forEach((d) => d.dispose());
  }

  public unselectAll() {
    this.selectedNodes.forEach((s) => this.updateNode(s, { selected: false }));
    this.selectedNodes.clear();
  }

  public updateNode(address: string, update: Partial<TreeNodeData>) {
    const addressArray = (address ? address.split("/") : []).map((a) => parseInt(a, 10));
    this.dataChangeCallback(this.updateNodeRecursive(this.data, addressArray, address, update));
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

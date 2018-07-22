import { customElement, bindable, Disposable } from "aurelia-framework";

import { TreeRoot, TreeNodeData } from "./au-tree-helpers";

@customElement("au-tree-root")
export class AuTreeRoot implements TreeRoot {
  @bindable() public data!: TreeNodeData;
  @bindable() public dataChangeCallback = (newData: TreeNodeData) => this.data = newData
  @bindable() public nodeViewModel?: string;
  public cursorPosition = "";

  private disposables: Disposable[] = [];

  public attached() {
    // TODO
  }

  public detached() {
    this.disposables.forEach((d) => d.dispose());
  }

  public updateData(newData: TreeNodeData) {
    this.dataChangeCallback(newData);
  }

  public setCursorPosition(address: string) {
    this.cursorPosition = address;
  }
}

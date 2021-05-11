import { bindable, Disposable } from "aurelia-framework";

import { TreeRoot, TreeNodeData } from "../au-tree-helpers";

export class AuTree implements TreeRoot {
  @bindable() public data!: TreeNodeData;
  @bindable() public dataChangeCallback = (newData: TreeNodeData): void => { this.data = newData; }
  @bindable() public nodeViewModel?: string;
  public cursorPosition = "";

  private disposables: Disposable[] = [];

  public attached(): void {
    // TODO
  }

  public detached(): void {
    this.disposables.forEach((d) => d.dispose());
  }

  public updateData(newData: TreeNodeData): void {
    this.dataChangeCallback(newData);
  }

  public setCursorPosition(address: string): void {
    this.cursorPosition = address;
  }
}

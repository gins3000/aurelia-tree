import { containerless, customElement, bindable } from "aurelia-framework";

import { TreeNodeData, TreeRoot } from "./au-tree-helpers";
import { updateNode, unselectAll } from "./au-tree-operations";

@customElement("au-tree-node")
@containerless()
export class AuTreeNode implements TreeNodeData {
  @bindable() public extraClasses?: string;
  @bindable() public root!: TreeRoot;
  @bindable() public children?: TreeNodeData[];
  @bindable() public name!: string;
  @bindable() public expanded?: boolean;
  @bindable() public selected?: boolean;
  @bindable() public extraData: any;

  @bindable() public addressByIndex: string = "";
  @bindable() public addressByPath: string = "";
  @bindable() public cursorPosition!: string;

  public nodeClicked(event: KeyboardEvent) {
    const ctrlPressed = event.ctrlKey;
    let newData = this.root.data;
    if (!ctrlPressed) {
      newData = unselectAll(newData);
    }

    const update: Partial<TreeNodeData> = { selected: !this.selected || !ctrlPressed };
    if (this.children && !ctrlPressed) {
      update.expanded = !this.expanded;
    }

    newData = updateNode(newData, this.addressByIndex, update);

    this.root.setCursorPosition(this.addressByIndex);
    this.root.updateData(newData);
  }
}

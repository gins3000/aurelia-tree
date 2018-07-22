import { containerless, customElement, bindable } from "aurelia-framework";
import { TreeNodeData, TreeRoot } from "./au-tree-helpers";

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
    if (!ctrlPressed) {
      this.root.unselectAll();
    }

    const update: Partial<TreeNodeData> = { selected: !this.selected || !ctrlPressed };
    if (this.children && !ctrlPressed) {
      update.expanded = !this.expanded;
    }

    this.root.updateNode(this.addressByIndex, update);
  }
}

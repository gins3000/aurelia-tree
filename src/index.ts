import { FrameworkConfiguration } from "aurelia-framework";
import { PLATFORM } from "aurelia-pal";

export function configure(aurelia: FrameworkConfiguration): void {
  aurelia.globalResources([
    PLATFORM.moduleName("./elements/au-tree-node"),
    PLATFORM.moduleName("./elements/au-tree")
  ]);
}

export * from "./elements/au-tree";
export * from "./elements/au-tree-node";
export * from "./au-tree-helpers";

import { FrameworkConfiguration } from "aurelia-framework";
import { PLATFORM } from "aurelia-pal";

export function configure(aurelia: FrameworkConfiguration) {
  aurelia.globalResources([
    PLATFORM.moduleName("./au-tree-node"),
    PLATFORM.moduleName("./au-tree-root")
  ]);
}

export * from "./au-tree-root";
export * from "./au-tree-node";
export * from "./au-tree-helpers";

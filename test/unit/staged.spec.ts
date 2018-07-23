import { StageComponent } from "aurelia-testing";
import { bootstrap } from "aurelia-bootstrapper";

import { TreeNodeData } from "../../src/au-tree-helpers";
import { bootstrapPlugin } from "../helper";

const data: TreeNodeData = {
  name: "Root",
  children: [
    { name: "A" },
    { name: "B" },
    { name: "C" }
  ]
};

describe("the aurelia tree component", () => {
  it("should render with minimal configuration", async () => {
    const component = StageComponent
      .withResources("mocks/tree-vm")
      .inView(`<div id="test-target">
          <au-tree-root data.bind="data"></au-tree-root>
        </div>`)
      .boundTo({ data });

    bootstrapPlugin(component);

    await component.create(bootstrap);

    expect(component.element.querySelector("au-tree-root")).not.toBeNull();
    expect(component.element.querySelectorAll("ul li").length).toBe(data.children.length);

    component.dispose();
  });

  it("should render the nodes name if no node-view-model is provided", async () => {
    const component = StageComponent
      .withResources("mocks/tree-vm")
      .inView(`<div id="test-target">
          <au-tree-root data.bind="data"></au-tree-root>
        </div>`)
      .boundTo({ data });

    bootstrapPlugin(component);

    await component.create(bootstrap);

    expect(component.element.querySelector(".au-tree__root span").innerHTML).toBe(data.name);

    const children = Array.from(component.element.querySelectorAll(".au-tree__node span"));
    children.forEach((child) => data.children.map(c => c.name).includes(child.innerHTML));

    component.dispose();
  })
});

import { TreeNodeData } from "index";

export class App {
  public data: TreeNodeData = {
    name: 'Foo',
    children: [
      {
        name: 'Bar'
      },
      {
        name: '42'
      }
    ]
  }
}

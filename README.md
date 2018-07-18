# aurelia-tree

A basic extensible tree component for Aurelia.

> **_This project is a work in progress_**\
Please do not use it in production as every aspect of it can change and is potentially untested.

Feel free to play around and report issues you encounter to help give it a direction.
Features will rapidly be added and experimented with in the beginning, so check back every so often to see what's new.

## Motivation

The goal is to have a light-weight and flexible tree component for Aurelia.
It should provide expected tree functionality such as expand/collapse folders, navigate nodes via the mouse or the cursor,  select,  multi-select and drag & drop.

It should also be highly customizable, e.g. via callbacks and events and through the ability use an arbitrary Aurelia component for each node, which has then access to some data and API.

## Try it out

A more exhaustive tutorial/guide will come soon.
For now, here is a rough overview of what you can do with it so far.

To build this package:

```bash
git clone https://github.com/gins3000/aurelia-tree.git
cd aurelia-tree
npm install
npm run build
```

After installing the plugin in your Aurelia project, you can use the component in an Aurelia template like this:

```html
<au-tree-root data.bind="data" node-view-model.bind="nodeModule"></au-tree-root>
```

`data` expects an object matching the interface `TreeNodeData`.
If a node's `children` property is undefined, it is a leaf, and an expandable folder otherwise.

`node-view-model` expects a string pointing to the component you want to use for rendering the individual nodes.
If you leave it blank, the tree will simply render the name of the node.
Your custom component can access its node's `TreeNodeData`, including the wildcard property `extraData`.

`data-change-callback` can be bound to intercept the tree's internal state updates.
The default behavior is to just feed it back into the tree's root.
But you might, for example, want to send it to an [Aurelia Store](https://github.com/aurelia/store) action instead.

Right now you can

- expand and collapse folders (no animation yet)
- select any node
- multi-select/deselect nodes with `Ctrl+Click`

_Have fun!_

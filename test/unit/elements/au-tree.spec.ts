import { StageComponent } from 'aurelia-testing';
import { bootstrap } from 'aurelia-bootstrapper';

describe('au-tree element', () => {
  let component;

  afterEach(() => {
    if (component) {
      component.dispose();
      component = null;
    }
  });

  it('loads (smoke)', done => {
    const model = { data: { name: 'Foo', children: [{ name: 'Bar' }, { name: '42' }] } };

    component = StageComponent
      .withResources(['elements/au-tree', 'elements/au-tree-node'])
      .inView('<au-tree data.bind="data"></au-tree>')
      .boundTo(model);

    component.create(bootstrap).then(() => {
      const view = component.element;
      expect(view.textContent.trim().replace(/\s+/g, ' ')).toBe(`Foo Bar 42`)
      done();
    }).catch(e => {
      fail(e);
    });
  });
});

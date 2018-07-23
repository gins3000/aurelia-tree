import { Aurelia, PLATFORM, ViewLocator, Origin } from "aurelia-framework";

export function bootstrapPlugin(component) {
  component.bootstrap((aurelia: Aurelia) => {
    ViewLocator.prototype.convertOriginToViewUrl = (origin: Origin): string => {
      let moduleId = origin.moduleId;

      return moduleId.startsWith("src/")
        ? `../../${moduleId}.html`
        : `${moduleId}.html`;
    };
    
    aurelia.use.standardConfiguration()
      .feature(PLATFORM.moduleName("src"));
  });
}

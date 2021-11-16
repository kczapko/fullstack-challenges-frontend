export default {
  install(app) {
    const requireComponent = require.context('../components', true, /Base[A-Z]\w+\.(vue|js)$/);
    requireComponent.keys().forEach((fileName) => {
      let baseComponentConfig = requireComponent(fileName);
      baseComponentConfig = baseComponentConfig.default || baseComponentConfig;

      // eslint-disable-next-line operator-linebreak
      const baseComponentName =
        baseComponentConfig.name || fileName.replace(/^.+\//, '').replace(/\.\w+$/, '');

      app.component(baseComponentName, baseComponentConfig);
    });
  },
};

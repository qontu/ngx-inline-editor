export function mockClass<T extends { new (...args: any[]): InstanceType<T> }>(
  klass: T,
): InstanceType<T> {
  const instance = new klass();

  Object.keys(instance)
    .filter(prop => typeof instance[prop] === 'function')
    .forEach(prop => {
      instance[prop] = jest.fn();
    });

  return instance;
}

import { Component, createElement } from "preact";

export function Timeout({ timeout, onTimeout, children }) {
  if (!this.state.started) {
    const handle = setTimeout(onTimeout, timeout);
    this.componentWillUnmount = () => {
      clearTimeout(handle);
    };
    this.setState({ started: true });
  }
  return children;
}

export const flowponent = flow => {
  return function() {
    if (!this.state.key) {
      let trigger = null;
      let key = 1;

      const iter = flow(valueOrCallback => {
        return (...args) => {
          trigger(
            typeof valueOrCallback === "function"
              ? valueOrCallback(...args)
              : valueOrCallback
          );
        };
      });

      const step = sentValue => {
        trigger = createTrigger();

        const next = iter.next(sentValue);
        if (!next.done) {
          this.setState({ view: next.value, key: key++ });
        } else if (this.props.onReturn) {
          this.props.onReturn(next.value);
        }
      };

      const createTrigger = () => {
        let resolve;
        new Promise(resolve_ => {
          resolve = resolve_;
        }).then(step);
        return resolve;
      };

      step();
    }

    return createElement(Component, { key: this.state.key }, this.state.view);
  };
};

import { Component, createElement } from "preact";

export const flowponent = flow => {
  return function(props) {
    if (!this.state.key) {
      let trigger;

      let iter = {};
      Object.keys(props).forEach(prop => {
        iter[prop] = props[prop];
      });
      iter.step = valueOrCallback => {
        const current = trigger;
        return (...args) => {
          current(
            typeof valueOrCallback === "function"
              ? valueOrCallback(...args)
              : valueOrCallback
          );
        };
      };
      iter.onReturn = undefined;
      iter = flow(iter);

      const step = sentValue => {
        new Promise(resolve => {
          trigger = resolve;
        }).then(step);

        const next = iter.next(sentValue);
        if (!next.done) {
          this.setState({ view: next.value, key: trigger });
        } else if (props.onReturn) {
          props.onReturn(next.value);
        }
      };
      step();
    }

    return createElement(Component, { key: this.state.key }, this.state.view);
  };
};

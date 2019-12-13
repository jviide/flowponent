import { Component, createElement } from "preact";

export const flowponent = flow => {
  return function(props, state) {
    if (!state.trigger) {
      let iter = flow(props);

      const step = sentValue => {
        if (iter) {
          new Promise(trigger => {
            const next = iter.next(sentValue);
            if (!next.done) {
              this.setState({
                view: next.value(trigger),
                trigger: trigger
              });
            } else if (props.onReturn) {
              props.onReturn(next.value);
            }
          }).then(step);
        }
      };

      this.componentWillUnmount = () => {
        if (iter) {
          iter.return();
          iter = null;
        }
      };

      step();
    }
    return createElement(Component, { key: state.trigger }, state.view);
  };
};

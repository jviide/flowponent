import { Component, createElement } from "preact";

export default flow => {
  return function(props) {
    if (!this.state.trigger) {
      let iter = flow(props);

      const step = sentValue => {
        if (iter) {
          new Promise(trigger => {
            const next = iter.next(sentValue);
            if (!next.done) {
              this.setState({ trigger, view: next.value(trigger) });
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
    return createElement(
      Component,
      { key: this.state.trigger },
      this.state.view
    );
  };
};

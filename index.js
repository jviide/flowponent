import { Component, createElement } from "preact";

export default flow => {
  return function(props) {
    const state = this.state;

    if (!state.key) {
      let key = 1;
      let iter = flow(props);

      const step = (value, rejected) => {
        if (iter) {
          new Promise((resolve, reject) => {
            try {
              const next = rejected ? iter.throw(value) : iter.next(value);
              if (!next.done) {
                this.setState({
                  key: key++,
                  value: next.value(resolve, reject)
                });
              } else if (props.onReturn) {
                props.onReturn(next.value);
              }
            } catch (err) {
              if (props.onThrow) {
                props.onThrow(err);
              } else {
                this.setState({ key: -1, value: err });
              }
            }
          }).then(step, err => step(err, true));
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

    if (state.key < 0) {
      throw state.value;
    }
    return createElement(Component, { key: state.key }, state.value);
  };
};

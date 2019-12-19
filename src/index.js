export default flow => {
  return function(props) {
    const state = this.state;

    if (!state.started) {
      let iter = flow(props);

      const step = (value, rejected) => {
        const promise = new Promise((resolve, reject) => {
          let next;
          new Promise(resolve => {
            resolve((next = rejected ? iter.throw(value) : iter.next(value)));
          })
            .then(result => {
              if (iter) {
                if (!result.done) {
                  let view;
                  try {
                    view = result.value(resolve, reject);
                  } catch (err) {
                    return step(err, true);
                  }

                  this.setState({
                    started: true,
                    value: view
                  });

                  if (typeof next.then === "function") {
                    step(promise);
                  } else {
                    promise.then(step, err => step(err, true));
                  }
                } else if (props.onReturn) {
                  props.onReturn(result.value);
                }
              }
            })
            .catch(err => {
              if (iter) {
                if (props.onThrow) {
                  props.onThrow(err);
                } else {
                  this.setState({ failed: true, value: err });
                }
              }
            });
        });
      };

      this.componentWillUnmount = () => {
        if (iter) {
          iter.return();
          iter = null;
        }
      };

      step();
    }

    if (state.failed) {
      throw state.value;
    }
    return state.value;
  };
};

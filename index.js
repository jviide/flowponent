export default flow => {
  return function(props) {
    const state = this.state;

    if (!state.started) {
      let iter = flow(props);

      const step = (value, rejected) => {
        if (iter) {
          new Promise((resolve, reject) => {
            try {
              const next = rejected ? iter.throw(value) : iter.next(value);
              if (!next.done) {
                this.setState({
                  started: true,
                  value: next.value(resolve, reject)
                });
              } else if (props.onReturn) {
                props.onReturn(next.value);
              }
            } catch (err) {
              if (props.onThrow) {
                props.onThrow(err);
              } else {
                this.setState({ failed: true, value: err });
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

    if (state.failed) {
      throw state.value;
    }
    return state.value;
  };
};

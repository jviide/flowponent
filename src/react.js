import { Component } from "react";
import flowponent from "..";

export default flow => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {};

      const render = flowponent(flow);
      this.render = function() {
        const result = render.call(this, this.props);
        return result == null ? null : result;
      };
    }
  };
};

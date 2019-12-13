# flowponent [![npm](https://img.shields.io/npm/v/flowponent.svg)](https://www.npmjs.com/package/flowponent)

A small library for [Preact 10.x](https://github.com/preactjs/preact) for defining workflow-like evolving views via generators.

Here's the canonical counter example (also available [at Codesandbox](https://codesandbox.io/s/flowponent-in-action-ebfq2)):

```js
import { render } from "preact";
import { flowponent } from "flowponent";

const App = flowponent(function*({ step }) {
  let count = 0;

  for (;;) {
    count += yield (
      <div>
        <div>current value: {count}</div>
        <button onClick={step(1)}>+1</button>
        <button onClick={step(-1)}>-1</button>
      </div>
    );
  }
});

render(<App />, document.getElementById("root"));
```

For a more involved one see [here's a Codesandbox](https://codesandbox.io/s/flowponent-in-action-88vb9) demonstrating composition, additional props, timeouts and such:

[![A Codesandbox sandbox demonstrating flowponent](https://user-images.githubusercontent.com/19776768/70817209-c648f400-1dd9-11ea-9df0-3f87f73a7d1d.png)](https://codesandbox.io/s/flowponent-in-action-88vb9)

## Installation

```sh
$ npm install --save flowponent
```

## See Also

- The [tweet with the initial idea](https://twitter.com/jviide/status/1204492830594473985), but still using async generators.
- For a more sophisticated approach check out [`concur-js`](https://github.com/ajnsit/concur-js) from which this library ~~stole~~borrowed further ideas 🙂

## License

This library is licensed under the MIT license. See [LICENSE](./LICENSE).

# flowponent [![npm](https://img.shields.io/npm/v/flowponent.svg)](https://www.npmjs.com/package/flowponent)

A small library for [Preact 10.x](https://preactjs.com/) (and [React](https://reactjs.org/) - see ["Usage with React"](#usage-with-react)) for defining workflow-like evolving views via generators.

Here's the canonical counter example (also available [at Codesandbox](https://codesandbox.io/s/flowponent-in-action-ebfq2)):

```js
import { render } from "preact";
import flowponent from "flowponent";

const App = flowponent(function*() {
  let count = 0;

  for (;;) {
    count += yield resolve => (
      <div>
        <div>current value: {count}</div>
        <button onClick={() => resolve(1)}>+1</button>
        <button onClick={() => resolve(-1)}>-1</button>
      </div>
    );
  }
});

render(<App />, document.getElementById("root"));
```

For a more involved one see [here's a Codesandbox](https://codesandbox.io/s/flowponent-in-action-88vb9) demonstrating composition, additional props & cleanups upon unmount:

[![A Codesandbox sandbox demonstrating flowponent](https://user-images.githubusercontent.com/19776768/70826521-d10e8380-1def-11ea-82fd-0004f1caa6fc.png)](https://codesandbox.io/s/flowponent-in-action-88vb9)

## Installation

```sh
$ npm install --save flowponent
```

### A Note on React Support

The use flowponent with React, import from `"flowponent/react"` instead of `"flowponent"`:

```js
import React from "react";
import { render } from "react-dom";
import flowponent from "flowponent/react";
```

Otherwise it all works the same way as before. Here's a React example featuring a random selection of very good dogs: [Codesandbox](https://codesandbox.io/s/flowponentreact-in-action-8q16y).

## Async Mode

Async mode is activated by using async generators instead of regular ones. In fact, regular flowponents are actually just a special case of async ones! Here's the first example implemented with async flowponents:

```js
import { render } from "preact";
import flowponent from "flowponent";

const App = flowponent(function*() {
  let count = 0;

  for (;;) {
    const promise += yield resolve => (
      <div>
        <div>current value: {count}</div>
        <button onClick={() => resolve(1)}>+1</button>
        <button onClick={() => resolve(-1)}>-1</button>
      </div>
    );
    count += await promise;
  }
});

render(<App />, document.getElementById("root"));
```

This allows doing things between the time that the view has been rendered and `resolve` has been called.

Check out a bit more involved downloader widget example: [Codesandbox](https://codesandbox.io/s/flowponent-async-mode-in-action-97wk1)

## See Also

- The [tweet with the initial idea](https://twitter.com/jviide/status/1204492830594473985), but still using async generators.
- For a more sophisticated approach check out [`concur-js`](https://github.com/ajnsit/concur-js) from which this library ~~stole~~borrowed further ideas 🙂

## License

This library is licensed under the MIT license. See [LICENSE](./LICENSE).

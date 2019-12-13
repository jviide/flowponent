# flowponent

```js
import { render } from "preact";
import { flowponent } from "flowponent";

const App = flowponent(function*(step) {
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

## See Also

- The [tweet with the initial idea](https://twitter.com/jviide/status/1204492830594473985), but still using async generators.
- For a more sophisticated approach check out [`concur-js`](https://github.com/ajnsit/concur-js) from which this library ~~stole~~borrowed ideas 🙂

## License

This library is licensed under the MIT license. See [LICENSE](./LICENSE).

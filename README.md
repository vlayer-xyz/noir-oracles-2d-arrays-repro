# 2d-repro

This is a repro that shows that nargo does not support returning 2D arrays from oracles.
It can be seen without this repro by reading [Oracle docs](https://noir-lang.org/docs/how_to/how-to-oracles#step-2---write-an-rpc-server)

```ts
interface Value {
  inner: string,
}

interface SingleForeignCallParam {
  Single: Value,
}

interface ArrayForeignCallParam {
  Array: Value[],
}

type ForeignCallParam = SingleForeignCallParam | ArrayForeignCallParam;

interface ForeignCallResult {
  values: ForeignCallParam[],
}
```

Those type definitions show that it's only possible to return scalars or arrays of scallars from oracles, but not arrays of arrays.

Also - if one wants to return a struct that contains another struct aas a field - that will also fail.

## Repro steps

- `yarn install`
- `yarn start` to start oracle server
- `yarn prove` to run nargo prover

The last command will print: `Failed calling external resolver. JSON decode error: invalid type: map, expected a string at line 1 column 30`

Here is noir code in this repro

```rust
type TReturnElem = [Field; 1];
type TReturn = [TReturnElem; 1];

fn main() -> pub TReturn {
    repro_unconstrained()
}

#[oracle(repro)]
unconstrained fn repro_oracle() -> TReturn {}

unconstrained fn repro_unconstrained() -> TReturn {
    repro_oracle()
}
```
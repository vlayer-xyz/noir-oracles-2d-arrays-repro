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
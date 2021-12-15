export class LoadingState<T> {
  public data: T;
  public error: boolean = false;
  public loading: boolean = false;

  public reset(): LoadingState<T> {
    this.error = false;
    this.loading = false;

    return this;
  }

  public setErrorState(): LoadingState<T> {
    this.error = true;
    this.loading = false;

    return this;
  }

  public setSuccessState(data: T): LoadingState<T> {
    this.error = false;
    this.loading = false;
    this.data = data;

    return this;
  }
}

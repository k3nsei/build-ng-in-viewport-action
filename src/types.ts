export interface UnaryFunction<T, R> {
  (arg: T): R;
}

export type Consumer<T> = UnaryFunction<T, void>;

export interface Runnable {
  (): void;
}

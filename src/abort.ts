export type AbortSignal = 0 | 1;

export class Abort {
  private signalValue: AbortSignal = 0;

  public get signal(): AbortSignal {
    return this.signalValue;
  }

  public abort(): void {
    this.signalValue = 1;
  }
}

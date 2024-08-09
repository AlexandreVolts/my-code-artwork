export class ComplexNumber {
  constructor(public readonly real: number, public readonly imaginary: number) {}

  private apply(other: ComplexNumber, operation: (a: number, b: number) => number) {
    return new ComplexNumber(operation(this.real, other.real), operation(this.imaginary, other.imaginary));
  }

  public add = (other: ComplexNumber) => this.apply(other, (a, b) => a + b);
  public sub = (other: ComplexNumber) => this.apply(other, (a, b) => a - b);
  public scale = (value: number) => new ComplexNumber(this.real * value, this.imaginary * value);

  public mul(other: ComplexNumber) {
    const real = this.real * other.real - this.imaginary * other.imaginary;
    const imaginary = this.real * other.imaginary + this.imaginary * other.real;
  
    return new ComplexNumber(real, imaginary);
  }

  public sqrt() {
    const magnitude = Math.sqrt(Math.sqrt(this.real * this.real + this.imaginary * this.imaginary));
    const angle = Math.atan2(this.imaginary, this.real) / 2;

    return new ComplexNumber(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
  }
}
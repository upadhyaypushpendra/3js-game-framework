export default interface GameObject {
  id: string;
  start(): void;
  update(): void;
  end(): void;
}

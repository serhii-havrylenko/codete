export interface Image {
  id: string;
  title: string;
  created: number;
  details: string;
  src: string;
}

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

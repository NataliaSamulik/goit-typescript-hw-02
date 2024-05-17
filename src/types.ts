export interface Images {
  id: number | string;
  urls: {
    regular: string;
    small: string;
  };
  alt_description: string;
}

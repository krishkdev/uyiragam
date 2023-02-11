export interface ProductType {
  _id: any;
  image: string;
  name: string;
  slug: Slug;
  price: number;
  details: string;
}

export interface Slug {
  _type: string;
  current: string;
}

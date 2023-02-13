export interface ProductType {
  _id: any;
  image: string;
  name: string;
  slug: Slug;
  price: number;
  details: string;
  catogory: string; //spelled wrong in sanity fix it!
}

export interface Slug {
  _type: string;
  current: string;
}

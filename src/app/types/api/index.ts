//item
export type itemType = {
  id: string,
  name: string,
  category: {
    id: string,
    name:  string,
    slug:  string,
  }[],
  kinds:string[],
  price:string[],
  default:{
    lead:string,
    img:{
      url: string,
      height: string,
      width:string,
    }[],
    contents:string,
  },
  custom:any | null,
  contents:any | null
}

//itemList
export type itemListType = {
  contents:{
    id: string,
    name: string,
    category: {
      id: string,
      name:  string,
      slug:  string,
    }[],
    kinds:string[],
    price:string[],
  }[],
  totalCount: string,
  offset: string,
  limit: string,
}

//categories
export type categoriesType = {
  contents:{
    id: string,
    name: string,
    slug: string,
  }[],
  totalCount: string,
  offset: string,
  limit: string,
}

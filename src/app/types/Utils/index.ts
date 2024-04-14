//setActiveCategory
export type setActiveCategoryType = {
  data: {
    id: string;
    name: string;
    slug: string;
  }[],
  ID:string,
}

// meta
export type metaDataType = {
  title?: string
  description?: string
  url?: string
  type: "website" | "article"
  imageUrl?: string
}

export type metaDataObjType = {
  [K in string]: metaDataType;
};

export type contactFormAtomType = {
  sucess: boolean,
  contents: {
    name: string,
    error: string | "",
  }[],
}

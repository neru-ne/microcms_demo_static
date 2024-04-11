import { ReactNode } from "react";

//CommonButton
export type commonButtonType = {
  mode: "button" | "link",
  linkHref: "" | string,
  name: string,
  blank:boolean,
  kinds:"primary"|"secondary" | "other",
  onClick?: () => void,
}
//CategoryList
export type categoryListType = {
  list:{
    id: string;
    name: string;
    slug: string;
  }[],
  className:string,
  keyName:string,
  link: boolean,
}
//TagList
export type tagListType = {
  list:string[],
  className:string,
  keyName:string,
}
//ItemSlideshow
export type itemSlideshowType = {
  list:{
    url: string;
    height: string;
    width: string;
  }[],
  className:string,
  keyName:string,
}
//ErrorContentsArea
export type errorContentsAreaType = {
  data: any,
  error: any,
  buttonSetting?: commonButtonType,
}
//CustomerList
export type customerListType = {
  list: {
    fieldId: string;
    name: string;
    contents: string;
  }[],
  className: string,
  keyName: string,
}

//RepeatContents
export type repeatContentsType = {
  data: {
    [key: string]: any
  }[]
}

//PageHeader
export type pageHeaderType = {
  heading:boolean,
  children:ReactNode,
}

//searchFormType
export type searchFormType = {
  onClick: () => void,
}

//commonInputType
export type commonInputType = {
  name:string,
  id:string,
  value:string,
  className:string,
  title:string,
  placeholder:string,
  required:boolean,
  error?:string | "",
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
//commonTextareaType
export type commonTextareaType = {
  name:string,
  id:string,
  value:string,
  title:string,
  className:string,
  required:boolean,
  error?:string | "",
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
}
//commonCheckbox
export type commonCheckboxType = {
  name:string,
  id:string,
  value:string,
  disabled:boolean,
  className:string,
  title:string,
  checked:boolean,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
//commonRadioType
export type commonRadioType = {
  name:string,
  id:string,
  value:string,
  disabled:boolean,
  className:string,
  title:string,
  checked:boolean,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

//radioListType
export type radioListType = {
  input:string,
  required:boolean,
  name:string,
  contents:any,
}

//contactTableType
export type contactTableType = {
  title:string,
  required:boolean,
  children:ReactNode
}
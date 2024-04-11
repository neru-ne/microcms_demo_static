import { atom } from "recoil";

export const contactFormSuccessAtom = atom<boolean>({
  key: 'contactFormSuccessAtom',
  default: false,
});

export const contactFormNameAtom = atom<string>({
  key: 'contactFormNameAtom',
  default: "",
});
export const contactFormKindsAtom = atom<string>({
  key: 'contactFormKindsAtom',
  default: "会社に対するお問い合わせ",
});
export const contactFormContentsAtom = atom<string>({
  key: 'contactFormContentsAtom',
  default: "",
});
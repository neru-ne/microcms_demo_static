'use client';
import { Fragment, useState } from 'react';
import { useRecoilState } from 'recoil';
import { contactFormSuccessAtom, contactFormNameAtom, contactFormKindsAtom, contactFormContentsAtom } from '@/app/recoil/contactFormAtom'
import { postRequest } from '@/app/api'

//atom
import { CommonButton } from '@/app/components/atoms/button/CommonButton'
import { CommonTextarea } from '@/app/components/atoms/input/CommonTextarea'
import { CommonInput } from '@/app/components/atoms/input/CommonInput'
import { RadioList } from '@/app/components/atoms/list/RadioList'
import { ContactTable } from '@/app/components/atoms/table/ContactTable'

//types
import { commonButtonType, commonInputType, commonTextareaType, radioListType } from '@/app/types/components'

const NEXT_PUBLIC_MICROCMS_URL = process.env.NEXT_PUBLIC_MICROCMS_URL


export const ContactForm = () => {

  /**
   * cangeされた時、stateの変更
   * @param e 
   */
  const inputChange = (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const value = target.value;

    const contactFormOptionsCopy = [...contactFormOptions];
    const targetIndex = contactFormOptionsCopy.findIndex(object => object.name === target.name);

    const targetArray = contactFormOptionsCopy[targetIndex];

    targetArray.value = value;

    if (target.name === "contact-kinds") {
      const contentsArray = contactFormOptionsCopy[targetIndex].contents;

      if (contentsArray) {
        contentsArray.forEach((item) => {
          if (item.value === value) {
            item.checked = true;
          } else {
            item.checked = false;
          }
        })
      }
      setContactFormKinds(value)
    } else {
      target.value = value
      if (target.name === "contact-name") {
        setContactFormName(value)
      } else if (target.name === "contact-contents") {
        setContactFormContents(value)
      }
    }
    setContactFormOptions(contactFormOptionsCopy)


  }

  //recoil
  const [contactFormSuccess, setContactFormSuccess] = useRecoilState(contactFormSuccessAtom); //フォーム入力状態
  const [contactFormName, setContactFormName] = useRecoilState(contactFormNameAtom);
  const [contactFormKinds, setContactFormKinds] = useRecoilState(contactFormKindsAtom);
  const [contactFormContents, setContactFormContents] = useRecoilState(contactFormContentsAtom);

  //useState
  const [formFlg, setformFlg] = useState<"contact" | "confirm" | "thanks">("contact");//フォーム状態

  const [contactFormNameError, setContactFormNameError] = useState("");
  const [contactFormContentsError, setContactFormContentsError] = useState("");
  const [apiError, setApiError] = useState(false);

  const option = [
    {
      input: "text",
      name: "contact-name",
      id: "contact-name",
      value: contactFormName,
      className: "",
      title: "お名前",
      placeholder: "お名前",
      required: true,
      onChange: inputChange,
    },
    {
      input: "radio",
      name: "contact-kinds",
      value: contactFormKinds,
      required: false,
      contents: [
        {
          name: "contact-kinds",
          id: "contact-kinds-1",
          value: "会社に対するお問い合わせ",
          className: "",
          title: "会社に対するお問い合わせ",
          disabled: false,
          checked: true,
          onChange: inputChange,
        },
        {
          name: "contact-kinds",
          id: "contact-kinds-2",
          value: "サービスに関するお問い合わせ",
          className: "",
          title: "サービスに関するお問い合わせ",
          disabled: false,
          checked: false,
          onChange: inputChange,
        },
        {
          name: "contact-kinds",
          id: "contact-kinds-3",
          value: "その他",
          className: "",
          title: "その他",
          disabled: false,
          checked: false,
          onChange: inputChange,
        },
      ]
    },
    {
      input: "textarea",
      name: "contact-contents",
      id: "contact-contents",
      title: "お問い合わせ内容",
      value: contactFormContents,
      className: "",
      required: true,
      onChange: inputChange,
    },
  ];
  const [contactFormOptions, setContactFormOptions] = useState(option);//フォームデータ


  /**
   * バリデーション
   * @param name 
   * @param index 
   * @param data 
   */
  const validation = () => {

    const emptyCheck = (data: any) => {
      if (!data) {
        return "必須項目です"
      } else {
        return ""
      }
    }

    const emptyCheckName = emptyCheck(contactFormName);
    const emptyCheckContents = emptyCheck(contactFormContents);

    if (emptyCheckName || emptyCheckContents) {
      setContactFormSuccess(false)

      setContactFormNameError(emptyCheckName);
      setContactFormContentsError(emptyCheckContents);

      return false;

    } else {
      setContactFormSuccess(true);
      setContactFormNameError("");
      setContactFormContentsError("");
      return true;
    }
  }

  /**
   * 確認ボタン
   */
  const contactConfirm = () => {
    const success = validation();
    if (success) {
      setformFlg("confirm")
    }
  }
  /**
   * 戻るボタン
   */
  const contactConfirmBack = () => {
    setformFlg("contact")
  }

  /**
   * 送信ボタン
   */
  const contactApply = () => {

    const requestData = {
      "contact-name": contactFormName,
      "contact-kinds": contactFormKinds,
      "contact-contents": contactFormContents,
      "contact-status": false,
    }

    postRequest(`${NEXT_PUBLIC_MICROCMS_URL}/contact`, requestData).then((res) => {
      setformFlg("thanks")
    }).catch((err) => {
      setApiError(true);
      throw new Error(err);
    });

  }


  const confirmButton: commonButtonType = {
    mode: "button",
    linkHref: "",
    name: "確認",
    blank: false,
    kinds: "primary",
    onClick: contactConfirm
  }
  const confirmBackButton: commonButtonType = {
    mode: "button",
    linkHref: "",
    name: "戻る",
    blank: false,
    kinds: "other",
    onClick: contactConfirmBack
  }
  const applyButton: commonButtonType = {
    mode: "button",
    linkHref: "",
    name: "送信する",
    blank: false,
    kinds: "primary",
    onClick: contactApply
  }

  return (
    <>
      {
        !apiError ? (
          <>
            {
              formFlg === "contact" && (
                <div>
                  <div>
                    {
                      contactFormOptions.map((item, index) => {
                        switch (item.input) {
                          case "text":
                            const inputOption = item as commonInputType;
                            return (
                              <div key={`${item.id}-${index}`}>
                                <CommonInput {...inputOption} error={contactFormNameError} />
                              </div>
                            )
                          case "radio":
                            const radopOption = item as radioListType;
                            return <Fragment key={`${item.id}-${index}`}><RadioList {...radopOption} /></Fragment>
                          case "textarea":
                            const textareaOption = item as commonTextareaType;
                            return <div key={`${item.id}-${index}`}><CommonTextarea {...textareaOption} error={contactFormContentsError} /></div>
                          default:
                            return <Fragment key={`${item.id}-${index}`}></Fragment>
                        }
                      })
                    }
                  </div>
                  <div className='mt-10'>
                    <CommonButton {...confirmButton} />
                  </div>
                </div>
              )
            }
            {
              formFlg === "confirm" && (
                <>
                  <div>
                    <ContactTable title='お名前' required={false}>{contactFormName}</ContactTable>
                    <ContactTable title='お問い合わせ種類' required={false}>{contactFormKinds}</ContactTable>
                    <ContactTable title='お問い合わせ内容' required={false}>{contactFormContents}</ContactTable>
                  </div>
                  <div className='flex gap-4 mt-10'>
                    <CommonButton {...confirmBackButton} />
                    <CommonButton {...applyButton} />
                  </div>
                </>
              )
            }
            {
              formFlg === "thanks" && (
                <div>
                  <p className='text-center'>Thank you!</p>
                </div>
              )
            }
          </>
        ) : (
          <p>予期せぬエラーが発生しました。</p>
        )
      }
    </>
  )
}
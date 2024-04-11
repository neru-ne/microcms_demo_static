import { CommonRadio } from "@/app/components/atoms/input/CommonRadio"
import { ContactTable } from '@/app/components/atoms/table/ContactTable'
import { radioListType, commonRadioType } from '@/app/types/components'

export const RadioList = (props: radioListType) => {
  const { contents, required } = props;
  const list: commonRadioType[] = contents;
  return (
    <>
      <ContactTable required={required} title="お問い合わせ種類">
        {
          0 < list.length && (
            <>
              <ul>
                {
                  list.map((item, index) => {
                    const itemOption = { ...item }
                    return (
                      <li key={`radio-list-${index}`}>
                        <CommonRadio {...itemOption} />
                      </li>
                    )
                  })
                }
              </ul>
            </>
          )
        }
      </ContactTable>

    </>
  )
}
import { ContactTable } from '@/app/components/atoms/table/ContactTable'
import { commonTextareaType } from '@/app/types/components'


export const CommonTextarea = (props: commonTextareaType) => {
  const {
    name,
    id,
    value,
    className,
    title,
    required,
    error,
    onChange,
  } = props;

  return (
    <>
      <ContactTable title={title} required={required}>
        <label htmlFor={id}>
          <textarea name={name} id={id} className={`${className}`} value={value} onChange={onChange} >
          </textarea>
        </label>
        {
          error && <p className='mt-2 text-red-500'>{error}</p>
        }
      </ContactTable>
    </>
  )
}

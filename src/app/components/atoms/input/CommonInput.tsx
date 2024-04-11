import { ContactTable } from '@/app/components/atoms/table/ContactTable'
import { commonInputType } from '@/app/types/components'

export const CommonInput = (props: commonInputType) => {
  const {
    name,
    id,
    value,
    className,
    title,
    placeholder,
    error,
    required,
    onChange,
  } = props;

  return (
    <>
      <ContactTable title={title} required={required}>
        <label htmlFor={id}>
          <input type="text" name={name} value={value} id={id} className={`${className}`} placeholder={placeholder} onChange={onChange} />
        </label>
        {
          error && <p className='mt-2 text-red-500'>{error}</p>
        }
      </ContactTable>
    </>
  )
}

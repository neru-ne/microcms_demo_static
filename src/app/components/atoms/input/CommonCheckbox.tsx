import { commonCheckboxType } from '@/app/types/components'

export const CommonCheckbox = (props: commonCheckboxType) => {
  const {
    name,
    id,
    value,
    disabled,
    className,
    title,
    checked,
    onChange,
  } = props;

  return (
    <>
      <label htmlFor={id}>
        <input type="checkbox" name={name} value={value} id={id} className={`${className}`} disabled={disabled} onChange={onChange} checked={checked} />
        {title}
        </label>
    </>
  )
}

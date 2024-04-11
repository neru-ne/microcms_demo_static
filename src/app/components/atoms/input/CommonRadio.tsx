import { commonRadioType } from '@/app/types/components'

export const CommonRadio = (props: commonRadioType) => {
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
        <input type="radio" name={name} value={value} id={id} className={`${className}`} disabled={disabled} onChange={onChange} checked={checked} />
        {title}
        </label>
    </>
  )
}

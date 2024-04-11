import { contactTableType } from '@/app/types/components'
export const ContactTable = (props: contactTableType) => {
  const { title, required, children } = props;
  return (
    <>
      <div className='flex gap-4 items-center mt-4'>
        <div className='flex gap-2 items-center w-1/4 max-w-[400px]'>
          {
            required && <span className='text-[12px] text-white bg-red-600 block py-[2px] px-[4px]'>必須</span>
          }
          <p>{title}</p>
        </div>
        <div className='w-3/4 max-w-[calc(100% - 400px)] whitespace-pre-wrap'>
          {children}
        </div>
      </div>
    </>
  )
}
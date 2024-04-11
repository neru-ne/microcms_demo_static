import { customerListType } from '@/app/types/components'

export const CustomerList = (props: customerListType) => {
  const { list,className,keyName} = props;
  return (
    0 < list.length && (
      <div className={`${className} flex flex-wrap gap-4`}>
        {
          list.map((item, index) => {
            return (
              <div key={`${keyName}${index}`} className='rounded-lg border border-slate-500 p-4 w-[calc(100%/3)]'>
                <p className='font-bold mb-2'>{item.name}</p>
                <div className='whitespace-pre-wrap'>{item.contents}</div>
              </div>
            )
          })
        }
      </div>
    )
  )
}

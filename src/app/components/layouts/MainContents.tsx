import { ReactNode } from "react";
interface Props {
  children: ReactNode;
}

export const MainContents = (props:Props) => {
  const {children} = props;
  return (
    <>
      <div className="mainContents py-20">
        {children}
      </div>
    </>
  )
}
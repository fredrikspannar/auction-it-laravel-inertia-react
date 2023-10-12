import React from "react";

type Props = {
    children: string | JSX.Element | JSX.Element[] | (() => JSX.Element)
  }


export const Layout = ({children}:Props) => {
    return (
        <div className="containerContent">
            {children}
        </div>
    )
}

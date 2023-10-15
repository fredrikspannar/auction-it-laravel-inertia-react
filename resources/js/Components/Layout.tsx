import React from "react";

type Props = {
    children: JSX.Element | JSX.Element[];
  }


export const Layout = ({children}:Props) => {
    return (
        <div className="containerContent">
            {children}
        </div>
    )
}

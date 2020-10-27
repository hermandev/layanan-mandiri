import React from 'react'
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const BuktiRoute = ({ component: Component, ...rest }) => {
  const pasien = useSelector(data => data.formulir.bukti);

  return (
    <>
      <Route
        {...rest}
        render={props =>
          pasien === null ? (
            <Redirect to="/" />
          ) : (
            <Component {...props} />
          )
        }
      />
    </>
  );
}

export default BuktiRoute

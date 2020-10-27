import React from 'react'
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const FormulirRoute = ({ component: Component, ...rest }) => {
  const pasien = useSelector(data => data.formulir.pasien);

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

export default FormulirRoute

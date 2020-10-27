import React, { useState } from "react";
import QrReader from "react-qr-reader";
import { Row, Col } from "react-flexbox-grid";
import { useDispatch } from "react-redux";
import { cetakSEP } from "../actions/formulir";

const ScanQrCode = ({ norm }) => {
  const [code, setCode] = useState(null);
  const dispatch = useDispatch();
  const handleScan = data => {
    if (data) {
      setCode(data);
      dispatch(
        cetakSEP(norm, (err, result) => {
          if (err) {
            console.log("Cetak gagal");
          } else {
            console.log("Cetak");
          }
        })
      );
    }
  };
  const handleError = error => {
    console.log(error);
  };
  return (
    <Row xs="true" center="md" style={{ marginTop: 20 }}>
      <Col xs={12} md={6}>
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%" }}
        />
        <div>
          <p>QRCODE => {code}</p>
        </div>
      </Col>
    </Row>
  );
};

export default ScanQrCode;

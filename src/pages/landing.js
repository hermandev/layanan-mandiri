import React, { useState } from "react";
import { Input, Tooltip, Form, Button } from "antd";
import { Row, Col } from "react-flexbox-grid";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Popup from "reactjs-popup";
// import "reactjs-popup/dist/index.css";
import "./formulir.css";
import dokter from "../assets/img/dokter.png";
import InputNumber from "../components/InputNumber";
import { checkNorm } from "../actions/formulir";

function Landing() {
  const [norm, setNorm] = useState("");
  const dispatch = useDispatch();
  const load = useSelector((data) => data.formulir.check_load);
  const history = useHistory();

  const onChange = (e) => {
    setNorm(e);
  };

  const onFinish = () => {
    dispatch(checkNorm({ norm, history }));
  };

  const PopupExample = () => (
    <Popup defaultOpen modal nested>
      {(close) => (
        <Row xs="true">
          <Col xs={12} className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            <iframe className="frame-video" src="https://www.youtube.com/embed/dMpP4Q-IinU?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </Col>
        </Row>
      )}
    </Popup>
  );

  return (
    <Row xs="true">
      <Col xs={12}>
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <h1 className="text-layanan">Layanan Pendaftaran Rawat Jalan</h1>
          <img src={dokter} alt="" className="img-dokter" />
        </div>
        <Row xs="true" center="md">
          <Col xs={12} md={4}>
            <div className="form-norm" style={{ marginTop: 20 }}>
              <Form onFinish={onFinish}>
                <Form.Item>
                  <InputNumber
                    style={{ textAlign: "center" }}
                    onChange={onChange}
                    value={norm}
                    size="large"
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    loading={load}
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="btn-formulir"
                  >
                    Ambil Formulir
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </Col>
      <PopupExample />
    </Row>
  );
}

export default Landing;

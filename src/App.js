import React from "react";
import "./App.css";
import { Layout, Button, Modal } from "antd";
import { Row, Col } from "react-flexbox-grid";
import {
  ProfileOutlined,
  PhoneOutlined,
  ReconciliationOutlined
} from "@ant-design/icons";
import { Switch, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Formulir from "./pages/formulir";
import FormulirRoute from "./utils/FormulirRoute";
import BuktiRoute from "./utils/Bukti";
import { Petunjuk, Kontak, JadwalPoli } from "./components/Petunjuk";
import SEP from "./components/SEP";
import ScanQrCode from "./components/ScanQrCode";

const { Header, Content, Footer } = Layout;
function App() {
  return (
    <Layout>
      <Header className="header" style={{ backgroundColor: "#3b95f5" }}>
        <Row xs="true">
          <Col xs={12} md={4}>
            <div
              className="logo"
              style={{ display: "flex", alignItems: "center" }}
            >
              <img
                src="https://3.bp.blogspot.com/-L4JAWT5SJJ4/UW59LHvP3aI/AAAAAAAANJY/anTD4bAo9b4/s1600/LOGO+KABUPATEN+GORONTALO.png"
                alt=""
                style={{ width: 30, height: 30, marginBottom: 8 }}
              />
              <h1 style={{ color: "#FFF" }}>RSUD DUNDA LIMBOTO</h1>
            </div>
          </Col>
          <Col md={8} className="menu-head">
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div style={{ marginRight: 10 }}>
                <Button
                  type="primary"
                  icon={<ProfileOutlined />}
                  onClick={() => Modal.info(Petunjuk)}
                >
                  Baca Petunjuk
                </Button>
              </div>
              <div style={{ marginRight: 10 }}>
                <Button
                  type="primary"
                  icon={<ReconciliationOutlined />}
                  onClick={() => Modal.info(JadwalPoli)}
                >
                  Jadwal Pelayanan
                </Button>
              </div>

              <div>
                <Button
                  type="primary"
                  icon={<PhoneOutlined />}
                  onClick={() => Modal.info(Kontak)}
                >
                  Hubungi Kami
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Header>
      <Content style={{ padding: "0 20px" }}>
        <Route exact path="/" component={Landing} />
        <FormulirRoute exact path="/formulir" component={Formulir} />
        <BuktiRoute exact path="/bukti-pendaftaran" component={SEP} />
      </Content>
      <Footer
        style={{ textAlign: "center", marginTop: 50 }}
        className="footers"
      >
        IT RSUD DUNDA LIMBOTO - Copy Right © {new Date().getFullYear()}
      </Footer>
      <div className="menu-footer">
        <div style={{}}>
          <Button
            type=""
            icon={<ProfileOutlined />}
            onClick={() => Modal.info(Petunjuk)}
          >
            Petunjuk
          </Button>
        </div>
        <div style={{}}>
          <Button
            type=""
            icon={<ReconciliationOutlined />}
            onClick={() => Modal.info(JadwalPoli)}
          >
            Jadwal
          </Button>
        </div>

        <div>
          <Button
            type=""
            icon={<PhoneOutlined />}
            onClick={() => Modal.info(Kontak)}
          >
            Kontak
          </Button>
        </div>
      </div>
    </Layout>
  );
}

export default App;

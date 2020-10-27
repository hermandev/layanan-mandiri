import React, { useState, useEffect } from "react";
import { Card, Divider, Alert, Button } from "antd";
import { Row, Col } from "react-flexbox-grid";
import { useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import { FileTextOutlined, ScanOutlined } from "@ant-design/icons";
import { css } from "@emotion/core";
import { HashLoader } from "react-spinners";
import QRCode from "react-qr-code";
import { url } from "../config";
import "./style.css";
const ScanQrCodePage = React.lazy(() => import("./ScanQrCode"));

const override = css`
  display: block;
  margin: 0 auto;
`;

const loading = () => (
  <div className="sweet-loading">
    <HashLoader css={override} size={150} color={"#70a1ff"} loading={true} />
  </div>
);

const SEP = () => {
  const bukti = useSelector((data) => data.formulir.bukti);
  const poli = useSelector((data) => data.formulir.poliklinik);
  const [page, setPage] = useState(false);

  return (
    <React.Suspense fallback={loading()}>
      <Row xs="true" center="md" style={{ marginTop: 20 }}>
        <Col xs={12} md={6}>
          {page ? (
            <ScanQrCodePage norm={bukti !== null && bukti.NORM} />
          ) : (
            <Card
              style={{ borderRadius: 8, position: "relative" }}
              className="card-sep"
            >
              <div class="ribbon ribbon-top-left">
                {bukti !== null && bukti.KEPESERTAAN === "BPJS" && (
                  <>
                    {bukti !== null && bukti.STATUS === 0 ? (
                      <span style={{ backgroundColor: "#74b9ff" }}>
                        STATUS PENDING
                      </span>
                    ) : bukti !== null && bukti.STATUS_BPJS === 0 ? (
                      <span style={{ backgroundColor: "#74b9ff" }}>
                        STATUS PENDING
                      </span>
                    ) : bukti !== null && bukti.STATUS_BPJS === 1 ? (
                      <span style={{ backgroundColor: "#2ecc71" }}>
                        STATUS DITERIMA
                      </span>
                    ) : (
                      bukti !== null &&
                      bukti.STATUS_BPJS === 2 && (
                        <span style={{ backgroundColor: "#e74c3c" }}>
                          STATUS DITOLAK
                        </span>
                      )
                    )}
                  </>
                )}

                {bukti !== null && bukti.KEPESERTAAN === "UMUM" && (
                  <>
                    {bukti !== null && bukti.STATUS === 0 ? (
                      <span style={{ backgroundColor: "#74b9ff" }}>
                        STATUS PENDING
                      </span>
                    ) : bukti !== null && bukti.STATUS === 1 ? (
                      <span style={{ backgroundColor: "#2ecc71" }}>
                        STATUS DITERIMA
                      </span>
                    ) : (
                      <span style={{ backgroundColor: "#e74c3c" }}>
                        STATUS DITOLAK
                      </span>
                    )}
                  </>
                )}
              </div>
              <h3>
                PEMERINTAH KABUPATEN GORONTALO RSUD DR. MM. DUNDA LIMBOTO BUKTI
                PENDAFTARAN ONLINE
              </h3>
              <Divider />
              <div className="card-sep-body" style={{ textAlign: "center" }}>
                <div style={{ textTransform: "uppercase", fontWeight: "bold" }}>
                  <span
                    style={{
                      fontSize: ".9em",
                      color: "#a2aeae",
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    NO. REGISTRASI
                  </span>
                  <h2
                    style={{
                      fontSize: "1.5em",
                      color: "#525252",
                      padding: 0,
                      margin: 0,
                      fontWeight: "bold",
                    }}
                  >
                    {bukti !== null && bukti.NO_REGIS}
                  </h2>
                </div>

                <div style={{ textTransform: "uppercase", fontWeight: "bold" }}>
                  <span style={{ fontSize: ".9em", color: "#a2aeae" }}>
                    NOMR / NAMA
                  </span>
                  <h2
                    style={{
                      fontSize: "1.5em",
                      color: "#525252",
                      margin: 0,
                      fontWeight: "bold",
                    }}
                  >
                    {bukti !== null && bukti.NORM + "/" + bukti.NAMA}
                  </h2>
                </div>

                <div style={{ textTransform: "uppercase", fontWeight: "bold" }}>
                  <span style={{ fontSize: ".9em", color: "#a2aeae" }}>
                    POLI TUJUAN
                  </span>
                  <h2
                    style={{
                      fontSize: "1.5em",
                      color: "#525252",
                      margin: 0,
                      fontWeight: "bold",
                    }}
                  >
                    {poli[5 - 1].nama}
                  </h2>
                </div>

                <div style={{ textTransform: "uppercase", fontWeight: "bold" }}>
                  <span style={{ fontSize: ".9em", color: "#a2aeae" }}>
                    KEPESERTAAN
                  </span>
                  <h2
                    style={{
                      fontSize: "1.5em",
                      color: "#525252",
                      margin: 0,
                      fontWeight: "bold",
                    }}
                  >
                    {bukti !== null && bukti.KEPESERTAAN}
                  </h2>
                </div>

                <div style={{ textTransform: "uppercase", fontWeight: "bold" }}>
                  <span style={{ fontSize: ".9em", color: "#a2aeae" }}>
                    TGL. PENDAFTARAN
                  </span>
                  <h2
                    style={{
                      fontSize: "1.5em",
                      color: "#525252",
                      margin: 0,
                      fontWeight: "bold",
                    }}
                  >
                    {bukti !== null &&
                      moment(bukti.TGL_DAFTAR).format("YYYY/MM/DD")}
                  </h2>
                </div>
                <div>
                  {bukti !== null && bukti.STATUS === 0 ? (
                    <Alert
                      message="Pendaftaran Berhasil! Silahkan tunggu di Rumah Aja! pendaftaran Anda sedang diproses Petugas Loket Pendaftaran"
                      type="info"
                      showIcon
                    />
                  ) : (
                    bukti.STATUS === 2 && (
                      <>
                        {bukti.STATUS_BPJS === 2 && (
                          <Alert message={bukti.PESAN} type="error" showIcon />
                        )}
                      </>
                    )
                  )}
                </div>
              </div>

              {bukti !== null &&
                bukti.KEPESERTAAN === "BPJS" &&
                bukti !== null &&
                bukti.FILE_SEP !== null && (
                  <div style={{ textAlign: "center" }}>
                    <p>
                      Scan QRCODE dibawah ini untuk mencetak SEP pada anjungan{" "}
                      <strong>Layanan Mandiri</strong> di RSUD DUNDA
                    </p>
                    {/*  <Button
                      type="primary"
                      onClick={() => setPage(!page)}
                      style={{
                        backgroundColor: "#3498db",
                        color: "#FFF",
                        borderRadius: 5,
                        display: "inline-block",
                        paddingLeft: 20,
                        paddingRight: 20,
                        paddingTop: 10,
                        paddingBottom: 10
                      }}
                    >
                      <ScanOutlined /> Scan QRCODE
                    </Button>
                    */}
                    <QRCode value={bukti.NO_REGIS} level="H" />
                    <p>Atau</p>
                    <a
                      type="primary"
                      href={`${url}/file/${bukti.FILE_SEP}`}
                      target="_blank"
                      style={{
                        backgroundColor: "#3498db",
                        color: "#FFF",
                        borderRadius: 5,
                        display: "inline-block",
                        paddingLeft: 20,
                        paddingRight: 20,
                        paddingTop: 10,
                        paddingBottom: 10,
                      }}
                    >
                      <FileTextOutlined /> Download SEP
                    </a>
                  </div>
                )}

              <Divider />
              <div className="card-sep-footer">
                {bukti !== null && bukti.KEPESERTAAN === "BPJS" ? (
                  <>
                    {bukti.STATUS === 0 && (
                      <p>
                        Terimakasih telah melakukan pendaftaran online,
                        Diharapkan datang lebih awal sebelum jam pelayanan
                        selesai... Simpan bukti pendaftaran ini dengan baik!
                      </p>
                    )}
                    {bukti.STATUS === 1 && (
                      <p>
                        Terimakasih telah melakukan pendaftaran online,
                        Diharapkan datang lebih awal sebelum jam pelayanan
                        selesai... Simpan bukti pendaftaran ini dengan baik!
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    {bukti.STATUS === 1 && (
                      <p>
                        Silahkan menuju kasir untuk melakukan pembayaran dengan
                        membawa bukti pendaftaran ini, Diharapkan datang lebih
                        awal sebelum jam pelayanan selesai... Simpan bukti
                        pendaftaran ini dengan baik!
                      </p>
                    )}
                  </>
                )}
              </div>
            </Card>
          )}
        </Col>
      </Row>
    </React.Suspense>
  );
};

export default SEP;

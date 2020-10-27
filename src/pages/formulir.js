import React, { useState, useEffect } from "react";
import { Row, Col } from "react-flexbox-grid";
import {
  Upload,
  message,
  Button,
  DatePicker,
  Card,
  Input,
  Form,
  Select,
  Radio
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  ReconciliationOutlined,
  CloseSquareOutlined,
  LoadingOutlined,
  PlusOutlined
} from "@ant-design/icons";
import moment from "moment";
import {
  getSMF,
  getDokter,
  clearPasien,
  daftarkanFormulir,
  getKeperluan
} from "../actions/formulir";
import { url } from "../config";
const { Option } = Select;
const dateFormat = "YYYY/MM/DD";

function Formulir() {
  const dispatch = useDispatch();
  const pasien = useSelector(data => data.formulir.pasien);
  const poliklinik = useSelector(data => data.formulir.poliklinik);
  const keperluan = useSelector(data => data.formulir.keperluan);
  const dataPaket = useSelector(data => data.formulir.paket);
  const dataSMF = useSelector(data => data.formulir.smf);
  const dataDokter = useSelector(data => data.formulir.dokter);
  const history = useHistory();

  const [loadingKtp, setLoadingKtp] = useState(false);
  const [imageKTP, setImageKTP] = useState(false);
  const [loadingRujukan, setLoadingRujukan] = useState(false);
  const [imageRujukan, setImageRujukan] = useState(false);
  const [loadingKontrol, setLoadingKontrol] = useState(false);
  const [imageKontrol, setImageKontrol] = useState(false);

  const [fotoKTP, setFotoKTP] = useState("");
  const [fotoRujukan, setFotoRujukan] = useState("");
  const [fotoKontrol, setFotoKontrol] = useState("");

  const [norm, setNorm] = useState("");
  const [booking, setBooking] = useState("");
  const [nik, setNik] = useState("");
  const [nama, setNama] = useState("");
  const [tgl_lahir, setTgl_lahir] = useState("");
  const [kelamin, setKelamin] = useState(1);
  const [poli, setPoli] = useState("");
  const [kepesertaan, setKepesertaan] = useState("");
  const [bpjs, setBpjs] = useState("");
  const [nosurat, setNosurat] = useState("");
  const [jawaban, setJawaban] = useState(null);
  const [perlu, setPerlu] = useState("");

  useEffect(() => {
    setNorm(pasien.NORM);
    setNama(pasien.NAMA);
    setTgl_lahir(pasien.TANGGAL_LAHIR);
    setKelamin(pasien.JENIS_KELAMIN);
    dispatch(getKeperluan());
  }, []);

  const poliChange = (e, i) => {
    setPoli(e);
    // dispatch(getSMF(e));
  };

  const perluChange = e => {
    setPerlu(e);
  };

  const smfChange = (e, i) => {
    // setSmf(i.children);
    dispatch(getDokter(e));
  };

  const dokterChange = (e, i) => {
    // setDokter(i.children);
  };

  const pakeChange = (e, i) => {
    // setPaket(i.children);
  };

  const bookingChange = (e, j) => {
    setBooking(j);
  };

  const checkJadwal = hari => {
    console.log(JSON.stringify(hari.senin));
  };

  const onFinish = () => {
    const data = {
      norm: norm,
      nik: nik,
      nama: nama,
      tgl_lahir: tgl_lahir,
      tgl_booking: booking,
      kelamin: kelamin,
      poliklinik: poli,
      kepesertaan: kepesertaan,
      keperluan: perlu,
      jenis_rujukan: jawaban,
      no_bpjs: bpjs,
      no_rujukan: nosurat,
      foto_ktp: fotoKTP,
      foto_rujukan: fotoRujukan,
      foto_kontrol: fotoKontrol
    };
    if (fotoKTP === "" || fotoRujukan === "" || fotoKontrol === "") {
      if (fotoKTP !== "") {
        return dispatch(daftarkanFormulir(data, history));
      } else {
        message.warning(
          "Silahkan Upload File yang di butuhkan terlebih dahulu"
        );
      }
    } else {
      dispatch(daftarkanFormulir(data, history));
    }
  };

  const onFinishFailed = () => {
    message.warning("Form formulir belung lengkap");
  };

  const btnBatal = () => {
    dispatch(clearPasien());
    history.push("/");
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = file => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 7;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChangeKTP = info => {
    if (info.file.status === "uploading") {
      setLoadingKtp(true);
      return;
    }
    if (info.file.status === "done") {
      setFotoKTP(info.file.response.file);
      getBase64(info.file.originFileObj, imageUrl => {
        setImageKTP(imageUrl);
        setLoadingKtp(false);
      });
    }
  };

  const handleChangeRujukan = info => {
    if (info.file.status === "uploading") {
      setLoadingRujukan(true);
      return;
    }
    if (info.file.status === "done") {
      setFotoRujukan(info.file.response.file);
      getBase64(info.file.originFileObj, imageUrl => {
        setImageRujukan(imageUrl);
        setLoadingRujukan(false);
      });
    }
  };

  const handleChangeKontrol = info => {
    if (info.file.status === "uploading") {
      setLoadingKontrol(true);
      return;
    }
    if (info.file.status === "done") {
      setFotoKontrol(info.file.response.file);
      getBase64(info.file.originFileObj, imageUrl => {
        setImageKontrol(imageUrl);
        setLoadingKontrol(false);
      });
    }
  };

  const uploadButtonKTP = (
    <div>
      {loadingKtp ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  const uploadButtonRujukan = (
    <div>
      {loadingRujukan ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  const uploadButtonKontrol = (
    <div>
      {loadingKontrol ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

 

  return (
    <Row xs="true" style={{ marginTop: 20 }}>
      <Col xs={12}>
        <Row center="xs">
          <Col xs={12} md={8}>
            <Card
              title="Lengkapi Formulir Pendaftaran Berikut Ini"
              headStyle={{
                textAlign: "left",
                backgroundColor: "#3b95f5",
                color: "#FFF"
              }}
            >
              <Form
                onFinish={onFinish}
                name="formulir"
                onFinishFailed={onFinishFailed}
              >
                <Card
                  title="Tanggal Rencana Pemeriksaan"
                  size="small"
                  headStyle={{
                    textAlign: "center",
                    fontWeight: "bold",
                    border: 0,
                    fontSize: 20
                  }}
                  style={{ border: 0 }}
                >
                  <Form.Item
                    name="boking"
                    rules={[
                      { required: true, message: "Atur tanggal pemeriksaan" }
                    ]}
                  >
                    <DatePicker
                      // value={booking}
                      onChange={bookingChange}
                      placeholder="Pilih Tanggal Pemeriksaan"
                    />
                  </Form.Item>
                </Card>

                <Card
                  title="Masukan Data Pasien"
                  size="small"
                  headStyle={{
                    textAlign: "left",
                    fontWeight: "bold",
                    border: 0,
                    fontSize: 20
                  }}
                  style={{ border: 0 }}
                >
                  <Form.Item>
                    <Input
                      value={norm}
                      placeholder="No. Rekam Medik"
                      disabled
                    />
                  </Form.Item>
                  <Form.Item
                    name="nik"
                    rules={[{ required: true, message: "Nik harus diisi!!!" }]}
                  >
                    <Input
                      value={nik}
                      onChange={nik => setNik(nik.target.value)}
                      placeholder="Masukan Nik"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Input
                      value={nama}
                      onChange={e => setNama(e.target.value)}
                      placeholder="Masukan Nama"
                      // disabled
                    />
                  </Form.Item>
                  <Form.Item>
                    <DatePicker
                      value={moment(tgl_lahir, dateFormat)}
                      format={dateFormat}
                      placeholder="Tanggal Lahir"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Select
                      placeholder="Pilih Jenis Kelamin"
                      onChange={kelamin => setKelamin(kelamin)}
                      style={{ textAlign: "left" }}
                      value={kelamin}
                    >
                      <Option value={1}>Laki-Laki</Option>
                      <Option value={2}>Perempuan</Option>
                    </Select>
                  </Form.Item>
                </Card>

                <Card
                  title="Masukan Data Tujuan"
                  size="small"
                  headStyle={{
                    textAlign: "left",
                    fontWeight: "bold",
                    border: 0,
                    fontSize: 20
                  }}
                  style={{ border: 0 }}
                >
                  <Form.Item
                    name="poli"
                    rules={[{ required: true, message: "Pilih poliklinik" }]}
                  >
                    <Select
                      placeholder="Poliklinik Tujuan"
                      onChange={poliChange}
                      style={{ textAlign: "left" }}
                    >
                      {poliklinik.length >= 0 &&
                        poliklinik.map(poli => (
                          <Option key={poli.id} value={poli.id}>
                            {poli.nama}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="keperluan"
                    rules={[{ required: true, message: "Pilih keperluan" }]}
                  >
                    <Select
                      placeholder="Keperluan tujuan"
                      onChange={perluChange}
                      style={{ textAlign: "left" }}
                    >
                      {keperluan.length >= 0 &&
                        keperluan.map(perlu => (
                          <Option key={perlu.ID} value={perlu.ID}>
                            {perlu.DEKSRIPSI}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Card>
                <Card
                  title="Data Rujukan & Penjamin"
                  size="small"
                  headStyle={{
                    textAlign: "left",
                    fontWeight: "bold",
                    border: 0,
                    fontSize: 20
                  }}
                  style={{ border: 0 }}
                >
                  <Form.Item
                    name="kepesertaan"
                    rules={[
                      { required: true, message: "Pilih Kepesertaan pasien" }
                    ]}
                  >
                    <Select
                      placeholder="Kepesertaan"
                      onChange={e => setKepesertaan(e)}
                      value={kepesertaan}
                      style={{ textAlign: "left" }}
                    >
                      <Option value="BPJS">BPJS</Option>
                      <Option value="UMUM">UMUM</Option>
                    </Select>
                  </Form.Item>

                  {kepesertaan !== "" && kepesertaan === "BPJS" && (
                    <>
                      <Form.Item
                        name="bpjs"
                        rules={[
                          { required: true, message: "No BPJS harus diisi" }
                        ]}
                      >
                        <Input
                          value={bpjs}
                          onChange={e => setBpjs(e.target.value)}
                          placeholder="Masukkan No. BPJS!"
                        />
                      </Form.Item>
                      <Form.Item
                        name="pesanKontrol"
                        rules={[
                          {
                            required: true,
                            message: "Anda belum menjawab!"
                          }
                        ]}
                        label="Jenis Rujukan ?"
                      >
                        <Radio.Group
                          onChange={e => setJawaban(e.target.value)}
                          // value={jawaban}
                        >
                          <Radio value={1}>BARU</Radio>
                          <Radio value={2}>LAMA</Radio>
                        </Radio.Group>
                      </Form.Item>
                      <Form.Item
                        name="nosurat"
                        rules={[
                          {
                            required: true,
                            message: "No. Surat tujukan harus diisi"
                          }
                        ]}
                      >
                        <Input
                          value={nosurat}
                          onChange={e => setNosurat(e.target.value)}
                          placeholder="No. Surat Rujukan Dari Puskesmas"
                        />
                      </Form.Item>
                    </>
                  )}
                  <Row center="xs md">
                    <Col>
                      <Form.Item>
                        <p>KTP</p>
                        <Upload
                          name="foto_ktp"
                          listType="picture-card"
                          className="avatar-uploader"
                          showUploadList={false}
                          action={`${url}/ktp-upload`}
                          beforeUpload={beforeUpload}
                          onChange={handleChangeKTP}
                        >
                          {imageKTP ? (
                            <img
                              src={imageKTP}
                              alt="avatar"
                              style={{ width: "100%" }}
                            />
                          ) : (
                            uploadButtonKTP
                          )}
                        </Upload>
                      </Form.Item>
                    </Col>
                    {kepesertaan !== "" && kepesertaan === "BPJS" && (
                      <>
                        {jawaban !== null && jawaban === 2 && (
                          <>
                            <Col style={{ textAlign: "center" }}>
                              <Form.Item>
                                <p>S.Kontrol/Resume</p>
                                <Upload
                                  name="foto_kontrol"
                                  listType="picture-card"
                                  className="avatar-uploader"
                                  showUploadList={false}
                                  action={`${url}/kontrol-upload`}
                                  beforeUpload={beforeUpload}
                                  onChange={handleChangeKontrol}
                                >
                                  {imageKontrol ? (
                                    <img
                                      src={imageKontrol}
                                      alt="avatar"
                                      style={{ width: "100%" }}
                                    />
                                  ) : (
                                    uploadButtonKontrol
                                  )}
                                </Upload>
                              </Form.Item>
                            </Col>

                            <Col>
                              <Form.Item>
                                <p>Rujukan Terakhir</p>
                                <Upload
                                  name="foto_rujukan"
                                  listType="picture-card"
                                  className="avatar-uploader"
                                  showUploadList={false}
                                  action={`${url}/rujukan-upload`}
                                  beforeUpload={beforeUpload}
                                  onChange={handleChangeRujukan}
                                >
                                  {imageRujukan ? (
                                    <img
                                      src={imageRujukan}
                                      alt="avatar"
                                      style={{ width: "100%" }}
                                    />
                                  ) : (
                                    uploadButtonRujukan
                                  )}
                                </Upload>
                              </Form.Item>
                            </Col>
                          </>
                        )}
                        {jawaban !== null && jawaban === 1 && (
                          <Col>
                            <Form.Item>
                              <p>Rujukan Baru</p>
                              <Upload
                                name="foto_rujukan"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action={`${url}/rujukan-upload`}
                                beforeUpload={beforeUpload}
                                onChange={handleChangeRujukan}
                              >
                                {imageRujukan ? (
                                  <img
                                    src={imageRujukan}
                                    alt="avatar"
                                    style={{ width: "100%" }}
                                  />
                                ) : (
                                  uploadButtonRujukan
                                )}
                              </Upload>
                            </Form.Item>
                          </Col>
                        )}
                      </>
                    )}
                  </Row>

                  <Form.Item>
                    <Button
                      onClick={btnBatal}
                      type="danger"
                      htmlType="reset"
                      size="large"
                      style={{ marginRight: 10 }}
                      icon={<CloseSquareOutlined />}
                    >
                      Batal
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      icon={<ReconciliationOutlined />}
                    >
                      Daftarkan
                    </Button>
                  </Form.Item>
                </Card>
              </Form>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Formulir;

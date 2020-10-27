import React from "react";
import axios from "axios";
import { Alert, Modal, message } from "antd";
import { url } from "../config";
import {
  CHECK_RM,
  CHECK_LOAD,
  ADD_POLI,
  ADD_SMF,
  ADD_DOKTER,
  ADD_PAKET,
  CLEAR_PASIEN,
  BUKTI,
  ADD_KEPERLUAN
} from "./index";

export const checkNorm = data => async dispatch => {
  try {
    dispatch(getPoliklinik());
    dispatch(getPaket());
    if (data.norm) {
      await dispatch(setLoad(true));
      const result = await axios.get(`${url}/pasien/${data.norm}`);
      if (result.status === 200) {
        await dispatch({ type: CHECK_RM, data: result.data.data });
        await data.history.push("/formulir");
        dispatch(setLoad(false));
      }

      if (result.status === 201) {
        dispatch(setLoad(false));
        Modal.warning({
          title: "Perhatian!",
          content: <Alert message={result.data.detail} type="warning" />
        });
      }

      if (result.status === 202) {
        dispatch({ type: BUKTI, data: result.data.data });
        dispatch(setLoad(false));
        Modal.warning({
          title: "Perhatian!",
          okText: "Lihat",
          onOk: () => data.history.push("/bukti-pendaftaran"),
          content: <Alert message={result.data.detail} type="warning" />
        });
      }
    }
  } catch (err) {
    message.error(
      "Periksa koneksi internet anda.. silahkan coba beberapa saat lagi!!"
    );
  }
};

export const daftarkanFormulir = (data, history) => async dispatch => {
  try {
    const daftar = await axios.post(`${url}/daftar`, data);
    if (daftar) {
      Modal.success({
        title: "Pendaftaran Berhasil!!!",
        okText: "OK",
        onOk: () => {
          dispatch(checkDaftarRM(data.norm));
          history.push("/bukti-pendaftaran");
        },
        content: (
          <Alert
            message="silahkan lihat bukti pendaftaran anda dengan memasukan No. Rekam Medik"
            type="success"
          />
        )
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const checkDaftarRM = norm => async dispatch => {
  const result = await axios.get(`${url}/pasien/${norm}`);
  if (result.status === 202) {
    dispatch({ type: BUKTI, data: result.data.data });
  }
};

export const setLoad = load => dispatch => {
  dispatch({ type: CHECK_LOAD, data: load });
};

export const clearPasien = () => dispatch => {
  dispatch({ type: CLEAR_PASIEN });
};

export const getPoliklinik = () => dispatch => {
  axios.get(`${url}/poli`).then(res => {
    if (res) {
      dispatch({ type: ADD_POLI, data: res.data.data });
    }
  });
};

export const getKeperluan = () => dispatch => {
  axios.get(`${url}/keperluan`).then(res => {
    if (res) {
      dispatch({ type: ADD_KEPERLUAN, data: res.data.data });
    }
  });
};

export const getPaket = () => dispatch => {
  axios.get(`${url}/paket`).then(res => {
    if (res) {
      dispatch({ type: ADD_PAKET, data: res.data.data });
    }
  });
};

export const getSMF = id => dispatch => {
  axios.get(`${url}/smf/${id}`).then(res => {
    if (res) {
      dispatch({ type: ADD_SMF, data: res.data.data });
    }
  });
};

export const getDokter = id => dispatch => {
  axios.get(`${url}/dokter/${id}`).then(res => {
    if (res) {
      dispatch({ type: ADD_DOKTER, data: res.data.data });
    }
  });
};

export const cetakSEP = (norm, done) => async dispatch => {
  const cetak = await axios.get(`${url}/pendaftar/cetak/${norm}`);
  if (cetak.status === 200) {
    done(false, true);
  } else {
    done(true, false);
  }
};

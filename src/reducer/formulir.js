import { Modal, message } from "antd";
import {
  CHECK_LOAD,
  CHECK_RM,
  ADD_POLI,
  ADD_SMF,
  ADD_DOKTER,
  ADD_PAKET,
  CLEAR_PASIEN,
  BUKTI,
  ADD_KEPERLUAN
} from "../actions";

const initialState = {
  pasien: null,
  check_load: false,
  poliklinik: [],
  paket: [],
  smf: [],
  dokter: [],
  bukti: null,
  keperluan: []
};

const Formulir = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_LOAD: {
      return {
        ...state,
        check_load: action.data
      };
    }

    case CHECK_RM: {
      return {
        ...state,
        pasien: action.data
      };
    }

    case ADD_POLI: {
      return {
        ...state,
        poliklinik: action.data 
      };
    }

    case ADD_KEPERLUAN: {
      return {
        ...state,
        keperluan: action.data
      };
    }

    case ADD_SMF: {
      return {
        ...state,
        smf: action.data
      };
    }

    case ADD_DOKTER: {
      return {
        ...state,
        dokter: action.data
      };
    }

    case ADD_PAKET: {
      return {
        ...state,
        paket: action.data
      };
    }

    case CLEAR_PASIEN: {
      return {
        ...state,
        pasien: null
      };
    }

    case BUKTI: {
      return {
        ...state,
        bukti: action.data
      };
    }

    default:
      return state;
  }
};

export default Formulir;

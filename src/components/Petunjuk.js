import React from "react";
import { List } from "antd";

export const Petunjuk = {
  title: "Petunjuk Penggunaan Pendaftaran Rawat Jalan Online!",
  content: (
    <div>
      <ul>
        <li>
          Pasien wajib memasukkan Nomor Rekam Medik! kemudian Klik tombol Cari!
        </li>
        <li>
          Jika Nomor Rekam Medik ditemukan, Pasien wajib mengisi Formulir
          Pendaftaran!
        </li>
        <li>Isi semua data sesuai Formulir Pendaftaran dengan benar!</li>
        <li>
          Jika data yang telah diisi pada Formulir Pendaftaran dianggap sudah
          sesuai, klik tombol Daftar dibagian bawah formulir!
        </li>
        <li>
          Setelah proses pendaftaran selesai, Simpan dengan baik Bukti Pendaftar
          yang telah didapatkan untuk dibawah ke RSUD MM Dunda Limboto untuk
          keperluan Pelayanan!
        </li>
        <li>
          Bukti Pendaftaran Pasien dengan Kepesertaan UMUM (NON BPJS) terlebih
          dahulu membawa Bukti Pendaftaran ke Kasir Pembayaran untuk melakukan
          Pembayaran!
        </li>
        <li>
          Bukti Pendaftaran pasien dengan kepesertaan BPJS langsung ke
          Poliklinik atau unit pelayanan yang akan dituju dengan membawa bukti
          registrasi Online TANPA ANTRI diloket pendaftaran.
        </li>
        <li>
          Pasien yang sudah memiliki bukti pendaftaran harap dipastikan
          ber-STATUS DITERIMA
        </li>
        <li>
          Pasien yang sudah memiliki Bukti Pendaftaran Online tidak dapat
          mendaftar lebih dari satu kali pada hari yang sama!
        </li>
      </ul>
    </div>
  )
};

export const Kontak = {
  title: "Hubungi TIM Development",
  content: (
    <div>
      <h4>
        Jika Anda memerlukan informasi terkait Pendaftaran Online, Hubungi kami
        di:
      </h4>
      <List
        dataSource={[
          "HP 081355610549 Iwan Maksud",
          "HP 082293723494 Dul Hasiru",
          "HP 085298205196 Jefri",
          "HP 085340023949 Khairudin",
          "HP 085342147834 Zul",
          "HP 085398104825 Herman"
        ]}
        renderItem={item => <List.Item>{item}</List.Item>}
      />
    </div>
  )
};

const jadwalItem = [
  { poli: "POLI INTERNA", jadwal: "SENIN S/D JUM'AT" },
  { poli: "POLI ANAK", jadwal: "SENIN S/D SABTU" },
  { poli: "POLI SYARAF", jadwal: "SENIN S/D JUM'AT" },
  { poli: "POLI BEDAH", jadwal: "SENIN S/D KAMIS" },
  { poli: "POLI GIGI", jadwal: "SENIN, SELASA, RABU, JUM'AT" },
  { poli: "POLI KULIT", jadwal: "SENIN DAN SELASA" },
  { poli: "POLI THT", jadwal: "SENIN, RABU, JUM'AT" },
  { poli: "POLI PARU", jadwal: "SENIN, SELASA, RABU, KAMIS" },
  { poli: "POLI MATA", jadwal: "SELASA, KAMIS, JUM'AT" },
  { poli: "POLI KEBIDANAN", jadwal: "SENIN S/D SABTU" },
  { poli: "POLI RADIOLOGI", jadwal: "SENIN, SELASA, KAMIS, JUM'AT" },
  { poli: "POLI REHABILITAS MEDIK", jadwal: "SENIN, RABU, KAMIS, JUM'AT" },
  { poli: "POLI HEMODIALISASI", jadwal: "SENIN S/D SABTU" },
  { poli: "POLI GIZI", jadwal: "SENIN DAN RABU" }
];
export const JadwalPoli = {
  title: "Jadwal Pelayanan Poliklinik",
  content: (
    <div style={{ width: "100%", position: "relative", fontSize:12, marginTop:20 }}>
      {jadwalItem.map((jadwal, index) => (
        <p style={{ borderBottom: "1px solid grey", fontSize:'.7em' }}>
          {`${index + 1}. ${jadwal.poli}`}
          <span style={{ position: "absolute", right: 0 }}>
            <strong>{jadwal.jadwal}</strong>
          </span>
        </p>
      ))}
    </div>
  )
};

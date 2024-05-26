import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import CardTransaksi from "../components/CardTransaksi";

function Transaksi() {
  const [transaksi, setTransaksi] = useState([]);
  const [idBarang, setIdBarang] = useState([]);
  const [idSupp, setIdSupp] = useState([]);

  useEffect(() => {
    getTransaksi();
    getBarangOpp();
    getSuppOpp();
  }, []);

  async function getTransaksi() {
    try {
      const { data, error } = await supabase.from("transaksi").select(`
          id_transaksi,
          jumlah_barang,
          tanggal_transaksi,
          jenis_transaksi,
          total_harga,
          barang(
            nama
          ),
          supplier(
            nama
          )
        `);
      if (error) throw error;
      if (data != null) {
        setTransaksi(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const [newTransaksi, setNewTransaksi] = useState({
    id_barang: "",
    id_supplier: "",
    jumlah_barang: "",
    jenis_transaksi: "",
    tanggal_transaksi: "",
  });

  async function getBarangOpp() {
    try {
      const { data, error } = await supabase
        .from("barang")
        .select("id_barang, nama");
      if (error) throw error;

      if (data != null) {
        setIdBarang(data);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  async function getSuppOpp() {
    try {
      const { data, error } = await supabase
        .from("supplier")
        .select("id_supplier, nama");
      if (error) throw error;

      if (data != null) {
        setIdSupp(data);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  async function tambahTransaksi() {
    try {
      const { data, error } = await supabase
        .from("transaksi")
        .insert([newTransaksi]);
      if (error) throw error;
      getTransaksi();
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  } 

  return (
    <div>
      <Container>
        <Row>
          <Col xs={12} md={8}>
            <h3>Form Input Transaksi</h3>
            {/* ID BARANG Start */}
            <Form.Group controlId="formIdBarang">
              <Form.Label>ID Barang</Form.Label>
              <Form.Control
                as="select"
                name="id_barang"
                value={newTransaksi.id_barang}
                onChange={(e) =>
                  setNewTransaksi({
                    ...newTransaksi,
                    id_barang: e.target.value,
                  })
                }
              >
                <option value="">Pilih Barang</option>
                {idBarang.map((barang) => (
                  <option key={barang.id_barang} value={barang.id_barang}>
                    {barang.nama}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            {/* ID BARANG End */}

            {/* ID Supp Start */}
            <Form.Group controlId="formIdSupplier">
              <Form.Label>ID Supplier</Form.Label>
              <Form.Control
                as="select"
                name="id_supplier"
                value={newTransaksi.id_supplier}
                onChange={(e) =>
                  setNewTransaksi({
                    ...newTransaksi,
                    id_supplier: e.target.value,
                  })
                }
              >
                <option value="">Pilih Supplier</option>
                {idSupp.map((supplier) => (
                  <option
                    key={supplier.id_supplier}
                    value={supplier.id_supplier}
                  >
                    {supplier.nama}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            {/* ID Supp End */}

            {/* Jumlah Barang Start */}
            <Form.Label>Jumlah Barang</Form.Label>
            <Form.Control
              type="number"
              id="jumlah"
              onChange={(e) =>
                setNewTransaksi({
                  ...newTransaksi,
                  jumlah_barang: e.target.value,
                })
              }
            />
            {/* Jumlah Barang End */}

            {/* Jenis Transaksi Start */}
            <Form.Group controlId="formJenisTransaksi">
              <Form.Label>Jenis Transaksi</Form.Label>
              <Form.Control
                as="select"
                name="jenis_transaksi"
                value={newTransaksi.jenis_transaksi}
                onChange={(e) =>
                  setNewTransaksi({
                    ...newTransaksi,
                    jenis_transaksi: e.target.value,
                  })
                }
              >
                <option value="">Pilih Jenis Transaksi</option>
                <option value="Masuk">Masuk</option>
                <option value="Keluar">Keluar</option>
              </Form.Control>
            </Form.Group>
            {/* Jenis Transaksi End */}

            {/* Tanggal Transaksi Start */}
            <Form.Label>Tanggal Transaksi</Form.Label>
            <Form.Control
              type="date"
              id="tanggal"
              onChange={(e) =>
                setNewTransaksi({
                  ...newTransaksi,
                  tanggal_transaksi: e.target.value,
                })
              }
            />
            {/* Tanggal Transaksi End */}
            <br />
            <Button variant="primary" onClick={() => tambahTransaksi()}>
              Tambah Transaksi
            </Button>
          </Col>
        </Row>
        <hr />
        <h3>List Transaksi</h3>
        <Row xs={1} lg={3} className="g-4">
          {transaksi.map((item) => (
            <Col key={item.id_transaksi}>
              <CardTransaksi
                idTrans={item.id_transaksi}
                namaBarang={item.barang ? item.barang.nama : "Nama tidak ada"}
                namaSupplier={
                  item.supplier ? item.supplier.nama : "Nama tidak ada"
                }
                jumlahBarang={item.jumlah_barang}
                jenisTransaksi={item.jenis_transaksi}
                tanggalTransaksi={item.tanggal_transaksi}
                totalBiaya={item.total_harga}
              />
              {/* trans={trans}*/}
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Transaksi;

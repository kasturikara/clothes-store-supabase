/* eslint-disable react/prop-types */
import { Card, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

function CardTransaksi({
  idTrans,
  namaBarang,
  namaSupplier,
  jumlahBarang,
  jenisTransaksi,
  tanggalTransaksi,
  totalBiaya,
}) {
  const displayNamaBarang = namaBarang
    ? namaBarang
    : "Nama Barang Tidak Tersedia";
  const displayNamaSupplier = namaSupplier
    ? namaSupplier
    : "Nama Supplier Tidak Tersedia";

  const [edit, setEdit] = useState(false);
  const [idBarang, setIdBarang] = useState([]);
  const [idSupp, setIdSupp] = useState([]);

  async function hapusTrans() {
    try {
      const { data, error } = await supabase
        .from("transaksi")
        .delete()
        .eq("id_transaksi", idTrans);

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    getBarangOpp();
    getSuppOpp();
  }, []);

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

  const [newUpdate, setNewUpdate] = useState({
    id_barang: "",
    id_supplier: "",
    jumlah_barang: "",
    jenis_transaksi: "",
    tanggal_transaksi: "",
  });

  async function updateTrans() {
    try {
      const { data, error } = await supabase
        .from("transaksi")
        .update(newUpdate)
        .eq("id_transaksi", idTrans);

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <Card style={{ width: "20rem" }} className="cardTrans">
        <Card.Body>
          {edit == false ? (
            <div>
              <Card.Title>{displayNamaBarang}</Card.Title>
              <Card.Subtitle>{tanggalTransaksi}</Card.Subtitle>
              <Card.Text>
                Supplier: {displayNamaSupplier}
                <br />
                Jumlah: {jumlahBarang}
                <br />
                Jenis Transaksi: {jenisTransaksi}
                <br />
                Total Biaya: Rp.{totalBiaya}
              </Card.Text>
              <Button variant="danger" onClick={() => hapusTrans()}>
                Hapus
              </Button>
              <Button variant="secondary" onClick={() => setEdit(true)}>
                Edit
              </Button>
            </div>
          ) : (
            <div>
              <h4>Edit Transaksi</h4>
              <Button size="sm" onClick={() => setEdit(false)}>
                Kembali
              </Button>
              <br />
              {/* ID BARANG Start */}
              <Form.Group controlId="formIdBarang">
                <Form.Label>ID Barang</Form.Label>
                <Form.Control
                  as="select"
                  name="id_barang"
                  value={newUpdate.id_barang}
                  onChange={(e) =>
                    setNewUpdate({
                      ...newUpdate,
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
                  value={newUpdate.id_supplier}
                  onChange={(e) =>
                    setNewUpdate({
                      ...newUpdate,
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
                  setNewUpdate({
                    ...newUpdate,
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
                  value={newUpdate.jenis_transaksi}
                  onChange={(e) =>
                    setNewUpdate({
                      ...newUpdate,
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
                  setNewUpdate({
                    ...newUpdate,
                    tanggal_transaksi: e.target.value,
                  })
                }
              />
              {/* Tanggal Transaksi End */}
              <br />
              <Button variant="success" onClick={() => updateTrans()}>
                Update
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default CardTransaksi;

/* eslint-disable react/prop-types */
import { Card, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { supabase } from "../supabaseClient";

function CardBarang(props) {
  const brg = props.brg;

  const [edit, setEdit] = useState(false);
  const [nama, setNama] = useState(brg.nama);
  const [harga, setHarga] = useState(brg.harga);
  const [stok, setStok] = useState(brg.stok);
  const [warna, setWarna] = useState(brg.warna);

  async function updateBarang() {
    try {
      const { data, error } = await supabase
        .from("barang")
        .update({
          nama: nama,
          harga: harga,
          stok: stok,
          warna: warna,
        })
        .eq("id_barang", brg.id_barang);

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }

  async function hapusBarang() {
    try {
      const { data, error } = await supabase
        .from("barang")
        .delete()
        .eq("id_barang", brg.id_barang);

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <Card style={{ widht: "18rem" }}>
        <Card.Body>
          {edit == false ? (
            <div>
              <Card.Title>{brg.nama}</Card.Title>
              <Card.Text>Rp. {brg.harga}</Card.Text>
              <Card.Text>{brg.stok} pcs</Card.Text>
              <Card.Text>Warna {brg.warna}</Card.Text>
              <Button variant="danger" onClick={() => hapusBarang()}>
                Hapus
              </Button>
              <Button variant="secondary" onClick={() => setEdit(true)}>
                Edit
              </Button>
            </div>
          ) : (
            <div>
              <h4>Edit Barang</h4>
              <Button size="sm" onClick={() => setEdit(false)}>
                Kembali
              </Button>
              <br />
              <Form.Label>Nama Barang</Form.Label>
              <Form.Control
                type="text"
                id="nama"
                defaultValue={brg.nama}
                onChange={(e) => setNama(e.target.value)}
              />
              <Form.Label>Harga Barang</Form.Label>
              <Form.Control
                type="number"
                id="harga"
                defaultValue={brg.harga}
                onChange={(e) => setHarga(e.target.value)}
              />
              <Form.Label>Stok Barang</Form.Label>
              <Form.Control
                type="text"
                id="stok"
                defaultValue={brg.stok}
                onChange={(e) => setStok(e.target.value)}
              />
              <Form.Label>Warna Barang</Form.Label>
              <Form.Control
                type="text"
                id="warna"
                defaultValue={brg.warna}
                onChange={(e) => setWarna(e.target.value)}
              />
              <br></br>
              <Button variant="success" onClick={() => updateBarang()}>
                Update
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default CardBarang;

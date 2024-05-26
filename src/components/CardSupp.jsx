/* eslint-disable react/prop-types */
import { Card, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { supabase } from "../supabaseClient";

function CardSupp(props) {
  const sup = props.sup;

  const [edit, setEdit] = useState(false);
  const [nama, setNama] = useState(sup.nama);
  const [alamat, setAlamat] = useState(sup.alamat);

  async function updateSupp() {
    try {
      const { data, error } = await supabase
        .from("supplier")
        .update({
          nama: nama,
          alamat: alamat,
        })
        .eq("id_supplier", sup.id_supplier);
      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }

  async function hapusSupp() {
    try {
      const { data, error } = await supabase
        .from("supplier")
        .delete()
        .eq("id_supplier", sup.id_supplier);

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          {edit == false ? (
            <div>
              <Card.Title>{sup.nama}</Card.Title>
              <Card.Text>{sup.alamat}</Card.Text>
              <Button variant="danger" onClick={() => hapusSupp()}>
                Hapus
              </Button>
              <Button variant="secondary" onClick={() => setEdit(true)}>
                Edit
              </Button>
            </div>
          ) : (
            <div>
              <h4>Edit Supplier</h4>
              <Button size="sm" onClick={() => setEdit(false)}>
                Kembali
              </Button>
              <br />
              <Form.Label>Nama Supplier</Form.Label>
              <Form.Control
                type="text"
                id="nama"
                defaultValue={sup.nama}
                onChange={(e) => setNama(e.target.value)}
              />
              <Form.Label>Alamat Supplier</Form.Label>
              <Form.Control
                type="text"
                id="alamat"
                defaultValue={sup.alamat}
                onChange={(e) => setAlamat(e.target.value)}
              />
              <br></br>
              <Button variant="success" onClick={() => updateSupp()}>
                Update
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default CardSupp;

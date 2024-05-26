/* eslint-disable no-unused-vars */
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import CardBarang from "../components/CardBarang";

function Barang() {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");
  const [warna, setWarna] = useState("");
  const [barang, setBarang] = useState([]);

  useEffect(() => {
    getBarang();
  }, []);

  async function getBarang() {
    console.log(supabase);
    try {
      const { data, error } = await supabase
        .from("barang")
        .select("*")
        .limit(20);
      if (error) throw error;
      if (data != null) {
        setBarang(data);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  async function tambahBarang() {
    try {
      const { data, error } = await supabase
        .from("barang")
        .insert({
          nama: nama,
          harga: harga,
          stok: stok,
          warna: warna,
        })
        .single();

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="barangPage">
      <Container id="barang">
        <Row>
          <Col xs={12} md={8}>
            <h3>Form Input Barang</h3>
            <Form.Label>Nama Barang</Form.Label>
            <Form.Control
              type="text"
              id="nama"
              onChange={(e) => setNama(e.target.value)}
            />
            <Form.Label>Harga Barang</Form.Label>
            <Form.Control
              type="number"
              id="harga"
              onChange={(e) => setHarga(e.target.value)}
            />
            <Form.Label>Stok Barang</Form.Label>
            <Form.Control
              type="number"
              id="stok"
              onChange={(e) => setStok(e.target.value)}
            />
            <Form.Label>Warna Barang</Form.Label>
            <Form.Control
              type="text"
              id="warna"
              onChange={(e) => setWarna(e.target.value)}
            />
            <br></br>
            <Button onClick={() => tambahBarang()}>Tambah Barang</Button>
          </Col>
        </Row>
        <hr></hr>
        <h3>List Barang</h3>
        <Row xs={1} lg={3} className="g-4">
          {barang.map((brg) => (
            <Col key={brg.id_barang}>
              <CardBarang brg={brg} /> {/* brg={barang}*/}
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Barang;

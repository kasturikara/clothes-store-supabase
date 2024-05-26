/* eslint-disable no-unused-vars */
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import CardSupp from "../components/CardSupp";

function Supplier() {
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [supp, setSupp] = useState([]);

  useEffect(() => {
    getSupp();
  }, []);

  async function getSupp() {
    try {
      const { data, error } = await supabase
        .from("supplier")
        .select("*")
        .limit(20);
      if (error) throw error;
      if (data != null) {
        setSupp(data);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  async function tambahSupp() {
    try {
      const { data, error } = await supabase
        .from("supplier")
        .insert({
          nama: nama,
          alamat: alamat,
        })
        .single();

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }

  console.log(supp);

  return (
    <div>
      <Container>
        <Row>
          <Col xs={12} md={8}>
            <h3>Form Input Supplier</h3>
            <Form.Label>Nama Supplier</Form.Label>
            <Form.Control
              type="text"
              id="nama"
              onChange={(e) => setNama(e.target.value)}
            />
            <Form.Label>Alamat Supplier</Form.Label>
            <Form.Control
              type="text"
              id="alamat"
              onChange={(e) => setAlamat(e.target.value)}
            />
            <br></br>
            <Button onClick={() => tambahSupp()}>Tambah Supplier</Button>
          </Col>
        </Row>
        <hr></hr>
        <h3>List Supplier</h3>
        <Row xs={1} lg={3} className="g-4 ">
          {supp.map((sup) => (
            <Col key={sup.id_supplier}>
              <CardSupp sup={sup} />
              {/*sup={sup} */}
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Supplier;

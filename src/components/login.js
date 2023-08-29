import "../styles/login.scss"
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Col, Row, Form, FormGroup, Input, Label, Button } from "reactstrap";
import { login } from "../redux/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [userDetails, setUserDetails] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    dispatch(login({ userDetails, navigate }));
  };
  return (
    <Row>
      <Col
        md={{
          offset: 3,
          size: 6,
        }}
      >
        <Form>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="abc@xyz.com"
              type="email"
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              id="password"
              name="password"
              placeholder="*******"
              type="password"
              onChange={(e) =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
            />
          </FormGroup>
          <Button
            outline={true}
            block={true}
            color="primary"
            onClick={(e) => handleSubmit(e)}
          >
            Login
          </Button>
        </Form>
        <Row>
          <Col>
            <Link to={"/generateToken"}>Forgot Password?</Link>
          </Col>
          <Col className="text-end">
            <Link to={"/register"}>Dont have an account?</Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

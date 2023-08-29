import "../styles/register.scss";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, FormGroup, Label, Input, Row, Col, Button } from "reactstrap";
import { register } from "../redux/slices/userSlice";
import { Link } from "react-router-dom";

export default function Register() {
  const [userDetails, setUserDetails] = useState({});
 
  const calcAge = (cm, cy, bm, by) => {
    if (by > cy) return { y: 0, m: 0 };
    if (by == cy) {
      if (bm > cm) return { y: 0, m: 0 };
      else return { y: 0, m: cm - bm };
    }
    if (cm > bm) {
      return { y: cy - by, m: cm - bm };
    } else {
      if (cm == bm) return { y: cy - by, m: 0 };
      else return { y: cy - by - 1, m: 12 - bm - cm };
    }
  };

  const calculateAge = (dob) => {
    const date = new Date().getFullYear();
    const cm = new Date().getMonth() + 1;
    const dobYear = new Date(dob).getFullYear();
    const dobMonth = new Date(dob).getMonth() + 1;
    const {y,m} = calcAge(cm,date,dobMonth,dobYear)
    setUserDetails({
      ...userDetails,
      age:
        cm > dobMonth
          ? date - dobYear + " Years" + (cm - dobMonth) + " Months"
          : (cm == dobMonth
              ? date - dobYear + " Years"
              : date - dobYear - 1 + " Years ") +
            (cm == dobMonth ? " " : 12 - (dobMonth - cm) + " Months"),
      // age: y + " years "+ m + " months",
      dob,
    });
  };

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userDetails))
  };

  return (
    <Row style={{ marginTop: "2rem" }}>
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
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Mr. Smith"
              type="text"
              value={userDetails.name}
              onChange={(e) =>
                setUserDetails({ ...userDetails, name: e.target.value })
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
              value={userDetails.password}
              onChange={(e) =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="9876543210"
              type="number"
              value={userDetails.phone}
              onChange={(e) =>
                setUserDetails({ ...userDetails, phone: e.target.value })
              }
            />
          </FormGroup>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  name="dob"
                  placeholder="11/10/1995"
                  type="date"
                  onChange={(e) => calculateAge(e.target.value)}
                  value={userDetails.dob}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="age">Age</Label>
                <Input
                  id="age"
                  name="age"
                  placeholder="27"
                  type="text"
                  value={userDetails.age}
                  disabled={true}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup tag="fieldset">
                <Label for="gender">Gender</Label>
                <Row>
                  <Col
                    md={{
                      size: 2,
                    }}
                  >
                    <FormGroup check>
                      <Input
                        name="male"
                        onChange={(e) =>
                          setUserDetails({
                            ...userDetails,
                            gender: e.target.value,
                          })
                        }
                        value="male"
                        type="radio"
                        checked={userDetails.gender == "male"}
                      />
                      <Label check>Male</Label>
                    </FormGroup>
                  </Col>
                  <Col
                    md={{
                      offset: 1,
                      size: 2,
                    }}
                  >
                    <FormGroup check>
                      <Input
                        name="female"
                        onChange={(e) =>
                          setUserDetails({
                            ...userDetails,
                            gender: e.target.value,
                          })
                        }
                        value="female"
                        type="radio"
                        checked={userDetails.gender == "female"}
                      />
                      <Label check>Female</Label>
                    </FormGroup>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="access">Access</Label>
                <Input
                  id="access"
                  name="select"
                  type="select"
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, access: e.target.value })
                  }
                  value={userDetails.access}
                >
                  <option value={"student"}>Student</option>
                  <option value={"admin"}>Admin</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Button
            outline={true}
            block={true}
            color="primary"
            onClick={(e) => handleSubmit(e)}
          >
            Register
          </Button>
        </Form>
        <br/>
        <Link to="/login">Already Have an account?</Link>
      </Col>
    </Row>
  );
}

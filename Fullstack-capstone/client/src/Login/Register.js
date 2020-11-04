import React, { useState, useContext, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, Card, Row } from 'reactstrap';
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { PrimaryFocusContext } from "../providers/PrimaryFocusProvider";

export default function Register() {
  const history = useHistory();
  const { register } = useContext(UserProfileContext);
  const { primaryFoci, getAllPrimaryFoci } = useContext(PrimaryFocusContext);


  const [fullName, setFullName] = useState();

  const [displayName, setDisplayName] = useState();
  const [email, setEmail] = useState();
  const [primaryFocusId, setPrimaryFocusId] = useState(1);
  const [description, setDescription] = useState();
  const [image, setImage] = useState(" ");
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [imageName, setImageName] = useState();


  useEffect(() => {
    getAllPrimaryFoci();
  }, [])
  const registerClick = (e) => {
    e.preventDefault();


    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      const userProfile = { fullName, primaryFocusId, description, displayName, image, email };
      register(userProfile, password)
        .then(() => history.push("/"));
    }
  };
  const checkUploadResult = (resultEvent) => {
    if (resultEvent.event === 'success') {

      setImage(resultEvent.info.secure_url)
      setImageName(resultEvent.info.original_filename + `.${resultEvent.info.format}`)

    }
  }



  const showWidget = (event) => {
    let widget = window.cloudinary.createUploadWidget({
      cloudName: "dgllrw1m3",
      uploadPreset: "kxr8ogeo",
      quality: "q_auto"
    },
      (error, result) => { checkUploadResult(result) })

    widget.open()
  }

  return (
    <div className="LoginContainer">
      <Card className="RegistrationCard">
        <Form onSubmit={registerClick}>
          <img className="LoginLogo" src="https://res.cloudinary.com/dgllrw1m3/image/upload/v1604287659/Opus%20Logo%20color%20fix.png" />
          <h2 className="LoginTitle">Register New User</h2>
          <fieldset>
            <FormGroup>
              <Row>
                <Label className="FullNameTitle" htmlFor="firstName">Full Name</Label>
                <Input id="fullName" className="RegisterFullName" type="text" onChange={e => setFullName(e.target.value)} />
              </Row>
            </FormGroup>

            <FormGroup>
              <Row>
                <Label className="DisplayNameTitle" htmlFor="displayName">Display Name</Label>
                <Input id="displayName" className="RegisterDisplayName" type="text" onChange={e => setDisplayName(e.target.value)} />
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Label className="LoginEmail" for="email">Email</Label>
                <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
              </Row>
            </FormGroup>

            <FormGroup>
              <Row>
                <Label className="DescriptionTitle" for="description">Description</Label>
                <Input id="description" className="RegisterDescription" type="text" onChange={e => setDescription(e.target.value)} />
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Label className="LoginPassword" for="password">Password</Label>
                <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Label className="ConfirmPasswordTitle" for="confirmPassword">Confirm Password</Label>
                <Input className="RegisterConfirmPassword" id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
              </Row>
            </FormGroup>
            <FormGroup>
              <div>
                <Row><Button className="UploadPictureButton" onClick={showWidget}><strong>Upload Photo</strong></Button> <p>{imageName}</p></Row>
              </div>
            </FormGroup>
            <FormGroup>

              <Label className="PrimaryFocusTitle" for="primaryfocus">Primary Focus</Label>
              {primaryFoci != undefined ?
                <select
                  className="RegisterPrimaryFocus"

                  onChange={e => setPrimaryFocusId(parseInt(e.target.value))}
                  defaultValue={1}
                  id="primaryFocusId"

                >
                  {primaryFoci.map(primaryFocus => {

                    return <option key={primaryFocus.id} value={primaryFocus.id}>{primaryFocus.name}</option>


                  })}

                </select> : null
              }
            </FormGroup>
            <FormGroup>
              <Button className="RegisterConfirmButton"><strong>Register</strong></Button>
            </FormGroup>
          </fieldset>
        </Form>
      </Card>
    </div>
  );
}

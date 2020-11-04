import React, { useState, useContext, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
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
    <Form onSubmit={registerClick}>
      <fieldset>
        <FormGroup>
          <Label htmlFor="firstName">Full Name</Label>
          <Input id="fullName" type="text" onChange={e => setFullName(e.target.value)} />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="displayName">Display Name</Label>
          <Input id="displayName" type="text" onChange={e => setDisplayName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <div>
            <Button onClick={showWidget}>Upload Photo</Button> <p>{imageName}</p>
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="primaryfocus">Primary Focus</Label>
          {primaryFoci != undefined ?
            <select
              className="newUser"
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
          <Label for="description">Description</Label>
          <Input id="description" type="text" onChange={e => setDescription(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Button>Register</Button>
        </FormGroup>
      </fieldset>
    </Form>
  );
}

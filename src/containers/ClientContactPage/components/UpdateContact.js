import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
} from "@chakra-ui/react";
import { createAPIEndpoint } from "../api";

function UpdateContact() {
  useEffect(() => {
    validateInputs();
  }, []);

  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const [isValid, setIsValid] = useState(false);

  const [apiResponse, setApiResponse] = useState("");

  const validateInputs = () => {
    let temp = {};

    temp.firstName =
      contactInfo.firstName !== "" ? "" : "Please type in contact's first name";

    temp.lastName =
      contactInfo.lastName !== "" ? "" : "Please type in contact's last name";

    temp.companyName =
      contactInfo.companyName !== ""
        ? ""
        : "Please type in contact's company name";

    temp.email = /\S+@\S+\.\S+/.test(contactInfo.email)
      ? ""
      : "Email is invalid";

    temp.phoneNumber =
      contactInfo.phoneNumber !== ""
        ? ""
        : "Please type in contact's phone number";

    temp.address =
      contactInfo.address !== ""
        ? ""
        : "Please type in contact's company address";

    setErrors(temp);
    setIsValid(Object.values(temp).every((x) => x === ""));
  };

  const handleInputChange = (e) => {
    setContactInfo({
      ...contactInfo,
      [e.target.name]: e.target.value,
    });
    validateInputs();
  };

  const handleSubmit = async (e) => {
    if (isValid) {
      await createAPIEndpoint()
        .post(contactInfo)
        .then((res) => {
          if (res.status === 201) {
            console.log(res);
            setApiResponse("success");
          }
        })
        .catch((error) => {
          console.log(error);
          setApiResponse("fail");
        });
    }
  };

  return (
    <div>
      <h1 className="mb-5 text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
        Add a New Contact
      </h1>
      <form noValidate autoComplete="on" onSubmit={handleSubmit}>
        <div>
          <FormControl isRequired isInvalid={!isValid}>
            <div className="grid grid-cols-2 gap-5 mb-5">
              <div>
                <FormLabel>First Name</FormLabel>
                <Input
                  name="firstName"
                  value={contactInfo.firstName}
                  onChange={handleInputChange}
                />
                {errors.firstName !== "" ? (
                  <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                ) : null}
              </div>

              <div>
                <FormLabel>Last Name</FormLabel>
                <Input
                  name="lastName"
                  value={contactInfo.lastName}
                  onChange={handleInputChange}
                />
                {errors.lastName !== "" ? (
                  <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                ) : null}
              </div>
              <div>
                <FormLabel>Company Name</FormLabel>
                <Input
                  name="companyName"
                  value={contactInfo.companyName}
                  onChange={handleInputChange}
                />
                {errors.companyName !== "" ? (
                  <FormErrorMessage>{errors.companyName}</FormErrorMessage>
                ) : null}
              </div>

              <div>
                <FormLabel>Email address</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={contactInfo.email}
                  onChange={handleInputChange}
                />
                {errors.email !== "" ? (
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                ) : null}
              </div>

              <div>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  name="phoneNumber"
                  value={contactInfo.phoneNumber}
                  onChange={handleInputChange}
                />
                {errors.phoneNumber !== "" ? (
                  <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
                ) : null}
              </div>
              <div>
                <FormLabel>Address</FormLabel>
                <Input
                  name="address"
                  value={contactInfo.address}
                  onChange={handleInputChange}
                />
                {errors.address !== "" ? (
                  <FormErrorMessage>{errors.address}</FormErrorMessage>
                ) : null}
              </div>
            </div>
          </FormControl>
        </div>
        <Button
          isDisabled={!isValid}
          colorScheme="linkedin"
          type="submit"
          size="lg"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default UpdateContact;

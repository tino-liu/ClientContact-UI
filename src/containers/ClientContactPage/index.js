import React, { useState, useEffect } from "react";
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import AddContact from "./components/AddContact";
import { createAPIEndpoint } from "./api";
import UpdateContact from "./components/UpdateContact";

function ClientContactPage() {
  const {
    isOpen: isOpenAddContact,
    onOpen: onOpenAddContact,
    onClose: onCloseAddContact,
  } = useDisclosure();

  const {
    isOpen: isOpenUpdateContact,
    onOpen: onOpenUpdateContact,
    onClose: onCloseUpdateContact,
  } = useDisclosure();

  const [contacts, setContacts] = useState({});

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    await createAPIEndpoint()
      .fetch()
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setContacts(res.data);
        }
      })
      .catch((error) => console.log(error));
  };

  const renderAddContactModal = (isOpenAddContact, onCloseAddContact) => {
    return (
      <>
        <Modal
          isOpen={isOpenAddContact}
          onClose={onCloseAddContact}
          isCentered={true}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              <AddContact />
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };

  const renderUpdateContactModal = (
    isOpenUpdateContact,
    onCloseUpdateContact
  ) => {
    return (
      <>
        <Modal
          isOpen={isOpenUpdateContact}
          onClose={onCloseUpdateContact}
          isCentered={true}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              <UpdateContact />
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };

  const renderTableData = () => {
    return (
      <>
        {contacts.map((item) => (
          <Tr key={item.email}>
            <Td>{item.firstName}</Td>
            <Td>{item.lastName}</Td>
            <Td>{item.email}</Td>
            <Td>{item.phoneNumber}</Td>
            <Td>{item.companyName}</Td>
            <Td>{item.address}</Td>
            <Td>
              <div className="space-x-2">
                <Button onClick={onOpenUpdateContact} colorScheme="teal">
                  Update
                </Button>
                {renderUpdateContactModal(
                  isOpenUpdateContact,
                  onCloseUpdateContact
                )}
                <Button colorScheme="red">Delete</Button>
              </div>
            </Td>
          </Tr>
        ))}
      </>
    );
  };

  return (
    <div className="relative bg-slate-800">
      <div className="grid place-items-center h-screen">
        <div className="bg-white rounded-lg shadow-md">
          <div className="mx-40 my-10">
            <Button
              onClick={onOpenAddContact}
              colorScheme="linkedin"
              size="lg"
              className="mb-5"
            >
              Add Contact
            </Button>
            {renderAddContactModal(isOpenAddContact, onCloseAddContact)}
            <div>
              <TableContainer>
                <Table variant="simple">
                  <TableCaption>Here's Your Contact Information</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>First Name</Th>
                      <Th>Last Name</Th>
                      <Th>Email</Th>
                      <Th>Phone Number</Th>
                      <Th>Company Name</Th>
                      <Th>Address</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>{contacts.length > 0 && renderTableData()}</Tbody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientContactPage;

import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"

const LogoutModal = ({isOpen,onClose,isLoggingOut,handleLogout}) => {
  return (
    <>
     <Modal isOpen={isOpen} onClose={onClose} size={'sm'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log out</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>You will be returned to the login page.</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant='outline' isLoading={isLoggingOut} onClick={handleLogout} colorScheme="blue">Log out</Button>
          </ModalFooter>
        </ModalContent>
      </Modal></>
  )
}

export default LogoutModal
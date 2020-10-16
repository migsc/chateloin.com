import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Input,
  Textarea,
  Spinner,
  SlideIn,
  useDisclosure,
  useToast,
  Box,
} from "@chakra-ui/core"
import styled from "styled-components"
import React, { useState, useRef } from "react"
import emailjs from "emailjs-com"

emailjs.init("user_Idj2mp6qv6pjm8QROX5Hg")

interface Props {}

const InputStyled = styled(Input)`
  &::placeholder {
    color: white;
  }
`

const TextAreaStyled = styled(Textarea)`
  &::placeholder {
    color: white;
  }
`
const ButtonStyled = styled(Button)`
  &:hover {
    color: #667eeaff;
  }
`

const initialFormState = {
  user_name: "",
  user_email: "",
  message: "",
}

const ContactModal: React.FC<Props> = ({ isOpen, onOpen, onClose }) => {
  const [form, setForm] = useState(initialFormState)

  const [isSending, setIsSending] = useState(false)
  const toast = useToast()

  const isFormFilled = Object.values(form).every(value => !!value)

  const handleFormChange = fieldName => ({ target: { value } }) => {
    setForm({
      ...form,
      [fieldName]: value,
    })
  }

  const handleSendMessage = async () => {
    setIsSending(true)

    try {
      const response = await emailjs.send(
        "contact_service",
        "template_ntrhqjc",
        form,
        "user_Idj2mp6qv6pjm8QROX5Hg"
      )

      if (response?.status !== 200) {
        throw response
      }

      toast({
        title: "Sent!",
        description: "Thank you for your message. We'll be in touch.",
        duration: 9000,
        isClosable: true,
        position: "top",
        status: "success",
      })
    } catch (err) {
      console.log(err)
      toast({
        title: "Uh oh...",
        description:
          "I had some trouble receiving your message. Try again later.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      })
    } finally {
      onClose()
      setIsSending(false)
      setForm(initialFormState)
    }
  }

  return (
    <SlideIn in={isOpen} duration={400}>
      {styles => (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent
            style={{
              // backgroundColor: "#764ba2",
              ...styles,
              backgroundColor: "#667eea",
              // backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
            className="rounded overflow-hidden"
          >
            <ModalCloseButton />
            <ModalBody className="mb-4 mt-4">
              <InputStyled
                style={{ color: "white" }}
                variant="flushed"
                className="mb-4 font-thin"
                placeholder="Name"
                size="lg"
                focusBorderColor="#f8e2ff"
                onChange={handleFormChange("user_name")}
              />
              <InputStyled
                variant="flushed"
                className="mb-4 font-thin"
                placeholder="Email"
                size="lg"
                focusBorderColor="#f8e2ff"
                onChange={handleFormChange("user_email")}
              />
              <TextAreaStyled
                style={{ height: "10rem" }}
                className="font-thin"
                variant="flushed"
                placeholder="Message"
                focusBorderColor="#f8e2ff"
                resize="vertical"
                isFullWidth
                onChange={handleFormChange("message")}
              />
            </ModalBody>
            <ModalFooter>
              <ButtonStyled
                disabled={!isFormFilled}
                style={{ border: "solid 1px white" }}
                variant="ghost"
                onClick={handleSendMessage}
              >
                send
              </ButtonStyled>
            </ModalFooter>
            {isSending && (
              <div className="bg-white absolute w-full h-full opacity-75 flex flex-col justify-center items-center">
                <Spinner
                  className="absolute"
                  thickness="4px"
                  speed="1.75s"
                  emptyColor="gray.200"
                  color="#764ba2"
                  size="xl"
                  label="Sending..."
                />
              </div>
            )}
          </ModalContent>
        </Modal>
      )}
    </SlideIn>
  )
}

export default ContactModal

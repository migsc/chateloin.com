import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { useDisclosure } from "@chakra-ui/core"

import FrostedGlass from "../../components/FrostedGlass"
import ContactModal from "../../components/ContactModal"

const BrandingContainer = styled.div`
  &:hover span {
    font-size: 1.5rem;
  }
`

const Branding = () => (
  <BrandingContainer className="flex items-center flex-shrink-0 color-white">
    <Link to="/">
      <span
        style={{ transition: "0.3s" }}
        className="text-xl tracking-tight font-thin"
      >
        miguel chateloin
      </span>
    </Link>
  </BrandingContainer>
)

const AnchorButton = styled.a`
  transition: 0.3s;
  font-size: 1rem;
  font-weight: 200;
  &:hover {
    background-color: #667eeaff;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    font-size: 1.1rem;
  }
`

const ContactButton = ({ onClick }) => (
  <div>
    <AnchorButton
      href="#"
      onClick={onClick}
      className="inline-block text-sm px-4 py-2 leading-none border rounded color-white hover:border-transparent  hover:text-white"
    >
      contact
    </AnchorButton>
  </div>
)

const HeaderBar = () => {
  const {
    isOpen: isContactFormOpen,
    onOpen: onContactFormOpen,
    onClose: onContactFormClose,
  } = useDisclosure()

  return (
    <>
      <nav
        className="fixed top-0"
        style={{
          height: "4rem",
          width: "100%",
          zIndex: 1, // need this because opacity of later elements affects stacking order
        }}
      >
        <FrostedGlass />
        <div
          style={{ zIndex: 0, background: "none" }}
          className="justify-between flex flex-row flex-wrap pl-4 pr-4 h-full items-center"
        >
          <Branding />
          <ContactButton onClick={onContactFormOpen} />
        </div>
      </nav>
      <ContactModal
        isOpen={isContactFormOpen}
        onOpen={onContactFormOpen}
        onClose={onContactFormClose}
      />
    </>
  )
}

export default HeaderBar

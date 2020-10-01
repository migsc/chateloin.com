import styled from "styled-components"

const FrostedGlass = styled.div`
  width: 100%;
  height: 100%;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  position: absolute;
  z-index: -1;
  background: inherit;
  overflow: hidden;
  &:before {
    content: "";
    position: absolute;
    background: inherit;
    z-index: -2;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.8);
    filter: blur(10px);
    margin: -20px;
  }
`

export default FrostedGlass

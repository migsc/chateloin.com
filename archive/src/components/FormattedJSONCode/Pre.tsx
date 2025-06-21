import styled from "styled-components"

interface Props {
  background: string
  color: string
}

const Pre = styled.pre<Props>`
  font-size: 1em;
  width: 100%;
  background-color: ${({ background }) => background};
  color: ${({ color }) => color};
  padding: 10px;
  overflow-x: auto;
  word-wrap: break-word;
  white-space: pre-wrap;
`

export default Pre

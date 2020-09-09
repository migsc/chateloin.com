import React from "react"

interface CircleImageProps {
  src: string
}

const CircleImage: React.FC<CircleImageProps> = ({ src }) => (
  <div
    className="overflow-hidden border-white rounded-full mb-4"
    style={{ width: 150, height: 150, borderWidth: "0.125rem" }}
  >
    <img src={src} style={{ width: "100%", height: "100%" }} />
  </div>
)

export default CircleImage

import React from "react"

interface CircleImageProps {
  src: string
}

const CircleImage: React.FC<CircleImageProps> = ({ src }) => (
  <div
    className="overflow-hidden border-white rounded-full mb-4 w-16 h-16 md:w-32 md:h-32"
    style={{ borderWidth: "0.125rem" }}
  >
    <img src={src} style={{ width: "100%", height: "100%" }} />
  </div>
)

export default CircleImage

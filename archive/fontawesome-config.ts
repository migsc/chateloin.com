import ReactDOM from "react-dom"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import {
  faCode,
  faMusic,
  faPaintBrush,
  faAlienMonster,
} from "@fortawesome/pro-regular-svg-icons"

export const setupFontAwesome = () =>
  library.add(fab, faCode, faMusic, faPaintBrush, faAlienMonster)

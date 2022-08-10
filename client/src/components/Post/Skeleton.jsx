import React from "react"
import ContentLoader from "react-content-loader"

const MainPagePostLoader = (props) => (
    <ContentLoader 
    backgroundColor="#ffffff"
    foregroundColor="#f3f3f3"
    {...props}
  >
    <rect x="1" y="10" rx="8" ry="8" width="350" height="230" />
  </ContentLoader>
)

export default MainPagePostLoader
import React from "react"
import { Spin } from "antd"

const Loader = () => {
  return (
    <div className="mt-16 flex justify-center items-center">
        <Spin size="large"/>
    </div>
  )
}

export default Loader
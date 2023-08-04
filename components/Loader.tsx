import React from "react"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} />

const Loader = () => {
  return (
    <div className="mt-16 flex justify-center items-center">
        <Spin indicator={antIcon} size="large"/>
    </div>
  )
}

export default Loader
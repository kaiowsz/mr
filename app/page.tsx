import Image from "next/image"
import Feed from "@/components/Feed"

export default function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">Discover & Share
      <br className="max-hd:hidden"/>
      <span className="orange_gradient text-center">Notes About Something</span>
      </h1>
      <p className="desc text-center">
        MR is an open-source tool for modern world to discover, create and share knowledge in a condensate way!
      </p>

      <Feed />
    </section>
  )
}

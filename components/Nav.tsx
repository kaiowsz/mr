"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
import { UserType } from "@/types/main"
import { Session } from "next-auth"


const Nav = () => {
  const { data: session }: {data: Session | UserType | any}  = useSession()

  console.log(session)

  const [providers, setProviders] = useState<any>([])
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false)

  useEffect(() => {
    const takeProviders = async () => {
      const response = await getProviders();

      setProviders(response)
    }

    takeProviders()
  })
  
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image alt="MR Logo" src="/assets/images/logo.png" width={30} height={30} className="object-contain" />
      </Link>

      <div className="sm:flex hidden">
        {session?.user ? (
        <div className="flex gap-3 md:gap-5">
          <Link href="/create-prompt" className="black_btn">
            Create Post
          </Link>

          <button type="button" onClick={() => signOut} className="outline_btn">Sign Out</button>

          <Link href="/profile">
            <Image className="rounded-full" src={session?.user.image}
            width={37}
            height={37}
            alt="Profile photo"
            />
          </Link>
        </div>

        ) : (
        <>
        {providers && Object.values(providers).map((provider: any) => (
          <button type="button" 
          key={provider.name}
          onClick={() => signIn(provider.id)}
          className="black_btn">
            Sign In
          </button>
        ))}
        </>)
        }
      </div>

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex hover:pointer">
            <Image className="hover-photo rounded-full" src={session?.user.image}
            width={37}
            height={37}
            alt="Profile photo"
            onClick={() => setToggleDropdown((prev): boolean => !prev)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link href="/profile" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
                  My Profile
                </Link>
                <Link href="/create-prompt" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
                  Create Prompt
                </Link>
                <button type="button" onClick={() => {
                  setToggleDropdown(false)
                  signOut()
                  }} className="mt-5 w-full black_btn">Sign Out</button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers && Object.values(providers).map((provider: any) => (
            <button type="button" 
            key={provider.name}
            onClick={() => signIn(provider.id)}
            className="black_btn">
             Sign In
           </button>
        ))}
        </>
        )}

      </div>
    </nav>
  )
}

export default Nav
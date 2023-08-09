"use client"

import React, { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useSearchParams, useRouter } from "next/navigation"

import Profile from "@/components/Profile"

const ProfilePage = () => {

    const { data: session } = useSession()
    const searchParams = useSearchParams();
    const [posts, setPosts] = useState<any>([])

    const userId = searchParams.get("id")

    useEffect(() => {
        const fetchPosts = async() => {
            const response = await fetch(`/api/users/${userId}/posts`);
            const data = await response.json();

            console.log(data)

            setPosts(data)
        }

        fetchPosts()
    }, [])

    return (
        <Profile name={`${posts[0]?.creator.username ? posts[0].creator.username + "'s" : ""}`} desc="" data={posts} />
    )
}

export default ProfilePage
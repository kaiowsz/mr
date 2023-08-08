"use client"

import React, { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Toaster, toast } from "react-hot-toast"
import Link from "next/link"

import Profile from "@/components/Profile"

const ProfilePage = () => {

    const { data: session } = useSession()
    const [posts, setPosts] = useState([])
    const router = useRouter()

    useEffect(() => {
        const fetchPosts = async() => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();

            setPosts(data)
        }

        if(session?.user.id) {
            fetchPosts()
        }

    }, [])

    const handleEdit = (post: any) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post: any) => {

        const deletePrompt = async() => {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, { method: "DELETE" })

                const filteredPosts = posts.filter((currentPost: any) => currentPost._id !==  post._id)

                setPosts(filteredPosts)
            } catch (error) {
                console.log(error)
            }
        }


        const hasConfirmed = toast.custom((t) => (
            <div
              className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
                <div className="flex flex-col items-center justify-center w-full h-full">
                    <div className="flex justify-center items-center my-4">
                        <p>Are you sure you want to delete this post?</p>
                    </div>

                    <div className="flex w-[100%] justify-center items-center border-l border-gray-200">
                        <button
                        onClick={() => {
                            toast.dismiss(t.id)
                            return false
                        }}
                        className="w-full p-4 duration-300 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-indigo-200">
                        Cancel
                        </button>
                        <button
                        onClick={() => {
                            toast.dismiss(t.id)
                            toast.promise(deletePrompt(), {
                                loading: 'Deleting...',
                                success: <b>Post deleted successfully!</b>,
                                error: <b>Could not delete the post.</b>
                            });
                        }}
                        className="w-full p-4 flex duration-300 items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-indigo-200">
                        Yes
                        </button>
                    </div>
                </div>
            </div>
          ))
    }

    return (
        <>
            <Toaster />
            
            {posts.length > 0 ? <Profile name="My" desc="Welcome to your personalized profile page!" data={posts} handleEdit={handleEdit} handleDelete={handleDelete} /> : <h1>You don't have posts yet. <Link className="underline" href="/create-prompt">Click here</Link> to create one.</h1>}
        </>
    )
}

export default ProfilePage
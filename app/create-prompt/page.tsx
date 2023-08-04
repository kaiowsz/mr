"use client"

import React from "react"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import toast, { Toaster } from "react-hot-toast"

import Form from "@/components/Form"


const CreatePrompt = () => {

    const router = useRouter();
    const { data: session }: { data: any } = useSession()
  
    const [submitting, setSubmitting] = useState<boolean>(false)
    const [post, setPost] = useState({
        prompt: "",
        tag: ""
    })

    const createPrompt = async (event: any) => {
        event.preventDefault();
        setSubmitting(true);

        try {
            if(post.prompt.trim() === "") {
                alert("Prompt empty.")
                return
            }

            if(!session) {
                toast.error("You need to log in before post something.")
                return
            }

            const response = await fetch("/api/prompt/new", {
                method: "POST",
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                    userId: session?.user.id,
                })
            })

            if(response.ok) {
                router.push("/")
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }
  
    return (
        <>
        <Toaster />
        <Form 
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
        />
        </>
    )
}

export default CreatePrompt
"use client"

import React from "react"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

import Form from "@/components/Form"

const CreatePrompt = () => {
  
    const [submitting, setSubmitting] = useState<boolean>(false)
    const [post, setPost] = useState({
        prompt: "",
        tag: ""
    })

    const createPrompt = async (event: any) => {

    }
  
    return (
        <Form 
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
        />
    )
}

export default CreatePrompt
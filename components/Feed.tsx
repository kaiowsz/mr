"use client"

import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"
import Loader from "./Loader"

const PromptCardList = ({ data, handleTagClick }: any) => {

  return (
    <div className="mt-16 prompt_layout">
      {data.map((post: any) => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  )
}

const Feed = () => {
  
  const [searchText, setSearchText] = useState<string>("")
  const [posts, setPosts] = useState<any>([])
  const [filteredPosts, setFilteredPosts] = useState([])

  const handleSearchChange = (event: any) => {
    setSearchText(event.target.value)

    setFilteredPosts(posts.filter((post: any) => (post.tag.includes(searchText) || post.creator.username.includes(searchText))))

    console.log(filteredPosts)

  }

  
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt")
      const data = await response.json()
      setPosts(data)
    }

    fetchPosts()
  }, [])


  
  return (
    <section className="feed">

      <form className="relative w-full flex-center">
        <input type="text" 
        placeholder="Search for a tag or a username" 
        value={searchText} 
        onChange={event => handleSearchChange(event)} 
        required 
        className="search_input peer" />
      </form>
      
      {posts.length === 0 && <Loader/>}
      

      {filteredPosts.length > 0 && searchText.trim() !== "" ? 
      <PromptCardList data={filteredPosts} handleTagClick={() => {}} />
      : <PromptCardList data={posts} handleTagClick={() => {}} />}

    </section>
  )
}

export default Feed
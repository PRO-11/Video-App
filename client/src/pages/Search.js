import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
import { backendUrl } from "../baseUrl";
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
function Search() {
  const [videos,setVideos]=useState([])
  const query=useLocation().search

  useEffect(()=>{
    const fetchVideos=async()=>{
      const res=await axios.get(`${backendUrl}/videos/search${query}`)
      setVideos(res.data)
    }
    fetchVideos()
  },[query])
  return (
    <Container>
      {videos.map(video=>{
        return  <Card key={video._id} video={video}/>
      })}
    </Container>
  )
}

export default Search
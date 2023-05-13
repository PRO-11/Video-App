import React,{useEffect,useState} from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios"
import { backendUrl } from "../baseUrl";
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({type}) => {

  const [videos,setvideos]=useState([])
  useEffect(() => {
  const fetchVideo=async()=>{
    console.log("pro")
    const res=await axios.get(`${backendUrl}/videos/${type}`)
    console.log(res.data)
    setvideos(res.data)
  }

  fetchVideo()

  
  }, [type])


  return (
    <Container>
     {videos.map((video)=>{
      return<Card key={video._id} video={video}/>
     })}
    </Container>
  );
};

export default Home;

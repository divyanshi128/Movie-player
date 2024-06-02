import React, { useState, useEffect } from "react";
import Axios from "axios";
import styled from "styled-components";
import MovieComponent from "../../components/MovieComponent";
import MovieInfoComponent from "../../components/MovieInfoComponent";
import {  signOut } from "firebase/auth";
import {auth} from '../../firebase';
import { onAuthStateChanged } from "firebase/auth";
import { Route, Routes, Link, useNavigate } from "react-router-dom";


export const API_KEY = "8639d801";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #033860;
  
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Header = styled.div`
  background-color: #033860;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
//   box-shadow: 0 3px 6px 0 #555;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-right: 20px;
  width: 50%;
  background-color: white;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;


const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  // margin-left: 15px;
`;

const Button = styled.button`
  background: ${props => props.$primary ? "white" : "#033860"};
  color: ${props => props.$primary ? "white" : "white"};
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid white;
  border-radius: 3px;
  text-decoration:none;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;;
`;
const Placeholder = styled.img`
  width: 200px;
  height: 200px;
  margin: 170px;
  opacity: 60%;
  color:#0a1d2a
`;

const Login=styled.span`
// border:2px solid white;
color:white;
padding:10px;
margin-right:10px;
border-radius:3px;
height:80%
width:20%
`

const Home = (props) => {
    const [searchQuery, updateSearchQuery] = useState("");
    const [movieList, updateMovieList] = useState([]);
    const [selectedMovie, onMovieSelect] = useState();
    const [timeoutId, updateTimeoutId] = useState();
    const [isLogIn, setLogIn]=useState(false)
   

    const fetchData = async (searchString) => {
        const response = await Axios.get(
            `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
        );
        updateMovieList(response.data.Search);
    };

    const onTextChange = (e) => {
        onMovieSelect("")
        clearTimeout(timeoutId);
        updateSearchQuery(e.target.value);
        const timeout = setTimeout(() => fetchData(e.target.value), 500);
        updateTimeoutId(timeout);
    };
    
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
             
              setLogIn(true)
              
            } else {  
              setLogIn(false)
           

              
            }
          });
         
    }, [])



    const navigate = useNavigate();

    const handleClick=()=>{
        signOut(auth).then(() => {
            // Sign-out successful.
                navigate("/");
                setLogIn(false);
                console.log("Signed out successfully")
            }).catch((error) => {
            // An error happened.
            });
    }
    return (
        <Container>

            <Header>
                <AppName>
                    <MovieImage src="\Untitled design (2).png" />
                    MovieX
                </AppName>
                
                {
                    isLogIn ?
                        (<div>
                            <Button as={Link} to="/" onClick={handleClick}>Log Out</Button>
                        </div>) : (<div>
                            <Button as={Link} to="/login" >Log In</Button>
                        </div>)
                }

                <SearchBox>
                    <SearchIcon src="/react-movie-app/search-icon.svg" />
                    <SearchInput
                        placeholder="Search Movie"
                        value={searchQuery}
                        onChange={onTextChange}
                    />
                </SearchBox>
                <Login>{isLogIn?(<span className="name">{props.name}</span>):<></>}</Login>
                
            </Header>
            
{console.log(props)}
            {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect} />}
            <MovieListContainer>
                {movieList?.length ? (
                    movieList.map((movie, index) => (
                        <MovieComponent
                            key={index}
                            movie={movie}
                            onMovieSelect={onMovieSelect}
                        />
                    ))
                ) : (
                    <Placeholder src="\Untitled design (2).png" />
                )}
            </MovieListContainer>
        </Container>

    );
}

export default Home
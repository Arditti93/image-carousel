


import './App.css';

import { useState, useEffect } from 'react';

const App = () => {
const [movieData, setMovieData] = useState([]);

const [currentIndex, setCurrentIndex] = useState(0);


  const upcomingMovies = async () =>{
    const url = 'https://moviesdatabase.p.rapidapi.com/titles/x/upcoming';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': "19f738bdd6msh3dffd3700197861p15d901jsnb906d8302a9a",
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
      }
    };
    
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result.results);
      setMovieData(result.results)
    } catch (error) {
      console.error(error);
    }
  
  
  }

  useEffect(() => {
    
    upcomingMovies();
  }, [] );

  // the below code is what actions the corousel system to allow you to use arrows to go forward and back on the images
  const carouselScrollRight = () => {
    if (currentIndex === movieData.length-1){
      setCurrentIndex(0)
    }else{
      setCurrentIndex(currentIndex +1)
    }
  }

  const carouselScrollLeft = () => {
    if (currentIndex === 0){
      setCurrentIndex(movieData.length-1)
    }else{
      setCurrentIndex(currentIndex -1)
    }
  }

  return (
    <div>
       <div id='catsection'>
        <div id="catContainer">
          {movieData.map((singleMovie, index) => {
            console.log(singleMovie.primaryImage)
            return (
              <div className='catItem' key={index} style={{transform:`translateX(-${currentIndex * 100}%)`}}>
                <img alt="filmImage" src={singleMovie.primaryImage !== null ? singleMovie.primaryImage.url : "https://via.placeholder.com/400"}/>
                <p>Name: {singleMovie.originalTitleText.text}</p> 
              </div>
            );
          })}
        </div>
      </div>
      
      
      <div id='buttonarrow'>
      <button onClick={carouselScrollLeft}> &#8592; </button>
      <button onClick={carouselScrollRight}> &#8594; </button>
      
      </div>
    </div>
  );
};




export default App;
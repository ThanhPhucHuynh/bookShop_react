import React, { Component,useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import PetImg1 from './img/1a.jpg'
import PetImg2 from './img/2a.jpg'
import PetImg3 from './img/3a.jpg'
import Video1 from './video/Puppy.mp4'
import Video2 from './video/Cat.mp4'
import './petcare.css'
// import "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"
import './javascrip/petcare.js'

const items = [
  {
    src:    PetImg1,
    altText: 'Slide 1',
    caption: 'Slide 1'
  },
  {
    src: PetImg2,
    caption: 'Puppy Dog',
    video: Video1,
    altText: 'Puppy Dog Playful Beach Sand Play'
  },
  {
    src: PetImg3,
    altText: 'Slide 3',
    caption: 'Slide 3'
  },
  {
    src: "as",
    altText: 'Cat Nature Animal Outdoors Pet',
    video: Video2,
    caption: 'Cat'
  },
];

const PetCare = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }
 
  const slides = items.map((item,index) => {
    console.log((item.video))
    if(item.video){
      return (
        <CarouselItem
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          key={item.src}
        >
           <div className='imgbotstrapqulai'>
           <video autoPlay muted loop className="myVideo">
              <source src={item.video} type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>
            </div>
          <CarouselCaption captionText={item.altText} captionHeader={item.caption} />
        </CarouselItem>
         
      );
    }else 
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <div className='imgbotstrapqulai' src={item.src} alt={item.altText} 
            style={{backgroundImage: "url(" + item.src + ")"}}
            
        >
          
        </div>
        
        <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
      </CarouselItem>
       
    );
  });

  return (
      <div className="petcareMain">
        <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        interval= '10000'
        >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
        <div className="searchGoogle ">
        
                <label className="searchPetCare">

                <div className="one">
                <div className="two">
                    <div className="three">
                    <input className=""type="search" className="searchPetCareInput four" placeholder="@Keyframers Search"
                          onKeyUp={(event)=>{
                                console.log(event.keyCode);
                                console.log(event.target.value)
                                if(event.keyCode === 13){
                                    window.open("https://www.google.com.vn/search?q="+"pet "+event.target.value)
                                }
                          }}  
                    />
                    </div>
                    <div className="stick" onClick={()=>{
                        console.log("Dsad");
                    }}></div>
                </div>
                </div>

                </label>
            <p className="contentPetcare">Hãy nhập triệu trứng của thú cưng của bạn.....</p>
        </div>
        
    </div>
  );
 
}

export default PetCare;
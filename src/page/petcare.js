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
    altText: 'Slide 2',
    caption: 'Slide 2'
  },
  {
    src: PetImg3,
    altText: 'Slide 3',
    caption: 'Slide 3'
  }
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
 
  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <div className='imgbotstrapqulai' src={item.src} alt={item.altText} 
            style={{backgroundImage: "url(" + item.src + ")"}}
        />
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
            <p className="contentPetcare">Hãy nhập chiệu trứng của thú cưng của bạn.....</p>
        </div>
        
    </div>
  );
 
}

export default PetCare;
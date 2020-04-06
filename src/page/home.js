import React, { Component } from "react";
import imgHome from '../components/images/cathome.jpg'
import './home.css'
class Home extends Component {
    render(){
        return(
            <div className="Home">
                <section>
                    <div className="section1">
                        <h1>Welcome to WEBPET</h1>
                            <div className='img_section1'></div>
                    </div>
                    <div className="section2">
                        <div className="headerSection2">
                            <h1>About WEBPET</h1>
                        </div>
                        <div className="decriptitonSection2">
                            <p>
                                Chúng tôi cung cấp các sản phẩm cho thú cưng củ bạn như là thức ăn thuốc 
                                các dụng cụ sinh hoặc mà chúng tôi sẽ đem lại niềm vui cho bạn bằng những bức ảnh về thú cưng
                                mà chúng tôi sưu tầm được.<br/>
                                Chúc các bạn vui vẻ!
                                <span className="signText">Thanh Phuc Huynh</span>
                            </p>
                            
                        </div>
                        {/* <p></p>     */}
                    </div>
                    <div className="section3">
                        <div className="cantactLocation">
                            <h1>Location</h1>
                            <p>3/2, NinhKieu, CanTho</p>
                            <div id="mapDiv" >
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31430.628112739087!2d105.75139450416518!3d10.031005900760672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0883d0dac6b15%3A0xf6ae5b1bd18625!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBD4bqnbiBUaMah!5e0!3m2!1svi!2s!4v1585573095498!5m2!1svi!2s"></iframe>
                            </div>
                        </div>
                        <div className="contact">
                            <h1>Contact</h1>
                               <ul>
                                   <li><p>Thanh Phuc Huynh</p></li>
                                   <li><p>0347766101</p></li>
                                   <li><p>phucb1706515@student.ctu.edu.vn</p></li>

                               </ul>
                           
                        </div>

                        <div className="contactFollow">
                            <h1>Follow</h1>

                            <ul>
                            {/* <i className="fa fa-facebook" aria-hidden="true" /> */}
                                <li><a href="https://www.facebook.com/phuchuynhfait"><p><i className="fa fa-facebook" aria-hidden="true"  style={{margin:"5px"}}/>  Facebook</p></a></li>
                                <li><a href="https://www.instagram.com/thanh_phuc_huynh/"><p> <i className="fa fa-instagram" aria-hidden="true"  style={{margin:"5px"}} />Instagram</p></a></li>
                                <li><a href="https://www.instagram.com/thanh_phuc_huynh/"><p> <i className="fa fa-youtube" aria-hidden="true"  style={{margin:"5px"}} />Youtube</p></a></li>

                            </ul>
                        </div>
                    </div>
                </section>
            </div>
    
        )
    }
    
}
export default Home;
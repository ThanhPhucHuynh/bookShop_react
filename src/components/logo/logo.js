import React,{Component} from 'react'
// import music from './media/crush_tessa_violet.mp3'
import music from './media/bat.mp3'

import './lo.js'
import './logo.css'

class Logo extends Component {
    

    render(){


        return(
            <div className="logoAnimate">
                {/* <audio id="myAudio" preload='none'>
                    <source src={music} ></source>
                </audio> */}
                 <ul className="text hidden">
                <li>W</li>
                <li>e</li>
                <li>b</li>
                <li>p</li>
                <li>e</li>
                <li>t</li>

                <li className="spaced">T</li>
                <li className="ghost">h</li>
                <li className="ghost">a</li>
                <li className="ghost">n</li>
                <li className="ghost">h</li>
                <li className="spaced">P</li>
                <li className="ghost">h</li>
                <li className="ghost">u</li>
                <li className="ghost">c</li>

                </ul>
            </div>


        )
    }



}
export default Logo;
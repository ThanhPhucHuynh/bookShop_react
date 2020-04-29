import React,{Component} from 'react'

import './lo.js'
import './logo.css'

class Logo extends Component {
    render(){


        return(
            <div className="logoAnimate">
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
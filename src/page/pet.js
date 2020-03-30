import React, { Component } from "react";
import {  FormGroup, Label, Input ,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button} from 'reactstrap';
import axios from "axios";
import "./pet.css";
class Pet extends Component {
    constructor(props){
        super(props);
        this.state={
            urlIMG:'',
            api:'https://api.thecatapi.com/v1/images/search'
        }
        this.onChangeOR = this.onChangeOR.bind(this);
        this.changeIMG = this.changeIMG.bind(this)
    }
    componentDidMount(){
         axios.get("https://api.thecatapi.com/v1/images/search").then(res=>{
            console.log(res.data[0].url)
            this.setState({
                urlIMG: res.data[0].url
            })
        })
    }
    onChangeOR(event){
        console.log(event.target.value);
        let select = event.target.value.toLowerCase();
        axios.get("https://api.the"+select+"api.com/v1/images/search").then(res=>{
            console.log(res.data[0].url)
            this.setState({
                urlIMG: res.data[0].url,
                api: "https://api.the"+select+"api.com/v1/images/search"
            })
        })
    }
    changeIMG(){
        axios.get(this.state.api).then(res=>{
            console.log(res.data[0].url)
            this.setState({
                urlIMG: res.data[0].url
            })
        })
    }
    render(){
        let {urlIMG } = this.state;
        console.log(urlIMG)
        return(
            <div className="divMainPet">
                <h1 className="contentFun">It will make you happy</h1>
                <FormGroup className="FromGoupFun">
                    <Label for="exampleSelect">Select</Label>
                    
                    <Input type="select" name="select" id="exampleSelect" 
                        onChange={this.onChangeOR}
                    >
                    
                    <option>CAT</option>
                    <option>DOG</option>
                    {/* <option>3</option> */}
                    
                    </Input>
                    
                </FormGroup >
                <h1 className="petImgContent">Pets Images &#128522;</h1>
                <div>
                    <div className='divImg'>
                        <button>
                        <CardImg 
                            src={urlIMG}
                            alt="pic_catORdog"
                            onClick={this.changeIMG}

                        ></CardImg >
                        </button>
                    </div>
                    <p className="Note">Click picture to change &#128525; &#128525;</p>
                </div>
                
            </div>
        )
    }

}
export default Pet;

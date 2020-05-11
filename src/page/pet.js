import React, { Component } from "react";
import {  FormGroup, Label, Input ,
     CardImg
      } from 'reactstrap';
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';
import "./pet.css";
class Pet extends Component {
    constructor(props){
        super(props);
        this.state={
            urlIMG:'',
            api:'https://api.thecatapi.com/v1/images/search',
            isLoad:true
        }
        this.onChangeOR = this.onChangeOR.bind(this);
        this.changeIMG = this.changeIMG.bind(this)
    }
    componentDidMount(){
         axios.get("https://api.thecatapi.com/v1/images/search").then(res=>{
            console.log(res.data[0].url)
            this.setState({
                urlIMG: res.data[0].url,
                isLoad: false
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
                api: "https://api.the"+select+"api.com/v1/images/search",
                isLoad: !true
            })
        })
    }
    changeIMG(){
        this.setState({
            isLoad:true
        })
        axios.get(this.state.api).then(res=>{
            console.log(res.data[0].url)
            this.setState({
                urlIMG: res.data[0].url,
                isLoad: !true
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
                        {
                            (this.state.isLoad)?(

                                <CircularProgress />


                                ):
                                (<CardImg 
                                    src={urlIMG}
                                    alt="pic_catORdog"
                                    onClick={this.changeIMG}

                                ></CardImg >)      
                        }
                       
                        </button>
                    </div>
                    <p className="Note">Click picture to change &#128525; &#128525;</p>
                </div>
                
            </div>
        )
    }

}
export default Pet;

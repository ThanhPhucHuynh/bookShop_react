var rectangles =[
    {width: 10, height: 5},
    {width: 10, height: 20},
    {width: 4, height: 16}
];

var resut = rectangles.map((obj)=>{
    return obj.width * obj.height;
})
console.log(resut);
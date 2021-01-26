
let pencil=document.querySelector("#pencil");
let pencilOptions = document.querySelector("#pencil-options");
let eraser=document.querySelector("#eraser");
let eraserOptions = document.querySelector("#eraser-options");

let red = document.querySelector(".red");
let blue = document.querySelector(".blue");
let yellow = document.querySelector(".yellow");
let black = document.querySelector(".black");

let lastColor="black";

let pencilSize = document.querySelector('#pencil-size');
let eraserSize = document.querySelector('#eraser-size');

let undo = document.querySelector("#undo");
let redo = document.querySelector("#redo");

let lastPencilSize = 1;
let lastEraserSize = 1;



pencilSize.addEventListener("change" , function(){
    lastPencilSize = pencilSize.value;
    ctx.lineWidth = lastPencilSize;
})

eraserSize.addEventListener("change" , function(){
    lastEraserSize = eraserSize.value;
    ctx.lineWidth = lastEraserSize;
})

red.addEventListener("click" , function(){
    ctx.strokeStyle = "red";
    lastColor="red";
    
})
blue.addEventListener("click" , function(){
    ctx.strokeStyle = "blue";
    lastColor="blue";
})
yellow.addEventListener("click" , function(){
    ctx.strokeStyle = "yellow";
    lastColor="yellow";
})
black.addEventListener("click" , function(){
    ctx.strokeStyle = "black";
    lastColor="black";
})





pencil.addEventListener("click",function(){
    if (pencil.classList.contains("active-tool")){
         // pencil ke options open
    if (pencilOptions.classList.contains("hide")) {
        pencilOptions.classList.remove("hide");
      } else {
        pencilOptions.classList.add("hide");
      }
    }
    else{
         if(lastColor == "black")
         {
            ctx.strokeStyle = "black";
         }
         else if(lastColor == "blue")
         {
            ctx.strokeStyle = "blue";
         }
         else if( lastColor=="red")
         {
            ctx.strokeStyle = "red";
         }
         else if( lastColor="yellow")
         {
            ctx.strokeStyle = "yellow";
         }
        ctx.lineWidth = lastPencilSize;
       // ctx.strokeStyle="black";
        pencil.classList.add("active-tool");
        eraser.classList.remove("active-tool");
        eraserOptions.classList.add("hide");
    }
})

eraser.addEventListener("click",function(){
    if (eraser.classList.contains("active-tool")){
         // eraser ke options open
    if (eraserOptions.classList.contains("hide")) {
        eraserOptions.classList.remove("hide");
      } else {
        eraserOptions.classList.add("hide");
      }
    }
    else{
        ctx.lineWidth=lastEraserSize;
        ctx.strokeStyle="white";
        pencil.classList.remove("active-tool");
        eraser.classList.add("active-tool");
        pencilOptions.classList.add("hide");
    }
})


undo.addEventListener("click" , function(){
    let undoLine = db.pop();
    redoDb.push(undoLine);
    // eraseLine(undoLine);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    redraw();
  })


  
redo.addEventListener("click" , function(){
    if(redoDb.length){
      let redoLine = redoDb.pop();
      db.push(redoLine);
      for(let i=0 ; i<redoLine.length ; i++){
        let lineObj = redoLine[i];
        ctx.strokeStyle = lineObj.color;
        ctx.lineWidth = lineObj.width;
        if(lineObj.id == 'md'){
          ctx.beginPath();
          ctx.moveTo(lineObj.x , lineObj.y);
        }
        else{
          ctx.lineTo(lineObj.x , lineObj.y);
          ctx.stroke();
        }
      }
  
    }
  })
  
  function redraw(){
    for(let i=0 ; i<db.length ; i++){
      let line = db[i];
      for(let j=0 ; j<line.length ; j++){
        let lineObj = line[j];
        ctx.strokeStyle = lineObj.color;
        ctx.lineWidth = lineObj.width;
        if(lineObj.id == 'md'){
          ctx.beginPath();
          ctx.moveTo(lineObj.x , lineObj.y);
        }
        else{
          ctx.lineTo(lineObj.x , lineObj.y);
          ctx.stroke();
        }
      }
    }
  }
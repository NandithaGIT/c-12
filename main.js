status = "";
objects = [];

function setup(){
    canvas = createCanvas(450,450);
    canvas.position(900,400);
    video = createCapture(VIDEO);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects";
    input = document.getElementById("inp").value;
}

function modelLoaded(){
    console.log("model Loaded!");
    status = true;
}

function draw(){
    image(video,0,0,450,450);
    if(status != ""){
        for(i = 0;i < objects.length;i++){
            confidence = floor(objects[i].confidence * 100);
            fill("#16213E");
            text(objects[i].label + " " + confidence + "%",objects[i].x,objects[i].y);
            noFill();
            stroke("#C3FF99");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label == input){
            objectDetector.detect(video,gotResult);
            document.getElementById("status").innerHTML = input + "found";
            var synth = window.speechSynthesis;
            var utterThis = new SpeechSynthesisUtterance(input + "found");
            objects.speak(utterThis);
            }
            else{
              document.getElementById("status").innerHTML = input + "not found";
            }
        }
    }
}

function gotResult(error,results){
    if(error){
        console.log("error");
    }
    console.log(results);
    results = objects;
}

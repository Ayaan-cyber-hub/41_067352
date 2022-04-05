status = "";
objects = [];

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 380);
    
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById("object_name").value
}

function modelLoaded() {
    console.log("modelLoaded");
    status = true;
}

function gotResults(error, results){
    if (error) {
        console.log(error);
    }
    console.log(results);
    object = results;
}

function draw() {
    image(video, 0 , 0 , 380, 380);
    
     if(status != "")
     { 
         r = random(255);
         g = random(255);
         b = random(255);
         objectDetector.detect(video, gotResults);
         for (i = 0; i < objects.length; i++){

            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number Of Objects Detected Are : " + objects.length;

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y);
            nofill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label == object_name) {
                
                video.stop()
                objectDetector.detect(gotResults);
                document.getElementById("ob jects_status").innerHTML = object_name + " is found "
                synth = window.speechSynthesis
                utter = new SpeechSynthesisUtterance(object_name + " is found ")
                synth.speak(utter)
            } else {
                document.getElementById("objects_status").innerHTML = object_name + " is not found "
            }

         }
     }
}


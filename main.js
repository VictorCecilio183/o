
img="";
img1="";
img2="";
img3="";
img4="";

objects=[];
estatus="";

function preload(){
    img1=loadImage('leones.jpg');
    img2=loadImage('tortuga.jpg');
    img3=loadImage('tigre.jpg');
    img4=loadImage('guepardo.jpg');

}

function setup() {
    canvas=createCanvas(640,420);
    canvas.position(550,300);

    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Estatus:detectando objetos";

}

function modelLoaded() {
    console.log("¡Modelo cargado!")
    estatus=true;


}

function gotResult(error,results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects=results;
}


function draw() {
    var combo=document.getElementById("option-names");
  var seleccion=combo.options[combo.selectedIndex].text;

    if(seleccion=="leones"){
        img=img1;
    }
    if(seleccion=="tortuga"){
        img=img2;
    }
    if(seleccion=="tigre"){
        img=img3;
    }
    if(seleccion=="guepardo"){
        img=img4;
    }



    image(img,0,0,640,420);


    if(estatus!="")
    {
        objectDetector.detect(img,gotResult);

        for (i=0;i<objects.length;i++) {
            document.getElementById("status").innerHTML="Estatus:objeto detectado";

            fill("#FF0000");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+""+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
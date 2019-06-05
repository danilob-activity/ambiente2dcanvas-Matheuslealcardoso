document.getElementById("info-object").style.display = "none";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const WIDTH = window.innerWidth;
const HEIGHT = window.outerHeight;

canvas.width = WIDTH;
canvas.height = HEIGHT;
//faz o desenho do triângulo

var objects = []; //lista de objetos
var 

objectSelected = null;

function drawCanvas() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    for (var i = 0; i < objects.length; i++) {
        objects[i].draw();
    }
    drawAxis();
}

function drawAxis() {
    ctx.strokeStyle = "#f3c1c6";
    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.setLineDash([1, 1]);
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);


}

window.addEventListener("load", drawCanvas);

function pushBox() {
    var obj = new Box();
    objects.push(obj);
    objectSelected = objects[objects.length - 1];
    updateDisplay(objectSelected);
    document.getElementById("info-object").style.display = "block";
    drawCanvas();

}

function pushCircle() {
    var obj = new Circle();
    objects.push(obj);
    objectSelected = objects[objects.length - 1];
    updateDisplay(objectSelected);
    document.getElementById("info-object").style.display = "block";
    drawCanvas();
}

function updateDisplay(objectSelected) {
    document.getElementById("posx").value = objectSelected.getTranslate()[0];
    document.getElementById("posy").value = objectSelected.getTranslate()[1];
}

function objectName(){
    if (objectSelected != null) {
        try {
            name = document.getElementById("objectName").value;
            objectSelected.setName(name);
            drawCanvas();
        } catch (error) {
            window.alert(error);
        }
    }
}

function updatePosition() {
    if (objectSelected != null) {
        try {
            posx = parseFloat(document.getElementById("posx").value);
            posy = parseFloat(document.getElementById("posy").value);
            objectSelected.setTranslate(posx, posy);
            drawCanvas();
        } catch (error) {
            window.alert(error);
        }
    }
}

function scaleObject() {
    if (objectSelected != null) {
        try {
            scalex = parseFloat(document.getElementById("scalex").value);
            scaley = parseFloat(document.getElementById("scaley").value);
            objectSelected.setScale(scalex, scaley);
            drawCanvas();
        } catch (error) {
            window.alert(error);
        }
    }
}

function rotateObject(){
    if(objectSelected != null){
        try {
            angle = parseFloat(document.getElementById("angle").value);
            objectSelected.setRotate(angle);
            drawCanvas();
        } catch (error) {
            window.alert(error);
        }
    }
}

function colorObject(){
    if(objectSelected != null){
        try {
            fill = "#" + document.getElementById("colorObject").value;
            objectSelected.setFill(fill);
            drawCanvas();
        } catch (error) {
            window.alert(error);
        }
    }
}

function strokeObject(){
    if(objectSelected != null){
        try {
            stroke = "#" + document.getElementById("strokeObject").value;
            objectSelected.setStroke(stroke);
            drawCanvas();
        } catch (error) {
            window.alert(error);
        }
    }
}

function onClickMouse(event){
    x = event.offsetX;
    y = event.offsetY;

    var newcoord = multVec(transformUsual(WIDTH, HEIGHT), [x, y, 1]);

    //console.log("X: " + x + " Y: " + y);

    console.log("X_Usual: " + newcoord[0] + " Y_Usual: " + newcoord[1]);
    
    for(var i=0; i < objects.length; i++){
        if(objects[i].tryIntersection(x, y)){
            console.log("Interseção!");
        }else{
            console.log("Não interseção!");
        }
    }
}

function overClick(event){
    flag = 0;
}

function setToMoveObject(){
    flag = 1;
}

function moveObject(event){
    if(flag == 1){
        if(objectSelected != null){
            var x = event.offsetX;
            var y = event.offsetY;
            var pos = multVec(transformUsual(WIDTH, HEIGHT), [x,y,1]);
            objectSelected.setTranslate(pos[0], pos[1]);
            drawCanvas();
        }
    }
}

canvas.addEventListener("dblclick", setToMoveObject);
canvas.addEventListener("mousemove", moveObject);
canvas.addEventListener("click", overClick);
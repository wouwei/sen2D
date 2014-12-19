

// canvas setting 
$.canvas.setting(800,600,"#FF4466");

// textures
$.assets.newTexture('grey','assets/circle_grey.png');
$.assets.newTexture('green','assets/circle_green.png');
$.assets.newTexture('red','assets/circle_red.png');

// assets.
$.assets.newImage('redcircle','red',10,10,70,70,1);
$.assets.newImage('greencircle','green',50,50);
$.assets.newImage('greycircle','grey',100,100);

// setters
$.assets.imageScale('greencircle',1.5);
$.assets.imagePosition('greycircle',200,100);
$.assets.imageSize("redcircle",20,70);

console.log($.assets.draw.order);
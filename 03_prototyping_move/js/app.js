

$.rendering(); // <= set up here the whole common paramaters ... 
$.rendering.setBackgroundColor(0xFF6699); // <= set up only some parameters ... 

$.texture.add('greybutton',"assets/square_grey.png");
$.button('button1','greybutton',50,20);
$.asset.button1.pos(200,300);


console.log($.stage.toSource());

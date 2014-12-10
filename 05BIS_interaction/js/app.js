
// general rendering
$.rendering(); // <= set up here the whole common paramaters ... 
$.rendering.setBackgroundColor(0xFFFFFF); // <= set up only some parameters ... 

// assets placing
$.texture.add('greybutton',"assets/circle_grey.png");
$.texture.add('greenbutton',"assets/circle_green.png");
$.texture.add('redbutton',"assets/circle_red.png");
$.button('button0','greybutton',0,200);
$.button('button1','greenbutton',150,200);
$.button('button2','redbutton',300,200);


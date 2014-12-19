assets = function(root) {
	// SETTING
	this.texture = {};
	this.images = {};
	this.draw = {};
	this.draw.order = [];
	
	/*
		DEFINE
				*/

	// declaring textures 
	this.newTexture= function(name,url){
			root.assets.texture[name]= new Image();
			root.assets.texture[name].src=url;
	}
	
	
	// declaring image objects 
	// eg $.assets.newImage(name,texture,x,y,width,height,scale)
	// name = name of the new image object 
	// texture = name of the texture defined upper 
	// (x,y) = position of the upper left corner of the image 
	// width, height = size of the image 
	// scale ( 1 = 100% ) scale of the image . 
	this.newImage = function() {
		name = (arguments.length==0)?"UnkownImage":arguments[0]; // getting the object name if given
		texName=(arguments.length<1)?"NoTex":arguments[1]; // getting the texture if given 
		
		// filling the image object 
		for(i in arguments ) {
				
				switch(i) {
						case "0" 	: 	root.assets.draw[name] = {};
										root.assets.draw.order.push(name);
										break;
						case "1"	:	root.assets.draw[name].texture = root.assets.texture[arguments[1]];
										break;
						case "2"	:	root.assets.draw[name].x = arguments[2];
										break;
						case "3" 	: 	root.assets.draw[name].y = arguments[3];
										break;
						case "4"	:	root.assets.draw[name].width = arguments[4];
										break;
						case "5"	:	root.assets.draw[name].height = arguments[5];
										break;
						case "6"	:	root.assets.draw[name].x = root.assets.draw[name].x * arguments[6];
										root.assets.draw[name].y = root.assets.draw[name].y * arguments[6];
										break;
				}
		}
		
		// defining the type 
		root.assets.draw[name].type = "image";
		
		// checking if image well defined. 
		switch(arguments.length) {
			case 0 : 	console.log ("missing a name and a texture for the image "+name);
						console.log("eg $.scale.newImage(name,texture,x,y,width,height,scale)");
						break;
			case 1	:	console.log("missing a texture for the image "+name);
						console.log("eg $.scale.newImage(name,texture,x,y,width,height,scale)");
						break;
			case 2	:	root.assets.draw[name].x=0;
						root.assets.draw[name].y=0;
						root.assets.draw[name].width =root.assets.texture[texName].width;
						root.assets.draw[name].height=root.assets.texture[texName].height;
						break;
			case 3	:	root.assets.draw[name].y=0;
						root.assets.draw[name].width =root.assets.texture[texName].width;
						root.assets.draw[name].height=root.assets.texture[texName].height;
						break;
			case 4	:	
						root.assets.draw[name].width =root.assets.texture[texName].width;
						root.assets.draw[name].height=root.assets.texture[texName].height;
						break;
			case 5	:	root.assets.draw[name].height=root.assets.texture[texName].height;
						break;
		}
	};
	
	// setting image position 
	this.imagePosition= function(image,x,y) {
			root.assets.draw[image].x=x;
			root.assets.draw[image].y=y;
	};
	
	// setting image size  . 
	this.imageSize= function(image,width,height) {
			root.assets.draw[image].width = width ;
			root.assets.draw[image].height = height ;
	};
	
	// scaling image 
	this.imageScale= function(image,scale) {
			root.assets.draw[image].width = root.assets.draw[image].width * scale;
			root.assets.draw[image].height = root.assets.draw[image].height * scale ; 
	};
}
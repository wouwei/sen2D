render = function(root) {
	//This should be the loop 
	this.draw = function() {
		root.canvas.bkg.setting();
		//console.log("i'm running !");
		root.render.drawObjects() ;
	}
	
	// Launching the loop at 30 FPS = 1 FP 33 mS 
	setInterval(function(){root.render.draw();},33);
	
	// drawing the assets based on the order.
	this.drawObjects = function() {
		for(i=root.assets.draw.order.length-1;i>-1;i--) {
			name=root.assets.draw.order[i]; // name of the image 
			img = root.assets.draw[name]; // image object 
			
			switch(img.type)
				{
				case "image" : 	root.canvas.ctx.drawImage(img.texture,img.x,img.y,img.width,img.height);
								break;
			}
		}
	};
}
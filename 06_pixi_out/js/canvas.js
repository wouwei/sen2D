canvas = function(root) {
	// SETTINGS
	this.bkg = {};
	
	/*
		HTML PART
					*/
					
	//////////////////////////////
	// canvas insert into HTML  //
	//////////////////////////////
	this.senCanvas = document.createElement('canvas');
	this.senCanvas.id = 'senCanvas';
	document.body.appendChild(this.senCanvas);
	
	/* 
		CANVAS PART
						*/
	// implementing 2D
	this.ctx = document.getElementById('senCanvas').getContext('2d');
		
	////////////////////
	// canvas setting //
	////////////////////
	// default canvas size 
	this.senCanvas.width = 200;
	this.senCanvas.height = 100;	
	
	// default background .
	this.bkg.x = 0;
	this.bkg.width = 200;
	this.bkg.y = 0;
	this.bkg.height = 100;
	this.bkg.color = "#FFFFFF";
	this.bkg.setting  = function() {
			root.canvas.ctx.beginPath();
			root.canvas.ctx.rect(root.canvas.bkg.x,root.canvas.bkg.y,root.canvas.bkg.width,root.canvas.bkg.height);
			root.canvas.ctx.fillStyle =root.canvas.bkg.color;
			root.canvas.ctx.fill();
		}
	
	/////////////
	// SETTERS //
	/////////////
	// $.canvas.setting(width,height,color); default color = #FF6600 eg
	this.setting = function() {
		
		for(i=0;i<arguments.length;i++) {
				switch(i) {
						case 0 : 	root.canvas.senCanvas.width = arguments[i];
									root.canvas.bkg.width = arguments[i];
									break;
						case 1 :	root.canvas.senCanvas.height = arguments[i];
									root.canvas.bkg.height = arguments[i]
									break;
						case 2 :	root.canvas.bkg.color = arguments[i];
									break;
					}
			}
	}
}
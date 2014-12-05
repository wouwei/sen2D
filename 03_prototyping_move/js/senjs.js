
// prototype
var senjs = function () {
	this.sprite = {};
	this.texture = {};
	this.asset = {};
	this.stage;
	
	thisroot=this;
	
	
	
	//=> main elements 
	// this is the loop
	this.animate= function() {
				requestAnimFrame(thisroot.animate);
				
				// effects
				
				//render
				thisroot.renderer.render(thisroot.stage);
			}
	
	// this is the rendering
	this.rendering = function() {
				thisroot.stage= new PIXI.Stage(0xFFFFFF, true);
				
				thisroot.renderer= PIXI.autoDetectRenderer(window.screen.availWidth,window.screen.availHeight);
				document.body.appendChild(thisroot.renderer.view);	
				requestAnimFrame(thisroot.animate);
			}
	
	// => this is the assets .
	// adding textures
	this.texture.add=function(name,url) {
		this[name]=PIXI.Texture.fromImage(url);
		}
	
	// adding assets 
	this.sprite.add=function(name,tex) { this[name]= new PIXI.Sprite(thisroot.texture[tex]);
		}
	
	this.button=function(name,tex,x,y) {
	
		// default definition
		thisroot.asset[name]= new PIXI.Sprite(thisroot.texture[tex]);
		thisroot.asset[name].scale.x = thisroot.asset[name].scale.y = 0.8;
		thisroot.asset[name].anchor.x = 0.5;
		thisroot.asset[name].anchor.y = 0.5;
		thisroot.asset[name].position.x = x;
		thisroot.asset[name].position.y = y;
		thisroot.asset[name]._interactive=true;
		
		// default mouse move 
		//mouseover
		thisroot.asset[name].mouseover = function(data) {
				console.log("mouse is over ");
				this.alpha = 0.5;
			}
			
		// mousedown	
		thisroot.asset[name].mousedown = thisroot.asset[name].touchstart = function(data) {
				console.log("mouse is down");
				this.isdown = true;
				this.scale.x=this.scale.y = 1;
				
				// resetting newposX , newposY
				this.newposX = 0;
				this.newposY = 0;
				
				
			}
			
		//mousemove
		thisroot.asset[name].mousemove = thisroot.asset[name].touchmove = function(data) {
			if(this.isdown == true) {
					diffX=(this.newposX == 0 ) ? 0 : data.global.x - this.newposX;
					diffY=(this.newposY == 0 ) ? 0 : data.global.y - this.newposY;
					this.newposX=data.global.x;
					this.newposY=data.global.y;
					thisroot.asset[name].position.x = thisroot.asset[name].position.x+diffX;
					thisroot.asset[name].position.y = thisroot.asset[name].position.y+diffY;
				}
			
		}
		
		
		//mouseup
		thisroot.asset[name].mouseup=thisroot.asset[name].touchend=function(data) {
				console.log("mouse is up" );
				this.isdown= false ;
				this.scale.x=this.scale.y= 0.8;
			}
			
		// mouseout 
		thisroot.asset[name].mouseout = function(data) {
				console.log("mouse is out " ); 
				this.alpha = 1;
				if(this.isdown==true ) { this.scale.x=this.scale.y= 0.8 ; this.isdown=false;}
				
			}
		

		
		thisroot.stage.addChild(thisroot.asset[name]);
		
		// setters 
		thisroot.asset[name].pos=function(x,y) {
			thisroot.asset[name].position.x=x;
			thisroot.asset[name].position.y=y;
		}

		
		
		
	}
	
	
	//=> 	setters / getters 
	// backgroundcolor 
	this.rendering.setBackgroundColor = function(color) {
		thisroot.stage.setBackgroundColor(color);
	}
	

	
}

$ = new senjs();
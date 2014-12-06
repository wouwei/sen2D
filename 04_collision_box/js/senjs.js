console.log("senjs.js for pixie v1.1 - https://github.com/wouwei/mindmapixi");

/*
	for myself reminder : 
	
	prototype {
		/->vars
		/
		/->presets 
		/
		/-----> functions
		/	/
		/	/-----> this is the app loop
		/	/
		/	/-----> this is the app rendering 
		/	/
		/	/-----> collision
		/
		/-----> the assets 
		/	/
		/	/-----> adding texture
		/	/
		/	/-----> adding buttons ( sprite with a specific size , behavior) 
		/	/	/
		/	/	/-----> default definition
		/	/	/
		/	/	/-----> adding a collision box 
		/	/	/
		/	/	/-----> default mouse move 
		/	/	/	/-> mouseover
		/	/	/	/-> mousedown 
		/	/	/	/-> mousemove || using the collision function
		/	/	/	/-> mouseup
		/	/	/	/-> mouseout
		/	/	/
		/	/	/-----> adding to the stage ( drawings ) 
		/	/	/
		/	/	/----> setters and getters ( position only here )
		/
		/-----> setters and getters 
		/	/
		/	/-----> background color 
	}

object logic : 
	this.texture = all the textures 
	this.asset = all the assets ( here the 3 buttons in this example )
	this.collision : object managing the mouse and object statement - It is used by the colliding function which is itself used in the objects mousemove function
	
	this.collision = { dic : { button0,button1,button2 } , button0 {x:..,y:..,w:..,h:..},button1 [....] , mouse {button{isdown : false|object "dragged";}}}

	this.stage = managing all the pixi drawing parameters 
	
*/


// prototype
var senjs = function () {
	// vars 
	this.texture = {};
	this.asset = {};
	this.collision = {};
	this.collision.dic = []; // use to " index " the assets .
	this.collision.mouse = {} 
	this.stage;

	// presets 
	this.collision.mouse.isdown = false ; // the first state of the mouse when we enter the page 
	thisroot=this;
	
	
	
	/*  
		functions 
						*/

						
	//////////////////////					
	// this is the loop //
	//////////////////////
	this.animate= function() {
				requestAnimFrame(thisroot.animate);
				
				// effects
				
				//render
				thisroot.renderer.render(thisroot.stage);
			}
			
	///////////////////////////
	// this is the rendering //
	///////////////////////////
	this.rendering = function() {
				thisroot.stage= new PIXI.Stage(0xFFFFFF, true);
				
				thisroot.renderer= PIXI.autoDetectRenderer(window.screen.availWidth,window.screen.availHeight);
				document.body.appendChild(thisroot.renderer.view);	
				requestAnimFrame(thisroot.animate);
			}
			
	////////////////		
	// collisions //
	////////////////
	
	this.colliding = function(dragged) {
		n = thisroot.collision.dic.length;
		dragging = thisroot.collision[dragged];
		var test = [] ; 
		for(i=0;i<n;i++) {
			if(thisroot.collision.dic[i] != dragged ) {
				
				obstacle = thisroot.collision[thisroot.collision.dic[i]];
				if(		(dragging.x >= obstacle.x + obstacle.w)
					||	(dragging.x + dragging.w <= obstacle.x)
					||	(dragging.y >= obstacle.y + obstacle.h)
					||	(dragging.y+dragging.h <= obstacle.y)	)
						{}
				else 
						test.push(thisroot.collision.dic[i]) ;
			}
			
			
		}
			
			return test ;
	}
	
	/* 
		the assets 
					*/
					
	/////////////////////				
	// adding textures //
	/////////////////////
	this.texture.add=function(name,url) {
		this[name]=PIXI.Texture.fromImage(url);
		}
	
	///////////////////
	// adding assets //
	///////////////////
	
	
	
	// => button
	// .. is a sprite with specific form 
	// .. is interactive 
	// .. has a default mouse interaction 
	this.button=function(name,tex,x,y) {
	
		// default definition //
		thisroot.asset[name]= new PIXI.Sprite(thisroot.texture[tex]);
		thisroot.asset[name].scale.x = thisroot.asset[name].scale.y = 0.8;
		thisroot.asset[name].anchor.x = 0;
		thisroot.asset[name].anchor.y = 0;
		thisroot.asset[name].position.x = x;
		thisroot.asset[name].position.y = y;
		thisroot.asset[name]._interactive=true;
		
		
		// adding to collision box collection //
		thisroot.collision.dic.push(name);
		thisroot.collision[name]= {};
		thisroot.collision[name].x=x;
		thisroot.collision[name].y=y;
		thisroot.collision[name].w=thisroot.asset[name].width;
		thisroot.collision[name].h=thisroot.asset[name].height;
		
		
		// default mouse move //
		//mouseover
		thisroot.asset[name].mouseover = function(data) {
				if(thisroot.collision.mouse.isdown == false ) {
					console.log("mouse is over "+name);
					this.alpha = 0.8;
					}
				
			}
			
		// mousedown	
		thisroot.asset[name].mousedown = thisroot.asset[name].touchstart = function(data) {
		
				// the dragged object is drawed last ( on the top of the others)
				thisroot.stage.swapChildren(thisroot.stage.getChildAt(thisroot.stage.children.length-1),thisroot.asset[name]); 
				
				thisroot.collision.mouse.isdown = name;
				this.isdown = true;
				this.alpha = 0.5;
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
					thisroot.asset[name].position.x = thisroot.collision[name].x = thisroot.asset[name].position.x+diffX;
					thisroot.asset[name].position.y = thisroot.collision[name].y = thisroot.asset[name].position.y+diffY;
					
					// " testing " the collision detection 
					console.log(name+"colliding with "+thisroot.colliding(name));
					
				}
			
		}
		
		
		//mouseup
		thisroot.asset[name].mouseup=thisroot.asset[name].touchend=function(data) {
				console.log("mouse is up" );
				
				thisroot.collision.mouse.isdown = false;
				this.isdown= false ;
				this.scale.x=this.scale.y= 0.8;
				this.alpha = 0.8
			}
			
		// mouseout 
		thisroot.asset[name].mouseout = function(data) {
				if(thisroot.collision.mouse.isdown == false ) {
						console.log("mouse is out "+name ); 
						this.alpha = 1;
					}
				
				
			}
		

		// adding to the stage //
		thisroot.stage.addChild(thisroot.asset[name]);
		
		// setters //
		// position 
		thisroot.asset[name].pos=function(x,y) {
			thisroot.asset[name].position.x=x;
			thisroot.asset[name].position.y=y;
		}

	}
	
	
	/*
		setters / getters 
							*/
							
	/////////////////////						
	// backgroundcolor //
	/////////////////////
	this.rendering.setBackgroundColor = function(color) {
		thisroot.stage.setBackgroundColor(color);
	}
	

	
}

$ = new senjs();
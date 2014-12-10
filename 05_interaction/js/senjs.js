console.log("senjs.js for pixie v1.2 - https://github.com/wouwei/mindmapixi");


/*

Changes :
- putting colliding into this.collision as a check function 
- adding handle collision .
*/

// prototype
var senjs = function () {
	// vars 
	this.texture = {};
	this.asset = {};
	this.collision = {};
	this.collision.dic = []; // used to " index " the assets .
	this.collision.current = [] // used to " save " the collision state when dragging something .
	this.collision.mouse = {} 
	this.mindmap = [] // used to know the structure of the mindmap.
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
	// checking collision //
	this.collision.check = function(dragged) {
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
			
			thisroot.collision.mousemove(test) ;
	}
	
	// handling collision when mouse is down and moving //
	this.collision.mousemove = function(result) {
			n=result.length;
			
			
			for(i=0;i<n;i++) {
					if(thisroot.collision.current.indexOf(result[i]) == -1 ) {	
							thisroot.asset[result[i]].scale.x = thisroot.asset[result[i]].scale.y = 0.6;
							thisroot.collision.current.push(result[i]); }
				}
				
			n=thisroot.collision.current.length;
			
			for(i=0;i<n;i++) {
					if(result.indexOf(thisroot.collision.current[i]) == -1 ) {
							if(thisroot.collision.current[i] != undefined ) {
									thisroot.asset[thisroot.collision.current[i]].scale.x = thisroot.asset[thisroot.collision.current[i]].scale.y = 0.5;
								}
							thisroot.collision.current.splice(i,1);
							
					}
				}
				
			
		}
	
	// handling collisions when mouse going up . 
	this.collision.mouseup = function(name) {
		//console.log(thisroot.collision.current);
		console.log(name);
		console.log(thisroot.mindmap);
		
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
		thisroot.asset[name].scale.x = thisroot.asset[name].scale.y = 0.5;
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
		
		// adding to the mindmap as a " root mindmap "
		thisroot.mindmap.push(name);
		
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
				this.scale.x=this.scale.y = 0.6;
				
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
					thisroot.collision.check(name);
					
				}
			
		}
		
		
		//mouseup
		thisroot.asset[name].mouseup=thisroot.asset[name].touchend=function() {
				console.log("mouse is up" );
				name= thisroot.collision.mouse.isdown;
				thisroot.collision.mouse.isdown = false;
				this.isdown= false ;
				this.scale.x=this.scale.y= 0.5;
				this.alpha = 0.8;
				
				thisroot.collision.mouseup(name);
				
			}
			
		// mouseout 
		thisroot.asset[name].mouseout = function() {
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
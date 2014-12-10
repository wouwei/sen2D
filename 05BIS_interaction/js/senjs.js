console.log("senjs.js for pixie v2.0 ''collision motor''- https://github.com/wouwei/mindmapixi");




// prototype
var senjs = function () {
	// vars 
	this.texture = {};
	this.asset = {};
	this.collision = {};
	this.collision.dic = []; // use to " index " the assets .
	this.collision.mouse = {} // mouse handling. 
	this.collision.mouse.state = {} // isOver , isDown
	this.collision.event = {} // state of a mouse event " translated " to the app logic ( cf line 173 ) + handle();
	
	this.stage;

	// presets 
	this.collision.mouse.state.isOver = false;
	this.collision.mouse.state.isDown = false;
	this.collision.mouse.state.isEntering = false; 
	this.collision.mouse.state.isLeaving = false ;
	this.collision.mouse.state.dragOver = false ; // when the mouse drags an object 
	this.collision.mouse.state.objectEntering = false;
	this.collision.mouse.state.objectLeaving = false ;
	this.collision.mouse.state.x = 0;
	this.collision.mouse.state.y = 0;
	this.collision.event.state = false ; // no event 
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
				
				
				// mouse handling
				thisroot.stage.mousemove = function(e) {  // collisions 
																if(thisroot.collision.event.state=="mouseIsDragging") {thisroot.collision.mouse.drag(e);}
																else {thisroot.collision.mouse.move(e);}
															}
				thisroot.stage.mousedown = function(e) { thisroot.collision.mouse.down(e); }
				thisroot.stage.mouseup = function(e) { thisroot.collision.mouse.up(e);}
				
				
			}
			
	////////////////		
	// collisions //
	////////////////
	
	// checking if mouse is entering, on, leaving  something 
	this.collision.mouse.move = function (e) {
		n= thisroot.collision.dic.length;
		posX=e.global.x;
		posY=e.global.y;
		
		// on something ? 
		isOver = thisroot.collision.mouse.state.isOver;
		
		thisroot.collision.mouse.state.isOver = false;
		for (i=0;i<n;i++) {
				obstacle = thisroot.collision[thisroot.collision.dic[i]];
				
				if (	(obstacle.x <= posX)
					&&	(obstacle.x + obstacle.w >= posX)
					&&	(obstacle.y <= posY)
					&&	(obstacle.y + obstacle.h >= posY))
					{ 	thisroot.collision.mouse.state.isOver = thisroot.collision.dic[i];}
						
				
				
				
		}
		
		// isLeaving, isEntering .
		thisroot.collision.mouse.state.isEntering = false ;
		thisroot.collision.mouse.state.isLeaving = false ;
		if(isOver != thisroot.collision.mouse.state.isOver ) {
			
			if (isOver == false ) {
					thisroot.collision.mouse.state.isEntering = thisroot.collision.mouse.state.isOver ;
					thisroot.collision.event.state = "mouseEnteringOject" ; 
					thisroot.collision.event.handle();
					thisroot.collision.event.state = false ; 
				}
				
			else { 	
					thisroot.collision.mouse.state.isLeaving = isOver ;
					thisroot.collision.event.state ="mouseLeavingObject";
					thisroot.collision.event.handle();
					thisroot.collision.event.state = false ; 
				}
					
		}
		
		
		console.log("mouse isOver "+thisroot.collision.mouse.state.isOver+" :: isDown =="+thisroot.collision.mouse.state.isDown); // --> CHECK <--
		
	}
	
	// checking if a dragging object is on another object .
	this.collision.mouse.drag = function(e) {
		
		dragged = thisroot.collision.mouse.state.isDown;
		diffX = e.global.x-thisroot.collision.mouse.state.x;
		diffY = e.global.y-thisroot.collision.mouse.state.y;
		
		// changing the drawed objects coord .
		thisroot.asset[dragged].position.x +=diffX;
		thisroot.asset[dragged].position.y +=diffY;
		
		thisroot.collision.mouse.state.x=e.global.x;
		thisroot.collision.mouse.state.y=e.global.y;
		
		// !! TO PUT THAT ON THE MOUSEUP FUNCTION MORE !!
		thisroot.collision[dragged].x +=diffX;
		thisroot.collision[dragged].y +=diffY;
		
		// checking object collisions 
		n = thisroot.collision.dic.length;
		dragging = thisroot.collision[dragged];
		test = false;
		
		// box collision test
		for(i=0;i<n;i++) {
			if(thisroot.collision.dic[i] != dragged ) {
				
				obstacle = thisroot.collision[thisroot.collision.dic[i]];
				if(		(dragging.x >= obstacle.x + obstacle.w)
					||	(dragging.x + dragging.w <= obstacle.x)
					||	(dragging.y >= obstacle.y + obstacle.h)
					||	(dragging.y+dragging.h <= obstacle.y)	)
						{}
				else 
						test=thisroot.collision.dic[i] ;
			}
			
			
		}
		
		
		//isLeaving , isEntering
		if(test !=thisroot.collision.mouse.state.dragOver ) 
			{
				if(test != false )
					{
						thisroot.collision.mouse.state.objectEntering = test;
						thisroot.collision.event.state = "objectEnterObject";
						thisroot.collision.event.handle();
						thisroot.collision.event.state = "mouseIsDragging" ; 
					}
				else 
					{
						thisroot.collision.mouse.state.objectLeaving = thisroot.collision.mouse.state.dragOver;
						thisroot.collision.event.state = "objectQuitObject";
						thisroot.collision.event.handle();
						thisroot.collision.event.state= "mouseIsDragging" ;
					}
					
			}
		
		
		
		thisroot.collision.mouse.state.dragOver = test;
		console.log(" ::mouse isOver "+thisroot.collision.mouse.state.isOver+" :: DragOver "+thisroot.collision.mouse.state.dragOver+" :: isDown =="+thisroot.collision.mouse.state.isDown); // => CHECK <=
	}
	
	
	////////////////////////////
	// mouse state management //
	////////////////////////////
	// mouseDown
	this.collision.mouse.down = function(e) {
		if(thisroot.collision.mouse.state.isOver != false ) {
			thisroot.collision.mouse.state.isDown = thisroot.collision.mouse.state.isOver;
			thisroot.collision.event.state="mouseDownOnObject";
			thisroot.collision.event.handle();
			thisroot.collision.event.state="mouseIsDragging";
			thisroot.collision.mouse.state.x = e.global.x;
			thisroot.collision.mouse.state.y = e.global.y;
			
		}
		else { thisroot.collision.mouse.state.isDown = "true" ; }
	}
	
	// mouseUp
	this.collision.mouse.up = function(e) {
		// checking if mouse was down but on no object ( isDown = true , do not have a, object's name )
		if (thisroot.collision.mouse.state.isDown != "true" ) {
				thisroot.collision.event.state="mouseQuitDragging";
				thisroot.collision.event.handle();
			}
		thisroot.collision.mouse.state.isDown = false ;
		thisroot.collision.event.state= false ;
	}
	
	
	
	////////////
	// events //
	////////////
	this.collision.event.handle = function() {
		
		switch(thisroot.collision.event.state) {
			case "mouseEnteringOject" 	:	name = thisroot.collision.mouse.state.isEntering ;
											thisroot.asset[name].alpha = 0.8;
											break;
			case "mouseLeavingObject" 	:	name = thisroot.collision.mouse.state.isLeaving ;
											thisroot.asset[name].alpha = 1;
											break;
			case "mouseDownOnObject" 	:	name = thisroot.collision.mouse.state.isDown;
			
											// drawing the dragged object on the top of the others .
											thisroot.stage.swapChildren(thisroot.stage.getChildAt(thisroot.stage.children.length-1),thisroot.asset[name]);			
											
											thisroot.asset[name].scale.x=thisroot.asset[name].scale.y=0.6;
											thisroot.asset[name].alpha = 0.5;
											break;
			case "mouseQuitDragging"	:	name = thisroot.collision.mouse.state.isDown;
											if(name != "true" ) {
													thisroot.asset[name].scale.x=thisroot.asset[name].scale.y=0.5;
													thisroot.asset[name].alpha = 0.7;
													
												}
												
											if(thisroot.collision.mouse.state.dragOver != false ) 
												{
													/*
														// HERE SHOULD BE THE STRUCTURE  LOGIC // to developp in next example.
													*/
													parent = thisroot.collision.mouse.state.dragOver;
													thisroot.asset[parent].alpha = 1;
													thisroot.asset[parent].scale.x=thisroot.asset[parent].scale.y=0.5;
													thisroot.collision.mouse.state.dragOver = false ;
													thisroot.structure(parent,name);

													
												}
											break;
			case "objectEnterObject"	:	name=thisroot.collision.mouse.state.objectEntering;
											thisroot.asset[name].alpha = 0.8;
											thisroot.asset[name].scale.x=thisroot.asset[name].scale.y=0.55;
											break;
			case "objectQuitObject"	:		name=thisroot.collision.mouse.state.objectLeaving;
											thisroot.asset[name].alpha = 1;
											thisroot.asset[name].scale.x=thisroot.asset[name].scale.y=0.5;
											break;											
			
		}
		
		console.log(thisroot.collision.event.state);
		
		
	}
	
	/////////////////////
	// STRUCTURE LOGIC // to developp in next example ....
	/////////////////////
	this.structure = function(parent,child) {
		
		newX = Math.floor((Math.random()*100)+50);
		newY = Math.floor((Math.random()*100)+50);
		thisroot.asset[child].position.x=thisroot.collision[child].x=thisroot.asset[parent].position.x+newX;
		thisroot.asset[child].position.y=thisroot.collision[child].y=thisroot.asset[parent].position.y+newY;
		
		// making a line 
		thisroot.asset["line"] = new PIXI.Graphics();
		thisroot.asset["line"].beginFill(0X222222);
		thisroot.asset["line"].lineStyle(5,0X222222);
		thisroot.asset["line"].moveTo(thisroot.asset[parent].position.x+25,thisroot.asset[parent].position.y+25);
		thisroot.asset["line"].lineTo(thisroot.asset[child].position.x+25,thisroot.asset[child].position.y+25);
		thisroot.asset["line"].endFill();
		thisroot.stage.addChild(thisroot.asset["line"]);
		
		// swapping to draw first the line .
		thisroot.stage.swapChildren(thisroot.stage.getChildAt(0),thisroot.asset["line"]);	
		
		
		
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
		//thisroot.asset[name]._interactive=true;
		
		
		// adding to collision box collection //
		thisroot.collision.dic.push(name);
		thisroot.collision[name]= {};
		thisroot.collision[name].x=x;
		thisroot.collision[name].y=y;
		thisroot.collision[name].w=thisroot.asset[name].width;
		thisroot.collision[name].h=thisroot.asset[name].height;
		

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
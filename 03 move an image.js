
var game = new Phaser.Game(800, 480, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

var MyObject = function (x, y, dx, dy, width, height, who, who1){
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.width = width;
	this.height = height;
	
	this.image = game.add.sprite(x, y, who);
	this.image.scale.setTo(width/this.image.width, height/this.image.height);
	
	this.image1 = game.add.sprite(x, y, who1);
	this.image1.scale.setTo(width/this.image1.width, height/this.image1.height);
	this.image1.x = -1000;

	this.getImage = function(){
		return this.image;
	};
	this.getImage1 = function(){
		return this.image1;
	};
	this.toStart = function(){
		this.x = 0;
		this.y = 0;
		this.dx = 5;
	};
	this.move = function(lb,rb,tb,bb){
		//text.text = "" + this.dx + ", " + this.dy;
		this.x+=this.dx;
		this.y+=this.dy;
		
		if(this.dx != 0){
		if(this.dx > 0){
			this.image.x = this.x;
			this.image.y = this.y;
			this.image1.x = -1000;			
		}
		else{
			this.image1.x = this.x;
			this.image1.y = this.y;
			this.image.x = -1000;
		}
		}
		if ((this.dx < 0 && this.x + this.dx  < lb- this.width) || (this.dx > 0 && this.x + this.dx +this.width > rb + this.width)){
			this.dx = -this.dx;
			this.y += this.height;
			if ( (this.y + this.dy + this.height > bb)){
				this.x = 0;
				this.y = 0;
				this.dx = 5;
			}
		}
		
		
	};
	this.toString = function(){
		return "" + this.image.x + ", " + this.image.y + "--" + this.dx + ", " + this.dy + " - " + this.image.width;
	};
	this.setDy = function(anydy){
		this.dy = anydy;
	};
	this.setDx = function(anydx){
		this.dx = anydx;
	};
};
var MyObject1 = function(x,y,dx,dy,width,height, who,who1){
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.width = width;
	this.height = height;
	
	this.image = game.add.sprite(x, y, who);
	this.image.scale.setTo(width/this.image.width, height/this.image.height);
	
	this.image1 = game.add.sprite(x, y, who1);
	this.image1.scale.setTo(width/this.image1.width, height/this.image1.height);
	this.image1.x = -1000;

	this.getImage = function(){
		return this.image;
	};
	this.getImage1 = function(){
		return this.image1;
	};
	
	this.move = function(lb,rb,tb,bb){
		//text.text = "" + this.dx + ", " + this.dy;
		//this.image.x = this.x;
		//this.image.y = this.y;
		
		if(this.x + this.dx  >= lb && this.x + this.dx + this.width <= rb){			
			this.x += this.dx;
		}
		if(this.y + this.dy >= tb && this.y + this.dy + this.height <= bb){
			this.y += this.dy;
		}
		
		
		if(this.dx > 0){
			this.image.x = this.x;
			this.image.y = this.y;
			this.image1.x = -1000;			
		}
		else{
			this.image1.x = this.x;
			this.image1.y = this.y;
			this.image.x = -1000;
		}
				
	};
	this.toString = function(){
		return "" + this.image.x + ", " + this.image.y + "--" + this.dx + ", " + this.dy + " - " + this.image.width;
	};
	this.setDy = function(anydy){
		this.dy = anydy;
	};
	this.setDx = function(anydx){
		this.dx = anydx;
	};
};

var text;
var mower;
var rockImage;
var bamImage;
var bigWheel;
var upKey;
var downKey;
var leftKey;
var rightKey;
var isAnimating = true;

function preload() {

    //  You can fill the preloader with as many assets as your game requires

    //  Here we are loading an image. The first parameter is the unique
    //  string by which we'll identify the image later in our code.

    //  The second parameter is the URL of the image (relative)
    game.load.image('leftMower', 'assets/pics/leftMower.png');
    game.load.image('rightMower', 'assets/pics/rightMower1.png');
    game.load.image('rocks', 'assets/pics/rocks1.png');
    game.load.image('bam', 'assets/pics/bam.jpg');
    
    game.load.image('rightBigWheel', 'assets/pics/rightBigWheel1.png');
    game.load.image('leftBigWheel', 'assets/pics/leftBigWheel1.png');
    
   
   
}

function create() {

    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen
    //  and assign it to a variable
   // var image = game.add.sprite(0, 0, 'einstein');
//	Enable p2 physics
	game.physics.startSystem(Phaser.Physics.P2JS);
    //game.physics.enable(image, Phaser.Physics.ARCADE);

    //image.body.velocity.x=150;
	bamImage = game.add.sprite(game.rnd.integerInRange(10, game.width-60), game.rnd.integerInRange(100, game.height-60), 'bam');
	bamImage.scale.setTo(50/bamImage.width, 50/bamImage.height);
	
	
	rockImage = game.add.sprite(bamImage.x, bamImage.y, 'rocks');
	rockImage.scale.setTo(50/rockImage.width, 50/rockImage.height);
	
	rockImage.inputEnabled = true;
	rockImage.input.enableDrag(true);
	
	//bamImage.visible = false;
	bamImage.x = -1000;

	game.stage.backgroundColor = "#00ff00";
	
	mower = new MyObject( 0,0,5,0,game.height/5,game.height/5,'rightMower','leftMower');
	
	bigWheel = new MyObject1( game.width/2,game.height - game.height/10,0,0,game.height/10,game.height/10,'rightBigWheel','leftBigWheel');
	
	
	upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
//	Enable the physics bodies on all the sprites and turn on the visual debugger
	
	
	
	
	
	 var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

    //  The Text is positioned at 0, 100
   // text = game.add.text(0, 200, bigWheel.x + ", " + bigWheel.y, style);
	 
	 text = game.add.text(0, 50, "Arrow keys move the big wheel", style);
	    var text2 = game.add.text(0, 100, "Mouse drags rocks", style);
	    
	 game.input.onDown.add(actionOnClick, this);
}

function actionOnClick () {

	if(!isAnimating){
		//
		bamImage.x = -1000;
		mower.toStart();
		rockImage.x = game.rnd.integerInRange(10, game.width-60);
		rockImage.y = game.rnd.integerInRange(100, game.height-60);
		rockImage.visible = true;
		isAnimating = true;
	}
    

}

function update() {
	//text.text = bug1.toString();
    
	mower.move(0,game.width,0,game.height);
	bigWheel.move(0,game.width,0,game.height);
	
	if(collision(mower,bigWheel,true)){
		mower.dx = -mower.dx;
	}
	
	if(collision(mower,rockImage,false)){
		collisionHandler();
	}
	if (upKey.isDown)
    {
		bigWheel.setDx(0);
		bigWheel.setDy(-5);
    }
    else if (downKey.isDown)
    {
    	bigWheel.setDx(0);
    	bigWheel.setDy(5);
    }

    if (leftKey.isDown)
    {
    	bigWheel.setDx(-5);
    	bigWheel.setDy(0);
    }
    else if (rightKey.isDown)
    {
    	bigWheel.setDx(5);
    	bigWheel.setDy(0);
    }
}

function collision(who1, who2,isFull){
	
	var num = 1;
	var den = 1;
	
	if(!isFull){
		num = 3;
		den = 4;
	}
	
	//text.text = "" + who1.x + ", " + who1.y;
	if(who1.x + who1.width < who2.x + who2.width/den){
		return false;
	}
	else if(who1.x > who2.x + num*who2.width/den){
		return false;
	}
	if(who1.y + who1.height < who2.y + who2.height/den){
		return false;
	}
	else if(who1.y > who2.y + num*who2.height/den){
		return false;
	}
	else {
		return true;
	}
}

function collisionHandler(){
	
	mower.setDx(0);
	bamImage.x = rockImage.x;
	bamImage.y = rockImage.y;
	bamImage.visible = true;
	rockImage.visible = false;
	isAnimating = false;
}



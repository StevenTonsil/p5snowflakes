let img1;
let snowflakes = [];
const gravity = new p5.Vector(0,0.05);
let wind = new p5.Vector(.05);

function preload(){
  img1 = loadImage('https://cdn.glitch.com/e3090096-8c2e-4fe1-b543-08d827467d32%2FSnowflake_(NL_icon).png?1512754425557');
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  snowflakes.push(new Snowflake(random(0, windowWidth), -40));
  
  addEventListener('blur', () => 
  {
	  noLoop();
  })
  
  addEventListener('focus', () => 
  {
	  loop();
  })
}

function draw(){
  background(0);//black
  
  setTimeout(() => 
  {
	  snowflakes.push(new Snowflake(random(0, windowWidth), -40));
  }, 500);
  
  for (let i = 0; i < snowflakes.length; i++)
  {
	  snowflakes[i].applyForce(wind);
	  snowflakes[i].applyForce(gravity);
	  snowflakes[i].update();
	  snowflakes[i].display();
	  
	  if (snowflakes[i].checkBottom())
		  snowflakes.splice(i,1);
  }
  
  wind.add(random(-.01,.01));
  
  wind.limit(.1);
}

class Snowflake
{
	constructor(x,y)
	{
		this.pos = new p5.Vector(x,y);
		this.vel = new p5.Vector(0,0);
		this.acc = new p5.Vector(0,0);
	}
	
	display()
	{
		push();
		image(img1, this.pos.x, this.pos.y);
		pop();
	}
	
	applyForce(force)
	{
		this.acc.add(force);
	}
	
	update()
	{
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		
		this.acc.mult(0);
	}
	
	checkBottom()
	{
		if (this.pos.y > windowHeight)
			return true;
		return false;
	}
}
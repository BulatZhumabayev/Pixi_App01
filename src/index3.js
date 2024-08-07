    // https://proclive.io/shooting-tutorial/

      const app = new PIXI.Application();
      //await app.init( 800, 600,{backgroundColor : 0x1099bb});
      await app.init({ background: '#021f4b', resizeTo: window });
      document.body.appendChild(app.canvas);

      var background = new PIXI.Graphics();  
      background.beginFill(0x123456);  
      background.drawRect(0,0,app.screen.width,app.screen.height);  
      background.endFill();  
      app.stage.addChild(background);


// create a texture from an image path 

      await PIXI.Assets.load('src/bunny.png');
      let bunny = PIXI.Sprite.from('src/bunny.png');
      app.stage.addChild(bunny);



// center the sprite's anchor point
bunny.anchor.x = 0.5;  
bunny.anchor.y = 0.5;

// move the sprite to the center of the screen
bunny.position.x = app.screen.width/2;  
bunny.position.y = app.screen.height/2;


 //app.stage.interactive = true;

  // Enable interactivity!
  app.stage.eventMode = 'static';

  // Make sure the whole canvas area is interactive, not just the circle.
  //app.stage.hitArea = app.screen;

  // Follow the pointer



var bullets = [];  
var bulletSpeed = 5;

await PIXI.Assets.load('src/carrot.png');

function shoot(rotation, startPosition){  
  let bullet = PIXI.Sprite.from('src/carrot.png');    

  bullet.position.x = startPosition.x;
  bullet.position.y = startPosition.y;
  bullet.rotation = rotation;
  app.stage.addChild(bullet);
  bullets.push(bullet);
}

function rotateToPoint(mx, my, px, py){  
  var self = this;
  var dist_Y = my - py;
  var dist_X = mx - px;
  var angle = Math.atan2(dist_Y,dist_X);
  //var degrees = angle * 180/ Math.PI;
  return angle;
}

app.stage.addEventListener('pointerdown', (e) =>
  {
    shoot(bunny.rotation, {
      x: bunny.position.x+Math.cos(bunny.rotation)*20,
      y: bunny.position.y+Math.sin(bunny.rotation)*20
    });

  });

addStars(app);
 

app.ticker.add((time) =>
{
    const dr = time.deltaTime * 0.15;

    app.stage.addEventListener('pointermove', (e) =>
    {
       // circle.position.copyFrom(e.global);
       bunny.rotation = rotateToPoint(e.global.x, e.global.y, bunny.position.x, bunny.position.y)

    });

    for(var b=bullets.length-1;b>=0;b--){
      bullets[b].position.x += Math.cos(bullets[b].rotation)*bulletSpeed;
      bullets[b].position.y += Math.sin(bullets[b].rotation)*bulletSpeed;
    }
     


});

function addStars(app)
{
    const starCount = 20;

    // Create a graphics object to hold all the stars.
    const graphics = new PIXI.Graphics();

    for (let index = 0; index < starCount; index++)
    {
        // Randomize the position, radius, and rotation of each star.
        const x = (index * 0.78695 * app.screen.width) % app.screen.width;
        const y = (index * 0.9382 * app.screen.height) % app.screen.height;
        const radius = 2 + Math.random() * 3;
        const rotation = Math.random() * Math.PI * 2;

        // Draw the star onto the graphics object.
        graphics.star(x, y, 5, radius, 0, rotation).fill({ color: 0xffdf00, alpha: radius / 5 });
    }

    // Add the stars to the stage.
    app.stage.addChild(graphics);
}

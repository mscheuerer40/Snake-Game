class Point {
  constructor(x,y){
    this.x_=x
    this.y_=y
  }
  get x() {
    return this.x_;
  }
  get y() {
    return this.y_;
  }
}
class Snake{
   constructor() {
     this.position_ = new Point(0,0);
     this.direction_= "left"
  }
  move (numSquares) {
    console.log("The snake moves");
    if (this.direction_=="right") this.position_= new Point(this.position_.x + numSquares, this.position_.y) 
    else if (this.direction_=="down") this.position_= new Point (this.position_.x,this.position_.y - numSquares)
    else if (this.position_=="left") this.position_= new Point(this.position_.x - numSquares, this.position_.y)
    else if (this.position_=="up") this.position_= new Point(this.position_.x, this.position_.y + numSquares) 
  }
  turnLeft() {
    if (this.direction_=="right") this.direction_="up"
    else if (this.direction_=="up") this.direction_="left"
    else if (this.direction_=="left") this.direction_="down"
    else if (this.direction_=="down") this.direction_="right"
  }
  turnRight () {
    if (this.direction_=="right") this.direction_="down"
    else if (this.direction_=="down") this.direction_="left"
    else if (this.direction_=="left") this.direction_="up"
    else if (this.direction_=="up") this.direction_="right"
  }
  get position() {
   return this.position_;
  }
  get direction() {
    return this.direction_;
  }
}
class WorldModel {
  constructor (s){
    this.width_= 40
    this.height_= 40
    if(s instanceof Snake) this.snake_= s;
    else throw new Error("Not given a valid snake");
    this.view_= null
  }
  update(steps) {
    this.snake_.move(steps);
    this.view_.display(this)
  }
  get snake() {
    return this.snake_;
  }
  get height() {
    return this.height_;
  }
  get width() {
    return this.width_;
  }
  set view(v){
    if (v instanceof View){
    this.view_ = v;
    }
  }
}
class SnakeController {
  constructor (w, s) {
    this.world_= w;
    this.snake_= s;
  }
  turnSnakeLeft() {
    this.snake_.turnLeft();
  }
  turnSnakeRight() {
    this.snake_.turnRight();
  }
  get snakePosition(){
    return this.snake_.position;
  }
  get snakeDirection(){
    return this.snake_.direction;
  }
  get worldWidth(){
    return this.world_.width;
  }
  get worldHeight(){
    return this.world_.height;
  }
}
class Player{
  constructor(sc){
    this.sc_=sc;
    if(this.constructor === Player) throw new Error("Cannot instantiate a Snake, which is an abstract base class");
    else if(!(this.makeTurn instanceof Function)) throw new Error("Base class must implement makeTurn method");
  }
}
class AvoidWallsPlayer extends Player{
  constructor(sc){
    super(sc);
  }
   makeTurn(){
   console.log("The Snake did a turn");
   if(this.sc_.snakeDirection=="left" && this.sc_.snakePosition.x==0 && this.sc_.worldHeight/2 <= this.sc_.snakePosition.y)this.sc_.turnSnakeRight();
   else if(this.sc_.snakeDirection=="left" && this.sc_.snakePosition.x==0)this.sc_.turnSnakeLeft();
   else if(this.sc_.snakeDirection=="right" && this.sc_.worldWidth.x-1 && this.sc_.worldHeight/2 <= this.sc_.snakePosition.y)this.sc_.turnSnakeRight();
   else if(this.sc_.snakeDirection=="right" && this.sc_.worldWidth.x-1)this.sc_.turnSnakeLeft();
   if(this.sc_.snakeDirection=="up" && this.sc_.snakePosition.y==0 && this.sc_.worldWidth/2 <= this.sc_.snakePosition.x)this.sc_.turnSnakeRight();
   else if(this.sc_.snakeDirection=="up" && this.sc_.snakePosition.y==0)this.sc_.turnSnakeLeft();
   else if(this.sc_.snakeDirection=="down" && this.sc_.worldWidth.y-1 && this.sc_.worldWidth/2 <= this.sc_.snakePosition.x)this.sc_.turnSnakeRight();
   else if(this.sc_.snakeDirection=="down" && this.sc_.worldWidth.y-1)this.sc_.turnSnakeLeft();
   }
}
class View{
  constructor(){
    if(this.constructor === View) throw new Error("Cannot instantiate a Snake, which is an abstract base class");
    else if(!(this.display instanceof Function)) throw new Error("Base class must implement makeTurn method");
  }
}
class CanvasView extends View{
  constructor(scalingFactor){
    super()
    this.scalingFactor_ = scalingFactor;
    this.canvas_ = document.createElement("canvas");
    document.body.appendChild(this.canvas_);
    this.context_ = this.canvas_.getContext("2d");
  }
  display(w){
    this.canvas_.width = w.width*this.scalingFactor_;
    this.canvas_.height = w.height*this.scalingFactor_;
    this.context_.fillRect(w.snake.position.x*this.scalingFactor_,w.snake.position.y*this.scalingFactor_,this.scalingFactor_,this.scalingFactor_)
  }
}

let bigSnake = new Snake()
let worldModel= new WorldModel(bigSnake)
console.log("Big snakes new position is:", bigSnake.position,);
bigSnake.turnLeft();
console.log("Big snake turns:", bigSnake.direction,);
console.log("Big snake new position is:", bigSnake.position,);
bigSnake.turnLeft();
console.log("Big snake turns:", bigSnake.direction,);
console.log("Big snake new position is:", bigSnake.position,);
worldModel.view = new CanvasView(150)
worldModel.update(4)
worldModel.update(2)
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
    console.log("The snake moves...");
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
    if(s instanceof Snake) this.snake_= s;
    else throw new Error("Not given a valid snake");
  }
  update(steps) {
    this.snake_.move(steps);
  }
  get snake() {
    return this.snake_;
  }
}
let bigSnake = new Snake()
let worldModel= new WorldModel(bigSnake)
worldModel.update(4)
console.log("Big snakes new position is:", bigSnake.position,);
bigSnake.turnLeft();
console.log("Big snake turns:", bigSnake.direction,);
worldModel.update(2);
console.log("Big snake new position is:", bigSnake.position,);
bigSnake.turnLeft();
console.log("Big snake turns:", bigSnake.direction,);
worldModel.update(4);
console.log("Big snake new position is:", bigSnake.position,);

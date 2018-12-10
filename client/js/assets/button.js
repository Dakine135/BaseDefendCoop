class Button{
  constructor(x, y, size, text, color, render, callBack){
    console.log("new button ",color);
    this.type = "Button";
    this.font = "20px Arial";
    this.margin = 3;
    this.x = x;
    this.y = y;
    this.size = size;
    this.text = text;
    this.color = color;
    this.render = render;
    this.render.font = this.font;
    this.width = this.render.measureText(this.text).width;
    this.callBack = callBack;
  }

  clicked(x, y){
    if(x > this.x && x < (this.x + this.size) &&
       y > this.y && y < (this.y + (this.width + (this.margin * 2)))
     ){
      return this;
    } else return null;
  }

  toString(){
    return "Button"+this.x+","+this.y+"\nStatus "+this.status;
  }

  call(){
    this.callBack();
  }

  draw(){
    this.render.beginPath();
    this.render.font = this.font;
    this.render.lineWidth="1";
    this.render.fillStyle = this.color;
    this.render.fillRect(this.x, this.y, this.size, this.width + (this.margin * 2));
    this.render.strokeStyle = "yellow";
    this.render.strokeRect(this.x, this.y, this.size, this.width + (this.margin * 2));
    this.render.save();
    this.render.translate(this.x, this.y);
    this.render.rotate(Math.PI / 2);
    this.render.fillStyle = "white";
    this.render.textAlign = "left";
    this.render.fillText(this.text, this.margin, -(this.size / 2.5));
    this.render.restore();
  }
}//Button class

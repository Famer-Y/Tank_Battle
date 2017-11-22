/**
 * 基础类
 * */

var Base = function () {
    this.x = 0;
    this.y = 0;
    this.size = 1;
    this.speed = 1;
    
    this.moveUp = function () {
        this.y -= this.speed;
    };
};
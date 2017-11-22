/**
 * 子弹基类
 * */

var Bullet = function (layer, belong, type, dir){
    var self = this;
    self.x = 0;
    self.y = 0;
    self.layer = layer;         //游戏层
    self.ishit = false;         //是否碰撞
    self.belong = belong;       //所属
    self.type = type;           //类型
    self.dir = dir || UP;       //方向
    self.speed = 2;             //速度
    self.size = 6;              //子弹的大小
    self.isAlive = true;       //是否存活
    
    self.draw = function () {
        self.layer.drawImage(RESOURCE_IMAGE, POS['bullet'][0] + self.dir * self.size,
            POS['bullet'][1], self.size, self.size, self.x, self.y, self.size, self.size);
        self.move();
    };

    self.move = function () {
        if (self.dir == UP){
            self.y -= self.speed;
        } else if (self.dir == DOWN){
            self.y += self.speed;
        } else if (self.dir == LEFT){
            self.x -= self.speed;
        } else if (self.dir == RIGHT){
            self.x += self.speed;
        }
        self.isHit();
    };

    self.isHit = function () {
        if (!self.isAlive){
            return;
        }

        //越界检测
        if (self.x < map.offsetX){
            self.x = map.offsetX;
            self.ishit = true;
        } else if (self.x > map.offsetX + map.width - self.size){
            self.x = map.offsetX + map.width - self.size;
            self.ishit = true;
        } else if (self.y < map.offsetY){
            self.y = map.offsetY;
            self.ishit = true;
        } else if (self.y > map.offsetY + map.height - self.size){
            self.y = map.offsetY + map.height - self.size;
            self.ishit = true;
        }

        if (!self.ishit){
            var coll = new Collision();
            if (coll.bullet_Tile_Collision(self)){
                this.ishit = true;
            }
            coll.bullet_Tank_Collision(self);
        }

        if (self.ishit){
            self.isShooting = false;
            self.distroy();
        }
    };

    self.distroy = function () {
        this.isAlive = false;
        bombsArray.push(new BombAnimation(BOMB_FOR_BULLET, self.layer, self));
    };
};
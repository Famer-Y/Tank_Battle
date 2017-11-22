/**
 * 坦克基类
 * */

var Tank = function () {
    var self = this;
    self.x = 32;
    self.y = 16;
    self.size = 32;         //大小
    self.dir = DOWN;        //方向
    self.layer = null;      //游戏层
    self.speed = 1;         //速度
    self.ishit = false;     //是否碰撞
    self.isAlive = true;    //是否存活
    self.auto = false;      //是否自动进行
    self.step = 0;          //敌方坦克的步数
    self.bullet = null;     //子弹类
    self.isShooting = false;

    //移动
    self.move = function () {

        //当坦克是AI时, 一定时间后，切换方向
        if (self.auto){
            self.step ++;
            if (self.step % 100 == 0 || self.ishit){
                self.dir = parseInt(Math.random() * 4);
                self.ishit = false;
                this.step = 0;
            }
        }

        self.tempX = self.x;
        self.tempY = self.y;

        if (self.dir == UP){
            self.tempY -= self.speed;
        } else if (self.dir == DOWN){
            self.tempY += self.speed;
        } else if (self.dir == LEFT){
            self.tempX -= self.speed;
        } else if (self.dir == RIGHT){
            self.tempX += self.speed;
        }
        self.isHit();
        if (!self.ishit){
            self.x = self.tempX;
            self.y = self.tempY;
        }

    };

    self.isHit = function () {

        //越界检测
        if (self.dir == LEFT){
            if (self.x <= map.offsetX){
                self.x = map.offsetX;
                self.ishit = true;
            }
        } else if (self.dir == RIGHT){
            if (self.x >= map.offsetX + map.width - self.size){
                self.x = map.offsetX + map.width - self.size;
                self.ishit = true;
            }
        } else if (self.dir == UP){
            if (self.y <= map.offsetY){
                self.y = map.offsetY;
                self.ishit = true;
            }
        } else if (self.dir == DOWN){
            if (self.y >= map.offsetY + map.height - self.size){
                self.y = map.offsetY + map.height - self.size;
                self.ishit = true;
            }
        }

        if (!self.ishit){
            var coll = new Collision();
            if (coll.tank_Tile_Collision(self)){
                self.ishit = true;
            }
        }

    };

    /**
     * 射击
     * @param type 子弹的类型
     */
    self.shoot = function (type) {

        if (self.auto){
            if (self.isShooting){
                return ;
            }
        }

        self.bullet = new Bullet(self.layer, self, type, self.dir);
        var tempX = self.x;
        var tempY = self.y;

        if (self.dir == UP){
            tempX = self.x + parseInt(self.size / 2) - parseInt(self.bullet.size / 2);
            tempY = self.y - parseInt(self.bullet.size / 2);
        } else if (self.dir == DOWN){
            tempX = self.x + parseInt(self.size / 2) - parseInt(self.bullet.size / 2);
            tempY = self.y + self.size - parseInt(self.bullet.size / 2);
        } else if (self.dir == RIGHT){
            tempX = self.x + self.size - parseInt(self.bullet.size / 2);
            tempY = self.y + parseInt(self.size / 2) - parseInt(self.bullet.size / 2);
        } else if (self.dir == LEFT){
            tempX = self.x - self.bullet.size + parseInt(self.bullet.size / 2);
            tempY = self.y + parseInt(self.size / 2) - parseInt(self.bullet.size / 2);
        }
        self.bullet.x = tempX;
        self.bullet.y = tempY;
        self.bullet.draw();
        self.isShooting = true;
        bulletsArray.push(self.bullet);
    };
    
    self.distroy = function () {
        self.isAlive = false;
        bombsArray.push(new BombAnimation(BOMB_FOR_TANK, self.layer, self));
    };

};

var PlayTank = function (layer) {
    var self = this;
    self.tank = Tank;
    self.tank();
    self.layer = layer;
    self.live = 3;
    self.dir = UP;
    self.offsetX = 0;
    self.speed = 3;
    self.isAppear = false;

    self.draw = function () {
        self.layer.drawImage(RESOURCE_IMAGE, POS["player"][0] + self.offsetX + self.dir * self.size,
            POS["player"][1], self.size, self.size, self.x, self.y, self.size, self.size);
        // loadImage(RESOURCE_IMAGE, function () {
        //     self.context.drawImage(this, POS["player"][0] + self.dir * self.size,
        //         POS["player"][1], self.size, self.size, self.x, self.y, self.size, self.size);
        // });
    };
};

var EnemyOne = function (layer) {
    var self = this;
    self.tank = Tank;
    self.tank();
    self.live = 2;          //生命
    self.layer = layer;     //游戏层
    self.auto = true;       //是否自动移动和发射子弹
    self.times = 0;         //坦克存活的时间，可以判断出现时，闪烁的时间
    self.speed = 1;         //速度
    self.shootRate = 1;   //射击概率
    self.isAppear = false;  //是否出现
    
    self.draw = function () {
        self.times ++;
        if (!self.isAppear){
            //控制闪烁频率和闪烁元素的位置
            var flashpos = parseInt(self.times / 5 ) % 7;
            self.layer.drawImage(RESOURCE_IMAGE, POS["enemyBefore"][0] + flashpos * self.size,
                POS["enemyBefore"][1], self.size, self.size, self.x, self.y, self.size, self.size);
            //当times==34时，闪烁结束，开始绘制坦克
            if (self.times == 34){
                self.isAppear = true;
                self.times = 0;
            }
        } else{
            self.layer.drawImage(RESOURCE_IMAGE, POS["enemy1"][0] + self.dir * self.size,
                POS["enemy1"][1], self.size, self.size, self.x, self.y, self.size, self.size);

            //当过一定时间后，判断坦克是否可以射击
            if (self.times % 50 == 0){
                var canshoot = Math.random();
                if (canshoot < self.shootRate){
                    self.shoot(BULLET_FOR_ENEMY);
                }
                self.times = 0;
            }
            self.move();
        }

    };
};

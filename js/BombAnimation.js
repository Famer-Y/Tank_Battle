/**
 * 爆炸动画类
 * */

var BombAnimation = function (type, layer, belong) {
    var self = this;
    self.x = 0;
    self.y = 0;
    self.size = 0;
    self.name = "";
    self.times = 0;
    self.frame = 0;            //元素帧数
    self.type = type;
    self.layer = layer;
    self.belong = belong;
    self.isOver = false;

    if (self.type == BOMB_FOR_BULLET){
        self.name = "bulletBomb";
        self.size = 32;
        self.frame = 3;
    } else if (self.type == BOMB_FOR_TANK){
        self.name = "tankBomb";
        self.size = 66;
        self.frame = 4;
    }

    self.x = self.belong.x + (parseInt(self.belong.size - self.size) / 2);
    self.y = self.belong.y + (parseInt(self.belong.size - self.size) / 2);
    
    self.draw = function () {
        self.times ++;
        if (!self.isOver){
            //帧间延迟时间
            var delayTime = 5;
            var temp = parseInt(self.times / delayTime) % self.frame;
            self.layer.drawImage(RESOURCE_IMAGE, POS[self.name][0] + temp * self.size,
                POS[self.name][1], self.size, self.size, self.x, self.y, self.size, self.size);
        }
        if (self.times == 12){
            self.times = 0;
            self.isOver = true;
        }
    };
};
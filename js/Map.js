/**
 * 地图类
 * */

var Map = function (backgroudLayer, brickLayer, grassLayer) {
    var self = this;
    self.width = 416;                       //主游戏区的宽度
    self.height = 416;                      //主游戏区的高度
    self.tileSize = 16;                     //瓦片大小
    self.tileCountWidth = 26;               //主游戏宽度的瓦片个数
    self.tileCountHeight = 26;              //主游戏高度的瓦片个数
    self.backgroudLayer = backgroudLayer;   //背景层
    self.brickLayer = brickLayer;           //砖块层
    self.grassLayer = grassLayer;           //草地层

    self.level = 1;                         //游戏的关卡
    self.mapLevel = [];                     //当前关卡的游戏地图
    self.offsetX = 32;                      //主游戏区的X偏移量
    self.offsetY = 16;                      //主游戏区的Y偏移量

    /**
     * 设置关卡级别
     * */
    self.setLevel = function (level) {
        self.level = level;
        /**
         * 在js中，数组是引用类型
         * 当修改self.mapLevel时，Level.levelX 也会随之改变
         * 造成的结果：当切换地图时，self.map再次使用Level.levelX的值，故当再次切换回之前的地图时，
         * 就会出现之前被打掉的瓦片仍然是空缺，并没有及时更新
         * 如果使用中间变量,tempLevel则会避免这种情况
         * */
        // self.mapLevel = eval("Level." + "level" + self.level);
        var tempLevel = eval("Level." + "level" + self.level);
        self.mapLevel = new Array();
        for (var i = 0; i < tempLevel.length; i++){
            self.mapLevel[i] = new Array();
            for (var j = 0; j < tempLevel[i].length; j++){
                self.mapLevel[i][j] = tempLevel[i][j];
            }
        }
    };

    /**
     * @function: 绘制背景
     * */
    self.drawBackground = function () {
        self.backgroudLayer.fillStyle = "#7f7f7f";
        self.backgroudLayer.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        self.backgroudLayer.fillStyle = "#000";
        self.backgroudLayer.fillRect(self.offsetX, self.offsetY, self.width, self.height);
    };

    /**
     * @function: 绘制瓦片
     * */
    self.drawTile = function () {
        clearLayer(self.brickLayer);
        clearLayer(self.grassLayer);
        if (self.mapLevel != null && self.mapLevel.length > 0){
            for (var i = 0; i < self.tileCountHeight; i++){
                for (var j = 0; j < self.tileCountWidth; j++){

                    var t = parseInt(self.mapLevel[i][j]);
                    if (NORMAL_BRICK == t || DIAMOND_BRICK == t || WATER == t){
                        self.brickLayer.drawImage(RESOURCE_IMAGE, self.tileSize * (t - 1) + POS['tile'][0],
                            POS['tile'][1], self.tileSize, self.tileSize, j * self.tileSize + self.offsetX,
                            i * self.tileSize + self.offsetY, self.tileSize, self.tileSize);
                    } else if (GRASS == t || FOG == t){
                        self.grassLayer.drawImage(RESOURCE_IMAGE, self.tileSize * (t - 1) + POS['tile'][0],
                            POS['tile'][1], self.tileSize, self.tileSize, j * self.tileSize + self.offsetX,
                            i * self.tileSize + self.offsetY, self.tileSize, self.tileSize);
                    }
                }

            }
        }
    };
};
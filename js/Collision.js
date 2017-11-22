/**
* 碰撞函数
* */

var Collision = function () {
    var self = this;

    /**
     * @function 检测2个物体是否碰撞
     * @param object1 物体1
     * @param object2 物体2
     * @param overlap 允许重叠的大小
     * @return {Boolean} 如果碰撞了，返回true
     */
    self.CheckIntersect = function(object1, object2, overlap = 0)
    {
        //    x-轴                      x-轴
        //  A1------>B1 C1              A2------>B2 C2
        //  +--------+   ^              +--------+   ^
        //  | object1|   | y-轴         | object2|   | y-轴
        //  |        |   |              |        |   |
        //  +--------+  D1              +--------+  D2
        //
        //overlap是重叠的区域值

        A1 = object1.x + overlap;
        B1 = object1.x + object1.size - overlap;
        C1 = object1.y + overlap;
        D1 = object1.y + object1.size - overlap;

        A2 = object2.x + overlap;
        B2 = object2.x + object2.size - overlap;
        C2 = object2.y + overlap;
        D2 = object2.y + object2.size - overlap;

        //假如他们在x-轴重叠
        if(A1 >= A2 && A1 <= B2
            || B1 >= A2 && B1 <= B2)
        {
            //判断y-轴重叠
            if(C1 >= C2 && C1 <= D2 || D1 >= C2 && D1 <= D2)
            {
                return true;
            }
        }
        return false;
    };

    /**
     * @function 子弹与坦克的碰撞检测
     * @param bullet 子弹对象
     * */
    self.bullet_Tank_Collision = function (bullet) {
        if (bullet.type == BULLET_FOR_PLAYER){
            if (enemysArray != null && enemysArray.length > 0){
                for (var i = 0; i < enemysArray.length; i++){
                    var enemyObj = enemysArray[i];
                    if (enemyObj.isAlive && self.CheckIntersect(bullet, enemyObj, 0)){

                        bullet.ishit = true;
                        if (enemyObj.live > 1){
                            enemyObj.live --;
                        } else {
                            enemyObj.distroy();
                        }
                        /**
                         * 一颗子弹只能击中一个坦克，当遍历到击中坦克后，就无需继续遍历
                         * 在此处break,减少循环次数 达到优化的效果
                         * */
                        break;
                    }
                }
            }
        } else if (bullet.type == BULLET_FOR_ENEMY){
            if (player.isAlive && self.CheckIntersect(bullet, player, 0)){
                bullet.ishit = true;
                if (player.live > 1){
                    player.live --;
                } else {
                    player.distroy();
                }
            }
        }
    };

    self.bullet_bullet_Collision = function () {
        if (bulletsArray != null && bulletsArray.length > 0){
            for (var i = 0; i < bulletsArray.length; i++){
                for (var j = 0; j < bulletsArray.length; j++){
                    var bullet1 = bulletsArray[i];
                    var bullet2 = bulletsArray[j];
                    if (i != j){
                        if (self.CheckIntersect(bullet1, bullet2)){
                            if (bullet1.type != bullet2.type){
                                bullet1.ishit = true;
                                bullet2.ishit = true
                            }
                        }
                    }
                }
            }
        }
    };

    /**
     * @function 子弹与瓦片的碰撞
     * @param bullet  子弹类
     * @return {boolean} 如果碰撞，返回true
     */
    self.bullet_Tile_Collision = function (bullet) {
        var result = false;
        var rowIndex = 0;      //行索引
        var colIndex = 0;      //列索引
        var tileNum = 0;       //击中的瓦片数

        //根据子弹的起始坐标判断当前子弹所在瓦片的索引
        //不同方向获取索引的方式不同
        if (bullet.dir == UP){
            rowIndex = parseInt((bullet.y - map.offsetY) / map.tileSize);
            colIndex = parseInt((bullet.x - map.offsetX) / map.tileSize);
        } else if (bullet.dir == DOWN){
            rowIndex = parseInt((bullet.y - map.offsetY + bullet.size) / map.tileSize);
            colIndex = parseInt((bullet.x - map.offsetX) / map.tileSize);
        } else if (bullet.dir == LEFT){
            rowIndex = parseInt((bullet.y - map.offsetY) / map.tileSize);
            colIndex = parseInt((bullet.x - map.offsetX) / map.tileSize);
        } else if (bullet.dir == RIGHT){
            rowIndex = parseInt((bullet.y - map.offsetY) / map.tileSize);
            colIndex = parseInt((bullet.x - map.offsetX + bullet.size) / map.tileSize);
        }

        //当子弹越界时
        if (colIndex >= map.tileCountWidth || colIndex < 0 ||
            rowIndex >= map.tileCountHeight || colIndex < 0){
            return true;
        }

        //当子弹方向为上或者下时，判断地图列方向应该打掉多少块瓦片
        if (bullet.dir == UP || bullet.dir == DOWN){
            //子弹右边距距离当前瓦片起始x坐标的宽度
            var wBulletInCurTile = parseInt(bullet.x - map.offsetX - (colIndex * map.tileSize) + bullet.size);
            //当子弹右边距在瓦片边界时,
            if (wBulletInCurTile % map.tileSize == 0){
                tileNum = parseInt(wBulletInCurTile / map.tileSize);
            } else { //当子弹右边距当前瓦片内部或者超过瓦片时
                tileNum = parseInt(wBulletInCurTile / map.tileSize) + 1;
            }

            for (var i = 0; i < tileNum && colIndex + i < map.tileCountWidth; i++){
                var tempTile = map.mapLevel[rowIndex][colIndex + i];
                if (tempTile == NORMAL_BRICK || tempTile == DIAMOND_BRICK){
                    result = true;
                    if (tempTile == NORMAL_BRICK){
                        map.mapLevel[rowIndex][colIndex + i] = 0;
                    } else if (tempTile == DIAMOND_BRICK){

                    }
                }
            }
        } else if (bullet.dir == LEFT || bullet.dir == RIGHT){
            //子弹下边距距离当前瓦片起始y坐标的高度
            var hBulletInCurTile = parseInt(bullet.y - map.offsetY - (rowIndex * map.tileSize) + bullet.size);
            //当子弹下边距在瓦片边界时,
            if (hBulletInCurTile % map.tileSize == 0){
                tileNum = parseInt(hBulletInCurTile / map.tileSize);
            } else { //当子弹下边距当前瓦片内部或者超过瓦片时
                tileNum = parseInt(hBulletInCurTile / map.tileSize) + 1;
            }

            for (var i = 0; i < tileNum && rowIndex + i < map.tileCountWidth; i++){
                var tempTile = map.mapLevel[rowIndex + i][colIndex];
                if (tempTile == NORMAL_BRICK || tempTile == DIAMOND_BRICK){
                    result = true;
                    if (tempTile == NORMAL_BRICK){
                        //把当前瓦片清除
                        map.mapLevel[rowIndex + i][colIndex] = 0;
                    } else if (tempTile == DIAMOND_BRICK){

                    }
                }
            }
        }

        return result;
    };

    /**
     * @function 坦克与瓦片的碰撞
     * @param tank 坦克类
     * @param overlap 允许重叠的大小
     * @return {boolean}
     */
    self.tank_Tile_Collision = function (tank, overlap = 2) {

        var rowIndex = 0;      //行索引
        var colIndex = 0;      //列索引
        var tileNum = 0;       //击中的瓦片数

        if (tank.dir == UP){
            rowIndex = parseInt((tank.tempY - map.offsetY + overlap) / map.tileSize);
            colIndex = parseInt((tank.tempX - map.offsetX + overlap) / map.tileSize);
        } else if (tank.dir == DOWN){
            rowIndex = parseInt((tank.tempY - map.offsetY - overlap + tank.size) / map.tileSize);
            colIndex = parseInt((tank.tempX - map.offsetX + overlap) / map.tileSize);
        } else if (tank.dir == LEFT){
            rowIndex = parseInt((tank.tempY - map.offsetY + overlap) / map.tileSize);
            colIndex = parseInt((tank.tempX - map.offsetX + overlap) / map.tileSize);
        } else if (tank.dir == RIGHT){
            rowIndex = parseInt((tank.tempY - map.offsetY + overlap) / map.tileSize);
            colIndex = parseInt((tank.tempX - map.offsetX - overlap + tank.size) / map.tileSize);
        }

        //当坦克越界时
        if (colIndex >= map.tileCountWidth || colIndex < 0 ||
            rowIndex >= map.tileCountHeight || colIndex < 0){
            return true;
        }

        if (tank.dir == UP || tank.dir == DOWN){
            //坦克右边距距离当前瓦片起始x坐标的宽度
            var wTankInCurTile = parseInt(tank.tempX - map.offsetX - (colIndex * map.tileSize) + tank.size - overlap);

            //当坦克右边距在瓦片边界时,
            if (wTankInCurTile % map.tileSize == 0){
                tileNum = parseInt(wTankInCurTile / map.tileSize);
            } else { //当坦克右边距当前瓦片内部或者超过瓦片时
                tileNum = parseInt(wTankInCurTile / map.tileSize) + 1;
            }

            for (var i = 0; i < tileNum && colIndex + i < map.tileCountWidth; i++){
                var tempTile = map.mapLevel[rowIndex][colIndex + i];
                if (tempTile == NORMAL_BRICK || tempTile == DIAMOND_BRICK || tempTile == WATER){
                    if (tank.dir == UP){
                        tank.tempY = map.offsetY + rowIndex * map.tileSize - overlap;
                    } else if (tank.dir == DOWN){
                        tank.tempY = map.offsetY + rowIndex * map.tileSize + overlap;
                    }
                    return true;
                }
            }
        } else if (tank.dir == LEFT || tank.dir == RIGHT){
            //坦克下边距距离当前瓦片起始y坐标的高度
            var hTankInCurTile = parseInt(tank.tempY - map.offsetY - (rowIndex * map.tileSize) + tank.size - overlap);

            //当坦克下边距在瓦片边界时,
            if (hTankInCurTile % map.tileSize == 0){
                tileNum = parseInt(hTankInCurTile / map.tileSize);
            } else { //坦克下边距当前瓦片内部或者超过瓦片时
                tileNum = parseInt(hTankInCurTile / map.tileSize) + 1;
            }

            for (var i = 0; i < tileNum && rowIndex + i < map.tileCountWidth; i++){
                var tempTile = map.mapLevel[rowIndex + i][colIndex];
                if (tempTile == NORMAL_BRICK || tempTile == DIAMOND_BRICK || tempTile == WATER){
                    if (tank.dir == LEFT){
                        tank.tempX = map.offsetX + colIndex * map.tileSize - overlap;
                    } else if (tank.dir == RIGHT){
                        tank.tempX = map.offsetX + colIndex * map.tileSize + overlap;
                    }
                    return true;
                }
            }
        }
        return false;
    };

};
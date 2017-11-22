/**
 *  @@@@        @@@@ @@@@@@@@@@@@@@ @@@@@@@@@@@@
 *   @@@@      @@@@  @@@@@@@@@@@@@@ @@@@@@@@@@@@@
 *    @@@@    @@@@        @@@@      @@@@     @@@@
 *     @@@@  @@@@         @@@@      @@@@    @@@@
 *      @@@@@@@@          @@@@      @@@@@@@@@@@
 *       @@@@@@           @@@@      @@@@@@@@@@
 *        @@@@            @@@@      @@@@     @@@
 *        @@@@            @@@@      @@@@      @@@
 *        @@@@            @@@@      @@@@     @@@@
 *        @@@@            @@@@      @@@@@@@@@@@@
 *        @@@@            @@@@      @@@@@@@@@@@
 *
 * @object  : 坦克大战
 * @author  : 风穆
 * @beginData: 2017年11月16日
 * @endData : 2017年11月19日
 */

var backgroudLayer;         //背景层
var brickLayer;             //砖块层
var tankLayer;              //坦克层
var grassLayer;             //草地层
var overLayer;              //结束层
var stageLayer;             //场景层
var controlLayer;           //控制层
var player;                 //玩家
var map;                    //地图
var bombsArray = [];        //爆炸数组，用于存放所有爆炸效果
var bulletsArray = [];      //子弹数组，用于存放所有子弹
var enemysArray = [];       //敌人数组，用于存放所有敌人
var enemyAppearTime = 0;    //敌方坦克出现的时间
var maxEnemyTankNum = 1;    //出现的最大坦克数
var appearEnemyTankNum = 0; //当前出现的坦克数
var curLevel = 1;           //当前关卡级别

$(document).ready(function () {
    gameLayerInit();
    objectInit();
    setInterval(gameLoop, 20)
});

//游戏层初始化
function gameLayerInit(){
    backgroudLayer = $("#backgroud")[0].getContext("2d");
    $("#backgroud").attr({"width":GAME_WIDTH, "height":GAME_HEIGHT});
    brickLayer = $("#brick")[0].getContext("2d");
    $("#brick").attr({"width":GAME_WIDTH, "height":GAME_HEIGHT});
    tankLayer = $("#tank")[0].getContext("2d");
    $("#tank").attr({"width":GAME_WIDTH, "height":GAME_HEIGHT});
    grassLayer = $("#grass")[0].getContext("2d");
    $("#grass").attr({"width":GAME_WIDTH, "height":GAME_HEIGHT});
    overLayer = $("#over")[0].getContext("2d");
    $("#over").attr({"width":GAME_WIDTH, "height":GAME_HEIGHT});
    stageLayer = $("#stage")[0].getContext("2d");
    $("#stage").attr({"width":GAME_WIDTH, "height":GAME_HEIGHT});
    controlLayer = $("#control")[0].getContext("2d");
    $("#control").attr({"width":GAME_WIDTH, "height":GAME_HEIGHT});
    $("#allCanvas").css({"width":GAME_WIDTH, "height":GAME_HEIGHT, "background-color": "#000"});
}

//全局变量的初始化
function objectInit(){
    map = new Map(backgroudLayer, brickLayer, grassLayer); //地图的初始化
    map.setLevel(curLevel);
    player = new PlayTank(tankLayer);      //玩家的初始化
    player.x = 129 + map.offsetX;
    player.y = 385 + map.offsetY;
    enemyAppearTime = 0;                    //敌方坦克出现的时间
    appearEnemyTankNum = 0;                 //当前出现的坦克数初始化
    bombsArray = [];                        //爆炸数组的初始化
    bulletsArray = [];                      //子弹数组的初始化
    enemysArray = [];                       //敌人数组的初始化
}

/**
 * @function：清除游戏层
 * @param layer ：需要清除的游戏层变量
 * */
function clearLayer(Layer) {
    Layer.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);
}

//绘制玩家坦克
function drawPlayerTank() {
    if (player.isAlive){
        player.draw();
    }
}

//绘制敌方坦克
function drawEnemyTank() {
    if (enemysArray != null && enemysArray.length > 0){
        for (var i = 0; i < enemysArray.length; i++){
            var enemyObj = enemysArray[i];
            if (!enemyObj.isAlive){
                enemysArray.splice(i, 1);
            }else{
                enemyObj.draw();
            }
        }
    }
}

//添加AI敌人坦克
function addEnemyTank() {
    appearEnemyTankNum ++;
    var AI = new EnemyOne(tankLayer);
    enemysArray.push(AI);
}

//绘制子弹
function drawBullet() {
    if (bulletsArray != null && bulletsArray.length > 0){
        for (var i = 0; i < bulletsArray.length; i++){
            var bulletObj = bulletsArray[i];
            if (!bulletObj.isAlive){
                bulletObj.belong.isShooting = false;
                bulletsArray.splice(i, 1);
            } else {
                bulletObj.draw();
            }
        }
    }
}

/*
 *检查是否已经出现的坦克数大于最大数，
 *并且限制两个坦克之间出现的时间间隔
 * */
function checkIfShouldAddEnemyTank() {
    if (appearEnemyTankNum < maxEnemyTankNum){
        if (enemyAppearTime % 100 == 0){
            addEnemyTank();
            enemyAppearTime = 0;
        }
        enemyAppearTime ++;
    }
}

//绘制所有的爆炸效果
function drawAllBombAnimation() {
    if (bombsArray != null && bombsArray.length > 0){
        for (var i = 0; i < bombsArray.length; i++){
            var bombObj = bombsArray[i];
            if (bombObj.isOver){
                bombsArray.splice(i, 1);
            } else {
                bombObj.draw();
            }

        }
    }
}

//绘制所有
function drawAll() {
    clearLayer(tankLayer);
    new Collision().bullet_bullet_Collision();
    map.drawBackground();
    map.drawTile();
    drawPlayerTank();
    drawBullet();
    checkIfShouldAddEnemyTank();
    drawEnemyTank();
    drawAllBombAnimation();
}

//当按下键盘时
$(document).keydown(function (e) {
    switch (e.keyCode){
        case W :
            player.dir = UP;
            player.ishit = false;
            player.move();
            break;
        case A :
            player.dir = LEFT;
            player.ishit = false;
            player.move();
            break;
        case S :
            player.dir = DOWN;
            player.ishit = false;
            player.move();
            break;
        case D :
            player.dir = RIGHT;
            player.ishit = false;
            player.move();
            break;
        case M :
            if (curLevel < 3){
                curLevel ++;
                objectInit();
            }
            break;
        case N :
            if (curLevel > 1){
                curLevel --;
                objectInit();
            }
            break;
        case SPACE :
            player.shoot(BULLET_FOR_PLAYER);
            break;
    }

});

//游戏循环函数
function gameLoop() {
    drawAll();
}


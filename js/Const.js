
//方向常量
var UP = 0;
var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;

//按键常量
var W = 87;
var A = 65;
var S = 83;
var D = 68;
var M = 77;
var N = 78
var SPACE = 32;


//游戏屏幕宽高
var GAME_WIDTH = 512;
var GAME_HEIGHT = 448;

//加载图片资源
var MENU_IMAGE = new Image();
MENU_IMAGE.src = "image/menu.gif";
var RESOURCE_IMAGE = new Image();
RESOURCE_IMAGE.src = "image/tankAll.gif";

// var MENU_IMAGE = "image/menu.gif";
// var RESOURCE_IMAGE = "image/tankAll.gif";

// function loadImage(url, callback) {
//     //创建一个Image对象，
//     var img = new Image();
//     img.src = url;
//     // 如果图片已经存在于浏览器缓存，直接调用回调函数
//     if (img.complete) {
//         callback.call(img);
//         return;
//     }
//     //图片下载完毕时异步调用callback函数。
//     img.onload = function() {
//         //将回调函数的this替换为Image对象
//         callback.call(img);
//     };
// }

//图片元素的初始位置
var POS = new Array();
POS["selectTank"] = [128,96];
POS["stageLevel"] = [396,96];
POS["num"] = [256,96];
POS["tile"] = [0,96];
POS["home"] = [256,0];
POS["score"] = [0,112];
POS["player"] = [0,0];
POS["protected"] = [160,96];
POS["enemyBefore"] = [256,32];
POS["enemy1"] = [0,32];
POS["enemy2"] = [128,32];
POS["enemy3"] = [0,64];
POS["bullet"] = [80,96];
POS["tankBomb"] = [0,160];
POS["bulletBomb"] = [320,0];
POS["over"] = [384,64];
POS["prop"] = [256,110];


//子弹类型常量
var BULLET_FOR_PLAYER = 1;
var BULLET_FOR_ENEMY = 2;

//爆炸类型常量
var BOMB_FOR_BULLET = 1;
var BOMB_FOR_TANK = 2;

//瓦片常量
var NORMAL_BRICK = 1;
var DIAMOND_BRICK = 2;
var GRASS = 3;
var WATER = 4;
var FOG = 5;
var HOME = 9;

//坦克类型常量
var TANK_FOR_PLAYER = 0;
var TANK_FOR_AI = 1;


var map = document.getElementById("map");
var cxt = map.getContext("2d");
var x = 100;
var y = 100;

var SIZE = 16;

/**********画砖块********/
cxt.fillStyle = "#FDB878";
cxt.fillRect(x, y, SIZE, SIZE);


cxt.fillStyle = "#FDaa13";
cxt.fillRect(x, y + SIZE / 2 + 2, SIZE, 2);

cxt.fillStyle = "#FDaa13";
cxt.fillRect(x + SIZE / 2 - 1, y, 2, SIZE / 2 + 2);
/**********画砖块********/

// /**********画草地********/
// cxt.fillStyle = "#629755";
// cxt.fillRect(x, y, SIZE, SIZE);
//
// cxt.lineWidth = 1;
// cxt.strokeStyle = "#34644E";
// cxt.strokeRect(x + 1, y + 1, SIZE - 1, SIZE - 1);
// /**********画草地********/
//
// /**********画金刚砖********/
// cxt.fillStyle = "#88B7C6";
// cxt.fillRect(x, y, SIZE, SIZE);
//
// cxt.fillStyle = "#aaB7c8";
// cxt.fillRect(x + SIZE / 4 + 0.5, y + SIZE / 4 + 0.5, SIZE / 2, SIZE / 2);
//
// /**********画金刚砖********/

// /**********画水潭********/
// //画蓝色的背景
// cxt.fillStyle = "#2537F0";
// cxt.fillRect(x, y, SIZE, SIZE);
//
// //画水纹
// cxt.beginPath();
// cxt.moveTo(x + 2, y + 2);
// cxt.lineTo(x + 5, y + 2);
// cxt.closePath();
// cxt.strokeStyle = "#A7FAF6";
// cxt.lineWidth = 2
// cxt.stroke();
//
// cxt.beginPath();
// cxt.moveTo(x + 7, y + 4);
// cxt.lineTo(x + 10, y + 4);
// cxt.closePath();
// cxt.stroke();
//
// cxt.beginPath();
// cxt.moveTo(x + 12, y + 3);
// cxt.lineTo(x + 15, y + 3);
// cxt.closePath();
// cxt.stroke();
//
// cxt.beginPath();
// cxt.moveTo(x + 2, y + 6);
// cxt.lineTo(x + 5, y + 6);
// cxt.closePath();
// cxt.strokeStyle = "#A7FAF6";
// cxt.lineWidth = 2
// cxt.stroke();
//
// cxt.beginPath();
// cxt.moveTo(x + 7, y + 8);
// cxt.lineTo(x + 10, y + 8);
// cxt.closePath();
// cxt.stroke();
//
// cxt.beginPath();
// cxt.moveTo(x + 12, y + 7);
// cxt.lineTo(x + 15, y + 7);
// cxt.closePath();
// cxt.stroke();
//
// cxt.beginPath();
// cxt.moveTo(x + 2, y + 10);
// cxt.lineTo(x + 5, y + 10);
// cxt.closePath();
// cxt.strokeStyle = "#A7FAF6";
// cxt.lineWidth = 2
// cxt.stroke();
//
// cxt.beginPath();
// cxt.moveTo(x + 7, y + 12);
// cxt.lineTo(x + 10, y + 12);
// cxt.closePath();
// cxt.stroke();
//
// cxt.beginPath();
// cxt.moveTo(x + 12, y + 11);
// cxt.lineTo(x + 15, y + 11);
// cxt.closePath();
// cxt.stroke();
// /**********画水潭********/
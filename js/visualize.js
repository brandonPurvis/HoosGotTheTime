// Visualization

var height = 50;
var width = 500;
var canvas;
var ctx;
var attached = new Array();
var attached_colors = new Array();

var setUp = function(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.setAttribute("height", height);
    // canvas.setAttribute("width", width);
    width = canvas.width;
};

var startVisual = function(){
    setUp();
    updateVisuals();
};

var updateVisuals = function(e){
    var text_positions = new Array();
    var text_size = 3;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    var total_value = 0.0;
    attached.forEach(function(element){total_value += parseInt(element.value)});
    var scale_factor = width / total_value;
    var lower = 0;
    for (var i = 0; i < attached.length; i++){
	var scaled_value = parseInt(attached[i].value) * scale_factor;
	ctx.fillStyle = attached_colors[i];
	ctx.fillRect(lower, 0, scaled_value, height);
	text_positions.push([attached[i].id, (2*lower+scaled_value)/2 - (text_size * attached[i].id.length)])
	lower += scaled_value;
    }
    
    for (var i = 0; i < text_positions.length; i++){
	ctx.fillStyle = "#000000";
	ctx.fillText(text_positions[i][0], text_positions[i][1], (height + (15 * (i - 1))) / 2);
    }
};

var attachToVisual = function(name, color){
    var element = document.getElementById(name);
    attached.push(element);
    attached_colors.push(color);
    element.addEventListener('input', updateVisuals);
};

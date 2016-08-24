var Radious=8;
var margin_left=30;
var margin_top=60;
var color = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];

window.onload=function(){
	var oC=document.getElementById('c1');
	var oGc=oC.getContext('2d');

	// var setCurTime=new Date(2016,7,22,16,38,00);
	var setCurTime=new Date();
	setCurTime.setTime(setCurTime.getTime()+3600*2*1000);

	var curShowTime=getCurShowTime();
	var balls=[];
	render(oGc);
	update();
	setInterval(function(){
		render(oGc);
		update();
	},50);

	function update(){
		var nextShowTime=getCurShowTime();

		var nexthour=parseInt(nextShowTime/3600);
		var nextminu=parseInt(nextShowTime%3600/60);
		var nextsec=parseInt(nextShowTime%60);

		var curhour=parseInt(curShowTime/3600);
		var curminu=parseInt(curShowTime%3600/60);
		var cursec=parseInt(curShowTime%60);

		if(parseInt(nexthour/10)!=parseInt(curhour/10)){
			addballs(margin_left,margin_top,parseInt(curhour/10));
		}
		if(parseInt(nexthour%10)!=parseInt(curhour%10)){
			addballs(16*Radious+margin_left,margin_top,parseInt(nexthour%10));
		}
		if(parseInt(nextminu/10)!=parseInt(curminu/10)){
			addballs(42*Radious+margin_left,margin_top,parseInt(nextminu/10));
		}
		if(parseInt(nextminu%10)!=parseInt(curminu%10)){
			addballs(58*Radious+margin_left,margin_top,parseInt(nextminu%10));
		}
		if(parseInt(nextsec/10)!=parseInt(cursec/10)){
			addballs(84*Radious+margin_left,margin_top,parseInt(nextsec/10));
		}
		if(parseInt(nextsec%10)!=parseInt(cursec%10)){
			addballs(100*Radious+margin_left,margin_top,parseInt(nextsec%10));
		}
		curShowTime=nextShowTime;
		updateBalls();
	}

	function updateBalls(){
		// alert(balls.length);
		for(var i=0;i<balls.length;i++){
			balls[i].x+=balls[i].vx;
			balls[i].y+=balls[i].vy;
			balls[i].vy+=balls[i].g;
			if(balls[i].y>oC.height-Radious){
				balls[i].y = oC.height-Radious;
				balls[i].vy=-balls[i].vy*0.75;
			}
		}

		var cnt = 0
   		for( var i = 0 ; i < balls.length ; i ++ ){
   			if( balls[i].x + Radious > 0 && balls[i].x -Radious <oC.width ){
   				balls[cnt++] = balls[i]
   			}
   		}
   		while( balls.length > cnt ){
	        balls.pop();
	    }
	    // console.log(balls.length);
	}

	function addballs(x,y,num){
		for(var i=0;i<digit[num].length;i++){
			for(var j=0;j<digit[num][i].length;j++){
				// console.log(digit[num][i][j]);
				if(digit[num][i][j]==1){
					// oGc.beginPath();
					// oGc.fillStyle=color[Math.floor(Math.random()*10)];
					// oGc.arc(x+j*(2*Radious+1)+(Radious+1),y+i*(2*Radious+1)+(Radious+1),Radious,0,360*Math.PI/180);
					// oGc.fill();
					var aball={
						x: x+j*(2*Radious+1)+(Radious+1),
						y: y+i*(2*Radious+1)+(Radious+1),
						g: 1.5+Math.random(),
						// vx: Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,
						vx: -4,
						vy: -5,
						colors: color[Math.floor(Math.random()*10)]
					}
					balls.push(aball);
				}
				
			}
		}
		// console.log(balls.length);
	}

	function getCurShowTime(){
		var curTime=new Date();
		//倒计时
		// var CountTime=(setCurTime.getTime()-curTime.getTime())/1000;
		// return CountTime>=0?CountTime:0;

		//时钟
		var CountTime=curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds();
		return CountTime;

	}

	function render(context){
		oGc.clearRect(0,0,oC.width,oC.height);
		
		// alert(CountTime);
		
		var hour=parseInt(curShowTime/3600);
		var minu=parseInt(curShowTime%3600/60);
		var sec=parseInt(curShowTime%60);
		// console.log(hour+':'+minu+':'+sec);
		showTime(margin_left,margin_top,parseInt(hour/10));
		showTime(16*Radious+margin_left,margin_top,parseInt(hour%10));

		showTime(32*Radious+margin_left,margin_top,10);
		showTime(42*Radious+margin_left,margin_top,parseInt(minu/10));
		showTime(58*Radious+margin_left,margin_top,parseInt(minu%10));

		showTime(74*Radious+margin_left,margin_top,10);
		showTime(84*Radious+margin_left,margin_top,parseInt(sec/10));
		showTime(100*Radious+margin_left,margin_top,parseInt(sec%10));

		for(var i=0;i<balls.length;i++){
			context.beginPath();
			context.fillStyle=balls[i].colors;
			context.arc(balls[i].x,balls[i].y,Radious,0,360*Math.PI/180);
			context.fill();
		}
	}

	function showTime(x,y,num){
		for(var i=0;i<digit[num].length;i++){
			for(var j=0;j<digit[num][i].length;j++){
				// console.log(digit[num][i][j]);
				if(digit[num][i][j]==1){
					// alert(123);
					oGc.beginPath();
					oGc.fillStyle='blue';
					oGc.arc(x+j*(2*Radious+1)+(Radious+1),y+i*(2*Radious+1)+(Radious+1),Radious,0,360*Math.PI/180);
					oGc.fill();
				}
			}
		}
	}


}
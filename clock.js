(function(){
	"use strict";
	var Doc=function(){
		this.doc=window.document;
		this.fetchId=function(e_id){
			try{
				var element=this.doc.getElementById(e_id);
				if(element!==null){
					return element;
				}
				else{
					return;
				}
			}
			catch(e){
				console.log(e);
			}
		};
	};
	var Time=function(date_obj){
		this.render=function(t){
			if(t<10){
				return "0"+t;
			}
			else{
				return t;
			}
		};
		this.hour=this.render(date_obj.getHours());
		if(this.hour>=12){
			this.hour=this.hour-12;
		}
		this.minute=this.render(date_obj.getMinutes());
		this.second=this.render(date_obj.getSeconds());
		this.today=date_obj.toLocaleDateString();
		this.time=date_obj.toLocaleTimeString();
	};
	var degToRad=function(deg){
		var factor=Math.PI/180;
		return deg*factor;
	};
	var drawArc=function(context,x,y,radius,start_a,end_a,stroke_s,line_w,line_end,shadow_b,shadow_c){
		context.strokeStyle=stroke_s;
		context.lineWidth=line_w;
		context.lineCap=line_end;
		context.shadowBlur=shadow_b;
		context.shadowColor=shadow_c;
		context.beginPath();
		context.arc(x,y,radius,start_a,end_a,false);
		context.stroke();
	};
	var drawTxt=function(context,text,x,y,fill_c,shadow_b,shadow_c,font_s,txt_align,txt_base){
		context.fillStyle=fill_c;
		context.shadowBlur=shadow_b;
		context.shadowColor=shadow_c;
		context.font=font_s;
		context.textAlign=txt_align;
		context.textBaseline=txt_base;
		context.fillText(text,x,y);
	};
	var doc=new Doc();
	var c=doc.fetchId("canvas");
	var c_width=c.width;
	var c_height=c.height;
	var ctx=c.getContext("2d");
	var showTime=function(){
		var d=new Date();
		var time=new Time(d);
		ctx.clearRect(0,0,c_width,c_height);
		ctx.fillStyle="#000000";
		ctx.fillRect(0,0,c_width,c_height);
		var hours=Number(time.hour);
		drawArc(ctx,c_width/2,c_height/2,200,degToRad(270),degToRad((hours*30)-90),"#ff0000",17,"round",15,"#ff0000");
		var minutes=Number(time.minute);
		drawArc(ctx,c_width/2,c_height/2,170,degToRad(270),degToRad((minutes*6)-90),"#00cc00",17,"round",15,"#00cc00");
		var seconds=Number(time.second);
		drawArc(ctx,c_width/2,c_height/2,140,degToRad(270),degToRad((seconds*6)-90),"#0099cc",17,"round",15,"#0099cc");
		drawTxt(ctx,time.today,c_width/2,c_height/2,"#28d1fa",30,"#28d1fa","25px Arial","center","bottom");
		drawTxt(ctx,time.time,c_width/2,c_height/2,"#28d1fa",20,"#28d1fa","20px Arial","center","top");
	};
	showTime();
	var interval=setInterval(function(){
		showTime();
	},1000);
})();
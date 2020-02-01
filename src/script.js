var break_counter=1;
var  session_counter=1;
var breakSession=false;
var workingSession=false;
var pause=true;
var counter;
var x;
var hours;
var seconds=0;
var minutes=session_counter;
var time=0;
var timeLeft=0;
var sim;
var progress=false;
var restart=false;






$(document).ready(function(){
 
   $('.numb').html(break_counter);
  $('.nums').html(session_counter);
  
  $('.mb').click(function(){
    if(pause){
    if(break_counter>1){
    break_counter--;
     $('.numb').html(break_counter);
      restart=true;
  }
    }
  });
  $('.pb').click(function(){
    if(pause){
     if(break_counter<1440){
    break_counter++;
     $('.numb').html(break_counter);
       restart=true;
     }
    }
     });
  $('.ms').click(function(){
    if(pause){
   if(session_counter>1){
    session_counter--;
     $('.nums').html(session_counter);
     restart=true;
   }
    }
   });
  $('.ps').click(function(){
    if(pause){
    if(break_counter<1440){
    session_counter++;
     $('.nums').html(session_counter);
      restart=true;
    }
    }
     });
  $('.canvasContainer').click(function(){
    if(workingSession===false&&breakSession===false){
      workingSession=true;
      breakSession=false;
      pause=false;
       manageProgressPar();
     timerStarter();
     restart=flase;
    }
  else if((workingSession===true||breakSession===true)&&pause===false){
      pause=true;
      timeLeft=time;
      clearInterval(x);
    }
   else if(pause===true){
      pause=false;
     timerStarter();
   }
  ////////////////////////////
 
  ////////////////////////
  });
    /////
 
});


    ////the canvas/////

  var ctx = document.getElementById('main').getContext('2d');
 main.style.left = "100px";
        main.style.top = "250px";
        main.style.position = "absolute";
        main.width = 200;
        main.height = 200;
var al = 0;
var start = 4.72;
var cw = ctx.canvas.width;
var ch = ctx.canvas.height; 
var diff;

    ctx.strokeStyle = "white";
    ctx.lineWidth = 20;
	ctx.textAlign = 'center';
  ctx.font="30px Arial";
	ctx.fillText( minutes + ":" + seconds, cw*.5, ch*.5+2, cw);
  	ctx.beginPath();
	  ctx.arc(100, 100,90, start, 8 * Math.PI, false);
	  ctx.stroke();

function progressSim(){
	diff = ((al / (counter*60)) * Math.PI*2*10).toFixed(2);
	ctx.clearRect(0, 0, cw, ch);
	ctx.lineWidth = 10;
	ctx.fillStyle = 'black';
	ctx.strokeStyle = "black";
	ctx.textAlign = 'center';
  ctx.font="30px Arial";
	ctx.fillText( minutes + ":" + seconds, cw*.5, ch*.5+2, cw);
	ctx.beginPath();
	ctx.arc(100, 100,90, start, diff/10+start, false);
	ctx.stroke();
	if(al >= counter*60){
		clearTimeout(sim);
	    // Add scripting here that will run when progress complete//
    manageProgressPar();
	}
  if(pause===false){
	al++;
}

}
  

function progressBreak(){
  diff = ((al / (counter*60)) * Math.PI*2*10).toFixed(2);
	ctx.clearRect(0, 0, cw, ch);
	ctx.lineWidth = 10;
	ctx.fillStyle = 'red';
	ctx.strokeStyle = "red";
	ctx.textAlign = 'center';
  ctx.font="30px Arial";
	ctx.fillText( minutes + ":" + seconds, cw*.5, ch*.5+2, cw);
	ctx.beginPath();
	ctx.arc(100, 100,90, start, diff/10+start, false);
	ctx.stroke();
	if(al >= counter*60){
		clearTimeout(sim);
	    // Add scripting here that will run when progress completes
    manageProgressPar();
}
    if(pause===false){
	al++;
}

}

function manageProgressPar(){
  al=0;
  if(progress){
    progress=false;
     sim= setInterval(function() {progressBreak()}, 1000);
  }else if(!progress){
    progress=true;
     sim= setInterval(function() {progressSim()}, 1000);
  }
  
  
}

/////////The end of the canvas//////////////////////////////





    function timerStarter(){
      if(workingSession===false&&breakSession===false){
  counter=session_counter;
  }
     
    else if(workingSession===true){
    counter=session_counter;
  }
  else if(breakSession===true){
    counter=break_counter;
  }
   ////difrentiating between the pausing and the starting/////
    var countDownDate ;
     
     if(timeLeft===0||restart){
       al=0;
     countDownDate= new Date().getTime()+counter*60*1000;
     }
     else if(timeLeft>0){
       countDownDate=new Date().getTime()+timeLeft;
        timeLeft=0;
      }
  
      
  x = setInterval(function() {mytimer()}, 1000);
    ////
      /////////
   
    ///////
      
      
      
  function  mytimer(){
  var now = new Date().getTime();
    
  var distance;
    if(countDownDate-now<=0){
      if(counter===session_counter){
        counter=break_counter;
      }else if(counter===break_counter){
        counter=session_counter;
      }
      countDownDate= new Date().getTime()+counter*60*1000;
    }
      distance=countDownDate-now;
    
   
   hours = Math.floor(distance  / (1000 * 60 * 60));
   minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
   seconds = Math.floor((distance % (1000 * 60)) / 1000);
  if(minutes<10){
    minutes='0'+minutes;
  }
  if(seconds<10){
    seconds='0'+seconds;
  }
  if(hours<10&&hours>0){
    hours='0'+hours;
  }
if(hours==0){
   document.getElementById("timer").innerHTML =  
   minutes + ":" + seconds;
}
  else{
  document.getElementById("timer").innerHTML =  hours+':' 
  + minutes + ":" + seconds;
  }
   time=distance;
    
  }
/////
    }
 


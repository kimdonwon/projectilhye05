
module.exports = {
  GetTime : function(){
  var now = new Date();


  var time = gettime(now.getHours());
  time = time+":"+gettime(now.getMinutes());
  time = time+":"+gettime(now.getSeconds());
  return time;
},
  GetToday : function(){
  var now = new Date();
  var m =now.getMonth()+1;
  var d = now.getDate();
  var time=now.getFullYear();
  time=time+"."+gettime(m);
  time= time+"."+gettime(d);
  return time;
},
  GetYesterday : function(){
  var now = new Date();
  var m =now.getMonth()+1;
  var d = now.getDate()-1;
  var time=now.getFullYear();
  time=time+"."+gettime(m);
  time= time+"."+gettime(d);
  return time;
  }

}
function gettime(time){
  if(time>=10)return time;
  else return '0'+time;
}

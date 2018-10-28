var dataModel = require('../models/DataModel');
var controlDB = require('../router/ControlDB');

module.exports = function(app){
  app.get('/senddata/:location/:data',function(req,res){
    controlDB.insertDB(req,res,dataModel)
      console.log('insert완료');
      res.send('good')
  })

  app.get('/',function(req,res){

    var realtime = controlDB.getRealTime;

    res.render('index',{
      realtime:realtime

    })
  })

  app.get('/avg',function(req,res){

    var Todayavg;
    var Yesterdayavg;


    controlDB.getTodayAvgDB(dataModel,function(data){

      if(data==null)Todayavg = new Array(4).fill(0);
      else {
      Todayavg = new Array(4).fill(0);

        for(var i = 0 ; i<data.length ; i++)Todayavg[data[i]._id]=data[i].avg;

        controlDB.getYesterdayAvgDB(dataModel,function(data){

          if(data==null)Yesterdayavg = new Array(4).fill(0);
          else {
          Yesterdayavg = new Array(4).fill(0);
            for(var i = 0 ; i<data.length ; i++)Yesterdayavg[data[i]._id]=data[i].avg;

            console.log(Todayavg)
            res.render('avg',{
              todayavg:Todayavg,
              yesterdayavg:Yesterdayavg
            })

        }
        })
    }
    })

  })
}

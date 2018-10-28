var time = require('../Js/Time');
var realtime = new Array(4).fill(0);

module.exports = {

  getRealTime: realtime,
  insertDB:function(req,res,DataModel){
    realtime[req.params.location]=req.params.data;
    var data = new DataModel();
    data.location = req.params.location;
    data.data = req.params.data;
    data.date = time.GetToday();
    data.time = time.GetTime();

    data.save(function(err){
      if(err){
        console.error(err);
        return;
      }
      console.log("위치 : "+req.params.location+" 데이터 : "+req.params.data+" insert ");
    })
  },

  getTodayAvgDB:function(DataModel,callback){

    DataModel.find({'date':time.GetToday()},function(err,temp){
      if(temp==null)console.log(temp+'데이터가 없음');
      else {
        DataModel.aggregate([{'$match':{
          'date':time.GetToday()


        }},{
          '$group':{
            '_id':'$location',
            'avg':{'$avg':'$data'}
          }
        },{
          '$sort':{
            '_id':1
          }
        }],function(err,DATA){


          callback(DATA);
        })

      }

    })


},

getYesterdayAvgDB:function(DataModel,callback){

  DataModel.find({date:time.GetYesterday()},function(err,temp){
      if(temp==null)console.log('데이터가 없음');
      else {
        DataModel.aggregate([{'$match':{
      'date':time.GetYesterday()

    }},{
        '$group':{
        '_id':'$location',
        'avg':{'$avg':'$data'}
      }
    },{
      '$sort':{
        '_id':1
      }
    }],function(err,DATA){


      callback(DATA);
    })
    }
})

},





}

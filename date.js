module.exports.getdate=getdate;
function getdate()
{
var day;
var today=new Date();
var opt={
    weekday:"long",
    day:"numeric",
    month:"long"
}
day=today.toLocaleDateString("en-US",opt);
var days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
return day;
}
module.exports.getday=getday;
function getday()
{
var day;
var today=new Date();
var opt={
    weekday:"long"
}
day=today.toLocaleDateString("en-US",opt);
var days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
return day;
}
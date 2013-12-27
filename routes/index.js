
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.sendfile(__dirname + "/app/index"); // updated to reflect dir structure
  // res.render('index');
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};
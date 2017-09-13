module.exports.about = function(req,res){
    res.render('generic-text',{
        title: 'About',
        text: 'This is a project for web dev class\n Aarhus fall 2017/18'
    });
};
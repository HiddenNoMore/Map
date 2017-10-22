var fs = require('fs');

exports.home = function (req, res) {
        res.render('index',{maps_key:process.env.MAPS_KEY})
};

exports.org = function (req, res) {
        var fileOrgs = JSON.parse(fs.readFileSync(__dirname +'/../../public/assets/data/orgs.json', 'utf8'));
        res.render('org', { fileOrgs: fileOrgs });
};

exports.about = function (req, res) {
        res.render('about')
};
var cf = require('cf-nodejs-client');
var R = require('ramda');

const BXD_USER =  process.env.CLDSTS_BXD_USER;
const BXD_PASS =  process.env.CLDSTS_BXD_PASS;
const BXD_URL = process.env.CLDSTS_BXD_URL;

const CloudController = new cf.CloudController(BXD_URL);
const UsersUAA = new cf.UsersUAA;
const Apps = new cf.Apps(BXD_URL);
const Spaces = new cf.Spaces(BXD_URL);
const Orgs = new cf.Organizations(BXD_URL);

var Bluemix = function () {

  this._promise = CloudController.getInfo().then( (result) => {
    UsersUAA.setEndPoint(result.authorization_endpoint);
    return UsersUAA.login(BXD_USER, BXD_PASS);
  })
  .then( (token) => {
    Apps.setToken(token);
    Spaces.setToken(token);
    Orgs.setToken(token);
    return this;
  });
  return this;
}

Bluemix.prototype.getSpaceApps = function (spaceId) {
  return this._promise.then(() => {
    return Spaces.getSpaceApps(spaceId).then((data) => {
      if (data.resources && R.isArrayLike(data.resources)){
        var promises = R.map(function(data){
          var app = {
            guid: data.metadata.guid,
            name: data.entity.name,
            url: data.metadata.url,
            state: data.entity.state,
            instance_count: data.entity.instances,
          };

          if (app.state == 'STARTED') {
            return Apps.getStats(data.metadata.guid)
            .then((stats) => {
              app.instances = stats;
              return app;
            });
          }
          else {
            return app;
          }
        }, data.resources)

        return Promise.all(promises);

      }
    });
  })
}

Bluemix.prototype.getOrgs = function() {
  return this._promise.then(() => {
    return Orgs.getOrganizations().then((data) => {
      if (data.resources && R.isArrayLike(data.resources)){
        var promises = R.map(function(org){
          return Orgs.getSummary(org.metadata.guid).then((summary) => {
            return Orgs.getMemoryUsage(org.metadata.guid).then((memory) => {
              summary.memory = memory.memory_usage_in_mb * 1024 * 1024; // memory in bytes
              return summary;
            });
          })

        }, data.resources);
        return Promise.all(promises);
      }
    });
  });
}

module.exports = Bluemix;

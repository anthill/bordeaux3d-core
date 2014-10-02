'use strict';

var rTree = require('./rTree.js');
var buildingMap = require('./buildingMap.js');
var getCityObject = require('./serverCommunication.js').getCityObject;
var scene = require('./3dviz.js').scene;

module.exports = function loadObjects(south, north, east, west) {
    //console.log("query", south, north, east, west);
    // query the rtree to know what building are needed
    var results = rTree.search([west-200, south-200, east+200, north+200]);
    
    //console.log(west, south, east, north)
    
    //remove all buildings from scene
    buildingMap.forEach(function(building){
        building.visible = false;
        scene.remove(building.mesh);
    });
    
    results.forEach(function(result) {
        if (buildingMap.has(result[4].id) === false){
            // not in the map => ask the backend
            getCityObject(result[4].id);
        } else { // in the map
            var entry = buildingMap.get(result[4].id);
            // if not visible, added back to the scene
            scene.add(entry.mesh);
            entry.visible = true;
        }

    });
}
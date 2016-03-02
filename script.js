"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Project = function () {
    function Project(id, title, date, type) {
        _classCallCheck(this, Project);

        this.id = id;
        this.title = title;
        this.date = date;
        this.type = type;
    }

    _createClass(Project, [{
        key: "toString",
        value: function toString() {
            return this.date + " - " + this.title + " - " + this.type;
        }
    }]);

    return Project;
}();

var Job = function () {
    function Job(id, date, job, place, city) {
        _classCallCheck(this, Job);

        this.id = id;
        this.job = job;
        this.place = place;
        this.date = date;
        this.city = city;
    }

    _createClass(Job, [{
        key: "toString",
        value: function toString() {
            return this.date + " - " + this.job + " - " + this.place + " - " + this.city;
        }
    }]);

    return Job;
}();

var Study = function () {
    function Study(id, date, title, place) {
        _classCallCheck(this, Study);

        this.id = id;
        this.title = title;
        this.date = date;
        this.place = place;
    }

    _createClass(Study, [{
        key: "toString",
        value: function toString() {
            return this.date + " - " + this.title + " - " + this.place;
        }
    }]);

    return Study;
}();

var Profil = function () {
    function Profil(description) {
        _classCallCheck(this, Profil);

        this.description = description;
    }

    _createClass(Profil, [{
        key: "toString",
        value: function toString() {
            return this.description;
        }
    }]);

    return Profil;
}();

var AjaxRequest = function () {
    function AjaxRequest(type, url) {
        _classCallCheck(this, AjaxRequest);

        this.type = type;
        this.url = url;
        this.init();
    }

    _createClass(AjaxRequest, [{
        key: "init",
        value: function init() {
            var _this = this;

            console.log("initialisation requête ajax");
            var req = new XMLHttpRequest();
            req.open(this.type, this.url, true);
            req.send();
            req.onload = function (e) {
                _this.datas = JSON.parse(e.currentTarget.responseText);
                document.body.dispatchEvent(new CustomEvent('sendDatas', {
                    detail: {
                        datas: _this.datas
                    }
                }));
            };
        }
    }]);

    return AjaxRequest;
}();

var App = function () {
    function App(array) {
        _classCallCheck(this, App);

        this.array = array;
        this.init();
    }

    _createClass(App, [{
        key: "init",
        value: function init() {
            console.log("init app");
            this.sortDatas(this.array);
        }
    }, {
        key: "sortDatas",
        value: function sortDatas(array) {
            var _this2 = this;

            this.jobs = [];
            this.studies = [];
            this.projects = [];
            this.profil = [];
            // console.log("arr", arr);
            array.map(function (data) {
                // console.log("map",data);
                for (var i = 0; i < data.length; i++) {
                    if (data[i].job) {
                        var j = new Job(data[i].id, data[i].date, data[i].job, data[i].place, data[i].city);
                        _this2.jobs.push(j.toString());
                        //   console.log("jobs",this.jobs);
                    }
                    //Etudes
                    else if (data[i].title && data[i].place) {
                            var s = new Study(data[i].id, data[i].date, data[i].title, data[i].place);
                            _this2.studies.push(s.toString());
                            //   console.log("studies",this.studies);
                        }
                        //Projets
                        else if (data[i].title && data[i].type) {
                                var p = new Project(data[i].id, data[i].title, data[i].date, data[i].type);
                                _this2.projects.push(p.toString());
                                //   console.log("pj",this.projects);
                            } else if (data[i].description) {
                                    var d = new Profil(data[i].description);
                                    _this2.profil.push(d.toString());
                                    //   console.log("profil", this.profil);
                                }
                }
            });
            this.render(this.projects);
            this.render(this.jobs);
            this.render(this.profil);
            this.render(this.studies);
        }
    }, {
        key: "render",
        value: function render(arr) {
            var _this3 = this;

            // console.log("arr", arr);
            arr.forEach(function (li) {
                if (arr === _this3.profil) {
                    var profil = _el('li', li);
                    byId("forProfil").appendChild(profil);
                } else if (arr === _this3.projects) {
                    var prj = _el('li', li);
                    byId("forProjects").appendChild(prj);
                } else if (arr === _this3.studies) {
                    var st = _el('li', li);
                    byId("forStudy").appendChild(st);
                } else if (arr === _this3.jobs) {
                    var ex = _el('li', li);
                    byId("forExp").appendChild(ex);
                }
            });
        }
    }]);

    return App;
}();

function init() {
    var req = new AjaxRequest("get", "data.php");
    document.body.addEventListener('sendDatas', function (e) {
        // console.log(e.detail.datas);
        var datas = e.detail.datas;
        new App(datas);
    }, false);
}

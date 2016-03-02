class Project {
    constructor(id, title, date, type) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.type = type;
    }
    toString() {
        return this.date + " - " + this.title + " - " + this.type;
    }
}

class Job {
    constructor(id, date, job, place, city) {
        this.id = id;
        this.job = job;
        this.place = place;
        this.date = date;
        this.city = city;
    }
    toString() {
        return this.date + " - " + this.job + " - " + this.place + " - " + this.city;
    }
}

class Study {
    constructor(id, date, title, place) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.place = place;
    }
    toString() {
        return this.date + " - " + this.title + " - " + this.place;
    }
}

class Profil {
    constructor(description) {
        this.description = description;
    }
    toString() {
        return this.description;
    }
}


class AjaxRequest {
    constructor(type, url) {
        this.type = type;
        this.url = url;
        this.init();
    }
    init() {
        console.log("initialisation requête ajax");
        const req = new XMLHttpRequest();
        req.open(this.type, this.url, true);
        req.send();
        req.onload = e => {
            this.datas = JSON.parse(e.currentTarget.responseText);
            document.body.dispatchEvent(
                new CustomEvent('sendDatas', {
                    detail: {
                        datas: this.datas
                    }
                })
            );
        };
    }
}


class App {
    constructor(array) {
        this.array = array;
        this.init();
    }
    init() {
        console.log("init app");
        this.sortDatas(this.array);
    }
    sortDatas(array) {
        this.jobs = [];
        this.studies = [];
        this.projects = [];
        this.profil = [];
        // console.log("arr", arr);
        array.map((data) => {
            // console.log("map",data);
            for (let i = 0; i < data.length; i++) {
                if (data[i].job) {
                    let j = new Job(data[i].id, data[i].date, data[i].job, data[i].place, data[i].city);
                    this.jobs.push(j.toString());
                    //   console.log("jobs",this.jobs);
                }
                //Etudes
                else if (data[i].title && data[i].place) {
                    let s = new Study(data[i].id, data[i].date, data[i].title, data[i].place);
                    this.studies.push(s.toString());
                    //   console.log("studies",this.studies);
                }
                //Projets
                else if (data[i].title && data[i].type) {
                    let p = new Project(data[i].id, data[i].title, data[i].date, data[i].type);
                    this.projects.push(p.toString());
                    //   console.log("pj",this.projects);
                }
                else if (data[i].description) {
                    let d = new Profil(data[i].description);
                    this.profil.push(d.toString());
                    //   console.log("profil", this.profil);
                }
            }
        });
        this.render(this.projects);
        this.render(this.jobs);
        this.render(this.profil);
        this.render(this.studies);
    }
    render(arr) {
        // console.log("arr", arr);
        arr.forEach(li => {
            if (arr === this.profil) {
                let profil = _el('li', li);
                byId("forProfil").appendChild(profil);
            }
            else if (arr === this.projects) {
                let prj = _el('li', li);
                byId("forProjects").appendChild(prj);
            }
            else if (arr === this.studies) {
                let st = _el('li', li);
                byId("forStudy").appendChild(st);
            }
            else if (arr === this.jobs) {
                let ex = _el('li', li);
                byId("forExp").appendChild(ex);
            }
        });
    }
}


function init() {
    let req = new AjaxRequest("get", "data.php");
    document.body.addEventListener('sendDatas', e => {
        // console.log(e.detail.datas);
        let datas = e.detail.datas;
        new App(datas);
    }, false);
}

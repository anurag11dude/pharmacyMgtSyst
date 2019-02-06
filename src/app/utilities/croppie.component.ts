import { Component, OnInit, Input } from '@angular/core';
import { DatePipe, JsonPipe } from '@angular/common';
import * as $ from 'jquery'
import { MenuService } from '../services/menu.service';
import { settings } from 'cluster';

@Component({
    selector: 'app-croppie',
    template: `
    <div class = "row w-100 justify-content-center">
    <div class="front-demo h-80"></div>
    <input class = "w-70 text-center" type="file" name="front-upload-img" id="front-upload-img" />
    <div class="text-center w-100 mt-3 py-0">
        <img class = "{{loading ? '' : 'gone'}}" src="{{loaderUrl}}" width="60px" height="40px"/>
        <button [disabled] = "" (click) = "save()" class="{{!loading ? '' : 'gone'}} front-cropImg btn btn-success w-70 " >Save</button>
    </div>
    <div class = 'row py-3 justify-content-between w-60 align-items-center'>
        <div>
        <input id = "circle" (change) = "reset()" type = "radio" value = "circle" name = "cropShape" [(ngModel)] = "cropShape"/>
        <label for = "circle" class = "ml-2 fw-600 f-15">Round</label>
        </div>
        <div>
        <input id = "square" (change) = "reset()" type = "radio" value = "square" name = "cropShape" [(ngModel)] = "cropShape"/>
        <label for = "square" class = "ml-2 fw-600 f-15">Square</label>
        </div>
    </div>
    </div>
  `,
    styles: [``]
})

export class CroppieComponent implements OnInit {

    public logo: string = "";
    public Croppie;
    public cropShape = 'circle';
    public fetched = '';
    public loading: boolean = false;
    public loaderUrl: string = "http://localhost:80/server/assets/loader.gif";
    public uploaded = false;
    constructor(public menuService: MenuService) {
        console.log(this.logo)
    }

    ngOnInit() {
        let thisComp = this;
        this.displaySetting(() => {
            thisComp.fetched = `http://localhost:80/server/assets/${thisComp.logo}`;
            this.init(thisComp.fetched);
        });
    }
    reset() {
        this.Croppie.destroy();
        this.init(this.fetched);
        
        /* this.Croppie.viewport = {
            width: 200,
            height: 200,
            type: this.cropShape
        } */
    }
    init(fetchedimg) {
        let thisComp = this;
        let Crop = window['Croppie'];
        let elem = document.getElementsByClassName('front-demo')[0]
        this.Croppie = new Crop(elem, {
            viewport: {
                width: 200,
                height: 200,
                type: thisComp.cropShape
            },
            boundary: {
                width: 250,
                height: 250
            },
            enableOrientation: true,
            enableResize: true
        });
        this.Croppie.bind({
            url: fetchedimg
        });
        thisComp.uploaded = false;
        $('#front-upload-img').on("change", function () {
            thisComp.uploaded = true;
            var reader = new FileReader();
            reader.onload = function (event) {
                thisComp.fetched = event.target['result'];
                thisComp.Croppie.bind({
                    url: event.target['result']
                });
            }
            reader.readAsDataURL(this.files[0]);
        });
    }

    displaySetting(callback = () => { }) {
        let thisComp = this;
        this.menuService.jsonPost({
            act: "select_operation",
            arg: {
                data: { table: 'settings' },
                classname: ''
            },
            sess: window['user']['username']
        }).then((result) => {
            thisComp.logo = result.data.find(elem => {
                return elem.prop == 'originallogo';
            }).value;
            console.log(thisComp.logo);
            callback();
        })
    }
    save() {
        console.log(window['user']['username']);
        let thisComp = this;
        thisComp.loading = true;
        thisComp.Croppie.result({
            type: 'canvas',
            size: 'viewport',
            format: 'png'
        }).then(function (response) {
            thisComp.Croppie.result({
                type: 'canvas',
                size: 'original',
                format: 'png',
                circle: false
            }).then((res)=>{
                let json = new JsonPipe();
                thisComp.menuService.jsonPost({
                    act: 'add_operation',
                    arg: {
                        data: {
                            settings_data: {
                                "logo": response,
                                "originallogo": res
                            }
                        },
                        classname: 'Settings'
                    },
                    sess: window['user']['username']
                }).then((result) => {
                    console.log(result);
                    thisComp.loading = false;
                });
            })
        })
    }
}



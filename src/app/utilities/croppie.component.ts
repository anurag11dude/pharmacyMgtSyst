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
        <button [disabled] = "!uploaded" (click) = "save()" class="{{!loading ? '' : 'gone'}} front-cropImg btn btn-success w-70 " >Save</button>
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
    public loading: boolean = false;
    public loaderUrl: string = "http://localhost:80/server/assets/loader.gif";
    public uploaded = false;
    constructor(public menuService: MenuService) {

        console.log(this.logo)
    }

    ngOnInit() {
        this.displaySetting(() => {
            this.init();
        });
    }
    reset() {
        this.Croppie.destroy();
        this.init();
    }
    init() {
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
            enableOrientation: true
        });
        this.Croppie.bind({
            url: `http://localhost:80/server/assets/${this.logo}`
        });
        thisComp.uploaded = false;
        $('#front-upload-img').on("change", function () {
            thisComp.uploaded = true;
            var reader = new FileReader();
            reader.onload = function (event) {
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
            sess: 'ewere'
        }).then((result) => {
            thisComp.logo = result.data.find(elem => {
                return elem.prop == 'logo';
            }).value;
            console.log(thisComp.logo);
            callback();
        })
    }
    save() {
        console.log('ewere');
        let thisComp = this;
        thisComp.loading = true;
        thisComp.Croppie.result({
            type: 'canvas',
            size: 'viewport',
            format: 'png'
        }).then(function (response) {
            let json = new JsonPipe();
            thisComp.menuService.jsonPost({
                act: 'add_operation',
                arg: {
                    data: {
                        settings_data: {
                            "logo": response
                        }
                    },
                    classname: 'Settings'
                },
                sess: 'ewere'
            }).then((result) => {
                console.log(result);
                thisComp.loading = false;
            });
        })
    }
}



import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { host, port, station } from '../../assets/url/url';

import * as fs from 'fs';

import { io } from "../../../node_modules/socket.io-client";

// import dataUrl from '../../assets/data/data.json';

let urlServer: string = 'http://' + host + ':' + port

// let socket = io(urlServer)

const socket = io(urlServer, {});

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  hostTemplate: any = host
  portTemplate: any = port
  stationTemplate: any = station

  left: any
  right: any

  news: string = 'ยินดีต้อนรับ'
  newsEdit: string = ''

  displayBootstrap = ['d-none', '']

  displayCheck: any

  hostEdit: any
  portEdit: any
  stationEdit: any

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {

    if (this.hostTemplate) {
      console.log('This host is ' + this.hostTemplate);
    } else {
      localStorage.setItem('host', "192.168.4.245");
      this.hostTemplate = localStorage.getItem('host');
      console.log('This host was chenge' + this.hostTemplate);
    }

    if (this.portTemplate) {
      console.log('This port is ' + this.portTemplate);
    } else {
      localStorage.setItem('port', "3040");
      console.log('This port was chenge' + this.portTemplate);
    }

    if (this.stationTemplate) {
      console.log('This station is ' + this.stationTemplate);
    } else {
      localStorage.setItem('station', "2");
      this.stationTemplate = localStorage.getItem('station');
    }

    urlServer = 'http://' + this.hostTemplate + ':' + this.portTemplate;
    console.log('Server URL is ' + urlServer);

    this.hostEdit = this.hostTemplate
    this.portEdit = this.portTemplate
    this.stationEdit = this.stationTemplate

    this.http.get(urlServer + '/api/getnews').subscribe((data:any) => {
      // console.log(data.news);
      this.news = data.news
    })

  }

  pushQue() {

    if (this.left.length != 0 && this.right.length != 0) {
      if (this.left < this.right) {

        console.log('sent QUE ' + this.left + '-' + this.right);

        this.http.post(urlServer + '/api/fn_push_que', {
          station_id: this.stationTemplate,
          number: this.left + '-' + this.right
        }).subscribe(data => {
          console.log(data);
        })

        this.left = '';
        this.right = '';

      } else {
        console.log('cannot sent QUE');
      }
    }

  }

  clearQue() {

    console.log('clearQue')

    this.http.post(urlServer + '/api/clearQue', {
      station_id: this.stationTemplate
    }).subscribe(data => {
      console.log(data);
    })

  }

  selectSetting() {

    console.log('selectSetting')

  }

  selectNews() {

    console.log('selectNews')
    this.newsEdit = this.news

  }

  checkStation() {

    console.log('checkStation')
    localStorage.setItem('station', this.stationTemplate);
    this.stationEdit = this.stationTemplate

  }

  onSaveNews() {

    console.log('onSaveNews')
    this.news = this.newsEdit

    this.http.post(urlServer + '/api/saveNews', {
      news: this.news
    }).subscribe(data => {
      console.log(data);
    })

  }

  onSaveSettting() {

    console.log('onSaveSettting')

    localStorage.setItem('host', this.hostEdit);
    localStorage.setItem('port', this.portEdit);
    localStorage.setItem('station', this.stationEdit);

    this.hostTemplate = this.hostEdit
    this.portTemplate = this.portEdit
    this.stationTemplate = this.stationEdit

    urlServer = 'http://' + this.hostEdit + ':' + this.portEdit;
    console.log(urlServer);

    // socket = io(urlServer)
    console.log('Socket ip Was Chenges');

  }

}

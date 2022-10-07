import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { urls, ports, stations, url, port, station } from '../../assets/url/url';

import * as fs from 'fs';

// import dataUrl from '../../assets/data/data.json';

let urla = 'http://' + url.url + ':' + port.port + '/api/fn_push_que/'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  left = ''
  right = ''
  c = ''
  postId = ''
  chanel = 1

  url1 = localStorage.getItem('url')
  port1 = localStorage.getItem('port')
  station = localStorage.getItem('station')

  range = localStorage.getItem('station')

  url1e: any
  port1e: any
  statione: any

  url5 = url.url
  port5 = port.port

  total: any

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {

    this.url1e = this.url1
    this.port1e = this.port1
    this.statione = this.station
    if (this.url1) {
      console.log('OK URL')
      console.log(this.url1)
    } else {
      localStorage.setItem('url', "192.168.4.245");
      this.url1 = localStorage.getItem('url')
      this.url1e = localStorage.getItem('url')
    }

    if (this.port1) {
      console.log('OK PORT')
      console.log(this.port1)
    } else {
      localStorage.setItem('port', "3040");
      this.port1 = localStorage.getItem('port')
      this.port1e = localStorage.getItem('port')
    }

    if (this.station) {
      console.log('OK station')
      console.log(this.station)
    } else {
      localStorage.setItem('station', "2");
      this.station = localStorage.getItem('station')
      this.statione = localStorage.getItem('station')
    }

    urla = 'http://' + this.url1e + ':' + this.port1e + '/api/fn_push_que/'
    this.total = urla
    console.log(urla)
  }

  check() {

    if (this.left.length != 0 && this.right.length != 0) {
      if (this.left < this.right) {
        this.c = this.left + '-' + this.right
        console.log(this.c);
        this.left = ''
        this.right = ''
        this.http.post<any>(urla, {
          station_id: this.station,
          number: this.c
        }).subscribe(data => {
          this.postId = data;
          console.log(data)
        })
      } else {
        console.log('NO')
      }
    }

  }

  checks() {
    console.log(this.range)
    if (this.range) {
      localStorage.setItem('station', this.range);
      this.station = this.range
    }
  }

  onSubmit() {
    // Process checkout data here
    // urla = 'http://' + this.url5 + ':' + this.port5 + '/api/fn_push_que/'
    // this.total = urla
    // stations(this.station)
    // urls(this.url5)
    // ports(this.port5)
    // console.log(url)
    // console.log(port)
    // console.log(station)

    localStorage.setItem('url', this.url1e);
    localStorage.setItem('port', this.port1e);
    localStorage.setItem('station', this.statione);

    this.url1 = localStorage.getItem('url')
    this.port1 = localStorage.getItem('port')
    this.station = localStorage.getItem('station')

    this.range = this.station

    this.total = 'http://' + localStorage.getItem('url') + ':' + localStorage.getItem('port') + '/api/fn_push_que/'
    urla = this.total
    console.log(this.total)
  }



}

import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ToNotifyPost} from "../../models/to-notify-post";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {

  tnps: ToNotifyPost[];

  constructor(private route: Router) { }

  ngOnInit() {
    const extras = this.route.getCurrentNavigation()?.extras?.state as {
      tnpList: ToNotifyPost[];
    };

    this.tnps = extras.tnpList as ToNotifyPost[];
    console.log(this.tnps);

  }

}

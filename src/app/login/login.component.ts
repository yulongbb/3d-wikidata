import { Component, OnInit } from '@angular/core';
declare var ForceGraph3D: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const N = 300;
    const gData = {
      nodes: [...Array(N).keys()].map((i) => ({ id: i })),
      links: [...Array(N).keys()]
        .filter((id) => id)
        .map((id) => ({
          source: id,
          target: Math.round(Math.random() * (id - 1)),
        })),
    };

    const distance = 1400;

    const Graph = ForceGraph3D()(document.getElementById('3d-graph'))
      .enableNodeDrag(false)
      .enableNavigationControls(false)
      .showNavInfo(false)
      .cameraPosition({ z: distance })
      .graphData(gData);

    // camera orbit
    let angle = 0;
    setInterval(() => {
      Graph.cameraPosition({
        x: distance * Math.sin(angle),
        z: distance * Math.cos(angle),
      });
      angle -= Math.PI / 300;
    }, 50);
  }

}

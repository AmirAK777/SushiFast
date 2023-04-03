import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Box } from 'src/app/models/Box';
import { LookupService } from 'src/app/service/lookup.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  template: `
    <app-panier-component [panierBox]="panierBox"></app-panier-component>
  `
})
export class MenuComponent implements OnInit {

  boxes: Box[]=[];
  selectedBox: any;
  panierBox: any[] = [];
  message: any;

  constructor(private lookUpService: LookupService, private route: ActivatedRoute) {

  }
  public getImage(image : string): any {
    return (environment.apiImage + image);
  }
  
  showDetails(box: any) {
    this.selectedBox = box
  }

 addPanier(box: any) {
    let laBox = this.lookUpService.getPanierBox().find(b => b.nom === box.nom);
  
    if (laBox) {
      laBox.qte++;
    } else {
      laBox = {
        nom: box.nom,
        prix: box.prix,
        qte: 1,
        image: box.image
      };
      this.lookUpService.getPanierBox().push(laBox);
    }
    this.lookUpService.setPanierBox(this.lookUpService.getPanierBox());
    console.log(this.lookUpService.getPanierBox());
  }
  

  ngOnInit() {
    this.lookUpService.getBoxes().subscribe((boxes: Box[]) => {
      this.boxes = boxes;   
      console.log(boxes)
      this.lookUpService.send_data.next(this.panierBox)
    });
    this.route.queryParams.subscribe(params => {
      this.message = params['message'];
    });

  }



 
}



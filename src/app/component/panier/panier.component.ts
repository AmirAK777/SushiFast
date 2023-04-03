import { Component } from '@angular/core';
import { Box } from 'src/app/models/Box';
import { LookupService } from 'src/app/service/lookup.service';
import { environment } from 'src/environments/environment';
import { MenuComponent } from '../menu/menu.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'],
  template: `
  <div class="app">
    Parent: {{ myCount }}
    <counter
      [count]="myCount"
      (change)="countChange($event)">
    </counter>
  </div>`
})
export class PanierComponent {

  boxPanier: any;
  selectedBox: any;
  commande: any;
  produits: any;

  constructor(private lookUpService: LookupService, private router: Router) {
    this.lookUpService.send_data.subscribe((panierBox: any[]) => {
      console.log(panierBox);
      this.boxPanier = panierBox;


    });



  }
  public getImage(image: string): any {
    return (environment.apiImage + image);
  }



  ngOnInit() {
    const dates = new Date()
    if (this.boxPanier) {
      this.produits = this.boxPanier.map((box: any) => ({
        nom: box.nom,
        prix: box.prix,
        qte: box.qte,
        prixTotal: box.prix * box.qte
      }));


      const numeroCommande = new Date().getTime();
      this.commande = {
        numeroCommande,
        prixFinal: this.total(),
        details: this.produits.map((article: any) => ({
          nom: article.nom,
          quantite: article.qte,
          prixUni: article.prix
        })),
        date: new Date().toLocaleDateString()
      };
  
    }

  }
  total(): any {
    let prixTotal = 0;
    for (let i = 0; i < this.produits.length; i++) {
      prixTotal += this.produits[i].prixTotal;
    }
    return prixTotal
  }

  commander(){ 

    // Enregistrer la commande dans le stockage local
    let commandes: any[] = [];
    
    if (localStorage.getItem('commandes')) {
      commandes = JSON.parse(localStorage.getItem('commandes') as string);
    }
    
    commandes.push(this.commande);
    localStorage.setItem('commandes', JSON.stringify(commandes));
    this.exportLocalStorageToJson();

  }
  exportLocalStorageToJson() {
    const data = localStorage.getItem('commandes');
    if (data !== null) {
      const blob = new Blob([data], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'commandes.json';
      link.click();


     
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    }
  }
}

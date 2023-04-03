import { Aliment } from "./Aliment";



export class Box{
    constructor(
      public nom: string,
      public pieces: string,
      public image: string,
      public prix: string,
      public saveurs: string[],
      public aliments: Aliment[],
      public id: number) {
        
      }
  }
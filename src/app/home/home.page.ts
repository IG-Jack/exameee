import { PokeapiService } from './../Services/apiservice.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {  
  pokemonId: number = 1;
  nombrePokemon: string = "";
  pokemonImageURL: string = "";
  pokemonName: string = "bulbasaur";
  nombrePokemon1: string = "";
  pokemonImageURL1: string = "";
  pokemonId1: number = 1;
  id: number = 1;
  pokemonType: string[] = [];
  
  public pokemon: any;

  constructor(private api: PokeapiService ) {}

  getPokemonDataID() {
    this.api.getPokemonID(this.pokemonId).subscribe((response => {
      this.pokemon = response.name;
      this.nombrePokemon = this.pokemon;

      this.api.getPokemonImageURL(this.pokemonId).subscribe((imageResponse => {
        this.pokemonImageURL = imageResponse;
        console.log(this.pokemon);
      }), (error) => {  
        console.log(error);
      });
    }));  
  }
  
  mostrarNombre() { 
    this.getPokemonDataID();
  }

  mostrarDatos() {
    this.api.getPokemonIName(this.pokemonName.toLowerCase()).subscribe((id => {
      this.pokemonId1 = id;
      this.api.getNameImageURL(this.pokemonName.toLowerCase()).subscribe((imageResponse => {
        this.pokemonImageURL1 = imageResponse;
  
        // Corrección: Arreglo en la suscripció
        this.api.getPokemonType(this.pokemonId1).subscribe((types: string[]) => {
          this.pokemonType = types;
        }, (error) => {
          console.log(error);
        });
  
      }), (error) => {
        console.log(error);
      });
      this.nombrePokemon1 = this.pokemonName.charAt(0).toUpperCase() + this.pokemonName.slice(1);
    }), (error) => {
      console.log(error);
    });
  }  
}

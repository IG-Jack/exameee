import { PokeapiService } from './../Services/apiservice.service';
import { Component } from '@angular/core';

// Define el componente HomePage con su selector, plantilla y estilos.
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
  pokemonId1: number=1;
  id: number=1;
  
  public pokemon: any;

  constructor(private api: PokeapiService) {}

  getPokemonDataID() {
    this.api.getPokemonID(this.pokemonId).subscribe((response => {
      this.pokemon = response.name;
      this.nombrePokemon =  this.pokemon;

      // Obtener la URL de la imagen del Pokémon y asignarla a la propiedad correspondiente
      this.api.getPokemonImageURL(this.pokemonId).subscribe((imageResponse => {
        this.pokemonImageURL = imageResponse; // Corrección: Asignar la URL de la imagen del Pokémon a la propiedad correspondiente
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
      this.api.  getNameImageURL(this.pokemonName.toLowerCase()).subscribe((imageResponse => {
        this.pokemonImageURL1 = imageResponse;
      }), (error) => {
        console.log(error);
      });
    }), (error) => {
      console.log(error);
    });
    this.nombrePokemon1 = this.pokemonName.charAt(0).toUpperCase() + this.pokemonName.slice(1);
  }
  } 

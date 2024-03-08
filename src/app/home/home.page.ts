


import { PokeapiService } from './../Services/apiservice.service';
import { Component } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pokemonNameOrId: string = "";
  pokemonImageURL: string = "";
  nombrePokemon: string = "";
  pokemonId: number = 0;
  pokemonType: string[] = [];

  private ruta: any; 
  private rutaLed2: any; 
  private rutaLed3: any; 

  constructor(private api: PokeapiService,private firestore: Firestore) {

  }
 
  
  mostrarDatos() {
    if (isNaN(Number(this.pokemonNameOrId))) {
        // Buscar por nombre
        this.api.getPokemonIName(this.pokemonNameOrId.toLowerCase()).subscribe((id => {
            this.pokemonId = id;
            this.api.getNameImageURL(this.pokemonNameOrId.toLowerCase()).subscribe((imageResponse => {
                this.pokemonImageURL = imageResponse;

                this.api.getPokemonType(this.pokemonId).subscribe((types: string[]) => {
                    this.pokemonType = types;

                    // Llamar a enviarDatosAFirebase() aquí después de obtener el tipo del Pokémon
                    this.enviarDatosAFirebase();
                }, (error) => {
                    console.log(error);
                });

            }), (error) => {
                console.log(error);
            });
            this.nombrePokemon = this.pokemonNameOrId.charAt(0).toUpperCase() + this.pokemonNameOrId.slice(1);
        }), (error) => {
            console.log(error);
            this.resetPokemonInfo();
        });
    } else {
        // Buscar por ID
        this.pokemonId = Number(this.pokemonNameOrId);
        this.api.getPokemonID(this.pokemonId).subscribe((response => {
            this.nombrePokemon = response.name;

            this.api.getPokemonImageURL(this.pokemonId).subscribe((imageResponse => {
                this.pokemonImageURL = imageResponse;

                this.api.getPokemonType(this.pokemonId).subscribe((types: string[]) => {
                    this.pokemonType = types;

                    // Llamar a enviarDatosAFirebase() aquí después de obtener el tipo del Pokémon
                    this.enviarDatosAFirebase();
                }, (error) => {
                    console.log(error);
                });

            }), (error) => {
                console.log(error);
            });
        }), (error) => {
            console.log(error);
            this.resetPokemonInfo();
        });
    }
}
  
  resetPokemonInfo() {
    this.pokemonId = 0;
    this.nombrePokemon = "";
    this.pokemonImageURL = "";
    this.pokemonType = [];
  }
  async enviarDatosAFirebase() {
    // Definir la ruta del documento en la colección 'Pokemones' con la estructura proporcionada
    const ruta = doc(this.firestore, 'Pokemones', 'pokemon');

    try {
        // Establecer el tipo del Pokémon en Firebase
        await setDoc(ruta, { tipo: this.pokemonType });
        console.log('Tipo de Pokémon enviado exitosamente a Firebase');
    } catch (error) {
        console.error('Error al enviar el tipo de Pokémon a Firebase:', error);
    }
}
  mostrarYEnviarDatos() {
    this.mostrarDatos(); // Llama al método mostrarDatos() para obtener la información del Pokémon
    this.enviarDatosAFirebase(); // Llama al método enviarDatosAFirebase() para enviar los datos a Firebase
  }
 }  


 

// Importa los módulos necesarios de Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Marca la clase como un servicio inyectable, lo que permite que Angular lo inyecte automáticamente donde sea necesario.
@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
  // Define la URL base de la PokeAPI
  private apiUrl = 'https://pokeapi.co/api/v2/';

  // El constructor recibe una instancia de HttpClient, que será utilizada para realizar solicitudes HTTP.
  constructor(private http: HttpClient) { }

  // Método para obtener información de un Pokémon por su ID.
  // Retorna un Observable, ya que las solicitudes HTTP en Angular son asíncronas.
  getPokemonID(pokemonId: number): Observable<any> {
    // Utiliza el método get del HttpClient para realizar una solicitud GET a la URL de la PokeAPI con el ID del Pokémon.
    return this.http.get(this.apiUrl+"pokemon/"+pokemonId);
  }

  getPokemonName(name: string): Observable<any> {
    // Utiliza el método get del HttpClient para realizar una solicitud GET a la URL de la PokeAPI con el nombre del Pokémon.
    return this.http.get(this.apiUrl+"pokemon/"+name);
  }
  getPokemonImageURL(pokemonId: number): Observable<string> {
    return of (`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`);
  }
  getPokemonIName(pokemonName: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}pokemon/${pokemonName}`).pipe(
      map(data => data.id)
    );
  }
  getNameImageURL(pokemonName: string): Observable<string> {
    return this.getPokemonIName(pokemonName).pipe(
      map(id => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`)
    );
  }
  getObjectById(objectId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}item/${objectId}`);
  }

  // Método para obtener información de un objeto Pokémon por su nombre
  getObjectName(objectName: string): Observable<any> {
    return this.http.get(`${this.apiUrl}item/${objectName}`);
  }

  // Método para obtener la imagen de un objeto Pokémon por su ID
  getObjectImageById(objectId: number): Observable<string> {
    return this.http.get<any>(`${this.apiUrl}item/${objectId}`).pipe(
      map(data => data.sprites.default)  // Asumiendo que la URL de la imagen se encuentra en la propiedad 'sprites.default'
    );
  }

  // Método para obtener la imagen de un objeto Pokémon por su nombre
  getObjectImageByName(objectName: string): Observable<string> {
    return this.http.get<any>(`${this.apiUrl}item/${objectName}`).pipe(
      map(data => data.sprites.default)  // Asumiendo que la URL de la imagen se encuentra en la propiedad 'sprites.default'
    );
  } }
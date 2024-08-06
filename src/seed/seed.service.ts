import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon, PokemonSchema } from 'src/pokemon/entities/pokemon.entity';
import { FetchAdapter } from 'src/common/adapters/fetch.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: FetchAdapter
  ){}

  async executeSeed(
   
  ){

    await this.pokemonModel.deleteMany({});

    const response:PokeResponse = await this.http.get('https://pokeapi.co/api/v2/pokemon?limit=650');
    

    const pokemonToInsert: {name:string,no:number}[] = [];

    for ( let {name,url} of response.results ){
        
      const segments = url.split('/');
      const no = +segments[segments.length-2];
      pokemonToInsert.push({name,no});
    };

    this.pokemonModel.insertMany(pokemonToInsert);
    // const insertPromisesArray = [];
    

    // for ( let {url,name} of dataJSON.results ){
    //   const segments = url.split('/');
    //   const no = +segments[segments.length-2];
    //   insertPromisesArray.push(
    //     this.pokemonModel.create({
    //       name,
    //       no
    //     })
    //   )

       
    // }
    // await Promise.all(insertPromisesArray);
    return 'Seed executed';
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ParseIntPipe, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { PaginationDto } from 'src/common/dtop/pagination.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  // @HttpCode(200)
  create(@Body() createPokemonDto: CreatePokemonDto) {
    
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll(@Query() PaginationDto: PaginationDto) {
    return this.pokemonService.findAll(PaginationDto);
  }

  @Get(':term')
  findOne(@Param('term') id: string) {
    return this.pokemonService.findOne(id);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(term, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseMongoIdPipe) id: string) {
    return this.pokemonService.remove(id);
  }
}

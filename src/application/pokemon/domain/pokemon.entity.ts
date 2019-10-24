import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm'
import { Pokedex } from '../../pokedex/pokedex.providers'

@Entity({ name: 'pokemons' })
export class Pokemon {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  createDate: Date

  @Column()
  name: string

  @Column()
  description: string

  @Column({
    default: false
  })
  captured: boolean

  @Column({
    type: 'simple-json'
  })
  location: {
    lat: string,
    long: string,
  }

  @Column({
    type: 'simple-json',
    nullable: true
  })
  proportions: {
    height: string,
    weight: string,
  }

  @Column()
  pokedexId: number

  @ManyToOne(type => Pokedex, pokedex => pokedex)
  pokedex: Pokedex
}

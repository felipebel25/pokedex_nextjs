import {  Card, Grid, Row, Text } from '@nextui-org/react'
import type { NextPage } from 'next'
import { Layout } from '../components/layouts'
import { GetStaticProps } from 'next'
import { pokeApi } from '../api'
import { PokemonListResponse, SmallPokemon } from '../interfaces'
import PokemonCard from '../components/pokemon/PokemonCard'

interface Props {
  pokemons: SmallPokemon[]
}
const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout
      title='Listado de Pokemones'
    >
      <Grid.Container gap={2} justify='center'>
        {pokemons.map(( pokemon ) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon}/>
        ))}
      </Grid.Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=150')
  const pokemons: SmallPokemon[] = data.results.map((poke, i) => {
    return {
      ...poke,
      id: i + 1,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`

    }
  })
  return {
    props: {
      pokemons: pokemons

    }
  }
}
export default HomePage

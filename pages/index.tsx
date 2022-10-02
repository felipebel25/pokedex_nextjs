import { Card, Grid, Input, Row, Text } from '@nextui-org/react'
import type { NextPage } from 'next'
import { Layout } from '../components/layouts'
import { GetStaticProps } from 'next'
import { pokeApi } from '../api'
import { PokemonListResponse, SmallPokemon } from '../interfaces'
import PokemonCard from '../components/pokemon/PokemonCard'
import { useState } from 'react'
import useFilter from '../hooks/useFilter'
interface Props {
  pokemons: SmallPokemon[]
}
const origin = (typeof window === 'undefined') ? '' : window.location.origin
const HomePage: NextPage<Props> = ({ pokemons }) => {
  const [search, setSearch] = useState('')
  const [pokemonsData, setpokemonsData] = useState(pokemons)
  const pokemonsSearch = useFilter(pokemonsData,'name', search)
  return (
    <Layout
      ogImage={`${origin}/img/banner.png`}
      title='Listado de Pokemones'
    >
      <Grid css={{width:"40%",margin:"1rem 0",marginLeft:"1%", minWidth:"17rem"}}>
        <Input aria-label='input' value={search} onChange={(e)=>setSearch(e.target.value)} fullWidth bordered placeholder='Search Pokemon' />
      </Grid>
      <Grid.Container gap={2} justify='center'>
        {pokemonsSearch.map((pokemon:SmallPokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
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

import { useEffect, useState } from 'react';
import { pokeApi } from '../../api';
import { localFavorites } from '../../utils';

import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import { GetStaticProps, NextPage, GetStaticPaths } from 'next';

import confetti from 'canvas-confetti'

import { Layout } from '../../components/layouts'
import { Pokemon, PokemonListResponse } from '../../interfaces';
import { getPokemonInfo } from '../../utils/getPokemonInfo';
interface Props {
    pokemon: Pokemon;
}
const PokemonNamePage: NextPage<Props> = ({ pokemon }) => {
    const ogImage = pokemon.sprites.other?.['official-artwork'].front_default || ""
    const [isInFavorites, setIsInFavorites] = useState(false)
    useEffect(() => {
        setIsInFavorites(localFavorites.existInFavorites(pokemon.id));
    }, [pokemon.id]);
    const onToogleFavorite = () => {
        localFavorites.toggleFavorite(pokemon.id)
        setIsInFavorites(!isInFavorites)
        if (!isInFavorites) {
            confetti({
                zIndex: 999,
                particleCount: 100,
                spread: 160,
                angle: -100,
                origin: {
                    x: 0.9,
                    y: 0
                }
            })
        }
    }
    return (
        <Layout title={pokemon.name} ogImage={ogImage}>
            <Grid.Container css={{ marginTop: "5px" }} gap={2}>
                <Grid xs={12} sm={4}>
                    <Card isHoverable css={{ padding: "30px" }}>
                        <Card.Body>
                            <Card.Image
                                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                                alt={pokemon.name}
                                width='100%'
                                height={200}
                            />
                        </Card.Body>
                    </Card>
                </Grid>
                <Grid xs={12} sm={8}>
                    <Card>
                        <Card.Header css={{
                            display: "flex",
                            justifyContent: "space-between",
                            '@smMax': {
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }
                        }}>
                            <Text h1 css={{
                                fontSize: "2.5rem",
                                marginBottom: "1rem",
                                fontWeight: "500",
                            }} transform='capitalize'> <small style={{ fontSize: "1.6rem" }}>Name:</small> {pokemon.name}</Text>
                            <Button

                                onClick={onToogleFavorite}
                                color='gradient'
                                ghost={!isInFavorites}>
                                {!isInFavorites ? 'Agregar a Favoritos' : "Eliminar de Favoritos"}
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Text size={20}>Sprites:</Text>
                            <Container
                                direction='row' display='flex'
                                gap={0}>
                                <Image
                                    src={pokemon.sprites.front_default}
                                    width={100}
                                    height={100}
                                    alt={pokemon.name}
                                />
                                <Image
                                    src={pokemon.sprites.back_default}
                                    width={100}
                                    height={100}
                                    alt={pokemon.name}
                                />
                                <Image
                                    src={pokemon.sprites.front_shiny}
                                    width={100}
                                    height={100}
                                    alt={pokemon.name}
                                />
                                <Image
                                    src={pokemon.sprites.back_shiny}
                                    width={100}
                                    height={100}
                                    alt={pokemon.name}
                                />
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const { data } = await pokeApi.get<PokemonListResponse>(`/pokemon?limit=151`)
    const pokemons151: string[] = data.results.map(pokemon => pokemon.name)
    return {
        paths: pokemons151.map((name: string) => ({
            params: { name }
        })),
        fallback: false
    }
}
export const getStaticProps: GetStaticProps = async (ctx) => {
    const { name } = ctx.params as { name: string };
    return {
        props: {
            pokemon: await  getPokemonInfo(name)
        }
    }
}
export default PokemonNamePage;
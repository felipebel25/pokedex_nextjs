import { Grid } from "@nextui-org/react"

import { FC } from "react"
import { FavoritePokemon } from "../favorite-pokemon"

interface Props {
    favoritePokemons: number[]
}

export const FavoritesPokemons: FC<Props> = ({ favoritePokemons }) => {
 

    return (
        <Grid.Container  gap={2} direction='row' justify='flex-start'>
            {
                favoritePokemons.map(id => (
                    <FavoritePokemon key={id} favoritePokemonId={id} />
                ))
            }
        </Grid.Container>
    )
}

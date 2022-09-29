import { Card, Grid } from "@nextui-org/react"
import { useRouter } from "next/router"
import { FC } from "react"

interface Props {
    favoritePokemonId: number
}

export const FavoritePokemon: FC<Props> = ({ favoritePokemonId }) => {
    const router = useRouter()
    const onFavorite = () =>{
        router.push(`/pokemon/${favoritePokemonId}`)
    }
    
    return (
        <Grid  onClick={onFavorite} xs={6} sm={3} md={2} xl={1} key={favoritePokemonId}>
            <Card isHoverable css={{ padding: "10" , cursor:"pointer" }}>
                <Card.Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${favoritePokemonId}.png`}
                    alt='Favorite Pokemon'
                />
            </Card>
        </Grid>
    )
}

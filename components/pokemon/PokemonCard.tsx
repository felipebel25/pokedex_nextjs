import { FC } from 'react'
import { SmallPokemon } from '../../interfaces'
import { Card, Grid, Row, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'

interface Props {
    pokemon: SmallPokemon
}

const PokemonCard: FC<Props> = ({ pokemon: { id, name, img } }) => {
    const router = useRouter()
    const onClick = () => {
        router.push(`/name/${name}`)
    }
    return (
        <Grid xs={6} sm={3} md={2} xl={2}>
            <Card
                onClick={onClick}
                isHoverable isPressable>
                <Card.Body css={{ p: 1 }}>
                    <Card.Image
                        src={img}
                        width='100%'
                        height={140}
                    />
                    <Card.Footer>
                        <Row justify='space-between'>
                            <Text transform='capitalize'>{name}</Text>
                            <Text>#{id}</Text>

                        </Row>
                    </Card.Footer>
                </Card.Body>
            </Card>
        </Grid>
    )
}

export default PokemonCard
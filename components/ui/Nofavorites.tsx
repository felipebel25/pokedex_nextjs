import { Container, Image, Text } from '@nextui-org/react'

export const NoFavorites = () => {
  return (

      <Container css={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 100px)",
        alignItems: 'center',
        alignSelf: "center",
        paddingTop:"9rem"
      }}>
        <Text h1>No hay Favoritos</Text>
        <Image
          width={250}
          height={250}
          src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/129.svg'}
          css={{
            opacity: 0.3
          }}
        />
      </Container>
      
  )
}


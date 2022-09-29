import { Link, Spacer, Text, useTheme } from "@nextui-org/react"
import Image from "next/image"

export const NavBar = () => {
    const { theme } = useTheme()
    return (
        <div style={{
            display: 'flex',
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "0x 20px",
            backgroundColor: theme?.colors.gray100.value,
            height: "5rem"
        }}>
            <Link
                href={'/'}
                css={{
                    display: "flex", alignItems: "center", cursor: "pointer"
                }}
            >
                <Image
                    src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/129.png'}
                    alt={'Logo de PokemnApp'}
                    width={70}
                    height={70}
                />
                <Text color="white" h2>
                    P
                </Text>
                <Text color="white" h3>
                    okemon
                </Text>
            </Link>
            <Spacer css={{
                flex: 1
            }} />
            <Link
                css={{marginRight:"1rem"}}
                href="/favorites">
                <Text>
                    Favoritos
                </Text>
            </Link>
        </div>
    )
}


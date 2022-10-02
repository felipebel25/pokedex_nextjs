import { FC } from "react"
import Head from "next/head"
import { NavBar } from '../ui'
type Props = {
    children?: React.ReactNode,
    title?: string,
    ogImage?: string
};
export const Layout: FC<Props> = ({ children, title ,ogImage }) => {
    return (
        <>
            <Head>
                <title>{title || 'Pokemon App'}</title>
                <meta name="author" content="Felipe Medina" />
                <meta name="description" content={`Información ${title}`} />
                <meta name="keywords" content={`${title}, pokemon, pokedex`} />
                <meta property="og:title" content={`Información sobre ${title}`} />
                <meta property="og:description" content={`Esta es la pagina sobre ${title}`} />
                <meta property="og:image" content={ogImage} />
            </Head>
            <NavBar />
            <main
                style={{
                    padding: "0px 20px"
                }}
            >
                {children}
            </main>
        </>
    )
};

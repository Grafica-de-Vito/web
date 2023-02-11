import { useRouter } from "next/router";
import { Navbar, Button, Link, Text } from "@nextui-org/react";
import Layout from "./Layout";
import { Logo } from "@/icons";

const NavbarUI = () => {
    const router = useRouter();

    const collapseItems = [
        { name: "Home", url: "/" },
        { name: "Registros", url: "/invoices" },
    ];

    // console.log(router.asPath)

    return (
        <Layout>
            <Navbar isBordered variant="sticky">
                <Navbar.Brand>
                    <Navbar.Toggle aria-label="toggle navigation" css={{ mr: 10 }} />
                    <Logo />
                </Navbar.Brand>
                <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
                    <Navbar.Link isActive={router.asPath === '/invoices'} onPress={() => router.push('/invoices')}>Registros</Navbar.Link>
                </Navbar.Content>
                <Navbar.Content>
                    <Navbar.Link color="inherit" href="#">
                        Login
                    </Navbar.Link>
                    <Navbar.Item>
                        <Button auto flat as={Link} href="#">
                            Sign Up
                        </Button>
                    </Navbar.Item>
                </Navbar.Content>
                <Navbar.Collapse>
                    {collapseItems.map((item, index) => (
                        <Navbar.CollapseItem key={index}>
                            <Link
                                color="inherit"
                                css={{
                                    minWidth: "100%",
                                }}
                                onPress={() => router.push(item.url)}
                            >
                                {item.name}
                            </Link>
                        </Navbar.CollapseItem>
                    ))}
                </Navbar.Collapse>
            </Navbar>
        </Layout>
    );
}

export default NavbarUI
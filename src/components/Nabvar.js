import { useRouter } from "next/router";
import { Navbar, Button, Link, Text } from "@nextui-org/react";
import Layout from "./Layout";
import { Logo } from "@/icons";

const NavbarUI = () => {
    const router = useRouter();

    const collapseItems = [
        "Home",
        "Invoices",
    ];

    return (
        <Layout>
            <Navbar isBordered variant="sticky">
                <Navbar.Brand>
                    <Navbar.Toggle aria-label="toggle navigation" />
                    <Logo />
                    <Text b color="inherit" hideIn="xs">
                        ACME
                    </Text>
                </Navbar.Brand>
                <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
                    <Navbar.Link isActive={router.asPath === 'invoices'} href="#invoices" onPress={() => router.push('/invoices')}>Invoices</Navbar.Link>
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
                        <Navbar.CollapseItem key={item}>
                            <Link
                                color="inherit"
                                css={{
                                    minWidth: "100%",
                                }}
                                href="#"
                            >
                                {item}
                            </Link>
                        </Navbar.CollapseItem>
                    ))}
                </Navbar.Collapse>
            </Navbar>
        </Layout>
    );
}

export default NavbarUI
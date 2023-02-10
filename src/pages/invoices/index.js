import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Col, Input, Row, Spacer, Table, Text } from "@nextui-org/react";
import { IconButton, StyledBadge } from "@/components";
import { Edit, Search, Eye } from "@/icons";

function Invoices() {
    const router = useRouter();

    const invoices = [
        { id: 1, date: '09/02/2023', balance: 'R$ 100,00', status: true },
        { id: 2, date: '05/02/2023', balance: 'R$ -200,00', status: false },
        { id: 3, date: '02/02/2023', balance: 'R$ 250,00', status: true },
        { id: 4, date: '25/01/2023', balance: 'R$ 10,52', status: true },
        { id: 5, date: '20/12/2022', balance: 'R$ 00,00', status: false }
    ];

    const [search, setSearch] = useState('');

    const filtered = invoices?.length > 0 ? invoices.filter(item => {
        let filter = false;

        if (item?.date?.toLowerCase()?.includes(search?.toLowerCase()) || item?.balance?.toLowerCase()?.includes(search?.toLowerCase())) {
            filter = true;
        }

        return filter;
    }) : [];

    const renderCell = (user, columnKey) => {
        const cellValue = user[columnKey];
        switch (columnKey) {
            case "date":
                return (
                    <Col>
                        <Row>
                            <Text b size={14} css={{ tt: "capitalize" }}>
                                {cellValue}
                            </Text>
                        </Row>
                    </Col>
                );

            case "balance":
                return (
                    <Col>
                        <Row>
                            <Text b size={13} css={{ color: "$accents7" }}>
                                {cellValue}
                            </Text>
                        </Row>
                    </Col>
                );

            case "status":
                return <StyledBadge type={user.status ? "active" : "inactive"}>{cellValue ? "aberto" : "fechado"}</StyledBadge>;

            case "actions":
                return (

                    <Row justify="center" align="center">
                        <Col css={{ d: "flex" }}>
                            {user.status ?
                                <IconButton onClick={() => console.log('edit', user?.id)}>
                                    <Edit size={20} fill="#979797" />
                                </IconButton>
                                : <IconButton onClick={() => router.push('/invoices/' + user?.id)}>
                                    <Eye size={20} fill="#979797" />
                                </IconButton>
                            }
                        </Col>
                    </Row>
                );

            default:
                return cellValue;
        }
    };

    return (
        <section id="invoices">
            <Row justify="flex-end">
                <Input
                    aria-label="Search Users"
                    clearable={false}
                    contentLeft={<Search fill="var(--nextui-colors-accents6)" size={16} />}
                    contentRight={<Button auto light />}
                    contentLeftStyling={false}
                    size={"md"}
                    css={{
                        w: "100%",
                        maxW: "300px",
                        "@xsMax": {
                            mw: "300px",
                        },
                        "& .nextui-input-content--left": {
                            h: "100%",
                            ml: "$4",
                            dflex: "center",
                        },
                    }}
                    initialValue=""
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar..."
                />
            </Row>

            <Spacer y={.2} />

            <Table
                aria-label="Table Users"
                css={{
                    height: "auto",
                    minWidth: "100%",
                }}
                selectionMode="none"
            >
                <Table.Header>
                    <Table.Column key="date">DATA</Table.Column>
                    <Table.Column key="balance">SALDO</Table.Column>
                    <Table.Column key="status">STATUS</Table.Column>
                    <Table.Column key="actions" hideHeader align>AÇÕES</Table.Column>
                </Table.Header>
                <Table.Body items={filtered}>
                    {(item) => (
                        <Table.Row>
                            {(columnKey) => (
                                <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                            )}
                        </Table.Row>
                    )}
                </Table.Body>
                <Table.Pagination
                    shadow
                    color="primary"
                    noMargin
                    align="center"
                    rowsPerPage={10}
                />
            </Table>
        </section>
    );
}

export default Invoices;
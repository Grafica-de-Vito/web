import { useRouter } from "next/router";
import { InvoiceForm } from "@/components";
import { Avatar, Col, Collapse, Grid, Link, Row, Text } from "@nextui-org/react";
import { ArrowBottom, ArrowTop } from "@/icons";
import { FormatMoney } from "@/utils";

function Invoice() {
    const router = useRouter();
    const { id } = router.query;

    const balance = 150000

    return (
        // <p>Invoice: {id}</p>
        // <InvoiceForm />
        <Grid.Container gap={2} justify="center">
            <Grid>
                <Row justify="flex-start" css={{ mb: 50 }}>
                    <Col>
                        <Text b size="$2xl">Saldo</Text>
                        <Text size="$xl" color={balance >= 0 ? "success" : "error"}>R$ {FormatMoney(balance)}</Text>
                    </Col>
                </Row>

                <Collapse.Group shadow>
                    <Collapse
                        title={<Text h4>Title</Text>}
                        subtitle="05/02/2023 - R$ 100,00"
                        contentLeft={<Avatar squared icon={<ArrowBottom size={20} fill="#17C964" />} />}
                    >
                        <Text b>Descrição</Text>
                        <Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                            enim ad minim veniam, quis nostrud exercitation ullamco laboris
                            nisi ut aliquip ex ea commodo consequat.
                        </Text>
                    </Collapse>
                    <Collapse
                        title={<Text h4>Title</Text>}
                        subtitle="10/02/2023 - R$ 120,00"
                        contentLeft={<Avatar squared icon={<ArrowTop size={20} fill="#F31260" />} />}
                    >
                        <Text b>Descrição</Text>
                        <Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                            enim ad minim veniam, quis nostrud exercitation ullamco laboris
                            nisi ut aliquip ex ea commodo consequat.
                        </Text>
                    </Collapse>
                    <Collapse
                        title={<Text h4>Title</Text>}
                        subtitle="01/02/2023 - R$ 80,00"
                        contentLeft={<Avatar squared icon={<ArrowBottom size={20} fill="#17C964" />} />}
                    >
                        <Text b>Descrição</Text>
                        <Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                            enim ad minim veniam, quis nostrud exercitation ullamco laboris
                            nisi ut aliquip ex ea commodo consequat.
                        </Text>
                    </Collapse>
                </Collapse.Group>
            </Grid>
        </Grid.Container>
    );
}

export default Invoice;
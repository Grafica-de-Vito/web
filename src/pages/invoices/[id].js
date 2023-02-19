import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { toast } from "react-toastify";

import { Avatar, Button, Col, Collapse, Grid, Input, Link, Row, Text } from "@nextui-org/react";
import { InvoiceForm, Notify, SendButton } from "@/components";
import { Add, ArrowBottom, ArrowTop, Edit, Send } from "@/icons";

import { FormatMoney } from "@/utils";

import { UpdateInvoice } from "@/services/Invoice";

function Invoice() {
    const router = useRouter();
    const { id } = router.query;

    const [invoice, setInvoice] = useState();
    const [config, setConfig] = useState({
        initial_value: false
    });

    const fetchAPI = async () => {
        await fetch('http://localhost:3000/invoices/' + id, {
            method: 'GET',
        }).then(response => response.json()).then(data => setInvoice(data));
    }

    useEffect(() => { fetchAPI(); }, []);

    const submitInitialValue = async () => {
        const res = await UpdateInvoice(id, FormatMoney(invoice?.initial_value, 'remove'));
        console.log(res);

        if (res.status === 200) {
            await fetchAPI();
            setConfig({ ...config, initial_value: false });
            toast.success(res?.message || "Sucesso!");
        } else {
            // Initial value is invalid
            toast.error(res?.message || "Erro!");
        }
    }

    console.log(invoice)

    return (
        // <p>Invoice: {id}</p>
        // <InvoiceForm />
        <>
            <Notify />

            <Grid.Container gap={2} justify="center">
                <Grid>
                    <Row justify="flex-start" css={{ mb: 50 }}>
                        <Col>
                            <Text b size="$2xl">Valor Inicial</Text>
                            <br />
                            <Input
                                contentRightStyling={false}
                                readOnly={!config?.initial_value}
                                contentLeft={"R$"}
                                aria-label="Initial Value"
                                value={FormatMoney(invoice?.initial_value)}
                                onChange={(e) => setInvoice({ ...invoice, initial_value: FormatMoney(e.target.value) })}
                                contentRight={config?.initial_value ?
                                    <SendButton onClick={submitInitialValue}>
                                        <Send fill="#fff" />
                                    </SendButton>
                                    : <SendButton onClick={() => setConfig({ ...config, initial_value: true })}>
                                        <Edit fill="#fff" />
                                    </SendButton>
                                }
                            />
                        </Col>
                    </Row>
                    <Row justify="flex-start" css={{ mb: 50 }}>
                        <Col>
                            <Text b size="$2xl">Saldo</Text>
                            <Text size="$xl" color={FormatMoney(invoice?.balance, 'remove') >= 0 ? "success" : "error"}>{invoice?.balance}</Text>
                        </Col>
                    </Row>
                    <Row css={{ mb: 50 }}>
                        <Col>
                            <Button css={{ width: 'inherit' }} color="primary" bordered icon={<Add fill="#0072F5" size={32} />} />
                        </Col>
                    </Row>

                    <Collapse.Group shadow>
                        {invoice?.data?.map(item => (
                            <Collapse
                                title={<Text h4>{item?.title}</Text>}
                                subtitle={`${item?.date} - ${item?.amount}`}
                                contentLeft={<Avatar squared icon={<ArrowBottom size={20} fill={item?.type === "INCOMING" ? "#17C964" : "#F31260"} />} />}
                            >
                                <Text b>Descrição</Text>
                                <Text>{item?.description || 'Nenhuma descrição disponivel.'}</Text>
                            </Collapse>
                        ))}
                    </Collapse.Group>
                </Grid>
            </Grid.Container>
        </>
    );
}

export default Invoice;
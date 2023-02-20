import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { toast } from "react-toastify";

import { Avatar, Button, Col, Collapse, Container, Grid, Input, Link, Row, Spacer, Text } from "@nextui-org/react";
import { Box, InvoiceForm, Modal, Notify, SendButton } from "@/components";
import { Add, ArrowBottom, ArrowTop, Delete, Edit, Send } from "@/icons";

import { FormatMoney } from "@/utils";

import { DeleteInvoiceData, UpdateInvoice } from "@/services/Invoice";

function Invoice() {
    const router = useRouter();
    const { id } = router.query;

    const [invoice, setInvoice] = useState();
    const [invoiceData, setInvoiceData] = useState();
    const [modal, setModal] = useState(false);
    const [config, setConfig] = useState({
        initial_value: false,
        add: false,
        edit: false,
        modal_type: '',
    });

    const fetchAPI = async () => {
        await fetch(process.env.NEXT_PUBLIC_API_URL + id, {
            method: 'GET',
        }).then(response => response.json()).then(data => setInvoice(data));
    }

    useEffect(() => { fetchAPI(); }, []);

    const deleteInvoiceData = async () => {
        const res = await DeleteInvoiceData(id, invoiceData?.id);
        console.log(res);

        if (res.status === 200) {
            await fetchAPI();
            toast.success(res?.message || "Sucesso!");
        } else {
            toast.error(res?.message || "Erro!");
        }

        setModal(false);
    }

    const submitInitialValue = async () => {
        const res = await UpdateInvoice(id, FormatMoney(invoice?.initial_value, 'remove'));
        console.log(res, res.status);

        if (res.status === 201) {
            await fetchAPI();
            setConfig({ ...config, initial_value: false });
            toast.success(res?.message || "Sucesso!");
        } else {
            // Initial value is invalid
            toast.error(res?.message || "Erro!");
        }
    }

    const openForm = (id) => (_) => {
        const [data] = invoice.data.filter(item => item?.id === id);
        setInvoiceData(data);

        setConfig({ ...config, edit: true });
    }

    const openModal = (id, type) => (_) => {
        const [data] = invoice.data.filter(item => item?.id === id);
        setInvoiceData(data);

        setConfig({ ...config, modal_type: type });

        setModal(true);
    }

    const RenderModalBody = () => {
        return (
            <>
                {
                    config?.modal_type === "invoice-data:delete" ?
                        <Box>
                            <Text>Deseja deletar o registro? Está ação irá deletar permanentemente o registro <Text b span>{invoiceData?.title}</Text>.</Text>
                        </Box>
                        : null
                }
            </>
        );
    }

    const RenderModalFooter = () => {
        const onClose = () => setModal(false);

        return (
            <>
                {
                    config?.modal_type === "invoice-data:delete" ?
                        <Container display="flex" justify="center">
                            <Button auto light onPress={onClose}>
                                Cancelar
                            </Button>

                            <Spacer x={1} />

                            <Button auto color="error" onPress={deleteInvoiceData}>
                                Confirmar
                            </Button>
                        </Container>
                        : null
                }
            </>
        );
    }


    return (
        <>
            <Notify />

            <Modal
                visible={modal}
                setVisible={setModal}
                blur={config?.modal_type === "invoice-data:delete"}
                preventClose={config?.modal_type === "invoice-data:delete"}
                width={'600px'}
                header={""}
                body={<RenderModalBody />}
                footer={<RenderModalFooter />}
            />

            {config?.add || config?.edit ? <InvoiceForm id={id} data={invoiceData} cancel={async () => { await fetchAPI(); setInvoiceData(null), setConfig({ ...config, add: false, edit: false }); }} /> :
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
                                <Button css={{ width: 'inherit' }} color="primary" bordered icon={<Add fill="#0072F5" size={32} />} onPress={() => setConfig({ ...config, add: true })} />
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
                                    <Spacer y={2} />
                                    <Container display="flex" direction="row" wrap="wrap" justify="center" alignItems="center">
                                        <Button icon={<Edit size={20} fill="currentColor" />} color="warning" flat auto onPress={openForm(item?.id)}>
                                            Editar Registro
                                        </Button>
                                        <Spacer x={5} />
                                        <Button icon={<Delete size={20} fill="currentColor" />} color="error" flat auto onPress={openModal(item?.id, "invoice-data:delete")}>
                                            Deletar Registro
                                        </Button>
                                    </Container>
                                </Collapse>
                            ))}
                        </Collapse.Group>
                    </Grid>
                </Grid.Container>
            }
        </>
    );
}

export default Invoice;
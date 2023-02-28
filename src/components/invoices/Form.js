import { toast } from "react-toastify";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { Button, Col, Container, Input, Row, Text, Textarea } from "@nextui-org/react";
import { DateNow, FormatMoney } from "@/utils";
import { CreateInvoiceData, UpdateInvoiceData } from "@/services/Invoice";
import { FormatUS } from "@/utils/date";

const schema = yup.object({
    date: yup.date().max(new Date(), "Data não pode ser maior que hoje").required("Data é obrigatório"),
    title: yup.string().required("Titulo é obrigatório"),
    // type: yup.mixed().oneOf(['INCOMING', 'OUTGOING']).required("Tipo é obrigatório"),
    type: yup.mixed().oneOf(['ENTRADA', 'SAIDA']).required(),
    amount: yup.string().required("Valor é obrigatório"),
}).required();

function InvoiceForm({ id, data, cancel }) {
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });

    const onReset = () => reset();

    const onCancel = () => {
        onReset();
        cancel();
    }

    const onSubmit = async formData => {
        const body = {
            ...formData,
            id: data?.id,
            amount: FormatMoney(formData?.amount, 'remove'),
            type: formData.type === 'ENTRADA' ? 'INCOMING' : 'OUTGOING'
        }

        let res;
        if(!data) {
            res = await CreateInvoiceData(id, body);
        } else {
            res = await UpdateInvoiceData(id, body);
        }

        if (res.status === 200 || res.status === 201) {
            toast.success(res?.message || (!data ? "Criado com sucesso!" : "Alterad com sucesso!"));
            onCancel();
        } else {
            toast.error(res?.message || "Erro!");
        }
    }

    return (
        <Container fluid wrap="wrap" xs justify="center">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Col>
                    <Row css={{ marginBottom: 30 }}>
                        <Controller
                            name="date"
                            control={control}
                            defaultValue={data?.date ? FormatUS(data?.date) : DateNow()}
                            render={({ field }) =>
                                <Input
                                    {...field}
                                    bordered
                                    required
                                    label="Data"
                                    type="date"
                                    color={errors?.date ? "error" : "primary"}
                                    helperColor={errors?.date ? "error" : "primary"}
                                    helperText={errors?.date ? errors.date?.message : ''}
                                />
                            }
                        />
                    </Row>

                    <Row css={{ marginBottom: 40 }}>
                        <Controller
                            name="title"
                            control={control}
                            defaultValue={data?.title || ""}
                            render={({ field }) =>
                                <Input
                                    {...field}
                                    bordered
                                    clearable
                                    fullWidth
                                    required
                                    label="Titulo"
                                    type="text"
                                    color={errors?.title ? "error" : "primary"}
                                    helperColor={errors?.title ? "error" : "primary"}
                                    helperText={errors?.title ? errors.title?.message : <Text span size="$xs">Insira o titulo</Text>}
                                />
                            }
                        />
                    </Row>

                    <Row css={{ marginBottom: 40 }}>
                        <Controller
                            name="type"
                            control={control}
                            defaultValue={data?.type ? (data?.type === 'INCOMING' ? 'ENTRADA' : 'SAIDA') : "ENTRADA"}
                            render={({ field: { value, onChange, ...rest } }) =>
                                <Input
                                    {...rest}
                                    bordered
                                    clearable
                                    required
                                    label="Tipo"
                                    type="text"
                                    width="20ch"
                                    value={value}
                                    onChange={(e) => onChange(e.target.value.toUpperCase())}
                                    color={errors?.type ? "error" : "primary"}
                                    helperColor={errors?.type ? "error" : "primary"}
                                    helperText={errors?.type ? "Escolha entre ('ENTRADA' - 'SAIDA')" : <Text span size="$xs">Escolha o tipo de transação</Text>}
                                />
                            }
                        />
                    </Row>

                    <Row css={{ marginBottom: 40 }}>
                        <Controller
                            name="amount"
                            control={control}
                            defaultValue={data?.amount || ""}
                            render={({ field: { value, onChange, ...rest } }) =>
                                <Input
                                    {...rest}
                                    bordered
                                    required
                                    labelLeft="R$"
                                    label="Valor"
                                    type="text"
                                    width="20ch"
                                    value={value}
                                    onChange={(e) => onChange(FormatMoney(e.target.value))}
                                    color={errors?.amount ? "error" : "primary"}
                                    helperColor={errors?.amount ? "error" : "primary"}
                                    helperText={errors?.amount ? errors.amount?.message : <Text span size="$xs">Insira o valor</Text>}
                                />
                            }
                        />
                    </Row>

                    <Row css={{ marginBottom: 40 }}>
                        <Controller
                            name="description"
                            control={control}
                            defaultValue={data?.description || ""}
                            render={({ field }) =>
                                <Textarea
                                    {...field}
                                    bordered
                                    fullWidth
                                    color="primary"
                                    label="Descrição"
                                    rows={5}
                                />
                            }
                        />
                    </Row>

                    <Row>
                        <Button type="button" color="error" auto size="md" css={{ m: 5 }} onPress={onCancel}>
                            Cancelar
                        </Button>
                        <Button type="submit" color="success" auto size="md" css={{ m: 5 }}>
                            Enviar
                        </Button>
                    </Row>
                </Col>

            </form>
        </Container>
    );
}

export default InvoiceForm;
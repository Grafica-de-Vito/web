import { useRouter } from "next/router";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { Button, Col, Container, Input, Row, Text, Textarea } from "@nextui-org/react";
import { DateNow, FormatMoney } from "@/utils";

const schema = yup.object({
    date: yup.date().max(new Date(), "Data não pode ser maior que hoje").required("Data é obrigatório"),
    title: yup.string().required("Titulo é obrigatório"),
    // type: yup.mixed().oneOf(['INCOMING', 'OUTGOING']).required("Tipo é obrigatório"),
    type: yup.mixed().oneOf(['ENTRADA', 'SAIDA']).required(),
    amount: yup.string().required("Valor é obrigatório"),
}).required();

function Invoice() {
    const router = useRouter();
    const { id } = router.query;

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });

    const onReset = () => reset();

    const onSubmit = data => console.log(data);

    return (
        // <p>Invoice: {id}</p>
        <Container fluid wrap="wrap" xs justify="center">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Col>
                    <Row css={{ marginBottom: 30 }}>
                        <Controller
                            name="date"
                            control={control}
                            defaultValue={DateNow()}
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
                            defaultValue={""}
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
                            defaultValue={"ENTRADA"}
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
                            defaultValue={""}
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
                            defaultValue={""}
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
                        <Button type="button" color="error" auto css={{ m: 5 }} onPress={() => console.log('Reset all fields and hidden form', onReset())}>
                            Cancelar
                        </Button>
                        <Button type="submit" color="primary" auto css={{ m: 5 }}>
                            Enviar
                        </Button>
                    </Row>
                </Col>

            </form>
        </Container>
    );
}

export default Invoice;
async function UpdateInvoice(id, initialValue) {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + id, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            initial_value: initialValue
        }),
    }).then(response => response).catch(err => err);
}

async function CreateInvoiceData(id, { date, title, description, type, amount }) {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + id + '/data', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            date,
            title,
            description,
            type,
            amount
        }),
    }).then(response => response).catch(err => err);
}

async function UpdateInvoiceData(invoiceId, { id: dataId, date, title, description, type, amount }) {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + invoiceId + '/data/' + dataId, {
        method: 'PATCH',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            date,
            title,
            description,
            type,
            amount
        }),
    }).then(response => response).catch(err => err);
}

async function DeleteInvoiceData(invoiceId, dataId) {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + invoiceId + '/data/' + dataId, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
    }).then(response => response).catch(err => err);
}

export { UpdateInvoice, CreateInvoiceData, UpdateInvoiceData, DeleteInvoiceData }
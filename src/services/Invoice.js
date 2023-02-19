async function UpdateInvoice(id, initialValue) {
    return await fetch('http://localhost:3000/invoices/' + id, {
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

export { UpdateInvoice }
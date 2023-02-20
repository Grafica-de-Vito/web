function Now() {
    const date = new Date();

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate();

    return `${year}-${month}-${day}`;
}

// convert date US to BR
function FormatUS(date) {
    const [day, month, year] = date.split("/");

    return `${year}-${month}-${day}`;
}

export { Now, FormatUS }
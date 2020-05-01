export const getTransaction = async (token) => {
    let data = {
        "serviceName":"slyde_pay_ghs",
        "params":[`${token}`],
        "transactionId":`${token}`,
        "serviceName":"slyde_pay_ghs",
        "command":"getTransactionById"
    }
    const response = await fetch('https://kbe.ferrumnetwork.io/api/localtxhook/newRemoteFiatTransaction', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'X-Secret': 'TEST_SECRET'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    console.log(response.status,'00----')
    return response.status;
}
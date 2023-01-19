function validateAddress(event) {
    event.preventDefault()

    let address = '<Address>'
    const formData = new FormData(event.target);
    // Display the key/value pairs
    for (const pair of formData.entries()) {
        switch (pair[0]) {
            case 'address_line_1':
                address += `<Address1>${pair[1]}</Address1>`
                break;
            case 'address_line_2':
                address += `<Address2>${pair[1]}</Address2>`
                break;
            case 'city':
                address += `<City/>`
                break;
            case 'state':
                address += `<State>${pair[1]}</State>`
                break;
            case 'zip_code':
                address += `<Zip5>${pair[1]}</Zip5>`
                break;
        }
    }
    address += '<Zip4/></Address>'

    fetch(`https://secure.shippingapis.com/ShippingAPI.dll?API=Verify&XML=<AddressValidateRequest USERID="998MRDWA4141"><Revision>1</Revision>${address}</AddressValidateRequest>`)
        .then(response => response.text())
        .then(data => {
            const response = parseXmlToJson(data);
            if (response.AddressValidateResponse.Address.Error) {
                const error = response.AddressValidateResponse.Address.Error.Description

                hideAddressSavingForm()
                showError(error)
            }

            new bootstrap.Modal('#modal').show()
        })
        .catch(error => console.log('something went wrong!'))
}

function parseXmlToJson(xml) {
    const json = {};
    for (const res of xml.matchAll(/(?:<(\w*)(?:\s[^>]*)*>)((?:(?!<\1).)*)(?:<\/\1>)|<(\w*)(?:\s*)*\/>/gm)) {
        const key = res[1] || res[3];
        const value = res[2] && parseXmlToJson(res[2]);
        json[key] = ((value && Object.keys(value).length) ? value : res[2]) || null;

    }
    return json;
}

function hideAddressSavingForm() {
    document.getElementById('save-address').classList.add('d-none')
}

function showError(errorMessage) {
    const element = document.getElementById('error-alert')

    element.innerText = errorMessage
    element.classList.remove('d-none')
}


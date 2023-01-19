let selectedAddressType = 'original'
let addressesText = {original: null, standardized: null}
let addresses = {
    original: {
        address1: null,
        address2: null,
        city: null,
        state: null,
        zipCode: null
    }, 
    standardized: {
        address1: null,
        address2: null,
        city: null,
        state: null,
        zipCode: null
    }
}

function validateAddress(event) {
    event.preventDefault()
    
    const formData = new FormData(event.target)
    for (const pair of formData.entries()) {
        switch (pair[0]) {
            case 'address_line_1':
                addresses.original.address1 = pair[1]
                break;
            case 'address_line_2':
                addresses.original.address2 = pair[1]
                break;
            case 'city':
                addresses.original.city = pair[1]
                break;
            case 'state':
                addresses.original.state = pair[1]
                break;
            case 'zip_code':
                addresses.original.zipCode = pair[1]
                break;
        }
    }

    fetch(`https://secure.shippingapis.com/ShippingAPI.dll?API=Verify&XML=<AddressValidateRequest USERID="998MRDWA4141"><Revision>1</Revision><Address><Address1>${addresses.original.address1}</Address1><Address2>${addresses.original.address2}</Address2><City>${addresses.original.city}</City><State>${addresses.original.state}</State><Zip5>${addresses.original.zipCode}</Zip5><Zip4/></Address></AddressValidateRequest>`)
        .then(response => response.text())
        .then(data => {
            const response = parseXmlToJson(data);
            const address = response.AddressValidateResponse

            if (address?.Address?.Error) {
                const error = address.Address.Error.Description
                showError(error)
            } else {
                addresses.standardized.address1 = address.Address1
                addresses.standardized.address2 = address.Address2
                addresses.standardized.city = address.City
                addresses.standardized.state = address.State
                addresses.standardized.zipCode = address.Zip5

                addressesText.original = `
                    <div>Address Line 1: ${addresses.original.address1}</div>
                    <div>Address Line 2: ${addresses.original.address2}</div>
                    <div>City: ${addresses.original.city}</div>
                    <div>State: ${addresses.original.state}</div>
                    <div>Zip Code: ${addresses.original.zipCode}</div>
                `;

                addressesText.standardized = `
                    <div>Address Line 1: ${addresses.standardized.address1}</div>
                    <div>Address Line 2: ${addresses.standardized.address2}</div>
                    <div>City: ${addresses.standardized.city}</div>
                    <div>State: ${addresses.standardized.state}</div>
                    <div>Zip Code: ${addresses.standardized.zipCode}</div>
                `;
                showAddressSavingForm(addressesText.original, addressesText.standardized)
            }

            new bootstrap.Modal('#modal').show()
        })
        .catch(error => {
            showError('something went wrong!')
            console.log(error);
            new bootstrap.Modal('#modal').show()
        })
}

function save() {
    let formData = new FormData();
    for(const key in addresses[selectedAddressType]) {
        formData.append(key, addresses[selectedAddressType][key]);
    }

    fetch('post.php', {
        method: 'POST',
        body: formData,
    }).then(response => response.text())
    .then(response => showSuccessAlert(response))
    .catch(error => {
        console.log(error);
        showError('something went wrong!')
    })
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

function showAddressSavingForm(originalAddress, standardizedAddress) {
    document.getElementById('original').innerHTML = originalAddress
    document.getElementById('standardized').innerHTML = standardizedAddress

    document.getElementById('save-address').classList.remove('d-none')
}

function showError(errorMessage) {
    const element = document.getElementById('error-alert')

    hideAddressSavingForm()
    element.innerText = errorMessage
    element.classList.remove('d-none')
}

function showSuccessAlert(message) {
    const element = document.getElementById('success-alert')
    element.innerText = message
    element.classList.remove('d-none')
}

function hideAlerts() {
    document.getElementById('error-alert').classList.add('d-none')
    document.getElementById('success-alert').classList.add('d-none')
}

// on modal close -> reset it
document.getElementById('modal').addEventListener('hidden.bs.modal', function () {
    hideAddressSavingForm()
    hideAlerts();
});

// set selected address type
document.querySelectorAll('button[data-bs-toggle="pill"]').forEach(element => {
    element.addEventListener('shown.bs.tab', event => {
        selectedAddressType = event.target.dataset.type;
    })
});
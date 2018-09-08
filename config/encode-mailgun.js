import req from '../config/uri_req'
import api from '../config/api_key'

let url = req[1].url_mailgun
let auth = api[0].api_mailgun

class MailGunEncode {
    onSendEncode(data) {
        let headers = {
            'Authorization': auth,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
        let formBody = [];
        for (let property in data) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch(url, {
            method: 'POST',
            headers: headers,
            body: formBody,

        }).then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
            })
    }
}


const mailgunEncode = new MailGunEncode();

module.exports = {
    onSendEncode : mailgunEncode.onSendEncode
}
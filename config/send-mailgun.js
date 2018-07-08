

class MailGunSend {
    onSendMail(data) {
        let headers = {
            'Authorization': 'Basic YXBpOmtleS03NDU3ZmE5NTI5NzcxZGVhN2U5OTdjYzk3MWIwN2M4NQ==',
            'Content-Type': 'application/x-www-form-urlencoded',
        }
        let formBody = [];
        for (let property in data) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch("https://api.mailgun.net/v3/mg.guurun.com/messages", {
            method: 'POST',
            headers: headers,
            body: formBody,

        }).then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
            })
    }
}


const mailgunsend = new MailGunSend();

module.exports = {
    onSendMail: mailgunsend.onSendMail,

}
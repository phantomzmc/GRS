const base64 = require("base-64");
// const pkgConfig = require("./package.json");
const vaultEndpoint = "https://vault.omise.co/tokens";
const apiEndpoint = "https://api.omise.co/charges";
const apiCustomer = "https://api.omise.co/customers";
const apiTranfer = "https://api.omise.co/transfers"

let _publicKey;
let _secretKey;
let _apiVersion;

/**
 * ReactNativeOmise
 */
class ReactNativeOmise {

    /**
     * constructor
     */
    constructor() {
        this.createSource = this.createSource.bind(this);
        this.createToken = this.createToken.bind(this);
        this.createCustomer = this.createCustomer.bind(this);
        this.createChargeTranfer = this.createChargeTranfer.bind(this)
    }

    /**
     * To set a public key and API version
     * @param {String} publicKey
     * @param {String} secretKey
     * @param {String} apiVersion
     */
    config(publicKey, secretKey, apiVersion = "2015-11-17") {
        _publicKey = publicKey;
        _secretKey = secretKey
        _apiVersion = apiVersion;
    }

    /**
     * Get headers
     * @return {*} headers
     */
    getHeaders() {
        let headers = {
            'Authorization': 'Basic ' + base64.encode(_publicKey + ":"),
            'Content-Type': 'application/json',
        };
        if (_apiVersion && _apiVersion !== "") {
            headers['Omise-Version'] = _apiVersion;
        }

        return headers;
    }
    getHeadersCharge() {
        let headersCharge = {
            'Authorization': 'Basic ' + base64.encode(_secretKey),
            'Content-Type': 'application/json',
        };

        if (_apiVersion && _apiVersion !== "") {
            headers['Omise-Version'] = _apiVersion;
        }

        return headersCharge;
    }

    /**
     * Create a token
     * @param {*} data
     */
    createToken(data) {
        const tokenEndpoint = vaultEndpoint;
        // set headers
        let headers = this.getHeaders();

        return new Promise((resolve, reject) => {
            // verify a public key
            if (!_publicKey || _publicKey === "") {
                reject("Please config your public key");
                return;
            }

            return fetch(tokenEndpoint, {
                method: 'POST',
                cache: 'no-cache',
                headers: headers,
                body: JSON.stringify(data)
            }).then((response) => {
                if (response.ok && response.status === 200) {
                    resolve(response.json());
                } else {
                    console.log("response not ok", response);
                    reject(response.json());
                }
            }).catch((error) => resolve(error));
        });
    }

    /**
     * Create a source
     * @param {*} data
     */
    createSource(data) {
        // set headers

        return new Promise((resolve, reject) => {
            // verify a public key
            if (!_publicKey || _publicKey === "") {
                reject("Please config your public key");
                return;
            }

            return fetch(apiEndpoint, {
                method: 'POST',
                cache: 'no-cache',
                headers: {
                    'Authorization': 'Basic ' + base64.encode(_secretKey),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then((response) => {
                if (response.ok && response.status === 200) {
                    resolve(response.json());
                } else {
                    console.log("response not ok", response);
                    reject(response.json());
                }
            }).catch((error) => resolve(error));
        });
    }

    /**
     * Create a source
     * @param {*} data
     */
    createCustomer(data) {
        // set headers
        return new Promise((resolve, reject) => {
            // verify a public key
            if (!_publicKey || _publicKey === "") {
                reject("Please config your public key");
                return;
            }

            return fetch(apiCustomer, {
                method: 'POST',
                cache: 'no-cache',
                headers: {
                    'Authorization': 'Basic ' + base64.encode(_secretKey),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then((response) => {
                if (response.ok && response.status === 200) {
                    resolve(response.json());
                } else {
                    console.log("response not ok", response);
                    reject(response.json());
                }
            }).catch((error) => resolve(error));
        });
    }
    createChargeTranfer(data) {
        // set headers

        return new Promise((resolve, reject) => {
            // verify a public key
            if (!_publicKey || _publicKey === "") {
                reject("Please config your public key");
                return;
            }

            return fetch(apiTranfer, {
                method: 'POST',
                cache: 'no-cache',
                headers: {
                    'Authorization': 'Basic ' + base64.encode(_secretKey),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then((response) => {
                if (response.ok && response.status === 200) {
                    resolve(response.json());
                } else {
                    console.log("response not ok", response);
                    reject(response.json());
                }
            }).catch((error) => resolve(error));
        });
    }
}


const reactNativeOmise = new ReactNativeOmise();

module.exports = {
    config: reactNativeOmise.config,
    createToken: reactNativeOmise.createToken,
    createSource: reactNativeOmise.createSource,
    createCustomer : reactNativeOmise.createCustomer,
    createChargeTranfer : reactNativeOmise.createChargeTranfer
}

# Bluemix Status

## Requirements

* Node.js ~> `4.4.x`

## Configuration
Required environment variables:
* `CLDSTS_BXD_USER` - The Username of a Bluemix Administrator
* `CLDSTS_BXD_PASS` - The Password of a Bluemix Administrator
* `CLDSTS_BXD_URL` - The API endpoint of a Bluemix deployment

## Running

### Local Development

#### Nodemon
The recommended way of starting the application is with `nodemon` as follows:
```
npm install && \
CLDSTS_BXD_USER=bluxmix_admin@ibm.com \
CLDSTS_BXD_PASS=********** \
CLDSTS_BXD_URL=https://api.w3ibm.bluemix.net \
DEBUG=BluemixStatus:* \
nodemon
```

If you do not have nodemon installed, it can be installed by `npm install -g nodemon`

#### Node
If you do not want to use `nodemon`, the application can be started by one of two ways:

```
npm install && \
CLDSTS_BXD_USER=bluxmix_admin@ibm.com \
CLDSTS_BXD_PASS=********** \
CLDSTS_BXD_URL=https://api.w3ibm.bluemix.net \
npm start
```

```
npm install && \
CLDSTS_BXD_USER=bluxmix_admin@ibm.com \
CLDSTS_BXD_PASS=********** \
CLDSTS_BXD_URL=https://api.w3ibm.bluemix.net \
node ./bin/www
```
### Bluemix

The following command will create the application "BluemixStatus", based on the local manifest.yml.  The application can be renamed as needed.

`cf push BluemixStatus`

#### Environment Variables
User-defined environment variables should be set by:

```shell
cf set-env BluemixStatus CLDSTS_BXD_USER bluxmix_admin@example.com
cf set-env BluemixStatus CLDSTS_BXD_PASS BLUEMIX_ADMIN_PASSWORD
cf set-env BluemixStatus CLDSTS_BXD_URL https://api.ng.bluemix.net
```

Additionally, environment variables can also be set in the `manifest.yml`; however the user-defined variables should not be checked into the repository for security reasons.

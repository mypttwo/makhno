
# makhno - A Simple Auction App based on Ethereum

This is the server implementation of an app that allows users to participate in a fixed bid auction via any browser with the [Metamask](https://metamask.io/) plug in.

Disclaimers :  
While this allows users to participate in the auction,  this does not restrict anonymous users from directly interacting with the smart contract on Ethereum. 

## Setting up the environment
The code includes a **.env** file. You will need to set the appropriate variables to run the app.
 - Specify the url for your mongodb instance. (Either you can [download](https://www.mongodb.com/download-center#community) and run mongo locally or you can use a service ([mlab](https://mlab.com/), [Atlas](https://www.mongodb.com/download-center#atlas)) <br/>``DB=mongodb://localhost:27017/gya``
 - Specify the port on which your server will run <br/>``PORT=3000``

## Running the app
You run the server like so <br/>> ``npm start``

## Acknowledgements
> Written with [StackEdit](https://stackedit.io/).

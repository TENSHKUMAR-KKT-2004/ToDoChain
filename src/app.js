App = {
    load:async ()=>{
        console.log('App connected...')
        await App.loadWeb3()
        await App.loadAccount()
        await App.loadContract()
    },
    loadWeb3:async ()=>{
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider
            web3 = new Web3(web3.currentProvider)
          } else {
            window.alert("Please connect to Metamask.")
          }
          // Modern dapp browsers...
          if (window.ethereum) {
            window.web3 = new Web3(ethereum)
            try {
              // Request account access if needed
              await ethereum.enable()
              // Acccounts now exposed
              web3.eth.sendTransaction({/* ... */})
            } catch (error) {
              // User denied account access...
            }
          }
          // Legacy dapp browsers...
          else if (window.web3) {
            App.web3Provider = web3.currentProvider
            window.web3 = new Web3(web3.currentProvider)
            // Acccounts always exposed
            web3.eth.sendTransaction({/* ... */})
          }
          // Non-dapp browsers...
          else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
          }
    },
    loadAccount:async()=>{
        web3.eth.getAccounts()
        .then(accounts => {
            App.account = accounts[0]
            console.log(App.account)
          })
          .catch(error => {
            console.error(error)
          })
    },
    loadContract:async()=>{
        const todolist = await $.getJSON('../build/contracts/ToDoList.json')
        console.log(todolist)
    }
}

document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('load', function() {
        App.load()
    })
})

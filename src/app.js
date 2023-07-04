App = {

  loading: false,
  contracts: {},

  load: async () => {
    console.log('App connected...')
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
    await App.render()
    
  },

  loadWeb3: async () => {
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
        web3.eth.sendTransaction({/* ... */ })
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */ })
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async () => {
    // get current account
    web3.eth.getAccounts()
      .then(accounts => {
        App.account = accounts[0]
        console.log(App.account)
      })
      .catch(error => {
        console.error(error)
      })
  },

  loadContract: async () => {
    // create js version of the smart contract
    const todolist = await $.getJSON('../build/contracts/ToDoList.json')
    console.log(todolist)
    App.contracts.ToDoList = TruffleContract(todolist)
    App.contracts.ToDoList.setProvider(App.web3Provider)

    // store the deployes version of the smart contract
    App.todoList = await App.contracts.ToDoList.deployed()
  },

  render:async ()=>{
    // prevent double rendering
    if(App.loading){
      return
    }

    // update loading state
    App.setLoading(true)

    // render the tasks
    await App.renderTasks()
    
    // show account on navbar
    document.querySelector('#account').textContent = App.account
    
    // update loading state
    App.setLoading(false)
  },

  renderTasks:async ()=>{
    // load the total taskCount from the chain
    const taskCount = await App.todoList.taskCount()
    const taskTemplate = $('.taskTemplate')

    // render out the each task with a new task template 
    for (var i = 1;i<=taskCount;i++){
      // fetch the task data from the chain
      const task = await App.todoList.tasks(i)
      const  taskId = task[0].toNumber()
      const taskContent = task[1]
      const taskCompleted = task[2]
      
      // create html for task
        const newTaskTemplate = taskTemplate.clone()
        newTaskTemplate.find('.content').html(taskContent)
        newTaskTemplate.find('input')
                          .prop('name',taskId)
                          .prop('checked',taskCompleted)
                          // .on('click',App.toggleCompleted)

        // append the new document obj into html page
        if(taskCompleted){
          $('#completedTaskList').append(newTaskTemplate)
        }else{
          $('#taskList').append(newTaskTemplate)
        }

        // show the task
        newTaskTemplate.show()
    }
  },

  createTask:async ()=>{
    App.setLoading(true)
    const content = $('#newTask').val()
    await App.todoList.createTask(content,{ from: App.account })
    window.location.reload()
  },

  setLoading:(boolean)=>{
    App.loading = boolean
    const loader = $('#loader')
    const content = $('#content')
    if(boolean){
      loader.show()
      content.hide()
    }else{
      loader.hide()
      content.show()
    }
  }

}

document.addEventListener('DOMContentLoaded', function () {
  window.addEventListener('load', function () {
    App.load()
  })
})

const { assert } = require("chai")

const ToDoList = artifacts.require('./ToDoList.sol')

contract(ToDoList,(accounts)=>{
    before(async()=>{
        // before deployment save the deployed copy
        this.todoList = await ToDoList.deployed()
    })


    // testing the data
    it('deploys successfully',async ()=>{
        const address = await this.todoList.address

        // check the address is valid
        assert.notEqual(address,0x0)
        assert.notEqual(address,'')
        assert.notEqual(address,null)
        assert.notEqual(address,undefined)

    })

    it('lists tasks',async()=>{
        const taskCount = await this.todoList.taskCount()
        const task = await this.todoList.tasks(taskCount)

        // testing the each and every datas
        assert.equal(task.id.toNumber(),taskCount.toNumber())
        assert.equal(task.content, 'Welcome to ToDoChain App !')
        assert.equal(task.completed,false)
        assert.equal(taskCount.toNumber(),1)
    })

    it('creates tasks',async()=>{
        const result = await this.todoList.createTask('New task')
        const taskCount = await this.todoList.taskCount()
        assert.equal(taskCount.toNumber(),2)

        // show the transaction result of the new insertion in smart contract
        console.log(result)
        // get the emitted events values from log record of this transaction 
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(),2)
        assert.equal(event.content,'New task')
        assert.equal(event.completed,false)
    })
})
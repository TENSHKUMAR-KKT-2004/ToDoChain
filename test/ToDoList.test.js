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
})
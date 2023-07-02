const { assert } = require("chai")

const ToDoList = artifacts.require('./ToDoList.sol')

contract(ToDoList,(accounts)=>{
    before(async()=>{
        // before deployment save the deployed copy
        this.todoList = await ToDoList.deployed()
    })

    it('deploys successfully',async ()=>{
        const address = await this.todoList.address

        // check the address is valid
        assert.notEqual(address,0x0)
        assert.notEqual(address,'')
        assert.notEqual(address,null)
        assert.notEqual(address,undefined)

    })
})
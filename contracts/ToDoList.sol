//SDPX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ToDoList{
    uint public taskCount = 0;

    // new structure fo my individual tasks
    struct Task{
        uint id;
        string content;
        bool completed;
    }

    mapping(uint => Task) public tasks;

    constructor() public{
        createTask("Welcome to ToDoChain App !");
    }

    function createTask(string memory _content) public{
        taskCount++;
        tasks[taskCount] = Task(taskCount,_content,false);
    }
}
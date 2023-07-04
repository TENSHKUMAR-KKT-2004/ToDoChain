//SPDX-License-Identifier:MIT
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

    event TaskCompleted(
        uint id,
        string content,
        bool completed
    );

    event TaskCompleted( 
        uint id,
        bool completed
    );

    constructor() public{
        createTask("Welcome to ToDoChain App !");
    }

    function createTask(string memory _content) public{
        taskCount++;
        tasks[taskCount] = Task(taskCount,_content,false);
        emit TaskCompleted(taskCount, _content, false);
    }

    function toggleCompleted(uint _id)public{
        Task memory _task = tasks[_id];
        _task.completed = ! _task.completed;
        tasks[_id] = _task;
        emit TaskCompleted(_id,_task.completed);
    }
}
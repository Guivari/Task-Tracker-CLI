#!/usr/bin/env node
import { updateTaskStatus, deleteTask, addTask, updateTaskDesc, getTasks } from "./module.js";

const statusMap: Record<string, number> = {
  "todo": 0,
  "in-progress": 1,
  "done": 2
};

enum Status {
  "todo",
  "in-progress",
  "done"
}

interface Task {
  "id": number,
  "description": string,
  "status": Status,
  "createdAt": Date,
  "updatedAt": Date
}

const args = process.argv.slice(2);

function printTasks(tasks :Task[]) {
  for (const task of tasks) {
    if (task) {
      console.log(`ID: ${task.id}`);
      console.log(`${task.description}`);
      console.log(`${Status[task.status]}`);
      console.log(`Task created: ${task.createdAt.toLocaleString("en-GB", { timeZone: "UTC" })}`);
      console.log(`Last updated: ${task.updatedAt.toLocaleString("en-GB", { timeZone: "UTC" })}`);
      console.log('\n');
    }
  }
}


switch (args[0]) {
  case "add":
    if (args[1] === undefined) {
      console.log(`Error: No description included`);
    } else {
      console.log(`Adding "${args[1]}"`);
      addTask(args[1]);
    }
    break;

  case "update":
    if (args[1] != undefined) {
      const parsedArg = parseInt(args[1],10);
      if (!isNaN(parsedArg) && String(parsedArg) === args[1].trim()) {
        if (args[2] != undefined) {
          console.log(`Updating ${args[1]}`);
          updateTaskDesc(Number(parsedArg), args[2]);
        } else {
          console.log("Error: Missing update");
        }
      } else {
        console.log(`${args[1]} not a valid ID`);
      }
    }
    break;

  case "delete":
    if (args[1] != undefined) {
      const parsedArg = parseInt(args[1],10);
      if (!isNaN(parsedArg) && String(parsedArg) === args[1].trim()) {
        console.log(`Deleting ${args[1]}`);
        deleteTask(Number(parsedArg));
      } else {
        console.log(`${args[1]} not a valid ID`);
      }
    }
    break;

  case "mark-in-progress":
    if (args[1] != undefined) {
      const parsedArg = parseInt(args[1],10);
      if (!isNaN(parsedArg) && String(parsedArg) === args[1].trim()) {
        console.log(`Updating ${args[1]} to "in-progress"`);
        updateTaskStatus(Number(parsedArg), 1);
      } else {
        console.log(`${args[1]} not a valid ID`);
      }
    }
    break;

  case "mark-done":
    if (args[1] != undefined) {
      const parsedArg = parseInt(args[1],10);
      if (!isNaN(parsedArg) && String(parsedArg) === args[1].trim()) {
        console.log(`Updating ${args[1]} to "done"`);
        updateTaskStatus(Number(parsedArg), 2);
      } else {
        console.log(`${args[1]} not a valid ID`);
      }
    }
    break;

  case "list":
    
    const statusStr = args[1];
    if (!statusStr) {
      printTasks(getTasks(undefined));
    } else {
      const status = statusMap[statusStr];
      if (status === undefined) {
        console.log(`Invalid status: ${statusStr}`);
      } else {
        printTasks(getTasks(status));
      }
    }
    break;
    
  default:
    console.log(`Invalid command: '${args[0]}'`);
}
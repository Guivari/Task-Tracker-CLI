#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";

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

const FILE = "data/tasks.json";

export function readDB() {
  const raw = readFileSync(FILE, "utf8");
  return JSON.parse(raw);
}

export function writeDB(data: any) {
  writeFileSync(FILE, JSON.stringify(data, null, 2), "utf8");
}

export function updateTaskDesc(id: number, newDesc: string) {
  const data = JSON.parse(readFileSync(FILE, "utf8"));
  data.tasks ||= [];
  if (!data.tasks[id]) {
    console.log("Task not found");
    return;
  }
  data.tasks[id].description = newDesc;
  data.tasks[id].updatedAt = new Date();

  writeFileSync(FILE, JSON.stringify(data, null, 2));
  
  console.log("Task updated.");
}

export function updateTaskStatus(id: number, newStatus: number) {
  const data = JSON.parse(readFileSync(FILE, "utf8"));
  data.tasks ||= [];
  if (!data.tasks[id]) {
    console.log("Task not found");
    return;
  }
  data.tasks[id].status = newStatus;
  data.tasks[id].updatedAt = new Date();

  writeFileSync(FILE, JSON.stringify(data, null, 2));
  
  console.log("Task updated.");
}

export function deleteTask(id: number) {
  const data = JSON.parse(readFileSync(FILE, "utf8"));
  data.tasks ||= [];
  if (!data.tasks[id]) {
    console.log("Task not found");
    return;
  }
  delete data.tasks[id];
  writeFileSync(FILE, JSON.stringify(data, null, 2), "utf8");
  console.log(`${id} deleted.`);
}

export function addTask(desc: string) {
  const data = JSON.parse(readFileSync(FILE, "utf8"));
  const nextId = data.lastId + 1;
  data.tasks[nextId] = {
    "id": nextId,
    "description": desc,
    "status": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  };
  data.lastId += 1;
  writeFileSync(FILE, JSON.stringify(data, null, 2), "utf8");
  console.log(`Task added.`);
}

export function getTasks(reqStatus: number | undefined): Task[] {
  const data = JSON.parse(readFileSync(FILE, "utf8"), (key, value) => {
    if (key === "createdAt" || key === "updatedAt") {
      return new Date(value);
    }
    return value;
  });
  data.tasks ||= [];
  if (reqStatus === undefined) 
      return data.tasks.filter((task: Task | null): task is Task => task != null)
  else {
    return data.tasks
      .filter((task: Task | null): task is Task => task != null)
      .filter((task: Task) => task.status === reqStatus);
  }
}
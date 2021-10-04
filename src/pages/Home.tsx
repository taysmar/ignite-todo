import { identifier } from '@babel/types';
import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {

  const [tasks, setTasks] = useState<Task[]>([]);



  function handleAddTask(newTaskTitle: string) {
    const taskWithSameTitle = tasks.find(task => task.title === newTaskTitle);

    if (taskWithSameTitle) {
      return Alert.alert("Você não pode cadastrar uma task com o mesmo nome");
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks(oldTasks => [...oldTasks, newTask]);
  };

  //const task = tasks.find((task) => task.title === newTaskTitle);


  //setTasks((oldState) => [...oldState, TasksList]);


  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const updatedTask = tasks.map(task => ({ ...task }))

    const taskToBeMarkedAsDone = updatedTask.find(item => item.id === id);

    if (!taskToBeMarkedAsDone)
      return;

    taskToBeMarkedAsDone.done = !taskToBeMarkedAsDone.done;
    setTasks(updatedTask);

  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?', [
      {
        style: 'cancel',
        text: 'Não'
      },
      {
        style: 'destructive',
        text: 'Sim',
        onPress: () => {
          const updatedTask = tasks.filter(task => task.id !== id);
          setTasks(updatedTask);
        }
      }
    ])
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskArgs) {
    const updatedTask = tasks.map(task => ({ ...task }))
    const taskToBeUpdated = updatedTask.find(task => task.id === taskId);

    if (!taskToBeUpdated)
      return;

    taskToBeUpdated.title = taskNewTitle;
    setTasks(updatedTask);

  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
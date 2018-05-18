import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, reorderArray } from 'ionic-angular';
import { TodoProvider } from '../../providers/todo/todo';
import { ArchivedTodosPage } from '../../pages/archived-todos/archived-todos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public todos = [];
  public reorderIsEnabled = false;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController,
    private todoProvider: TodoProvider, private toastCtrl: ToastController) {

    this.todos = this.todoProvider.getTodos();

  }

  openTodoAlert() {

    let addTodoAlert = this.alertCtrl.create({
      title: "Add a Todo",
      message: "Enter your todo",
      inputs: [
        {
          type: "text",
          name: "addTodoInput"
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Add Todo",
          handler: (inputData) => {

            let todoText;
            todoText = inputData.addTodoInput;
            this.todoProvider.addTodo(todoText);

            addTodoAlert.onDidDismiss(() => {

              let addTodoToast = this.toastCtrl.create({
                message: "Todo added",
                duration: 3000
              });

              addTodoToast.present();

            });

          }
        }
      ]
    });

    addTodoAlert.present();

  }

  editTodo(todoIndex) {

    let editTodoAlert = this.alertCtrl.create({
      title: "Edit Todo",
      message: "Edit your todo",
      inputs: [
        {
          type: "text",
          name: "editTodoInput",
          value: this.todos[todoIndex]
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Edit Todo",
          handler: (inputData) => {
            
            let todoText = inputData.editTodoInput;
            this.todoProvider.editTodo(todoIndex, todoText);

            editTodoAlert.onDidDismiss(() => {

              let editTodoToast = this.toastCtrl.create({
                message: "Todo Edited",
                duration: 3000
              });

              editTodoToast.present();

            });

          }
        }
      ]

    })

    editTodoAlert.present();

  }

  toggleReorder() {

    this.reorderIsEnabled = !this.reorderIsEnabled;

  }

  itemReordered($event) {

    reorderArray(this.todos, $event);

  }

  goToArchivePage() {

    this.navCtrl.push(ArchivedTodosPage);

  }

  archiveTodo(todoIndex) {

    this.todoProvider.archiveTodo(todoIndex);

  }

}

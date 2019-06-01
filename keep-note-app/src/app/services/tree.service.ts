import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TodoItemNode } from '../models/tree-item-node';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { CategoryService } from './category.service';
import { Reminder } from '../models/reminder';
import { ReminderService } from './reminder.service';

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class TreeService {

  dataChange = new BehaviorSubject<TodoItemNode[]>([]);
  private bearerToken: string;
  apiUrl: string;
  categories: Array<Category>;
  reminders: Array<Reminder>

  get data(): TodoItemNode[] { return this.dataChange.value; }

  constructor(private httpClient: HttpClient,
    private categoryService: CategoryService,
    private reminderService: ReminderService) {
    this.addTreeNode();
  }

  initialize() {
    this.getAllCategories();
    this.getAllReminders();
  }

  addTreeNode() {
    const todoItemNodes = new Array<TodoItemNode>();
    let todoItemNode = new TodoItemNode();
    todoItemNode.item = "Category";
    todoItemNode.id = 0;
    todoItemNode.children = new Array<TodoItemNode>();
    todoItemNodes.push(todoItemNode);

    todoItemNode = new TodoItemNode();
    todoItemNode.item = "Reminder";
    todoItemNode.id = 1;
    todoItemNode.children = new Array<TodoItemNode>();
    todoItemNodes.push(todoItemNode);
    this.dataChange.next(todoItemNodes);
  }

  buildFileTreeWith(categories: Array<Category>, treeId: number): TodoItemNode[] {
    let todoItemNodes: TodoItemNode[] = this.dataChange.getValue();
    var todoItemNode = todoItemNodes.find(x => x.id == treeId);
    if (todoItemNode) {
      todoItemNode.children = new Array<TodoItemNode>();
      for (let index = 0; index < categories.length; index++) {
        const element = categories[index];
        const itemNode = new TodoItemNode();
        itemNode.item = element.name;
        itemNode.id = element.id;
        itemNode.type = treeId;
        todoItemNode.children.push(itemNode);
      }
    }

    return todoItemNodes;
  }

  buildFileTreeWithReminder(reminders: Array<Reminder>, treeId: number): TodoItemNode[] {
    let todoItemNodes: TodoItemNode[] = this.dataChange.getValue();
    var todoItemNode = todoItemNodes.find(x => x.id == treeId);
    if (todoItemNode) {
      todoItemNode.children = new Array<TodoItemNode>();
      for (let index = 0; index < reminders.length; index++) {
        const element = reminders[index];
        const itemNode = new TodoItemNode();
        itemNode.item = element.name;
        itemNode.id = element.id;
        itemNode.type = treeId;
        todoItemNode.children.push(itemNode);
      }
    }

    return todoItemNodes;
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(obj: { [key: string]: any }, level: number): TodoItemNode[] {
    return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
      debugger;
      const value = obj[key];
      const node = new TodoItemNode();
      node.item = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.item = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  /** Add an item to to-do list */
  insertItem(parent: TodoItemNode, name: string) {
    if (parent.children) {
      parent.children.push({ item: name } as TodoItemNode);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: TodoItemNode, name: string) {
    node.item = name;
    this.dataChange.next(this.data);
  }

  updateLeafNode(data: any, treeId: number) {
    let todoItemNodes: TodoItemNode[] = this.dataChange.getValue();
    var treeNode = todoItemNodes.find(x => x.id == treeId);
    if (treeNode) {
      var value = treeNode.children.find(x => x.id == data.id);
      if (value) {
        value.item = data.name;
        value.type = treeId;
      } else {
        const todoItemNode = new TodoItemNode();
        todoItemNode.item = data.name;
        todoItemNode.id = data.id;
        todoItemNode.type = treeId;
        treeNode.children.push(todoItemNode);
      }
      this.dataChange.next(todoItemNodes);
    }
  }

  updateCategory(category: Category) {
    let todoItemNodes: TodoItemNode[] = this.dataChange.getValue();
    var value = todoItemNodes[0].children.find(x => x.id == category.id);
    if (value) {
      value.item = category.name;
    } else {
      const todoItemNode = new TodoItemNode();
      todoItemNode.item = category.name;
      todoItemNode.id = category.id;
      todoItemNodes[0].children.push(todoItemNode);
    }
    this.dataChange.next(todoItemNodes);
  }

  removeRoomArr(data: any, treeId: number) {
    let todoItemNodes: TodoItemNode[] = this.dataChange.getValue();
    var todoItemNode = todoItemNodes.find(x => x.id == treeId);
    var value = todoItemNode.children.filter(x => x.id != data.id);
    todoItemNode.children = value;
    this.dataChange.next(todoItemNodes);
  }

  deleteNode(data: any) {
    if (data.type == 0) {
      this.categoryService.deleteCategory(data.id).subscribe(
        result => {
          if (result) {
            this.removeRoomArr(data, data.type);
            this.categoryService.removeCategorySubject(data.id);
          }
        },
        err => { console.log('Http failure response for http://localhost:3000/notes: 404 Not Found'); }
      );
    } else {
      this.reminderService.deleteReminder(data.id).subscribe(
        result => {
          if (result) {
            this.removeRoomArr(data, data.type);
            this.reminderService.removeReminderSubject(data.id);
          }
        },
        err => { console.log('Http failure response for http://localhost:3000/notes: 404 Not Found'); }
      );
    }

  }

  getAllCategories() {
    this.categoryService.fetchCategoryFromServer().subscribe(
      result => {
        const data = this.buildFileTreeWith(result, 0);
        // Notify the change.
        this.dataChange.next(data);
      },
      err => { console.log('Http failure response for http://localhost:3000/notes: 404 Not Found'); }
    );
  }

  getAllReminders() {
    this.reminderService.fetchReminderFromServer().subscribe(
      result => {
        const data = this.buildFileTreeWithReminder(result, 1);
        // Notify the change.
        this.dataChange.next(data);
      },
      err => { console.log('Http failure response for http://localhost:3000/notes: 404 Not Found'); }
    );
  }

}

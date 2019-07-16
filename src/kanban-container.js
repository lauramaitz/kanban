import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/polymer/lib/elements/dom-repeat.js";
import "@polymer/paper-dropdown-menu/paper-dropdown-menu.js";
import "@polymer/paper-item/paper-item.js";
import "@polymer/paper-listbox/paper-listbox.js";

import "./status-col.js";
import "./task-card.js";

class KanbanContainer extends PolymerElement {
  static get template() {
    return html`
      <style>
        .kanban-container {
          display: grid;
          text-align: center;
          grid-template-columns: repeat(auto-fill, minmax(30vw, 1fr));
          grid-column-gap: 1em;
          padding: 70px 25px 25px;
        }
        .btn2 {
          position: absolute;
          cursor: pointer;
          height: 3vh;
          width: 10vw;
          top: 10vh;
          left: 2vh;
          text-align: center;
          background: whitesmoke;
          color: rgb(28, 184, 65);
          font-size: 1em;
          border-radius: 15px;
        }
        .btn3 {
          position: absolute;
          cursor: pointer;
          height: 3vh;
          width: 10vw;
          top: 10vh;
          left: 20vh;
          text-align: center;
          background: whitesmoke;
          color: rgb(223, 117, 20);
          font-size: 1em;
          border-radius: 15px;
        }
        .btn4 {
          position: absolute;
          cursor: pointer;
          height: 3vh;
          width: 10vw;
          top: 10vh;
          left: 38vh;
          text-align: center;
          background: whitesmoke;
          color: rgb(66, 184, 221);
          font-size: 1em;
          border-radius: 15px;
        }
      </style>
      <button class="btn2" on-click="titleSort">Sort By Title</button>
      <button class="btn3" on-click="dateSort">Sort By Date</button>
      <button class="btn4" on-click="nameSort">Sort By Name</button>
      <div class="kanban-container">
        <status-col heading="Backlog">
          <template
            is="dom-repeat"
            items="{{tasks}}"
            observe="status"
            filter="isBacklog"
            sort="[[sortType]]"
          >
            <task-card
              id="[[item.id]]"
              user="[[item.assignedname__c]]"
              title="[[item.title__c]]"
              date="[[item.duedate__c]]"
              color="[[item.color__c]]"
            >
              <p>[[item.taskdescription__c]]</p>
            </task-card>
          </template>
        </status-col>

        <status-col heading="In Progress">
          <template
            is="dom-repeat"
            items="{{tasks}}"
            observe="status"
            filter="isInProgress"
            sort="[[sortType]]"
          >
            <task-card
              id="[[item.id]]"
              user="[[item.assignedname__c]]"
              title="[[item.title__c]]"
              date="[[item.duedate__c]]"
              color="[[item.color__c]]"
            >
              <p>[[item.taskdescription__c]]</p>
            </task-card>
          </template>
        </status-col>

        <status-col heading="Complete">
          <template
            is="dom-repeat"
            items="{{tasks}}"
            observe="status"
            filter="isComplete"
            sort="[[sortType]]"
          >
            <task-card
              id="[[item.id]]"
              user="[[item.assignedname__c]]"
              title="[[item.title__c]]"
              date="[[item.duedate__c]]"
              color="[[item.color__c]]"
            >
              <p>[[item.taskdescription__c]]</p>
            </task-card>
          </template>
        </status-col>
      </div>
    `;
  }

  static get properties() {
    return {
      tasks: Array,
      sortType: String
    };
  }

  isBacklog(item) {
    return item.status__c === "Backlog";
  }

  isInProgress(item) {
    return item.status__c === "In Progress";
  }

  isComplete(item) {
    return item.status__c === "Complete";
  }

  titleSort(a, b) {
    console.log("testing the titles");
    this.sortType = "titleSort";
    var titleA = a.title__c.toUpperCase();
    var titleB = b.title__c.toUpperCase();
    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }
    return 0;
  }

  dateSort(a, b) {
    console.log("testing the date");
    this.sortType = "dateSort";
    var dateA = a.duedate__c.toUpperCase();
    var dateB = b.duedate__c.toUpperCase();
    if (dateA < dateB) {
      return -1;
    }
    if (dateA > dateB) {
      return 1;
    }
    return 0;
  }

  nameSort(a, b) {
    console.log("testing the name");
    this.sortType = "nameSort";
    var nameA = a.assignedname__c.toUpperCase();
    var nameB = b.assignedname__c.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  }

  constructor() {
    super();
    this.sortType = "titleSort";
  }
}

customElements.define("kanban-container", KanbanContainer);

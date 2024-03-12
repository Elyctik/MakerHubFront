import { Component } from '@angular/core';
import {CalendarEvent, CalendarView} from "angular-calendar";
import {isSameDay, isSameMonth} from "date-fns";
import {Subject} from "rxjs";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;

  events : CalendarEvent[] =[];

  activeDayIsOpen = false;

  refresh = new Subject<void>()
  constructor() {
    const event1 = {
      title: "Visite de Mr Lorthoir",
      start: new Date("2024-03-12T10:30"),
      end: new Date("2024-03-12T17:30"),
      draggable: true,
      resizable:{
        beforeStart: true,
        afterEnd: true,//On choisit de rentre modifiable le début Et/ou la fin de l'event
      }
    }
      this.events.push(event1);

    const event2 = {
      title: "Visite de Mr Doe, John Doe",
      start: new Date("2024-03-14T12:30"),
      end: new Date("2024-03-14T14:30"),
      draggable: true,
      resizable:{
        beforeStart: true,
        afterEnd: true,//On choisit de rentre modifiable le début Et/ou la fin de l'event
      }
    }
    this.events.push(event2);

    const event3 = {
      title: "Visite de Mr Nobody",
      start: new Date("2024-03-12T12:30"),
      end: new Date("2024-03-12T13:30"),
      draggable: true,
      resizable:{
        beforeStart: true,
        afterEnd: true,//On choisit de rentre modifiable le début Et/ou la fin de l'event
      }
    }
    this.events.push(event3);
  }



  setView(view: CalendarView){
    this.view = view
  }

  dayClicked({date,events}: {date: Date;events: CalendarEvent[]}):void{
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate,date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
      this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged(event: any){
    event.event.start = event.newStart;
    event.event.end = event.newEnd;
    this.refresh.next();
  }


}

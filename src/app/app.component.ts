import { Component, OnInit, VERSION } from "@angular/core";

import { Idle, DEFAULT_INTERRUPTSOURCES } from "@ng-idle/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  name = "Angular " + VERSION.major;

  idleState = "Not started.";
  timedOut = false;

  constructor(private idle: Idle) {}

  ngOnInit() {
    // sets an idle timeout of 5 seconds, for testing purposes.
    this.idle.setIdle(5);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    this.idle.setTimeout(5);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleEnd.subscribe(() => (this.idleState = "No longer idle."));
    this.idle.onTimeout.subscribe(() => {
      this.idleState = "Timed out!";
      this.timedOut = true;
    });
    this.idle.onIdleStart.subscribe(
      () => (this.idleState = "You've gone idle!")
    );
    this.idle.onTimeoutWarning.subscribe(
      countdown =>
        (this.idleState = "You will time out in " + countdown + " seconds!")
    );
    this.reset();
  }

  reset() {
    this.idle.watch();
    this.idleState = "Started.";
    this.timedOut = false;
  }
}

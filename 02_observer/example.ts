interface IObserver {
  update(subject: ISubject): void;
}

interface ISubject {
  register(observer: IObserver): void;
  remove(observer: IObserver): void;
  notify(observer: IObserver): void;
}

class ObserverableSubject implements ISubject {
  private observers: IObserver[] = [];

  private state: number = 0;

  register(observer: IObserver): void {
    this.observers.push(observer);
  }
  remove(observer: IObserver): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }
  notify(): void {
    this.observers.forEach((obs) => {
      obs.update(this);
    });
  }

  getState(): number {
    return this.state;
  }

  someBusinessLogic(): void {
    this.state = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    this.notify();
  }
}

class ObserverA implements IObserver {
  update(subject: ObserverableSubject): void {
    console.log("Observer A is notified. State: ", subject.getState());
  }
}

class ObserverB implements IObserver {
  update(subject: ObserverableSubject): void {
    console.log("Observer B is notified. State: ", subject.getState());
  }
}

const subject = new ObserverableSubject();
const observerA = new ObserverA();
const observerB = new ObserverB();
subject.register(observerA);
console.log("Register Observer A");
subject.register(observerB);
console.log("Register Observer B");

let count = 0;
const interval = setInterval(() => {
  subject.someBusinessLogic();
  count++;
  if (count === 5) {
    subject.remove(observerA);
    console.log("Remove Observer A");
  }
  if (count === 10) {
    subject.remove(observerB);
    console.log("Remove Observer B");
    clearInterval(interval);
  }
}, 1000);

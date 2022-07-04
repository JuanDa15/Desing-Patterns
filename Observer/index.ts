// The observer always need an update method, to receive
// new data from the subject
interface Observer {
  update: (data: any) => void
}
// The subject always need de subscribe and unsubscribe method
interface Subject {
  subscribe: (observer: Observer) => void,
  unsubscribe: (observer: Observer) => void
}
 
class BitcoinPrice implements Subject {
  observers: Observer[];

  constructor() {
    // Every time the input is modified emits the notification to modify the
    // value of the observers
    const el: HTMLInputElement | null = document.querySelector("#value");
    el?.addEventListener('input', () => {
      this.notify(el.value);
    });
    // Initialize the observers list
    this.observers = [];
  }
  /**
   * [subscribe]
   * Adds the observer to the list to notify then of any change
   * @param observer 
   */
  subscribe(observer: Observer): void {
    this.observers.push(observer)
  }
  /**
   * [unsubscribe]
   * Removes an subscriber from the subscribers list
   * @param observer 
   */
  unsubscribe(observer: Observer): void {
    const position:number = this.observers.findIndex( obs => obs === observer);
    this.observers.splice(position,1);
  }
  /**
   * [notify]
   * Notifys all the subscribers to update the information
   * @param   {any}  data  [Any type of data you need to modify]
   * @return  {void}    
   */
  notify(data: any): void{
    this.observers.forEach( observer => observer.update(data));
  }
}

class PriceDisplay implements Observer{
  private element: HTMLElement | null;
  constructor(){
    // Gets the element that will be updated
    this.element = document.querySelector("#price") ;
  }
  // Method that update the information
  update(data: any):void {
    this.element!.innerText = data;
  };
}

const value = new BitcoinPrice();
const display = new PriceDisplay();

value.subscribe(display);

document.getElementById('unsubscribe-btn')?.
  addEventListener('click', () => {
    value.unsubscribe(display);
  });

document.getElementById('subscribe-btn')?.
  addEventListener('click', () => {
    value.subscribe(display);
  });
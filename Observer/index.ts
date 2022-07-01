interface Observer {
  update: (data: any) => void
}

interface Subject {
  subscribe: (observer: Observer) => void,
  unsubscribe: (observer: Observer) => void
}

class BitcoinPrice implements Subject {
  observers: Observer[];

  constructor() {
    const el: HTMLInputElement | null = document.querySelector("#value");
    el?.addEventListener('input', () => {
      this.notify(el.value);
    });
    this.observers = [];
  }

  subscribe(observer: Observer): void {
    this.observers.push(observer)
  }

  unsubscribe(observer: Observer): void {
    const position:number = this.observers.findIndex( obs => obs === observer);
    this.observers.splice(position,1);
  }

  notify(data: any) {
    this.observers.forEach( observer => observer.update(data));
  }
}

class PriceDisplay implements Observer{
  private element: HTMLElement | null;
  constructor(){
    this.element = document.querySelector("#price") ;
  }

  update(data: any):void {
    this.element!.innerText = data;
  };
}

const value = new BitcoinPrice();
const display = new PriceDisplay();

value.subscribe(display)


setTimeout(()=> {
  value.unsubscribe(display);
},5000)
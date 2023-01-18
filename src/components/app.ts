import CarsCollection from '../helpers/cars-collection';
import brands from '../data/brands';
import cars from '../data/cars';
import models from '../data/models';

class App {
    private htmlElement: HTMLElement;

    private carsColletion: CarsCollection;

    constructor(selector: string) {
      const foundElement = document.querySelector<HTMLElement>(selector);
      this.carsColletion = new CarsCollection({ cars, brands, models });
      console.log(this.carsColletion);

      if (foundElement === null) throw new Error(`Nerastas elementas su selektoriumi '${selector}'`);

      this.htmlElement = foundElement;
    }

    initialize = (): void => {
      const container = document.createElement('div');
      container.className = 'container my-5';
      container.innerHTML = 'Laukiu kol būsiu sukurtas';

      this.htmlElement.append(container);
    };
  }
  export default App;

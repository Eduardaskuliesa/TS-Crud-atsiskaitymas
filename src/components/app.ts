import CarsCollection from '../helpers/cars-collection';
import brands from '../data/brands';
import cars from '../data/cars';
import models from '../data/models';
import Table from './table';
import stringifyProps from '../helpers/stringify-props';

class App {
    private htmlElement: HTMLElement;

    private carsColletion: CarsCollection;

    constructor(selector: string) {
      const foundElement = document.querySelector<HTMLElement>(selector);
      this.carsColletion = new CarsCollection({ cars, brands, models });
      if (foundElement === null) throw new Error(`Nerastas elementas su selektoriumi '${selector}'`);

      this.htmlElement = foundElement;
    }

    initialize = (): void => {
      const carTable = new Table({
        title: 'Visi automobiliai',
        columns: {
          id: 'Id',
          brand: 'Marke',
          model: 'Modelis',
          price: 'Kaina',
          year: 'Metai',
        },
        rowsData: this.carsColletion.all.map(stringifyProps),
      });
      const container = document.createElement('div');
      container.className = 'container my-5';
      container.appendChild(carTable.htmlElement);

      this.htmlElement.append(container);
    };
  }
  export default App;

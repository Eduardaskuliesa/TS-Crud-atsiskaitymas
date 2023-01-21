import CarsCollection from '../helpers/cars-collection';
import brands from '../data/brands';
import cars from '../data/cars';
import models from '../data/models';
import Table from './table';
import stringifyProps from '../helpers/stringify-props';
import SelectField, { type Option } from './select-field';
import type Brand from '../types/brand';

const brandToOptions = ({ id, title }: Brand): Option => ({
  value: id,
  text: title,
});

const ALL_CATEGORIES_ID = '-1';
const ALL_CATEGORIES_TITLE = 'All Cars';

class App {
    private htmlElement: HTMLElement;

    private carsColletion: CarsCollection;

    constructor(selector: string) {
      const foundElement = document.querySelector<HTMLElement>(selector);
      this.carsColletion = new CarsCollection({ cars, brands, models });
      if (foundElement === null) throw new Error(`Nerastas elementas su selektoriumi '${selector}'`);

      this.htmlElement = foundElement;
    }

    public initialize = (): void => {
      const container = document.createElement('div');
      container.className = 'container my-5 d-flex flex-column gap-3';

      const carTable = new Table({
        title: ALL_CATEGORIES_TITLE,
        columns: {
          id: 'Id',
          brand: 'Marke',
          model: 'Modelis',
          price: 'Kaina',
          year: 'Metai',
        },
        rowsData: this.carsColletion.all.map(stringifyProps),
      });

      const selectField = new SelectField({
        options: [
          { text: ALL_CATEGORIES_TITLE, value: ALL_CATEGORIES_ID },
          ...this.carsColletion.brand.map(brandToOptions),
        ],
        onChange: (_, brandId, { text: brandTitle }) => {
          const newCars = brandId === ALL_CATEGORIES_ID
          ? this.carsColletion.all
          : this.carsColletion.getBrandById(brandId);

          carTable.updateProps({
            rowsData: newCars.map(stringifyProps),
            title: brandTitle,
          });
         },
      });

      container.append(
        selectField.htmlElement,
        carTable.htmlElement,
      );

      this.htmlElement.append(container);
    };
  }
  export default App;

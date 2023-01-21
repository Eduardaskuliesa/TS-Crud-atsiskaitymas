import Table from './table';
import cars from '../data/cars';
import brands from '../data/brands';
import models from '../data/models';
import CarsCollection from '../helpers/cars-collection';
import stringifyProps, { StringifyObjectProps } from '../helpers/stringify-props';
import CarJoined from '../types/car-joined';
import SelectField, { type Option, type SelectFieldProps } from './select-field';
import Brand from '../types/brand';

const ALL_BRANDS_TITLE = 'All cars';
const brandToOption = ({ id, title }: Brand): Option => ({
  value: id,
  text: title,
});

class App {
  private carsCollection: CarsCollection;

  private selectedBrandId: null | string;

  private carTable: Table<StringifyObjectProps<CarJoined>>;

  private htmlElement: HTMLElement;

  public constructor(selector: string) {
    const foundElement = document.querySelector<HTMLElement>(selector);
    if (foundElement === null) throw new Error(`Nerastas elementas su selektoriumi '${selector}'`);

    this.carsCollection = new CarsCollection({ cars, brands, models });
    this.carTable = new Table({
      title: ALL_BRANDS_TITLE,
      columns: {
        id: 'Id',
        brand: 'Brand',
        model: 'Model',
        price: 'Price',
        year: 'Year',
      },
      rowsData: this.carsCollection.all.map(stringifyProps),
      onDelete: this.handleCarDelete,
    });
    this.selectedBrandId = null;

    this.htmlElement = foundElement;
  }

  private handleBrandChange: SelectFieldProps['onChange'] = (_, brandId) => {
    this.selectedBrandId = brandId;
    this.update();
  };

  private handleCarDelete = (carId: string): void => {
    this.carsCollection.deleteCarById(carId);

    this.update();
  };

  private update = (): void => {
    if (this.selectedBrandId) {
      const foundBrand = brands.find((brandy) => brandy.id === this.selectedBrandId);
      if (foundBrand) {
        this.carTable.updateProps({
          title: foundBrand.title,
          rowsData: this.carsCollection.getBrandById(this.selectedBrandId)
          .map(stringifyProps),
        });
      }
    } else {
      this.carTable.updateProps({
        title: ALL_BRANDS_TITLE,
        rowsData: this.carsCollection.all.map(stringifyProps),
      });
    }
  };

  public initialize = (): void => {
    const selectField = new SelectField({
      options: [
        { text: ALL_BRANDS_TITLE, value: '' },
        ...this.carsCollection.brand.map(brandToOption),
      ],
      onChange: this.handleBrandChange,
    });

    const container = document.createElement('div');
    container.className = 'container my-4 d-flex  flex-column gap-3';
    container.append(
      selectField.htmlElement,
      this.carTable.htmlElement,
    );

    this.htmlElement.append(container);
  };
}

export default App;

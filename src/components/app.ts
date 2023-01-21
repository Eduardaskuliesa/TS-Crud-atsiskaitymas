import Table from './table';
import cars from '../data/cars';
import brands from '../data/brands';
import models from '../data/models';
import CarsCollection from '../helpers/cars-collection';
import stringifyProps, { StringifyObjectProps } from '../helpers/stringify-props';
import CarJoined from '../types/car-joined';
import SelectField from './select-field';

const ALL_BRANDS_TITLE = 'All cars';

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

  private handleBrandChange = (brandId: string): void => {
    this.selectedBrandId = brandId;

    this.update();
  };

  private handleCarDelete = (carId: string): void => {
    this.carsCollection.deleteCarById(carId);

    this.update();
  };

  private update = (): void => {
    const { selectedBrandId, carsCollection } = this;

    if (selectedBrandId === null) {
      this.carTable.updateProps({
        title: 'All cars',
        rowsData: carsCollection.all.map(stringifyProps),
      });
    } else {
      const brand = brands.find((branded) => branded.id === selectedBrandId);
      if (brand === undefined) throw new Error('Selected not exist car brand');

      this.carTable.updateProps({
        title: `${brand.title} Cars`,
        rowsData: carsCollection.getByBrandId(selectedBrandId).map(stringifyProps),
      });
    }
  };

  public initialize = (): void => {
    const brandSelect = new SelectField({
      labelText: 'Brand',
      onChange: this.handleBrandChange,
      options: brands.map(({ id, title }) => ({ value: id, title })),
    });

    const container = document.createElement('div');
    container.className = 'container my-4 d-flex  flex-column gap-3';
    container.append(
      brandSelect.htmlElement,
      this.carTable.htmlElement,
    );

    this.htmlElement.append(container);
  };
}

export default App;

import Brand from '../types/brand';
import Car from '../types/car';
import Model from '../types/model';

type CarsCollectionProps = {
    models: Model[],
    cars: Car[],
    brands: Brand[],
};

class CarsCollection {
    private models: Model[];

    private cars: Car[];

    private brands: Brand[];

    constructor({
        models,
        cars,
        brands,
    }: CarsCollectionProps) {
        this.models = JSON.parse(JSON.stringify(models));
        this.cars = JSON.parse(JSON.stringify(cars));
        this.brands = JSON.parse(JSON.stringify(brands));
    }
}

export default CarsCollection;

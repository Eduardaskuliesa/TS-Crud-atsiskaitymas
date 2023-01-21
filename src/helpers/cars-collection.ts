import type Brand from '../types/brand';
import type Car from '../types/car';
import type Model from '../types/model';
import type CarJoined from '../types/car-joined';

type CarsCollectionProps = {
    models: Model[],
    cars: Car[],
    brands: Brand[],
};

class CarsCollection {
    private props: CarsCollectionProps;

    constructor(props: CarsCollectionProps) {
        this.props = props;
    }

    public get all(): CarJoined [] {
        return this.props.cars.map(this.joinCar);
      }

      public get brand(): Brand[] {
       return JSON.parse(JSON.stringify(this.props.brands));
      }

   private joinCar = ({ modelId, ...car }: Car) => {
    const { brands, models } = this.props;
    const carModel = models.find((model) => model.id === modelId);
    const carBrand = brands.find((brand) => brand.id === carModel?.brandId);

    return {
        ...car,
        brand: (carBrand && carBrand.title) ?? 'unknown',
        model: (carModel && carModel.title) ?? 'unknown',
    };
   };

   public deleteCarById = (carId: string): void => {
    this.props.cars = this.props.cars.filter((car) => car.id !== carId);
  };

   public getBrandById = (brandId: string): CarJoined[] => {
    const modelsId = this.props.models
    .filter((model) => model.brandId === brandId)
    .map((model) => model.id);

    const joinedCars = this.props.cars
    .filter((car) => modelsId.includes(car.modelId))
    .map(this.joinCar);

    return joinedCars;
   };
}

export default CarsCollection;

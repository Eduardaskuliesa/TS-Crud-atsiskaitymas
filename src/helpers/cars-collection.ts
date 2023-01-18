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

   public get all(): CarJoined [] {
     return this.props.cars.map(this.joinCar);
   }
}

export default CarsCollection;

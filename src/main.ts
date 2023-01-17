import CarsCollection from './helpers/cars-collection';
import brands from './data/brands';
import cars from './data/cars';
import models from './data/models';

const carsCollection = new CarsCollection({
    cars,
    models,
    brands,
});

console.log(carsCollection);

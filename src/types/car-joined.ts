import type Car from './car';

type CarJoined = Car & {
    brand: string,
};

export default CarJoined;

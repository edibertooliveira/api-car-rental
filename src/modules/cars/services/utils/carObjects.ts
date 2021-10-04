import faker from 'faker';
export default {
  create: {
    name: faker.vehicle.model(),
    brand: faker.vehicle.manufacturer(),
    description: faker.lorem.sentence(),
    daily_rate: Number(faker.finance.amount()),
    available: true,
    license_plate: `${faker.finance.currencyCode()}-${faker.finance.mask()}`,
  },
  update: {
    name: faker.vehicle.model(),
    brand: faker.vehicle.manufacturer(),
    description: faker.lorem.sentence(),
    daily_rate: Number(faker.finance.amount()),
    available: false,
    license_plate: `${faker.finance.currencyCode()}-${faker.finance.mask()}`,
  },
};

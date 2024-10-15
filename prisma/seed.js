const prisma = require("../prisma");

const seed = async (numRestaurants = 3, numCustomers = 5) => {
  const restaurants = Array.from({ length: numRestaurants }, (_, i) => ({
    name: `Restaurant ${i + 1}`,
  }));
  await prisma.restaurant.createMany({ data: restaurants });

  const customers = Array.from({ length: numCustomers }, (_, i) => ({
    name: `Customer ${i + 1}`,
    email: `customer${i}@foo.bar`,
  }));
  await prisma.customer.createMany({ data: customers });
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

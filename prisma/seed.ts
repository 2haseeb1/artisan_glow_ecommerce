// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {


  // --- 1. Clean up existing data ---
  // The order is important to avoid foreign key constraint errors!
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany(); // Deleting products also clears the many-to-many wishlist relation
  await prisma.user.deleteMany();


  // --- 2. Create Users (Admin and Regular) ---
  const hashedPasswordAdmin = await bcrypt.hash("admin123", 10);
  const adminUser = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@artisanglow.com",
      password: hashedPasswordAdmin,
      role: "ADMIN",
    },
  });

  const hashedPasswordUser = await bcrypt.hash("user123", 10);
  const regularUser = await prisma.user.create({
    data: {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      password: hashedPasswordUser,
      role: "USER",
    },
  });


  // --- 3. Create Products ---
  const products = [
    {
      name: "Lavender Dream Candle",
      slug: "lavender-dream-candle",
      description:
        "A soothing handcrafted soy candle with notes of fresh lavender, chamomile, and a hint of vanilla. Perfect for relaxation.",
      price: 2499, // in cents ($24.99)
      images: [
        "https://images.piclumen.com/normal/20250706/19/6a9b9f2496e44fd1a47133cdafdd0dbe.webp",
        "/images/products/candle2.jpg",
      ],
      inventory: 50,
    },
    {
      name: "Rustic Terracotta Vase",
      slug: "rustic-terracotta-vase",
      description:
        "A beautiful, handmade terracotta vase with a rustic finish. Ideal for dried flowers or as a standalone decorative piece.",
      price: 3999, // in cents ($39.99)
      images: [
        "https://images.piclumen.com/normal/20250706/19/d4a9a50d2fae410699694e4a6b9ee2ee.webp",
        "/images/products/vase2.jpg",
      ],
      inventory: 30,
    },
    {
      name: "Ocean Breeze Soap Bar",
      slug: "ocean-breeze-soap-bar",
      description:
        "An invigorating soap bar made with shea butter, coconut oil, and a refreshing ocean scent. Leaves your skin feeling soft and clean.",
      price: 899, // in cents ($8.99)
      images: [
        "https://images.piclumen.com/normal/20250706/18/1dc80c0f0ee44d0382cee0106add2cb5.webp",
        "/images/products/soap2.jpg",
      ],
      inventory: 100,
    },
    {
      name: "Ceramic Coffee Mug",
      slug: "ceramic-coffee-mug",
      description:
        "A minimalist ceramic mug, perfect for your morning coffee or tea. Each mug is hand-thrown and unique.",
      price: 1999, // in cents ($19.99)
      images: [
        "https://images.piclumen.com/normal/20250706/18/b0806541966c4075a5d6a0aeba877c2d.webp",
        "/images/products/mug2.jpg",
      ],
      inventory: 75,
    },
  ];

  // Use a transaction to create all products at once
  const createdProducts = await prisma.$transaction(
    products.map((product) => prisma.product.create({ data: product }))
  );


  // --- 4. Create Reviews for some products ---
  const reviews = [
    {
      rating: 5,
      comment:
        "Absolutely love the scent! It fills the whole room and is so calming. Will definitely buy again.",
      userId: regularUser.id,
      productId: createdProducts[0].id, // Review for Lavender Dream Candle
    },
    {
      rating: 4,
      comment:
        "Beautiful vase, looks exactly like the pictures. A little smaller than I expected, but still gorgeous.",
      userId: regularUser.id,
      productId: createdProducts[1].id, // Review for Rustic Terracotta Vase
    },
    {
      rating: 5,
      comment:
        "This mug has become my favorite! The quality is amazing and it feels great to hold.",
      userId: adminUser.id, // The admin can leave reviews too!
      productId: createdProducts[3].id, // Review for Ceramic Coffee Mug
    },
  ];

  const createdReviews = await prisma.$transaction(
    reviews.map((review) => prisma.review.create({ data: review }))
  );
  console.log(`Created ${createdReviews.length} reviews.`);

  console.log("Database has been seeded successfully! 🌱");
}

main()
  .catch((e) => {
    console.error("An error occurred while seeding the database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient, Plan } from "@prisma/client";
import {
  listProducts,
  getProduct,
  listPrices,
} from "@lemonsqueezy/lemonsqueezy.js";
import { Variant } from "@lemonsqueezy/lemonsqueezy.js";
import { configureLemonSqueezy } from "../../config/lemonsqueezy";

const prisma = new PrismaClient();

export async function syncPlans() {
  console.log("I am called");
  configureLemonSqueezy();

  // Fetch all the variants from the database.
  const productVariants: Plan[] = await prisma.plan.findMany();

  // Helper function to add a variant to the productVariants array and sync it with the database.
  async function _addVariant(variant: Plan) {
    console.log(`Syncing variant ${variant.name} with the database...`);

    // Sync the variant with the plan in the database.
    await prisma.plan.upsert({
      where: { variantId: variant.variantId },
      update: variant,
      create: variant,
    });

    console.log(`${variant.name} synced with the database...`);

    productVariants.push(variant);
  }

  // Fetch products from the Lemon Squeezy store.
  const products = await listProducts({
    filter: { storeId: process.env.LEMONSQUEEZY_STORE_ID },
    include: ["variants"],
  });

  // Loop through all the variants.
  const allVariants = products.data?.included as Variant["data"][] | undefined;
  console.log("allVariants: ", JSON.stringify(allVariants));

  if (allVariants) {
    for (const v of allVariants) {
      const variant = v.attributes;
      console.log("variant: ", variant);

      if (
        variant.status === "draft" ||
        (allVariants.length !== 1 && variant.status === "pending")
      ) {
        console.log("i breaked of the if statement");
        continue;
      }

      let productName = "";
      console.log("productName initialized: ", productName);
      try {
        const productResponse = await getProduct(variant.product_id);
        console.log("productResponse: ", productResponse);
        if (productResponse.data) {
          productName = productResponse.data.data.attributes.name ?? "";
        } else {
          console.log(`No data found for product ID ${variant.product_id}`);
        }
        console.log("productName: ", productName);
      } catch (error) {
        console.error(
          `Failed to fetch product for ID ${variant.product_id}: `,
          error,
        );
        continue;
      }

      const variantPriceObject = await listPrices({
        filter: {
          variantId: v.id,
        },
      });

      console.log("variantPriceObject: ", variantPriceObject);

      const currentPriceObj = variantPriceObject.data?.data.at(0);
      const isUsageBased =
        currentPriceObj?.attributes.usage_aggregation !== null;
      const interval = currentPriceObj?.attributes.renewal_interval_unit;
      const intervalCount =
        currentPriceObj?.attributes.renewal_interval_quantity;
      const trialInterval = currentPriceObj?.attributes.trial_interval_unit;
      const trialIntervalCount =
        currentPriceObj?.attributes.trial_interval_quantity;

      const price = isUsageBased
        ? currentPriceObj?.attributes.unit_price_decimal
        : currentPriceObj.attributes.unit_price;

      const priceString = price !== null ? price?.toString() ?? "" : "";

      const isSubscription =
        currentPriceObj?.attributes.category === "subscription";

      if (!isSubscription) {
        continue;
      }

      await _addVariant({
        name: variant.name,
        description: variant.description,
        price: priceString,
        interval,
        intervalCount,
        isUsageBased,
        productId: variant.product_id,
        productName,
        variantId: parseInt(v.id) as unknown as number,
        trialInterval,
        trialIntervalCount,
        sort: variant.sort,
      } as Plan);
    }
  }

  return productVariants;
}

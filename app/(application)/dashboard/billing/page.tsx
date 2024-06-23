import { Suspense } from "react";
import { getProducts } from "@/lib/utils/actions/payments/getProducts";
import ListPlans from "@/components/shared/(Application)/(billing)/ListPlans";

export const dynamic = "force-dynamic";

export default async function BillingPage() {
  const products = await getProducts();
  return (
    <div className="flex flex-col h-screen">
      <Suspense
        fallback={
          <div className="animate-spin rounded-full h-7 w-7 mx-auto my-2 border-b-2 border-gray-700 dark:border-white/50"></div>
        }
      >
        <ListPlans products={products.data} />
      </Suspense>
    </div>
  );
}

import { Suspense } from "react";
import { Plans } from "./plans/plans";

export const dynamic = "force-dynamic";

export default function BillingPage() {
  return (
    <div>
      <Suspense
        fallback={
          <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-white/50 mx-auto my-2"></div>
        }
      >
        <Plans />
      </Suspense>
    </div>
  );
}

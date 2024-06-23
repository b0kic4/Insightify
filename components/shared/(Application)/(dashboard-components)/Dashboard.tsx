import retrieveUsersPlan from "@/lib/utils/actions/db/plans/RetrieveUsersPlan";
import CurrentPlan from "./CurrentPlan";
import BillingInfo from "./BillingInformation";
import { Plan, Card as BillingCard } from "@prisma/client";
import QuickLinks from "./QuickLinks";

export default async function DashboardComponent() {
  const planResponse = await retrieveUsersPlan();
  let plan = null;
  let planCard = null;

  if (planResponse.success && "data" in planResponse) {
    plan = planResponse.data.plan;
    planCard = planResponse.data.card;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6 flex-1 overflow-y-auto p-4">
      <section className="h-full flex flex-col">
        <CurrentPlan plan={plan} />
      </section>
      <section className="h-full flex flex-col">
        <BillingInfo plan={plan as Plan} card={planCard as BillingCard} />
      </section>
      <section className="h-full flex flex-col">
        <QuickLinks />
      </section>
    </div>
  );
}

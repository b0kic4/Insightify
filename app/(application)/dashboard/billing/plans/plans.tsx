import { PrismaClient, Plan as PlanType } from "@prisma/client";
import { syncPlans } from "@/lib/utils/actions/payments/syncPlans";
import { Plan } from "./plan";

const prisma = new PrismaClient();

export async function Plans() {
  // Fetch all the plans from the database using Prisma
  let allPlans: PlanType[] = await prisma.plan.findMany();

  // If there are no plans in the database, sync them from Lemon Squeezy
  if (!allPlans.length) {
    allPlans = await syncPlans();
  }

  if (!allPlans.length) {
    return <p>No plans available.</p>;
  }

  console.log("allPlans: ", allPlans);

  return (
    <div>
      <h2>Plans</h2>
      <div className="mb-5 mt-3 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
        {allPlans.map((plan, index) => (
          <Plan key={`plan-${index}`} plan={plan} />
        ))}
      </div>
    </div>
  );
}

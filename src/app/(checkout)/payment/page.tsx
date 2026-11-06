import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Loader from "@/components/global/Loader";
import PaymentSection from "@/components/payment/PaymentSection";
import { prisma } from "@/lib/prisma";
import { paymentSchema } from "@/lib/schemas";
import { getCurrentUser } from "@/lib/session";

const PaymentContent = async () => {
  const user = await getCurrentUser();

  // payment comes after shipping, so an address must be saved first
  const shippingAddress = await prisma.shippingAddress.findUnique({
    where: { userId: user.id },
    select: { id: true },
  });
  if (!shippingAddress) redirect("/shipping");

  // the cookie can be edited by the user, so validate it before using it
  const savedMethod = paymentSchema.safeParse({
    paymentMethod: (await cookies()).get("paymentMethod")?.value,
  });

  return (
    <PaymentSection
      defaultMethod={savedMethod.success ? savedMethod.data.paymentMethod : undefined}
    />
  );
};

const PaymentPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <PaymentContent />
    </Suspense>
  );
};
export default PaymentPage;

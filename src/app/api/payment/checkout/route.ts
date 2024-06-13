import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");
const host =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.BASE_URL;

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const reqBody = await req.json();
    const { total_amount } = reqBody;
    const date = new Date().toISOString();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "pkr",
            product_data: {
              name: "INV-" + date,
            },
            unit_amount: total_amount * 100 || 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      cancel_url: `${host}`,
      success_url: `${host}/payment?session_id={CHECKOUT_SESSION_ID}`,
    });

    // Use 'return' to send the response
    return NextResponse.json({
      mesaaage: "Payment added successfully",
      success: true,
      sessionId: session.id,
    });
  } catch (error: any) {
    // Use 'return' to send the response
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

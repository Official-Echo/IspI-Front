import { defineRoute, RouteContext } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import PaymentForm from "../islands/payment-form.tsx";

export default defineRoute((req, ctx: RouteContext) => {
  console.log("Payment page: Starting render");

  const { isAuthenticated, user } = ctx.state as {
    isAuthenticated: boolean;
    user: { pib: string; role: string; subscription: boolean } | null;
  };

  console.log("Payment page: User state:", { isAuthenticated, user });

  const url = new URL(req.url);
  const plan = url.searchParams.get("plan") || "librarian";
  const amount = url.searchParams.get("amount") || "9.99";

  console.log("Payment page: URL params:", { plan, amount });

  const plans = {
    patron: {
      name: "Меценат",
      price: "0.00",
      features: [
        "Upload 10+ documents for free access",
        "10 downloads/day for a week",
        "Basic access with ads",
        "Earn through contributions",
      ],
    },
    librarian: {
      name: "Бібліотекар",
      price: "9.99",
      features: [
        "Unlimited document downloads",
        "Priority support",
        "Monthly billing",
        "No advertisements",
      ],
    },
    premium: {
      name: "Захист+",
      price: "19.99",
      features: [
        "No advertisements",
        "Unlimited downloads",
        "Private work uploads",
        "Premium support",
        "Priority processing",
      ],
    },
    basic: {
      name: "Бібліотекар",
      price: "9.99",
      features: [
        "Unlimited document downloads",
        "Priority support",
        "Monthly billing",
        "No advertisements",
      ],
    },
  };

  const selectedPlan = plans[plan as keyof typeof plans] || plans.librarian;

  console.log("Payment page: Selected plan:", selectedPlan);
  console.log("Payment page: About to render PaymentForm with props:", {
    plan,
    selectedPlan,
    userEmail: user?.pib || "",
  });

  console.log("Payment page: PaymentForm component:", PaymentForm);
  console.log("Payment page: PaymentForm type:", typeof PaymentForm);

  return (
    <>
      <Head>
        <title>Payment - Complete Your Purchase</title>
      </Head>
      <div class="payment-page">
        <div class="payment-container">
          <div class="payment-header">
            <h1>Complete Your Purchase</h1>
            <p>Secure payment powered by industry-standard encryption</p>
          </div>

          <div class="payment-content">
            <div class="order-summary">
              <h2>Order Summary</h2>
              <div class="plan-details">
                <div class="plan-info">
                  <h3>{selectedPlan.name}</h3>
                  <div class="plan-features">
                    {selectedPlan.features.map((feature) => (
                      <div class="feature-item">
                        <span class="checkmark">✓</span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
                <div class="plan-pricing">
                  <div class="price-line">
                    <span>Subscription</span>
                    <span>${selectedPlan.price}/month</span>
                  </div>
                  <div class="price-line">
                    <span>Tax</span>
                    <span>$0.00</span>
                  </div>
                  <div class="price-line total">
                    <span>Total</span>
                    <span>${selectedPlan.price}/month</span>
                  </div>
                </div>
              </div>
            </div>

            <PaymentForm
              plan={plan}
              selectedPlan={selectedPlan}
              userEmail={user?.pib || ""}
            />
          </div>

          <div class="alternative-payments">
            <h3>Alternative Payment Methods</h3>
            <div class="alt-payment-buttons">
              <button type="button" class="alt-payment-btn paypal-btn" disabled>
                <span class="btn-icon">🅿️</span>
                Pay with PayPal
                <span class="btn-status">Coming Soon</span>
              </button>
              <button type="button" class="alt-payment-btn apple-btn" disabled>
                <span class="btn-icon">🍎</span>
                Apple Pay
                <span class="btn-status">Coming Soon</span>
              </button>
              <button type="button" class="alt-payment-btn google-btn" disabled>
                <span class="btn-icon">🅖</span>
                Google Pay
                <span class="btn-status">Coming Soon</span>
              </button>
            </div>
          </div>

          <div class="security-features">
            <div class="security-item">
              <span class="security-icon">🔒</span>
              <div>
                <h4>SSL Encrypted</h4>
                <p>256-bit encryption</p>
              </div>
            </div>
            <div class="security-item">
              <span class="security-icon">🛡️</span>
              <div>
                <h4>PCI Compliant</h4>
                <p>Industry standard security</p>
              </div>
            </div>
            <div class="security-item">
              <span class="security-icon">💳</span>
              <div>
                <h4>Secure Processing</h4>
                <p>Protected by Stripe</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

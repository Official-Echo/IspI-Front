import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

interface PaymentFormProps {
  plan: string;
  selectedPlan: {
    name: string;
    price: string;
    features: string[];
  };
  userEmail: string;
}

export default function PaymentForm(
  { plan, selectedPlan, userEmail }: PaymentFormProps,
) {
  const isProcessing = useSignal(false);
  console.log("PaymentForm: Component rendering with props:", {
    plan,
    selectedPlan,
    userEmail,
  });

  useEffect(() => {
    const savedData = localStorage.getItem("payment_form_data");
    if (savedData) {
      try {
        const data = JSON.parse(savedData);

        const form = document.getElementById("payment-form") as HTMLFormElement;
        if (form) {
          Object.keys(data).forEach((key) => {
            const field = form.querySelector(
              `[name="${key}"]`,
            ) as HTMLInputElement;
            if (
              field && key !== "card_number" && key !== "cvv" &&
              key !== "expiry"
            ) {
              field.value = data[key];
            }
          });
        }

        console.log("Restored form data from localStorage");
      } catch (error) {
        console.error("Error loading saved form data:", error);
      }
    }
  }, []);

  const saveFormData = () => {
    const form = document.getElementById("payment-form") as HTMLFormElement;
    if (!form) return;

    const formData = new FormData(form);
    const data: Record<string, string> = {};

    for (const [key, value] of formData.entries()) {
      if (key !== "card_number" && key !== "cvv" && key !== "expiry") {
        data[key] = value as string;
      }
    }

    localStorage.setItem("payment_form_data", JSON.stringify(data));
    console.log("Saved form data to localStorage");
  };

  const clearSavedData = () => {
    localStorage.removeItem("payment_form_data");
    console.log("Cleared saved form data");
  };

  const processPayment = async () => {
    const form = document.getElementById("payment-form") as HTMLFormElement;
    if (!form) return;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    saveFormData();

    isProcessing.value = true;

    try {
      const formData = new FormData(form);

      console.log("Submitting payment...");
      console.log("Form data entries:");
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await fetch("/api/process-payment", {
        method: "POST",
        body: formData,
      });

      console.log("Response status:", response.status);
      console.log(
        "Response headers:",
        Object.fromEntries(response.headers.entries()),
      );

      if (response.status === 405) {
        console.error(
          "405 Method Not Allowed - Check if the API route exists and accepts POST",
        );
        alert("Payment processing error. Please try again.");
        return;
      }

      if (response.redirected) {
        if (response.url.includes("payment-success")) {
          clearSavedData();
        }
        globalThis.location.href = response.url;
      } else if (response.ok) {
        clearSavedData();
        globalThis.location.href = `/payment-success?plan=${plan}`;
      } else {
        console.error("Payment failed with status:", response.status);
        globalThis.location.href = "/payment-failed";
      }
    } catch (error) {
      console.error("Payment error:", error);
      globalThis.location.href = "/payment-failed";
    } finally {
      isProcessing.value = false;
    }
  };

  return (
    <div class="payment-form">
      <h2>Payment Information</h2>

      <form id="payment-form">
        <input type="hidden" name="plan" value={plan} />
        <input type="hidden" name="amount" value={selectedPlan.price} />

        <div class="payment-methods">
          <div class="method-tabs">
            <input
              type="radio"
              id="card"
              name="payment_method"
              value="card"
              checked
            />
            <label for="card" class="tab-label">
              <span class="tab-icon">💳</span>
              Credit Card
            </label>

            <input
              type="radio"
              id="paypal"
              name="payment_method"
              value="paypal"
              disabled
            />
            <label for="paypal" class="tab-label disabled">
              <span class="tab-icon">🅿️</span>
              PayPal
              <span class="coming-soon">Coming Soon</span>
            </label>

            <input
              type="radio"
              id="crypto"
              name="payment_method"
              value="crypto"
              disabled
            />
            <label for="crypto" class="tab-label disabled">
              <span class="tab-icon">₿</span>
              Crypto
              <span class="coming-soon">Coming Soon</span>
            </label>
          </div>
        </div>

        <div class="payment-content-form" id="card-form">
          <div class="form-group">
            <label for="card-number">Card Number</label>
            <input
              type="text"
              id="card-number"
              name="card_number"
              placeholder="1234 5678 9012 3456"
              required
            />
            <div class="card-icons">
              <span class="card-icon visa">VISA</span>
              <span class="card-icon mastercard">MC</span>
              <span class="card-icon amex">AMEX</span>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="expiry">Expiry Date</label>
              <input
                type="text"
                id="expiry"
                name="expiry"
                placeholder="MM/YY"
                required
              />
            </div>
            <div class="form-group">
              <label for="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                placeholder="123"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label for="cardholder">Cardholder Name</label>
            <input
              type="text"
              id="cardholder"
              name="cardholder"
              placeholder="John Doe"
              required
            />
          </div>
        </div>

        <div class="billing-section">
          <h3>Billing Address</h3>
          <div class="form-group">
            <label for="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="john@example.com"
              value={userEmail}
              required
            />
          </div>

          <div class="form-group">
            <label for="address">Street Address</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="123 Main Street"
              required
            />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="New York"
                required
              />
            </div>
            <div class="form-group">
              <label for="zip">ZIP Code</label>
              <input
                type="text"
                id="zip"
                name="zip"
                placeholder="10001"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label for="country">Country</label>
            <select id="country" name="country" required>
              <option value="">Select Country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="AU">Australia</option>
            </select>
          </div>
        </div>

        <div class="form-footer">
          <div class="checkbox-group">
            <input type="checkbox" id="terms" name="terms" required />
            <label for="terms">
              I agree to the <a href="/terms">Terms of Service</a> and{" "}
              <a href="/privacy">Privacy Policy</a>
            </label>
          </div>

          <div class="checkbox-group">
            <input type="checkbox" id="newsletter" name="newsletter" />
            <label for="newsletter">
              Send me updates about new features and promotions
            </label>
          </div>

          <button
            type="button"
            class={`pay-button ${isProcessing.value ? "loading" : ""}`}
            onClick={processPayment}
            disabled={isProcessing.value}
          >
            <span class="button-icon">🔒</span>
            {isProcessing.value
              ? "Processing..."
              : `Pay $${selectedPlan.price}/month`}
          </button>

          <div class="security-notice">
            <span class="security-icon">🛡️</span>
            Your payment information is encrypted and secure
          </div>
        </div>
      </form>
    </div>
  );
}

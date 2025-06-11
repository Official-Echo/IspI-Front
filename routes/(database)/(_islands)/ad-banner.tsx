import { useEffect, useState } from "preact/hooks";

export default function AdBanner() {
  const [visible, setVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  const [canClose, setCanClose] = useState(false);
  const [promoImage, setPromoImage] = useState("");

  useEffect(() => {
    const randomNum = Math.floor(Math.random() * 4) + 1;
    setPromoImage(`/promo/escape NaUKMA with us (${randomNum}).png`);

    const timer = setTimeout(() => setVisible(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (visible && timeLeft > 0) {
      const countdown = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setCanClose(true);
            clearInterval(countdown);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [visible, timeLeft]);

  if (!visible) return null;

  const handleClose = () => {
    if (canClose) {
      setVisible(false);
    }
  };

  return (
    <div class="fullscreen-ad-overlay">
      <div class="fullscreen-ad-content">
        <div class="ad-header">
          <h2>🚀 Upgrade Your Experience!</h2>
          <div class="countdown-timer">
            {!canClose ? <span>Ad closes in {timeLeft}s</span> : (
              <button
                class="close-ad-btn"
                type="button"
                onClick={handleClose}
              >
                ✕ Close Ad
              </button>
            )}
          </div>
        </div>

        <div class="ad-image-container">
          <img
            src={promoImage}
            alt="Subscription Offer"
            class="promo-image"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>

        <div class="ad-footer">
          <div class="ad-text">
            <h3>Get Бібліотекар Subscription!</h3>
            <p>✅ Unlimited downloads • ✅ No ads • ✅ Priority support</p>
            <p class="price-highlight">Only $9.99/month</p>
          </div>

          <div class="ad-actions">
            <a
              href="/subscriptions"
              class="upgrade-btn"
              f-client-nav={false}
            >
              🎯 Upgrade Now
            </a>

            <a
              href="/payment?plan=librarian&amount=9.99"
              class="instant-buy-btn"
              f-client-nav={false}
            >
              💳 Buy Instantly
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

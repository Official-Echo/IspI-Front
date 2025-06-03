import { useEffect, useState } from "preact/hooks";

export default function AdBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div class="ad-banner">
      <p>Unlock ad-free experience and downloads!</p>
      <a href="/subscriptions">Get Protection+ Subscription</a>
      <button onClick={() => setVisible(false)}>Close</button>
    </div>
  );
}

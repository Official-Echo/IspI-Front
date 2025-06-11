import { useEffect, useState } from "preact/hooks";
import type { Subscription } from "../../../types/basic.ts";

export default function PDFViewer({
  documentId,
  documentName,
  isAuthenticated,
  userSubscription,
}: {
  documentId: number;
  documentName: string;
  isAuthenticated: boolean;
  userSubscription: Subscription;
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);

    if (
      userSubscription === "Free" || userSubscription === "Меценат" ||
      !userSubscription
    ) {
      const adInterval = setInterval(() => {
        setShowAd(true);
        setTimeout(() => setShowAd(false), 10000);
      }, 60000);

      return () => {
        clearTimeout(timer);
        clearInterval(adInterval);
      };
    }

    return () => clearTimeout(timer);
  }, [userSubscription]);

  const canDownloadPrint = () => {
    return userSubscription === "Бібліотекар" ||
      userSubscription === "Захист+" ||
      (userSubscription === "Меценат" && isAuthenticated);
  };

  const handleDownload = async () => {
    if (!canDownloadPrint()) {
      alert(
        "Upgrade to Бібліотекар or Захист+ for unlimited downloads, or become Меценат for limited downloads.",
      );
      return;
    }

    if (userSubscription === "Меценат") {
      const downloadsToday = 0;
      if (downloadsToday >= 10) {
        alert(
          "Daily download limit reached (10/day). Upgrade to Бібліотекар for unlimited downloads.",
        );
        return;
      }
    }

    try {
      const response = await fetch(`/api/view-document/${documentId}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${documentName}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        alert("Failed to download document.");
      }
    } catch (error) {
      console.error("Download error:", error);
      alert("Download failed. Please try again.");
    }
  };

  const handlePrint = () => {
    if (!canDownloadPrint()) {
      alert(
        "Upgrade to Бібліотекар or Захист+ for printing, or become Меценат for limited printing.",
      );
      return;
    }

    const iframe = document.getElementById("pdf-frame") as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.print();
    }
  };

  if (loading) {
    return (
      <div class="pdf-viewer-container">
        <div class="pdf-loading">
          <div class="loading-spinner"></div>
          <p>Loading document...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div class="pdf-viewer-container">
        <div class="pdf-error">
          <h3>⚠️ Error Loading Document</h3>
          <p>{error}</p>
          <button onClick={() => globalThis.location.reload()}>
            🔄 Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div class="pdf-viewer-container">
      {showAd &&
        (userSubscription === "Free" || userSubscription === "Меценат" ||
          !userSubscription) &&
        (
          <div class="ad-banner-popup">
            <div class="ad-content">
              <h3>🚀 Upgrade Your Experience!</h3>
              <p>
                Remove ads and get unlimited access with Бібліотекар
                subscription
              </p>
              <a href="/subscriptions" class="ad-upgrade-btn">Upgrade Now</a>
              <button
                type="button"
                class="ad-close-btn"
                onClick={() => setShowAd(false)}
              >
                ✕
              </button>
            </div>
          </div>
        )}

      <div class="pdf-toolbar">
        <div class="toolbar-info">
          <h3>📄 {documentName}</h3>
          <span class="document-type">PDF Document</span>
        </div>

        <div class="toolbar-actions">
          <button
            class="toolbar-btn download-btn"
            onClick={handleDownload}
            disabled={!canDownloadPrint()}
          >
            📥 Download
          </button>
          <button
            class="toolbar-btn print-btn"
            onClick={handlePrint}
            disabled={!canDownloadPrint()}
          >
            🖨️ Print
          </button>
        </div>
      </div>

      <div class="pdf-viewer">
        <iframe
          id="pdf-frame"
          src={`/api/view-document/${documentId}#toolbar=1&navpanes=1&scrollbar=1`}
          width="100%"
          height="600px"
          style="border: 1px solid #ddd; border-radius: 8px;"
          title={documentName}
        >
          <p>
            Your browser doesn't support PDF viewing.
            <a href={`/api/view-document/${documentId}`} target="_blank">
              Click here to download the PDF
            </a>
          </p>
        </iframe>
      </div>

      {(!isAuthenticated || userSubscription === "Free") && (
        <div class="subscription-prompt">
          <div class="prompt-content">
            <h3>🔓 Get Better Access</h3>
            <div class="subscription-options">
              <div class="option">
                <h4>📚 Меценат (Free)</h4>
                <p>Upload 10+ documents → Get 10 downloads/day for 7 days</p>
                <a href="/cabinet/uploads" class="option-btn">
                  Upload Documents
                </a>
              </div>
              <div class="option">
                <h4>💼 Бібліотекар</h4>
                <p>Unlimited downloads + No ads</p>
                <a href="/subscriptions" class="option-btn">Subscribe</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

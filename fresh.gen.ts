// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_announcements_layout from "./routes/(announcements)/_layout.tsx";
import * as $_announcements_middleware from "./routes/(announcements)/_middleware.ts";
import * as $_announcements_announcements from "./routes/(announcements)/announcements.tsx";
import * as $_announcements_announcements_id_ from "./routes/(announcements)/announcements/[id].tsx";
import * as $_database_layout from "./routes/(database)/_layout.tsx";
import * as $_database_database_id_ from "./routes/(database)/database/[id].tsx";
import * as $_database_database_index from "./routes/(database)/database/index.tsx";
import * as $_404 from "./routes/_404.tsx";
import * as $_layout from "./routes/_layout.tsx";
import * as $_middleware from "./routes/_middleware.ts";
import * as $api_any_ from "./routes/api/[...any].ts";
import * as $api_accept_deal from "./routes/api/accept-deal.ts";
import * as $api_announcement_deal_id_ from "./routes/api/announcement-deal/[id].ts";
import * as $api_announcement_responses_id_ from "./routes/api/announcement-responses/[id].ts";
import * as $api_announcement_id_ from "./routes/api/announcement/[id].ts";
import * as $api_change_subscription from "./routes/api/change-subscription.ts";
import * as $api_chat_announcementId_teacherId_ from "./routes/api/chat/[announcementId]/[teacherId].ts";
import * as $api_documents from "./routes/api/documents.ts";
import * as $api_login from "./routes/api/login.ts";
import * as $api_logout from "./routes/api/logout.ts";
import * as $api_process_payment from "./routes/api/process-payment.ts";
import * as $api_register from "./routes/api/register.ts";
import * as $api_view_document_id_ from "./routes/api/view-document/[id].ts";
import * as $cabinet_layout from "./routes/cabinet/_layout.tsx";
import * as $cabinet_middleware from "./routes/cabinet/_middleware.ts";
import * as $cabinet_announcement_violations from "./routes/cabinet/announcement-violations.tsx";
import * as $cabinet_announcements from "./routes/cabinet/announcements.tsx";
import * as $cabinet_announcements_id_ from "./routes/cabinet/announcements/[id].tsx";
import * as $cabinet_complaints from "./routes/cabinet/complaints.tsx";
import * as $cabinet_deals_id_ from "./routes/cabinet/deals/[id].tsx";
import * as $cabinet_deals_index from "./routes/cabinet/deals/index.tsx";
import * as $cabinet_document_complaints from "./routes/cabinet/document-complaints.tsx";
import * as $cabinet_favorites from "./routes/cabinet/favorites.tsx";
import * as $cabinet_index from "./routes/cabinet/index.tsx";
import * as $cabinet_profile_violations from "./routes/cabinet/profile-violations.tsx";
import * as $cabinet_profile from "./routes/cabinet/profile.tsx";
import * as $cabinet_subscription from "./routes/cabinet/subscription.tsx";
import * as $cabinet_uploads from "./routes/cabinet/uploads.tsx";
import * as $index from "./routes/index.tsx";
import * as $login from "./routes/login.tsx";
import * as $payment_failed from "./routes/payment-failed.tsx";
import * as $payment_success from "./routes/payment-success.tsx";
import * as $payment from "./routes/payment.tsx";
import * as $register from "./routes/register.tsx";
import * as $subscriptions from "./routes/subscriptions.tsx";
import * as $payment_form from "./islands/payment-form.tsx";
import * as $_announcements_islands_announcement_details from "./routes/(announcements)/(_islands)/announcement-details.tsx";
import * as $_announcements_islands_filter_controls from "./routes/(announcements)/(_islands)/filter-controls.tsx";
import * as $_announcements_islands_respond_button from "./routes/(announcements)/(_islands)/respond-button.tsx";
import * as $_database_islands_ad_banner from "./routes/(database)/(_islands)/ad-banner.tsx";
import * as $_database_islands_back_button from "./routes/(database)/(_islands)/back-button.tsx";
import * as $_database_islands_document_list from "./routes/(database)/(_islands)/document-list.tsx";
import * as $_database_islands_filter_panel from "./routes/(database)/(_islands)/filter-panel.tsx";
import * as $_database_islands_pdf_viewer from "./routes/(database)/(_islands)/pdf-viewer.tsx";
import * as $_database_islands_recommendations from "./routes/(database)/(_islands)/recommendations.tsx";
import * as $_database_islands_search_bar from "./routes/(database)/(_islands)/search-bar.tsx";
import * as $cabinet_islands_accept_teacher from "./routes/cabinet/(_islands)/accept-teacher.tsx";
import * as $cabinet_islands_announcement_manager from "./routes/cabinet/(_islands)/announcement-manager.tsx";
import * as $cabinet_islands_chat from "./routes/cabinet/(_islands)/chat.tsx";
import * as $cabinet_islands_cost_adjuster from "./routes/cabinet/(_islands)/cost-adjuster.tsx";
import * as $cabinet_islands_filter_complaints from "./routes/cabinet/(_islands)/filter-complaints.tsx";
import * as $cabinet_islands_popup_chat from "./routes/cabinet/(_islands)/popup-chat.tsx";
import * as $cabinet_islands_price_negotiation from "./routes/cabinet/(_islands)/price-negotiation.tsx";
import * as $cabinet_islands_rating from "./routes/cabinet/(_islands)/rating.tsx";
import * as $cabinet_islands_reject_teacher from "./routes/cabinet/(_islands)/reject-teacher.tsx";
import * as $cabinet_islands_teacher_response_manager from "./routes/cabinet/(_islands)/teacher-response-manager.tsx";
import * as $cabinet_islands_upload_work from "./routes/cabinet/(_islands)/upload-work.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/(announcements)/_layout.tsx": $_announcements_layout,
    "./routes/(announcements)/_middleware.ts": $_announcements_middleware,
    "./routes/(announcements)/announcements.tsx": $_announcements_announcements,
    "./routes/(announcements)/announcements/[id].tsx":
      $_announcements_announcements_id_,
    "./routes/(database)/_layout.tsx": $_database_layout,
    "./routes/(database)/database/[id].tsx": $_database_database_id_,
    "./routes/(database)/database/index.tsx": $_database_database_index,
    "./routes/_404.tsx": $_404,
    "./routes/_layout.tsx": $_layout,
    "./routes/_middleware.ts": $_middleware,
    "./routes/api/[...any].ts": $api_any_,
    "./routes/api/accept-deal.ts": $api_accept_deal,
    "./routes/api/announcement-deal/[id].ts": $api_announcement_deal_id_,
    "./routes/api/announcement-responses/[id].ts":
      $api_announcement_responses_id_,
    "./routes/api/announcement/[id].ts": $api_announcement_id_,
    "./routes/api/change-subscription.ts": $api_change_subscription,
    "./routes/api/chat/[announcementId]/[teacherId].ts":
      $api_chat_announcementId_teacherId_,
    "./routes/api/documents.ts": $api_documents,
    "./routes/api/login.ts": $api_login,
    "./routes/api/logout.ts": $api_logout,
    "./routes/api/process-payment.ts": $api_process_payment,
    "./routes/api/register.ts": $api_register,
    "./routes/api/view-document/[id].ts": $api_view_document_id_,
    "./routes/cabinet/_layout.tsx": $cabinet_layout,
    "./routes/cabinet/_middleware.ts": $cabinet_middleware,
    "./routes/cabinet/announcement-violations.tsx":
      $cabinet_announcement_violations,
    "./routes/cabinet/announcements.tsx": $cabinet_announcements,
    "./routes/cabinet/announcements/[id].tsx": $cabinet_announcements_id_,
    "./routes/cabinet/complaints.tsx": $cabinet_complaints,
    "./routes/cabinet/deals/[id].tsx": $cabinet_deals_id_,
    "./routes/cabinet/deals/index.tsx": $cabinet_deals_index,
    "./routes/cabinet/document-complaints.tsx": $cabinet_document_complaints,
    "./routes/cabinet/favorites.tsx": $cabinet_favorites,
    "./routes/cabinet/index.tsx": $cabinet_index,
    "./routes/cabinet/profile-violations.tsx": $cabinet_profile_violations,
    "./routes/cabinet/profile.tsx": $cabinet_profile,
    "./routes/cabinet/subscription.tsx": $cabinet_subscription,
    "./routes/cabinet/uploads.tsx": $cabinet_uploads,
    "./routes/index.tsx": $index,
    "./routes/login.tsx": $login,
    "./routes/payment-failed.tsx": $payment_failed,
    "./routes/payment-success.tsx": $payment_success,
    "./routes/payment.tsx": $payment,
    "./routes/register.tsx": $register,
    "./routes/subscriptions.tsx": $subscriptions,
  },
  islands: {
    "./islands/payment-form.tsx": $payment_form,
    "./routes/(announcements)/(_islands)/announcement-details.tsx":
      $_announcements_islands_announcement_details,
    "./routes/(announcements)/(_islands)/filter-controls.tsx":
      $_announcements_islands_filter_controls,
    "./routes/(announcements)/(_islands)/respond-button.tsx":
      $_announcements_islands_respond_button,
    "./routes/(database)/(_islands)/ad-banner.tsx":
      $_database_islands_ad_banner,
    "./routes/(database)/(_islands)/back-button.tsx":
      $_database_islands_back_button,
    "./routes/(database)/(_islands)/document-list.tsx":
      $_database_islands_document_list,
    "./routes/(database)/(_islands)/filter-panel.tsx":
      $_database_islands_filter_panel,
    "./routes/(database)/(_islands)/pdf-viewer.tsx":
      $_database_islands_pdf_viewer,
    "./routes/(database)/(_islands)/recommendations.tsx":
      $_database_islands_recommendations,
    "./routes/(database)/(_islands)/search-bar.tsx":
      $_database_islands_search_bar,
    "./routes/cabinet/(_islands)/accept-teacher.tsx":
      $cabinet_islands_accept_teacher,
    "./routes/cabinet/(_islands)/announcement-manager.tsx":
      $cabinet_islands_announcement_manager,
    "./routes/cabinet/(_islands)/chat.tsx": $cabinet_islands_chat,
    "./routes/cabinet/(_islands)/cost-adjuster.tsx":
      $cabinet_islands_cost_adjuster,
    "./routes/cabinet/(_islands)/filter-complaints.tsx":
      $cabinet_islands_filter_complaints,
    "./routes/cabinet/(_islands)/popup-chat.tsx": $cabinet_islands_popup_chat,
    "./routes/cabinet/(_islands)/price-negotiation.tsx":
      $cabinet_islands_price_negotiation,
    "./routes/cabinet/(_islands)/rating.tsx": $cabinet_islands_rating,
    "./routes/cabinet/(_islands)/reject-teacher.tsx":
      $cabinet_islands_reject_teacher,
    "./routes/cabinet/(_islands)/teacher-response-manager.tsx":
      $cabinet_islands_teacher_response_manager,
    "./routes/cabinet/(_islands)/upload-work.tsx": $cabinet_islands_upload_work,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;

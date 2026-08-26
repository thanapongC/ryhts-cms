import type { Schema, Struct } from '@strapi/strapi';

export interface ContactFloatingContactAction extends Struct.ComponentSchema {
  collectionName: 'components_contact_floating_contact_action';
  info: {
    description: 'An action button in the floating contact widget';
    displayName: 'Contact Action';
  };
  attributes: {
    aria_label: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    is_active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    open_in_new_tab: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    sort_order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    type: Schema.Attribute.Enumeration<
      ['phone', 'email', 'line', 'whatsapp', 'link']
    > &
      Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CookiePolicyCategory extends Struct.ComponentSchema {
  collectionName: 'components_cookie_policy_category';
  info: {
    description: 'Cookie category card for the Cookie Policy page';
    displayName: 'Cookie Policy Category';
  };
  attributes: {
    accent: Schema.Attribute.Enumeration<['red', 'orange']>;
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Enumeration<
      ['shield', 'settings', 'analytics', 'marketing']
    >;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String;
  };
}

export interface DownloadsReleaseChange extends Struct.ComponentSchema {
  collectionName: 'components_downloads_release_change';
  info: {
    description: 'A single change item in a release notes entry';
    displayName: 'Release Change';
  };
  attributes: {
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FaqFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_faq_faq_item';
  info: {
    description: 'A single FAQ question and answer';
    displayName: 'FAQ Item';
  };
  attributes: {
    answer: Schema.Attribute.RichText & Schema.Attribute.Required;
    is_active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    question: Schema.Attribute.String & Schema.Attribute.Required;
    sort_order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface FooterFooterLink extends Struct.ComponentSchema {
  collectionName: 'components_footer_footer_link';
  info: {
    description: 'Individual link in a footer section';
    displayName: 'Footer Link';
  };
  attributes: {
    is_active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    product_page: Schema.Attribute.Relation<
      'manyToOne',
      'api::product.product'
    >;
    sort_order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    target: Schema.Attribute.Enumeration<['_self', '_blank']> &
      Schema.Attribute.DefaultTo<'_self'>;
    url: Schema.Attribute.String;
  };
}

export interface FooterFooterSection extends Struct.ComponentSchema {
  collectionName: 'components_footer_footer_section';
  info: {
    description: 'A column/group of links in the footer';
    displayName: 'Footer Section';
  };
  attributes: {
    is_active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    links: Schema.Attribute.Component<'footer.footer-link', true>;
    sort_order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FooterLegalLink extends Struct.ComponentSchema {
  collectionName: 'components_footer_legal_link';
  info: {
    description: 'Legal page link in the footer (Privacy Policy, Terms, etc.)';
    displayName: 'Legal Link';
  };
  attributes: {
    is_active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    sort_order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    target: Schema.Attribute.Enumeration<['_self', '_blank']> &
      Schema.Attribute.DefaultTo<'_self'>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FreeTrialFormLabels extends Struct.ComponentSchema {
  collectionName: 'components_free_trial_form_labels';
  info: {
    description: 'Localized labels for the Free Trial signup form';
    displayName: 'Form Labels';
  };
  attributes: {
    is_active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    placeholder: Schema.Attribute.String;
    sort_order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface FreeTrialTrialFeature extends Struct.ComponentSchema {
  collectionName: 'components_free_trial_trial_feature';
  info: {
    description: 'Feature highlight for Free Trial page';
    displayName: 'Trial Feature';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    is_active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    sort_order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FreeTrialTrustItem extends Struct.ComponentSchema {
  collectionName: 'components_free_trial_trust_item';
  info: {
    description: 'Trust signal for Free Trial page (e.g. No credit card, Free trial)';
    displayName: 'Trust Item';
  };
  attributes: {
    icon: Schema.Attribute.String;
    is_active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    sort_order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface NavigationFooterSection extends Struct.ComponentSchema {
  collectionName: 'components_navigation_footer_section';
  info: {
    description: 'A column/group of links in the footer navigation';
    displayName: 'Navigation Footer Section';
  };
  attributes: {
    is_active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    links: Schema.Attribute.Component<'navigation.nav-child-item', true>;
    sort_order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface NavigationNavChildItem extends Struct.ComponentSchema {
  collectionName: 'components_navigation_nav_child_item';
  info: {
    description: 'A nested navigation link inside a dropdown menu';
    displayName: 'Nav Child Item';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    product_page: Schema.Attribute.Relation<
      'manyToOne',
      'api::product.product'
    >;
    target: Schema.Attribute.Enumeration<['_self', '_blank']> &
      Schema.Attribute.DefaultTo<'_self'>;
    url: Schema.Attribute.String;
  };
}

export interface NavigationNavItem extends Struct.ComponentSchema {
  collectionName: 'components_navigation_nav_item';
  info: {
    description: 'A header navigation menu item with optional dropdown children';
    displayName: 'Nav Item';
  };
  attributes: {
    children: Schema.Attribute.Component<'navigation.nav-child-item', true>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    target: Schema.Attribute.Enumeration<['_self', '_blank']> &
      Schema.Attribute.DefaultTo<'_self'>;
    url: Schema.Attribute.String;
  };
}

export interface NavigationProductName extends Struct.ComponentSchema {
  collectionName: 'components_navigation_product_name';
  info: {
    description: 'Product name mapping for navigation display';
    displayName: 'Product Name';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
    sort_order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    url: Schema.Attribute.String;
  };
}

export interface PricingPlanFeature extends Struct.ComponentSchema {
  collectionName: 'components_pricing_plan_feature';
  info: {
    description: 'Links a pricing feature to a plan with an included/not-included status';
    displayName: 'Plan Feature';
  };
  attributes: {
    feature: Schema.Attribute.Relation<'manyToOne', 'api::faq.faq'>;
    included: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    note: Schema.Attribute.String;
  };
}

export interface PrivacyPolicySection extends Struct.ComponentSchema {
  collectionName: 'components_privacy_policy_section';
  info: {
    description: 'A section of the privacy policy with heading and content';
    displayName: 'Policy Section';
  };
  attributes: {
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
    is_active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    sort_order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PrivacyRelatedLink extends Struct.ComponentSchema {
  collectionName: 'components_privacy_related_link';
  info: {
    description: 'Related link for privacy policy (e.g. product-specific policies)';
    displayName: 'Related Link';
  };
  attributes: {
    is_active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    product: Schema.Attribute.Relation<'manyToOne', 'api::product.product'>;
    sort_order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    url: Schema.Attribute.String;
  };
}

export interface PrivacyRequestTip extends Struct.ComponentSchema {
  collectionName: 'components_privacy_request_tip';
  info: {
    description: 'Before-submit checklist item for the Privacy Request page';
    displayName: 'Privacy Request Tip';
  };
  attributes: {
    accent: Schema.Attribute.Enumeration<['red', 'orange']>;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    text: Schema.Attribute.Text;
  };
}

export interface PrivacyRequestTypeOption extends Struct.ComponentSchema {
  collectionName: 'components_privacy_request_type_option';
  info: {
    description: 'Selectable request type option for the Privacy Request form';
    displayName: 'Privacy Request Type Option';
  };
  attributes: {
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    label: Schema.Attribute.String;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    value: Schema.Attribute.Enumeration<
      [
        'access',
        'correction',
        'deletion',
        'restriction',
        'objection',
        'withdrawal',
      ]
    > &
      Schema.Attribute.Required;
  };
}

export interface SharedButtonLabels extends Struct.ComponentSchema {
  collectionName: 'components_shared_button_labels';
  info: {
    description: 'Shared CTA and action button labels across the site';
    displayName: 'Button Labels';
  };
  attributes: {
    back_to_home: Schema.Attribute.String;
    call_now: Schema.Attribute.String;
    contact_us: Schema.Attribute.String;
    download: Schema.Attribute.String;
    learn_more: Schema.Attribute.String;
    read_more: Schema.Attribute.String;
    request_quote: Schema.Attribute.String;
    view_all: Schema.Attribute.String;
  };
}

export interface SharedContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_shared_contact_info';
  info: {
    description: 'Contact information display with icon and label';
    displayName: 'Contact Info';
  };
  attributes: {
    icon: Schema.Attribute.String;
    is_active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    sort_order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    url: Schema.Attribute.String;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedCookieConsentSettings extends Struct.ComponentSchema {
  collectionName: 'components_shared_cookie_consent_settings';
  info: {
    description: 'Cookie consent banner labels, descriptions, and action text';
    displayName: 'Cookie Consent Settings';
  };
  attributes: {
    accept_all_label: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Accept All'>;
    always_on_label: Schema.Attribute.String;
    analytics_description: Schema.Attribute.Text;
    analytics_label: Schema.Attribute.String;
    cookie_policy_label: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    learn_more_label: Schema.Attribute.String;
    manage_label: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Manage Preferences'>;
    marketing_description: Schema.Attribute.Text;
    marketing_label: Schema.Attribute.String;
    necessary_description: Schema.Attribute.Text;
    necessary_label: Schema.Attribute.String;
    privacy_policy_label: Schema.Attribute.String;
    reject_all_label: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Reject All'>;
    save_label: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Save Preferences'>;
    title: Schema.Attribute.String;
  };
}

export interface SharedFooterLabels extends Struct.ComponentSchema {
  collectionName: 'components_shared_footer_labels';
  info: {
    description: 'Shared footer heading and link labels';
    displayName: 'Footer Labels';
  };
  attributes: {
    about_heading: Schema.Attribute.String;
    contact_heading: Schema.Attribute.String;
    links_heading: Schema.Attribute.String;
    newsletter_button: Schema.Attribute.String;
    newsletter_heading: Schema.Attribute.String;
    newsletter_placeholder: Schema.Attribute.String;
  };
}

export interface SharedPageSectionItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_page_section_item';
  info: {
    description: 'A single section with title, content, and optional image for product pages';
    displayName: 'Page Section Item';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images'>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedPdpaSettings extends Struct.ComponentSchema {
  collectionName: 'components_shared_pdpa_settings';
  info: {
    description: 'PDPA compliance settings: privacy request form labels, legal contact info';
    displayName: 'PDPA Settings';
  };
  attributes: {
    beforeSubmitDescription: Schema.Attribute.Text;
    beforeSubmitTips: Schema.Attribute.Component<'privacy.request-tip', true>;
    beforeSubmitTitle: Schema.Attribute.String;
    businessHoursLabel: Schema.Attribute.String;
    dpoContactLabel: Schema.Attribute.String;
    dpoEmail: Schema.Attribute.Email;
    dpoPhone: Schema.Attribute.String;
    emailLabel: Schema.Attribute.String;
    formAdditionalInfoLabel: Schema.Attribute.String;
    formAdditionalInfoPlaceholder: Schema.Attribute.Text;
    formBadge: Schema.Attribute.String;
    formCompanyLabel: Schema.Attribute.String;
    formCompanyPlaceholder: Schema.Attribute.String;
    formEmailLabel: Schema.Attribute.String;
    formEmailPlaceholder: Schema.Attribute.String;
    formMessageLabel: Schema.Attribute.String;
    formMessagePlaceholder: Schema.Attribute.Text;
    formNameLabel: Schema.Attribute.String;
    formNamePlaceholder: Schema.Attribute.String;
    formNote: Schema.Attribute.Text;
    formPhoneLabel: Schema.Attribute.String;
    formPhonePlaceholder: Schema.Attribute.String;
    formRequestTypeLabel: Schema.Attribute.String;
    formRequestTypePlaceholder: Schema.Attribute.String;
    formSubmitLabel: Schema.Attribute.String;
    formSubmittingLabel: Schema.Attribute.String;
    formSuccessMessage: Schema.Attribute.Text;
    formSuccessTitle: Schema.Attribute.String;
    formTitle: Schema.Attribute.String;
    heroBadge: Schema.Attribute.String;
    legalContactInfo: Schema.Attribute.Component<'shared.contact-info', false>;
    phoneLabel: Schema.Attribute.String;
    privacyRequestDesc: Schema.Attribute.Text;
    privacyRequestTitle: Schema.Attribute.String;
    requestTypes: Schema.Attribute.Component<
      'privacy.request-type-option',
      true
    >;
    requiredFieldsNote: Schema.Attribute.String;
    responseTimeDescription: Schema.Attribute.Text;
    responseTimeLabel: Schema.Attribute.String;
    secureNoteDescription: Schema.Attribute.Text;
    secureNoteLabel: Schema.Attribute.String;
  };
}

export interface SharedSeoConfig extends Struct.ComponentSchema {
  collectionName: 'components_shared_seo_config';
  info: {
    description: 'Site-wide SEO defaults, social profiles, and analytics (used only in Global Setting)';
    displayName: 'SEO Config';
  };
  attributes: {
    brand_name: Schema.Attribute.String;
    default_description: Schema.Attribute.Text;
    default_og_image: Schema.Attribute.Media<'images'>;
    default_title: Schema.Attribute.String;
    facebook_pixel_id: Schema.Attribute.String;
    facebook_url: Schema.Attribute.String;
    google_analytics_id: Schema.Attribute.String;
    line_url: Schema.Attribute.String;
    site_name: Schema.Attribute.String;
    site_url: Schema.Attribute.String;
    twitter_handle: Schema.Attribute.String;
    twitter_url: Schema.Attribute.String;
  };
}

export interface SharedSeoMeta extends Struct.ComponentSchema {
  collectionName: 'components_shared_seo_meta';
  info: {
    description: 'Page-level SEO metadata for search engines and social sharing';
    displayName: 'SEO Meta';
  };
  attributes: {
    alternate_languages: Schema.Attribute.JSON;
    canonical_url: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    max_image_preview: Schema.Attribute.Enumeration<
      ['none', 'standard', 'large']
    >;
    max_snippet: Schema.Attribute.Integer;
    max_video_preview: Schema.Attribute.Integer;
    meta_description: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    meta_title: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    noarchive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    nofollow: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    noindex: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    nosnippet: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    og_description: Schema.Attribute.Text;
    og_image: Schema.Attribute.Media<'images'>;
    og_title: Schema.Attribute.String;
    og_type: Schema.Attribute.Enumeration<['website', 'article', 'product']> &
      Schema.Attribute.DefaultTo<'website'>;
    schema_type: Schema.Attribute.String;
    twitter_description: Schema.Attribute.Text;
    twitter_image: Schema.Attribute.Media<'images'>;
    twitter_title: Schema.Attribute.String;
  };
}

export interface SharedStatItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_stat_item';
  info: {
    description: 'Statistics display with number and label';
    displayName: 'Stat Item';
  };
  attributes: {
    icon: Schema.Attribute.String;
    is_active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    sort_order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SupportContactSection extends Struct.ComponentSchema {
  collectionName: 'components_support_contact_section';
  info: {
    description: 'Contact section heading and field labels';
    displayName: 'Support Contact Section';
  };
  attributes: {
    addressLabel: Schema.Attribute.String;
    badge: Schema.Attribute.String;
    businessHoursLabel: Schema.Attribute.String;
    emailLabel: Schema.Attribute.String;
    phoneLabel: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SupportFaqSection extends Struct.ComponentSchema {
  collectionName: 'components_support_faq_section';
  info: {
    description: 'FAQ section headings and fallback CTA copy';
    displayName: 'Support FAQ Section';
  };
  attributes: {
    badge: Schema.Attribute.String;
    contactCtaLabel: Schema.Attribute.String;
    emptyPrompt: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SupportHelpCenterSection extends Struct.ComponentSchema {
  collectionName: 'components_support_help_center_section';
  info: {
    description: 'Help Center heading copy for support resource cards';
    displayName: 'Support Help Center Section';
  };
  attributes: {
    badge: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SupportHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_support_hero_section';
  info: {
    description: 'Hero copy and navigation CTA labels for the support page';
    displayName: 'Support Hero Section';
  };
  attributes: {
    badge: Schema.Attribute.String;
    contactCtaLabel: Schema.Attribute.String;
    faqCtaLabel: Schema.Attribute.String;
    manualCtaLabel: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SupportStatusCard extends Struct.ComponentSchema {
  collectionName: 'components_support_status_card';
  info: {
    description: 'Support team availability card shown beside the hero';
    displayName: 'Support Status Card';
  };
  attributes: {
    hours: Schema.Attribute.String;
    kicker: Schema.Attribute.String;
    statusLabel: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'contact-floating.contact-action': ContactFloatingContactAction;
      'cookie.policy-category': CookiePolicyCategory;
      'downloads.release-change': DownloadsReleaseChange;
      'faq.faq-item': FaqFaqItem;
      'footer.footer-link': FooterFooterLink;
      'footer.footer-section': FooterFooterSection;
      'footer.legal-link': FooterLegalLink;
      'free-trial.form-labels': FreeTrialFormLabels;
      'free-trial.trial-feature': FreeTrialTrialFeature;
      'free-trial.trust-item': FreeTrialTrustItem;
      'navigation.footer-section': NavigationFooterSection;
      'navigation.nav-child-item': NavigationNavChildItem;
      'navigation.nav-item': NavigationNavItem;
      'navigation.product-name': NavigationProductName;
      'pricing.plan-feature': PricingPlanFeature;
      'privacy.policy-section': PrivacyPolicySection;
      'privacy.related-link': PrivacyRelatedLink;
      'privacy.request-tip': PrivacyRequestTip;
      'privacy.request-type-option': PrivacyRequestTypeOption;
      'shared.button-labels': SharedButtonLabels;
      'shared.contact-info': SharedContactInfo;
      'shared.cookie-consent-settings': SharedCookieConsentSettings;
      'shared.footer-labels': SharedFooterLabels;
      'shared.page-section-item': SharedPageSectionItem;
      'shared.pdpa-settings': SharedPdpaSettings;
      'shared.seo-config': SharedSeoConfig;
      'shared.seo-meta': SharedSeoMeta;
      'shared.stat-item': SharedStatItem;
      'support.contact-section': SupportContactSection;
      'support.faq-section': SupportFaqSection;
      'support.help-center-section': SupportHelpCenterSection;
      'support.hero-section': SupportHeroSection;
      'support.status-card': SupportStatusCard;
    }
  }
}

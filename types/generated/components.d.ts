import type { Schema, Struct } from '@strapi/strapi';

export interface BlogHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_blog_hero_sections';
  info: {
    description: 'Hero copy for the blog listing page';
    displayName: 'Blog Hero Section';
    icon: 'newspaper';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    badge: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    description: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface BlogListingSection extends Struct.ComponentSchema {
  collectionName: 'components_blog_listing_sections';
  info: {
    description: 'Listing section copy and empty state for the blog page';
    displayName: 'Blog Listing Section';
    icon: 'list';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    breadcrumbLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    emptyDescription: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    emptyTitle: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    offlineMessage: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    offlineTitle: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface ContactFloatingContactAction extends Struct.ComponentSchema {
  collectionName: 'components_contact_floating_contact_actions';
  info: {
    displayName: 'Contact Action';
    icon: 'phone';
  };
  attributes: {
    ariaLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    description: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    label: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    openInNewTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    type: Schema.Attribute.Enumeration<
      ['phone', 'line', 'email', 'facebook', 'map', 'custom']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'custom'>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CookiePolicyCategory extends Struct.ComponentSchema {
  collectionName: 'components_cookie_policy_categories';
  info: {
    description: 'Cookie category card for the Cookie Policy page';
    displayName: 'Cookie Policy Category';
    icon: 'cookie';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    accent: Schema.Attribute.Enumeration<['red', 'orange']> &
      Schema.Attribute.DefaultTo<'red'>;
    description: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    icon: Schema.Attribute.Enumeration<
      ['shield', 'settings', 'analytics', 'marketing']
    > &
      Schema.Attribute.DefaultTo<'shield'>;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface DownloadsReleaseChange extends Struct.ComponentSchema {
  collectionName: 'components_downloads_release_changes';
  info: {
    displayName: 'Release Change';
    icon: 'check';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    text: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
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
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    question: Schema.Attribute.String & Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface FooterFooterLink extends Struct.ComponentSchema {
  collectionName: 'components_footer_footer_links';
  info: {
    description: 'A footer navigation link. Use either URL or Product Page relation.';
    displayName: 'Footer Link';
    icon: 'link';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    label: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    productPage: Schema.Attribute.Relation<
      'manyToOne',
      'api::product-page.product-page'
    >;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    target: Schema.Attribute.Enumeration<['_self', '_blank']> &
      Schema.Attribute.DefaultTo<'_self'>;
    url: Schema.Attribute.String;
  };
}

export interface FooterFooterSection extends Struct.ComponentSchema {
  collectionName: 'components_footer_footer_sections';
  info: {
    description: 'A footer column with ordered links';
    displayName: 'Footer Section';
    icon: 'list';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    links: Schema.Attribute.Component<'footer.footer-link', true>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface FooterLegalLink extends Struct.ComponentSchema {
  collectionName: 'components_footer_legal_links';
  info: {
    displayName: 'Legal Link';
    icon: 'link';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    label: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    target: Schema.Attribute.Enumeration<['_self', '_blank']> &
      Schema.Attribute.DefaultTo<'_self'>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FreeTrialFormLabels extends Struct.ComponentSchema {
  collectionName: 'components_free_trial_form_labels';
  info: {
    displayName: 'Form Labels';
    icon: 'write';
  };
  attributes: {
    addressLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    addressPlaceholder: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    businessDetailsLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    businessDetailsPlaceholder: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    companyLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    companyPlaceholder: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    emailLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    emailPlaceholder: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    fullNameLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    fullNamePlaceholder: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    marketingConsentDescription: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    marketingConsentLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    phoneLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    phonePlaceholder: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    positionLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    positionPlaceholder: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    privacyConsentPrefix: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    privacyConsentSuffix: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    privacyPolicyLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    privacyPolicyUrl: Schema.Attribute.String;
    submitLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    successMessage: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    successTitle: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface FreeTrialTrialFeature extends Struct.ComponentSchema {
  collectionName: 'components_free_trial_trial_features';
  info: {
    displayName: 'Trial Feature';
    icon: 'star';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface FreeTrialTrustItem extends Struct.ComponentSchema {
  collectionName: 'components_free_trial_trust_items';
  info: {
    displayName: 'Trust Item';
    icon: 'check';
  };
  attributes: {
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    label: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface NavigationFooterSection extends Struct.ComponentSchema {
  collectionName: 'components_navigation_footer_sections';
  info: {
    description: 'A footer column grouping navigation links under a title';
    displayName: 'Footer Section';
    icon: 'list';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    links: Schema.Attribute.Component<'navigation.nav-item', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface NavigationNavChildItem extends Struct.ComponentSchema {
  collectionName: 'components_navigation_nav_child_items';
  info: {
    description: 'A second-level navigation link';
    displayName: 'Nav Child Item';
    icon: 'caretRight';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    label: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    productPage: Schema.Attribute.Relation<
      'manyToOne',
      'api::product-page.product-page'
    >;
    target: Schema.Attribute.Enumeration<['_self', '_blank']> &
      Schema.Attribute.DefaultTo<'_self'>;
    url: Schema.Attribute.String;
  };
}

export interface NavigationNavItem extends Struct.ComponentSchema {
  collectionName: 'components_navigation_nav_items';
  info: {
    description: 'A single navigation link with optional nested children';
    displayName: 'Nav Item';
    icon: 'caretRight';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    children: Schema.Attribute.Component<'navigation.nav-child-item', true>;
    label: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    target: Schema.Attribute.Enumeration<['_self', '_blank']> &
      Schema.Attribute.DefaultTo<'_self'>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface NavigationProductName extends Struct.ComponentSchema {
  collectionName: 'components_navigation_product_names';
  info: {
    description: 'A product name and URL for navigation';
    displayName: 'Product Name';
    icon: 'cube';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PricingPlanFeature extends Struct.ComponentSchema {
  collectionName: 'components_pricing_plan_features';
  info: {
    description: 'Links a pricing feature to a plan with an included/not-included status';
    displayName: 'Plan Feature';
    icon: 'check';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    feature: Schema.Attribute.Relation<
      'manyToOne',
      'api::pricing-feature.pricing-feature'
    >;
    included: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    note: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface PrivacyPolicySection extends Struct.ComponentSchema {
  collectionName: 'components_privacy_policy_sections';
  info: {
    displayName: 'Policy Section';
    icon: 'file';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    content: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    icon: Schema.Attribute.Enumeration<
      ['shield', 'database', 'users', 'cookie', 'lock', 'mail', 'file']
    > &
      Schema.Attribute.DefaultTo<'file'>;
    isHighlighted: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    slug: Schema.Attribute.UID;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    summary: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface PrivacyRelatedLink extends Struct.ComponentSchema {
  collectionName: 'components_privacy_related_links';
  info: {
    description: 'A related legal or privacy page link';
    displayName: 'Related Link';
    icon: 'link';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    label: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PrivacyRequestTip extends Struct.ComponentSchema {
  collectionName: 'components_privacy_request_tips';
  info: {
    description: 'Before-submit checklist item for the Privacy Request page';
    displayName: 'Privacy Request Tip';
    icon: 'checkCircle';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    accent: Schema.Attribute.Enumeration<['red', 'orange']> &
      Schema.Attribute.DefaultTo<'red'>;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    text: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface PrivacyRequestTypeOption extends Struct.ComponentSchema {
  collectionName: 'components_privacy_request_type_options';
  info: {
    description: 'Selectable request type option for the Privacy Request form';
    displayName: 'Privacy Request Type Option';
    icon: 'bulletList';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    label: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
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
      Schema.Attribute.DefaultTo<'access'>;
  };
}

export interface SharedButtonLabels extends Struct.ComponentSchema {
  collectionName: 'components_shared_button_labels';
  info: {
    description: 'Global button and CTA labels';
    displayName: 'Button Labels';
    icon: 'cursor';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    contactOrderLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    freeTrialLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    readMoreLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    subscribeLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    tryFreeLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    viewAllLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    viewDetailsLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface SharedContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_shared_contact_infos';
  info: {
    description: 'Company contact information block';
    displayName: 'Contact Info';
    icon: 'phone';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    address: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    businessHours: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    companyName: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    email: Schema.Attribute.Email;
    mapUrl: Schema.Attribute.String;
    phone: Schema.Attribute.String;
    socialLinks: Schema.Attribute.JSON;
  };
}

export interface SharedCookieConsentSettings extends Struct.ComponentSchema {
  collectionName: 'components_shared_cookie_consent_settings';
  info: {
    description: 'PDPA cookie consent banner configuration';
    displayName: 'Cookie Consent Settings';
    icon: 'shield';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    acceptAllLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    alwaysOnLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    analyticsDesc: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    analyticsLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    closeLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    cookiePolicyLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    description: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    functionalDesc: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    functionalLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    learnMoreLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    manageLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    marketingDesc: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    marketingLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    necessaryDesc: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    necessaryLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    privacyPolicyLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    rejectAllLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    savePreferencesLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    title: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface SharedFooterLabels extends Struct.ComponentSchema {
  collectionName: 'components_shared_footer_labels';
  info: {
    description: 'Footer section labels and headings';
    displayName: 'Footer Labels';
    icon: 'tag';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    contactInfoTitle: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    contactUsLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    cookiePolicyLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    cookieSettingsLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    copyright: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    dataRequestLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    helpCenterLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    helpTitle: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    manualLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    privacyPolicyLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    privacyTitle: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface SharedPageSectionItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_page_section_items';
  info: {
    description: 'A single section with title, content, and optional image for product pages';
    displayName: 'Page Section Item';
    icon: 'alignLeft';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    content: Schema.Attribute.Blocks &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    image: Schema.Attribute.Media<'images'>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface SharedPdpaSettings extends Struct.ComponentSchema {
  collectionName: 'components_shared_pdpa_settings';
  info: {
    description: 'PDPA compliance settings: privacy request form labels, legal contact info';
    displayName: 'PDPA Settings';
    icon: 'fileText';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    beforeSubmitDescription: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    beforeSubmitTips: Schema.Attribute.Component<'privacy.request-tip', true>;
    beforeSubmitTitle: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    businessHoursLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    dpoContactLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    dpoEmail: Schema.Attribute.Email;
    dpoPhone: Schema.Attribute.String;
    emailLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    formAdditionalInfoLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    formAdditionalInfoPlaceholder: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    formBadge: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    formCompanyLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    formCompanyPlaceholder: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    formEmailLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    formEmailPlaceholder: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    formMessageLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    formMessagePlaceholder: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    formNameLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    formNamePlaceholder: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    formNote: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    formPhoneLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    formPhonePlaceholder: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    formRequestTypeLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    formRequestTypePlaceholder: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    formSubmitLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    formSubmittingLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    formSuccessMessage: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    formSuccessTitle: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    formTitle: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    heroBadge: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    legalContactInfo: Schema.Attribute.Component<'shared.contact-info', false>;
    phoneLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    privacyRequestDesc: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    privacyRequestTitle: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    requestTypes: Schema.Attribute.Component<
      'privacy.request-type-option',
      true
    >;
    requiredFieldsNote: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    responseTimeDescription: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    responseTimeLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    secureNoteDescription: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    secureNoteLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface SharedSeoConfig extends Struct.ComponentSchema {
  collectionName: 'components_shared_seo_configs';
  info: {
    description: 'Site-wide SEO configuration: site name, defaults, social links';
    displayName: 'SEO Config';
    icon: 'globe';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    brandName: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    defaultDescription: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    defaultOgImage: Schema.Attribute.Media<'images'>;
    defaultTitle: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    facebookPixelId: Schema.Attribute.String;
    facebookUrl: Schema.Attribute.String;
    googleAnalyticsId: Schema.Attribute.String;
    lineUrl: Schema.Attribute.String;
    linkedinUrl: Schema.Attribute.String;
    robotsAllowPaths: Schema.Attribute.JSON;
    robotsCrawlDelay: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<1>;
    robotsDisallowPaths: Schema.Attribute.JSON;
    robotsSitemapUrl: Schema.Attribute.String;
    robotsUserAgent: Schema.Attribute.String & Schema.Attribute.DefaultTo<'*'>;
    siteName: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    siteUrl: Schema.Attribute.String & Schema.Attribute.Required;
    twitterHandle: Schema.Attribute.String;
    youtubeUrl: Schema.Attribute.String;
  };
}

export interface SharedSeoMeta extends Struct.ComponentSchema {
  collectionName: 'components_shared_seo_metas';
  info: {
    description: 'Reusable SEO metadata: title, description, OG image, schema type';
    displayName: 'SEO Meta';
    icon: 'search';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    alternateLanguages: Schema.Attribute.JSON;
    canonicalUrl: Schema.Attribute.String;
    keywords: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    maxImagePreview: Schema.Attribute.Enumeration<
      ['none', 'standard', 'large']
    > &
      Schema.Attribute.DefaultTo<'large'>;
    maxSnippet: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<-1>;
    maxVideoPreview: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<-1>;
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    noarchive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    nofollow: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    noindex: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    nosnippet: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    ogDescription: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    ogType: Schema.Attribute.Enumeration<['website', 'article', 'product']> &
      Schema.Attribute.DefaultTo<'website'>;
    schemaType: Schema.Attribute.Enumeration<
      [
        'WebPage',
        'AboutPage',
        'ProductPage',
        'CollectionPage',
        'FAQPage',
        'ContactPage',
        'Article',
        'SoftwareApplication',
      ]
    > &
      Schema.Attribute.DefaultTo<'WebPage'>;
  };
}

export interface SharedStatItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_stat_items';
  info: {
    description: 'A single statistic entry with a value and label';
    displayName: 'Stat Item';
    icon: 'chartCircle';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    label: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SupportContactSection extends Struct.ComponentSchema {
  collectionName: 'components_support_contact_sections';
  info: {
    description: 'Contact section heading and field labels';
    displayName: 'Support Contact Section';
    icon: 'phone';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    addressLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    badge: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    businessHoursLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    emailLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    phoneLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface SupportFaqSection extends Struct.ComponentSchema {
  collectionName: 'components_support_faq_sections';
  info: {
    description: 'FAQ section headings and fallback CTA copy';
    displayName: 'Support FAQ Section';
    icon: 'question';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    badge: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    contactCtaLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    emptyPrompt: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    subtitle: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface SupportHelpCenterSection extends Struct.ComponentSchema {
  collectionName: 'components_support_help_center_sections';
  info: {
    description: 'Help Center heading copy for support resource cards';
    displayName: 'Support Help Center Section';
    icon: 'book';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    badge: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    subtitle: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface SupportHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_support_hero_sections';
  info: {
    description: 'Hero copy and navigation CTA labels for the support page';
    displayName: 'Support Hero Section';
    icon: 'life-ring';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    badge: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    contactCtaLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    faqCtaLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    manualCtaLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    subtitle: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface SupportStatusCard extends Struct.ComponentSchema {
  collectionName: 'components_support_status_cards';
  info: {
    description: 'Support team availability card shown beside the hero';
    displayName: 'Support Status Card';
    icon: 'headset';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    hours: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    kicker: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    statusLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    title: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'blog.hero-section': BlogHeroSection;
      'blog.listing-section': BlogListingSection;
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

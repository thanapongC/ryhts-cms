import type { Schema, Struct } from '@strapi/strapi';

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
    open_in_new_tab: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    product: Schema.Attribute.Relation<'manyToOne', 'api::product.product'>;
    sort_order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
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

export interface SharedSeoMeta extends Struct.ComponentSchema {
  collectionName: 'components_shared_seo_meta';
  info: {
    description: 'Search engine optimization and social media meta fields';
    displayName: 'SEO Meta';
  };
  attributes: {
    canonical_url: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    meta_description: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    meta_title: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    og_description: Schema.Attribute.Text;
    og_image: Schema.Attribute.Media<'images'>;
    og_title: Schema.Attribute.String;
    robots: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'index, follow'>;
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

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'faq.faq-item': FaqFaqItem;
      'footer.footer-link': FooterFooterLink;
      'footer.footer-section': FooterFooterSection;
      'footer.legal-link': FooterLegalLink;
      'free-trial.form-labels': FreeTrialFormLabels;
      'free-trial.trial-feature': FreeTrialTrialFeature;
      'free-trial.trust-item': FreeTrialTrustItem;
      'privacy.policy-section': PrivacyPolicySection;
      'privacy.related-link': PrivacyRelatedLink;
      'shared.contact-info': SharedContactInfo;
      'shared.seo-meta': SharedSeoMeta;
      'shared.stat-item': SharedStatItem;
    }
  }
}

# Website UI Modernization Prompt

You are an expert UI/UX designer and frontend developer. Your task is to **redesign and modernize the existing website at `http://localhost:4323/th`**.

The goal is to create a clean, modern, professional, premium, and visually balanced website using the new brand color system based primarily on:

* **Primary Blue:** `#017FE4`
* **White:** `#FFFFFF`

You may introduce supporting neutral colors where necessary to improve readability, hierarchy, accessibility, and overall visual quality.

---

## 1. Primary Objective

Improve the website's:

* Color system
* UI components
* Typography
* Spacing
* Visual hierarchy
* Buttons
* Cards
* Navigation
* Hero section
* Forms
* Footer
* Responsive behavior
* Micro-interactions

The final design should feel:

* Modern
* Clean
* Professional
* Premium
* Trustworthy
* Minimal
* Technology-oriented
* Easy to navigate
* Visually consistent

**Do not simply replace the existing colors. Redesign the UI where necessary so the new blue-and-white visual identity feels intentional and cohesive.**

---

# 2. Brand Color System

## Primary Brand Color

### Blue

`#017FE4`

This is the **main brand color** and should be the strongest visual accent throughout the website.

Use it for:

* Primary CTA buttons
* Active navigation
* Important links
* Key icons
* Highlights
* Selected states
* Important badges
* Brand accents
* Form focus states
* Interactive elements

Do not use blue excessively. Large areas of saturated blue should be used strategically.

---

## Primary Background

### White

`#FFFFFF`

Use white as the primary background color.

White should dominate the interface to create:

* Cleanliness
* Spaciousness
* Professionalism
* Premium appearance
* Strong contrast with the blue brand color

---

# 3. Supporting Color Palette

You may introduce neutral colors to prevent the interface from becoming visually flat.

### Background Colors

```text
Primary Background:      #FFFFFF
Soft Background:         #F8FAFC
Blue Tint Background:    #EFF8FF
Light Blue Background:   #EAF5FF
Section Background:      #F5F9FC
```

Use these backgrounds subtly.

Do not turn the entire website light blue.

---

## 4. Text Color System

Text colors are extremely important.

Always choose text colors according to the background to maintain excellent readability and accessibility.

### Primary Text

`#111827`

Use for:

* H1
* H2
* H3
* Important headings
* Main content
* Strong labels

### Secondary Text

`#374151`

Use for:

* Paragraphs
* Descriptions
* Supporting content

### Muted Text

`#6B7280`

Use for:

* Metadata
* Helper text
* Secondary information
* Placeholder-like content

### Text on Blue Background

`#FFFFFF`

Use white text when the background is `#017FE4`.

Do not use dark text on the primary blue background.

---

# 5. Border Colors

Use subtle borders.

Recommended:

```text
Default Border:       #E5E7EB
Light Border:         #F1F5F9
Blue Border:          #93C5FD
Strong Blue Border:   #017FE4
```

Avoid thick or overly visible borders.

---

# 6. Brand Gradient

You may use a subtle blue gradient when it improves the visual design.

Recommended:

```css
linear-gradient(135deg, #017FE4 0%, #005CB8 100%)
```

Use gradients selectively for:

* Hero sections
* CTA sections
* Decorative elements
* Feature highlights
* Important visual areas

Do **not** apply gradients to every button or card.

The website should remain clean and premium.

---

# 7. Overall Color Distribution

Use the following approximate visual balance:

```text
70–80%  White / Neutral surfaces
15–20%  Dark text / structural elements
5–10%   Blue brand accents
```

The goal is to make `#017FE4` feel like a strong brand accent rather than overwhelming the interface.

The website should feel closer to a modern SaaS / technology / corporate product website than a heavily colored marketing template.

---

# 8. Header / Navigation

Modernize the existing header while preserving all existing navigation functionality.

Recommended design:

* White background
* Clean spacing
* Subtle bottom border
* Optional very subtle shadow
* Dark text
* Blue active state
* Blue CTA

### Navigation

Default:

`#111827`

Hover:

`#017FE4`

Active:

`#017FE4`

Active navigation may also use a subtle background:

`#EFF8FF`

### CTA

Background:

`#017FE4`

Text:

`#FFFFFF`

Hover:

Use a darker blue such as:

`#006CC2`

Keep the header compact and professional.

---

# 9. Hero Section

Redesign the hero section as the main visual focal point.

The hero should contain:

* Strong headline
* Supporting description
* Primary CTA
* Optional secondary CTA
* Strong visual element
* Generous whitespace
* Subtle blue branding

Preferred approach:

* White or very light background
* Blue typography accents
* Blue CTA
* Subtle blue decorative shapes
* Clean visual composition

Avoid making the entire hero a solid blue block unless the existing content strongly benefits from it.

Use blue strategically to guide attention.

---

# 10. Primary Button

### Primary Button

Background:

`#017FE4`

Text:

`#FFFFFF`

Hover:

`#006CC2`

Active:

`#005BA8`

Focus:

Use a subtle blue focus ring.

Example:

```css
box-shadow: 0 0 0 4px rgba(1, 127, 228, 0.15);
```

Buttons should have:

* Comfortable height
* Clear typography
* Appropriate padding
* Medium border radius
* Smooth hover transition
* Clear focus state

Avoid excessive pill-shaped buttons unless they fit the existing design.

---

# 11. Secondary Button

Use a light blue style.

Background:

`#EFF8FF`

Text:

`#017FE4`

Border:

`#BFDBFE`

Hover:

`#E0F2FE`

This creates a clear distinction between primary and secondary actions.

---

# 12. Cards

Modernize cards throughout the website.

Recommended:

```text
Background:       #FFFFFF
Border:           #E5E7EB
Border Radius:    12px–20px
Shadow:           Very subtle
```

Cards should have:

* Good internal spacing
* Strong heading hierarchy
* Clear descriptions
* Consistent icon positioning

### Hover State

On hover:

* Slight elevation
* Subtle blue border
* Small transform if appropriate
* Smooth transition

Avoid excessive shadows.

Cards should feel lightweight and modern.

---

# 13. Feature Sections

For feature/service sections, use a combination of:

* White cards
* Dark typography
* Blue icons
* Light blue backgrounds
* Subtle blue highlights

Icons can use:

`#017FE4`

Icon backgrounds can use:

`#EFF8FF`

This creates a strong visual connection to the brand color.

---

# 14. Typography

Use a modern sans-serif typeface with excellent Thai language support.

Recommended options:

* `Noto Sans Thai`
* `IBM Plex Sans Thai`
* `LINE Seed Sans TH`
* Another high-quality Thai-compatible sans-serif

Typography should have a clear hierarchy.

### H1

Large, bold, highly prominent.

Use:

`#111827`

with selective blue emphasis where appropriate.

### H2

Strong section headings.

Color:

`#111827`

### H3

Card and subsection headings.

Color:

`#111827`

### Body

Color:

`#374151`

### Supporting Text

Color:

`#6B7280`

Avoid using blue for large amounts of body text.

Blue should primarily communicate interaction and emphasis.

---

# 15. Link Styling

Default links:

`#017FE4`

Hover:

`#006CC2`

Links should be visually identifiable without making every piece of text blue.

Use blue primarily for actual interactive links.

---

# 16. Forms and Inputs

Modernize all forms and input components.

### Default

```text
Background: #FFFFFF
Text:       #111827
Border:     #E5E7EB
Radius:     8px–12px
```

### Focus

```text
Border: #017FE4
```

Use a subtle blue focus ring.

### Placeholder

`#9CA3AF`

### Error

Use an appropriate semantic red such as:

`#DC2626`

Do not use blue to represent errors.

### Success

Use:

`#16A34A`

Always ensure status information is understandable without relying only on color.

---

# 17. Badges and Tags

Use blue sparingly.

### Primary Badge

Background:

`#EFF8FF`

Text:

`#017FE4`

### Neutral Badge

Background:

`#F3F4F6`

Text:

`#374151`

Avoid making every badge blue.

---

# 18. Footer

Redesign the footer so that it feels connected to the new blue-and-white brand identity.

Preferred option:

### Dark Footer

Background:

`#111827`

Text:

`#FFFFFF`

Secondary text:

`#D1D5DB`

Muted text:

`#9CA3AF`

Links:

`#FFFFFF`

Hover:

`#017FE4`

Alternatively, a blue footer may be used if it creates a stronger visual result:

Background:

`#017FE4`

Text:

`#FFFFFF`

However, do not use a strong blue footer if it makes the overall website feel too saturated.

Keep all existing footer links and functionality.

---

# 19. Section Backgrounds

Create visual separation between sections using subtle background changes.

Example:

```text
Hero                  #FFFFFF
Feature Section       #F8FAFC
Services              #FFFFFF
Highlight Section     #EFF8FF
Content Section       #FFFFFF
CTA Section           #017FE4
Footer                #111827
```

Do not use a different background color for every section.

The transitions should feel natural.

---

# 20. CTA Section

Create a strong final CTA section.

Recommended:

Background:

`#017FE4`

Heading:

`#FFFFFF`

Description:

`#E0F2FE`

Primary button:

`#FFFFFF`

Button text:

`#017FE4`

Hover:

`#EFF8FF`

This creates a strong visual ending without requiring additional colors.

---

# 21. Icons

Use a consistent icon library and visual style.

Icons should be:

* Minimal
* Modern
* Consistent
* Simple
* Professional

Primary icons:

`#017FE4`

Icon backgrounds:

`#EFF8FF`

Avoid using too many different icon colors.

---

# 22. Shadows

Keep shadows subtle.

Recommended style:

```css
box-shadow: 0 4px 20px rgba(15, 23, 42, 0.06);
```

For elevated cards:

```css
box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
```

Do not overuse shadows.

---

# 23. Border Radius

Use a consistent radius system.

Recommended:

```text
Small:   8px
Medium:  12px
Large:   16px
XL:      20px
```

Avoid mixing too many different radius values.

---

# 24. Micro-interactions

Add subtle animations where they improve the UX.

Examples:

* Button hover
* Card hover
* Navigation hover
* Image transitions
* Fade-in
* Small elevation changes
* Smooth scrolling

Animations should be:

* Fast
* Subtle
* Professional

Respect:

```css
prefers-reduced-motion
```

Do not add excessive animations.

---

# 25. Responsive Design

The redesigned website must work perfectly across:

* Desktop
* Laptop
* Tablet
* Mobile

Pay particular attention to:

* Header
* Mobile navigation
* Hero
* Typography
* Buttons
* Cards
* Grid layouts
* Images
* Section spacing
* Footer

There must be **no horizontal scrolling on mobile**.

Typography and spacing should scale naturally.

---

# 26. Accessibility

Ensure that the new color system maintains good contrast.

Important rules:

### White Background

Use:

`#111827`

for primary text.

### Blue Background

Use:

`#FFFFFF`

for text.

### Light Blue Background

Use:

`#111827`

for primary text.

### Blue Links

Use:

`#017FE4`

only where sufficient contrast is maintained.

Never sacrifice readability for visual appearance.

Ensure:

* Keyboard focus states
* Accessible buttons
* Accessible form labels
* Semantic HTML
* Sufficient contrast
* Visible hover/focus states

---

# 27. Design Tokens

Create a centralized design token system rather than repeatedly hardcoding colors.

For example:

```css
:root {
  --color-primary: #017FE4;
  --color-primary-hover: #006CC2;
  --color-primary-dark: #005BA8;

  --color-background: #FFFFFF;
  --color-background-soft: #F8FAFC;
  --color-background-blue: #EFF8FF;
  --color-background-blue-light: #EAF5FF;

  --color-text-primary: #111827;
  --color-text-secondary: #374151;
  --color-text-muted: #6B7280;

  --color-border: #E5E7EB;
  --color-border-light: #F1F5F9;
  --color-border-blue: #93C5FD;

  --color-success: #16A34A;
  --color-error: #DC2626;
}
```

Adapt this to the project's existing CSS/Tailwind/theme architecture instead of introducing unnecessary dependencies.

---

# 28. Existing Functionality

**Do not break existing functionality.**

Preserve:

* Existing content
* Existing routes
* Existing navigation
* Existing links
* Existing forms
* Existing API integrations
* Existing business logic
* Existing responsive behavior
* Existing components where appropriate

This task is primarily a **UI/UX modernization**, not a backend rewrite.

Do not modify APIs or business logic unless absolutely necessary for the UI.

---

# 29. Implementation Process

Before modifying the website:

1. Inspect `http://localhost:4323/th`.
2. Analyze the current UI structure.
3. Identify all major sections.
4. Identify reusable components.
5. Identify current colors.
6. Identify typography problems.
7. Identify spacing inconsistencies.
8. Identify components that look outdated.
9. Identify opportunities to improve visual hierarchy.
10. Create a consistent blue-and-white design system.

Then implement the redesign.

After implementation, inspect the page again and refine the UI.

---

# 30. Final Design Direction

The final result should communicate:

**Modern + Professional + Clean + Technology + Trust + Simplicity**

The visual identity should be centered around:

**`#017FE4` + `#FFFFFF`**

Use dark neutrals for typography and structure.

Use light blue backgrounds for subtle visual emphasis.

Use the primary blue only where it provides meaningful visual hierarchy.

Avoid:

* Excessive blue
* Excessive gradients
* Excessive shadows
* Excessive rounded elements
* Too many colors
* Low-contrast text
* Generic template-like layouts
* Overly decorative UI

The final website should look like a **professionally designed modern corporate/technology website**, not simply an existing website with its colors replaced.

Most importantly, use your UI/UX judgment to ensure every section feels like it belongs to the same design system.

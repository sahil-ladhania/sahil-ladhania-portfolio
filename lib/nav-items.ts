export interface NavItem {
  label: string;
  href: `#${string}`;
  number: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "#about", number: "01." },
  { label: "Products", href: "#products", number: "02." },
  { label: "Now", href: "#now", number: "03." },
  { label: "Experience", href: "#zyntohouse", number: "04." },
  { label: "Contact", href: "#contact", number: "05." },
];

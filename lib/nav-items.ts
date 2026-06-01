export interface NavItem {
  label: string;
  href: `#${string}`;
  number: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Experience", href: "#zyntohouse", number: "01." },
  { label: "Products", href: "#products", number: "02." },
  { label: "In progress", href: "#now", number: "03." },
  { label: "About", href: "#about", number: "04." },
  { label: "Contact", href: "#contact", number: "05." },
];

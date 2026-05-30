export interface FloatingDockItem {
  title: string;
  icon: React.ReactNode;
  href?: string;
  download?: string;
  onClick?: () => void;
}

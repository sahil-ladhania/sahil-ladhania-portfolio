export function PageBackground(): React.ReactElement {
  return (
    <div aria-hidden="true" className="page-bg">
      <div className="page-bg__streak page-bg__streak-1" />
      <div className="page-bg__streak page-bg__streak-2" />
      <div className="page-bg__streak page-bg__streak-3" />
      <div className="page-bg__glow page-bg__glow-1" />
      <div className="page-bg__glow page-bg__glow-2" />
      <div className="page-bg__noise" />
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <a className="logo" href="/">
        <span className="logo-mark">T</span>
        TaskFlow
      </a>

      <p className="sidebar-caption">WORKSPACE</p>

      <nav className="navigation" aria-label="Main navigation">
        <a className="nav-link active" href="/">
          <span className="nav-icon">⌂</span>
          Dashboard
        </a>

        <a className="nav-link" href="#tasks">
          <span className="nav-icon">✓</span>
          My Tasks
        </a>
      </nav>

      <div className="sidebar-bottom">
        <div className="profile-avatar">TF</div>
        <div>
          <p className="profile-name">My Workspace</p>
          <p className="profile-caption">Personal planner</p>
        </div>
      </div>
    </aside>
  );
}

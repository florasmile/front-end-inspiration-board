import './Header.css';

const Header = ({ onOpenDrawer }) => {
  return (
    <header>
      <h1>Inspiration Board</h1>
      <button className="open-drawer-button" onClick={onOpenDrawer}>☰ Menu</button>
    </header>
  );
};

export default Header;

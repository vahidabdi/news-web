import React from 'react';

import sass from 'src/styles/main.scss';

const Navbar = () => (
  <nav className={sass.navbar}>
    <div className={sass.navbarBrand}>
      <a className={sass.navbarItem} href="/">
        <img src="/ak.jpg" alt="ak" />
      </a>
      <div className={sass.navbarBurger}>
        <span />
        <span />
        <span />
      </div>
    </div>
    <div className={sass.navbarMenu}>
      <div className={sass.navbarEnd}>
        <a className={sass.navbarItem}>
          سیاسی
        </a>
        <a className={sass.navbarItem}>
          ورزشی
        </a>
        <a className={sass.navbarItem}>
          اقتصادی
        </a>
        <a className={sass.navbarItem}>
          جستجو
        </a>
      </div>
    </div>
  </nav>
);

export default Navbar;

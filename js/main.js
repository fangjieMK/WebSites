function createNav() {
  return `
    <nav class="navbar">
      <div class="container">
        <div class="nav-content">
          <a href="index.html" class="logo">
            <span class="logo-text">🏠 好房</span>
          </a>
          <div class="nav-links">
            <a href="index.html" class="nav-link">首页</a>
            <a href="publish.html" class="nav-link">发布房源</a>
            <a href="request.html" class="nav-link">求租需求</a>
            <a href="profile.html" class="nav-link nav-link-profile">我的</a>
          </div>
        </div>
      </div>
    </nav>
  `;
}

function createFooter() {
  return `
    <footer class="footer">
      <div class="container">
        <p>&copy; 2026 好房 - 让租房更简单</p>
      </div>
    </footer>
  `;
}

const navStyles = `
  .navbar {
    position: sticky;
    top: 0;
    background: var(--card-bg);
    box-shadow: var(--shadow-sm);
    z-index: 100;
  }
  .nav-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
  }
  .logo {
    font-family: 'Poppins', sans-serif;
    font-size: 24px;
    font-weight: 700;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .nav-links {
    display: flex;
    gap: 32px;
  }
  .nav-link {
    color: var(--text-secondary);
    font-weight: 500;
    transition: color 0.2s;
  }
  .nav-link:hover {
    color: var(--text-primary);
  }
  .footer {
    background: var(--text-primary);
    color: white;
    padding: 32px 0;
    margin-top: 64px;
    text-align: center;
  }
  @media (max-width: 768px) {
    .nav-links { gap: 16px; font-size: 14px; }
  }
`;

function initPage() {
  const styleEl = document.createElement('style');
  styleEl.textContent = navStyles;
  document.head.appendChild(styleEl);
  
  const navEl = document.createElement('div');
  navEl.innerHTML = createNav();
  document.body.prepend(navEl.firstElementChild);
  
  const footerEl = document.createElement('div');
  footerEl.innerHTML = createFooter();
  document.body.appendChild(footerEl.firstElementChild);
  
  initData();
}

document.addEventListener('DOMContentLoaded', initPage);

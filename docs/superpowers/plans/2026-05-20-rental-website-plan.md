# 房屋租赁网站实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use general_purpose_task to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一套完整的面向个人用户的房屋租赁网站，包含首页、详情页、发布页、求租页和用户中心，使用纯 HTML/CSS/JS 实现，数据通过 localStorage 持久化。

**Architecture:** 模块化设计，分离样式、逻辑和数据存储。每个页面独立但共享组件（导航、Footer）和工具函数。

**Tech Stack:** HTML5, CSS3, Vanilla JavaScript, localStorage

---

## 文件结构

```
/workspace/
├── index.html              # 首页
├── detail.html             # 房源详情页
├── publish.html            # 发布房源页
├── request.html            # 求租需求页
├── profile.html            # 用户中心页
├── css/
│   ├── variables.css       # CSS 变量定义
│   └── style.css           # 主样式
├── js/
│   ├── storage.js          # localStorage 封装
│   ├── data.js             # 示例数据和数据管理
│   ├── utils.js            # 工具函数
│   └── main.js             # 通用脚本（导航等）
└── assets/
    └── images/             # 图片占位
```

---

## 任务列表

### Task 1: 项目基础框架

**Files:**
- Create: `/workspace/css/variables.css`
- Create: `/workspace/css/style.css`
- Create: `/workspace/js/storage.js`
- Create: `/workspace/js/utils.js`
- Create: `/workspace/js/data.js`
- Create: `/workspace/js/main.js`
- Create: `/workspace/assets/images/` (directory)

- [ ] **Step 1: 创建目录结构**

```bash
mkdir -p /workspace/css /workspace/js /workspace/assets/images
```

- [ ] **Step 2: 创建 CSS 变量文件**

```css
/* css/variables.css */
:root {
  --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --bg-color: #f8fafc;
  --card-bg: #ffffff;
  --text-primary: #2d3748;
  --text-secondary: #4a5568;
  --text-muted: #718096;
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.12);
  --shadow-lg: 0 8px 32px rgba(0,0,0,0.16);
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 20px;
}
```

- [ ] **Step 3: 创建基础样式文件**

```css
/* css/style.css */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500&display=swap');
@import './variables.css';

* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: 'Inter', sans-serif;
  background-color: var(--bg-color);
  color: var(--text-primary);
  line-height: 1.6;
}
h1, h2, h3, h4 { font-family: 'Poppins', sans-serif; }
a { text-decoration: none; color: inherit; }
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-radius: var(--radius-md);
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}
.btn:hover { transform: translateY(-2px); }
.btn:active { transform: translateY(0); }
.btn-primary {
  background: var(--gradient-primary);
  color: white;
}
.btn-secondary {
  background: var(--gradient-secondary);
  color: white;
}
.card {
  background: var(--card-bg);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s, box-shadow 0.3s;
}
.card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}
```

- [ ] **Step 4: 创建 localStorage 封装**

```javascript
// js/storage.js
const Storage = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key) {
    localStorage.removeItem(key);
  }
};
```

- [ ] **Step 5: 创建工具函数**

```javascript
// js/utils.js
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
function formatPrice(price) {
  return '¥' + price.toLocaleString() + '/月';
}
function formatDate(date) {
  return new Date(date).toLocaleDateString('zh-CN');
}
```

- [ ] **Step 6: 创建示例数据和数据管理**

```javascript
// js/data.js
const sampleProperties = [
  {
    id: generateId(),
    title: '朝阳CBD 精装一居室 地铁旁',
    location: '北京市朝阳区建国路88号',
    price: 5500,
    rooms: 1,
    area: 55,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800'
    ],
    description: '房屋位于CBD核心地段，步行5分钟到地铁1号线。房间朝南，采光极佳，精装修，家具家电齐全，拎包入住。',
    facilities: ['空调', '洗衣机', '冰箱', 'WiFi', '独立卫生间'],
    contact: { name: '李先生', phone: '13800138001' },
    status: 'available',
    createdAt: new Date(),
    userId: 'user1'
  },
  {
    id: generateId(),
    title: '海淀中关村 两室一厅 近学校',
    location: '北京市海淀区中关村大街1号',
    price: 7800,
    rooms: 2,
    area: 85,
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'
    ],
    description: '靠近中关村二小，适合有孩子的家庭。小区环境好，物业管理完善，周边配套齐全。',
    facilities: ['空调', '洗衣机', '冰箱', 'WiFi', '天然气', '车位'],
    contact: { name: '王女士', phone: '13800138002' },
    status: 'available',
    createdAt: new Date(),
    userId: 'user2'
  },
  {
    id: generateId(),
    title: '东城雍和宫 复式loft 文艺风',
    location: '北京市东城区雍和宫大街',
    price: 6200,
    rooms: 1,
    area: 68,
    images: [
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800'
    ],
    description: 'LOFT设计，挑高4.5米，北欧风格装修。适合年轻人，周边文艺小店众多。',
    facilities: ['空调', '洗衣机', '冰箱', 'WiFi'],
    contact: { name: '张先生', phone: '13800138003' },
    status: 'available',
    createdAt: new Date(),
    userId: 'user1'
  }
];

const sampleRequests = [
  {
    id: generateId(),
    budget: { min: 4000, max: 6000 },
    location: '朝阳区',
    rooms: 1,
    preferences: ['地铁旁', '朝南', '独立卫生间'],
    description: 'IT从业者，朝九晚五，爱干净，无宠物，希望找一个安静的一居室。',
    contact: { name: '小赵', phone: '13900139001' },
    createdAt: new Date(),
    userId: 'user3'
  }
];

const defaultUser = {
  id: 'currentUser',
  name: '我',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
  phone: '13800000000',
  favorites: []
};

function initData() {
  if (!Storage.get('properties')) {
    Storage.set('properties', sampleProperties);
  }
  if (!Storage.get('requests')) {
    Storage.set('requests', sampleRequests);
  }
  if (!Storage.get('user')) {
    Storage.set('user', defaultUser);
  }
}
```

- [ ] **Step 7: 创建通用脚本（导航组件）**

```javascript
// js/main.js
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
```

---

### Task 2: 首页 (index.html)

**Files:**
- Create: `/workspace/index.html`

- [ ] **Step 1: 创建首页 HTML**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>好房 - 找到你的理想家</title>
  <link rel="stylesheet" href="css/style.css">
  <style>
    .hero {
      background: var(--gradient-primary);
      padding: 80px 0;
      color: white;
    }
    .hero-content {
      text-align: center;
    }
    .hero h1 {
      font-size: 48px;
      margin-bottom: 16px;
    }
    .hero p {
      font-size: 20px;
      opacity: 0.9;
      margin-bottom: 40px;
    }
    .search-box {
      display: flex;
      gap: 12px;
      max-width: 700px;
      margin: 0 auto;
      background: white;
      padding: 12px;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
    }
    .search-input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 16px;
      padding: 0 12px;
    }
    .filter-tags {
      display: flex;
      gap: 12px;
      justify-content: center;
      margin-top: 24px;
      flex-wrap: wrap;
    }
    .filter-tag {
      padding: 8px 20px;
      background: rgba(255,255,255,0.2);
      border-radius: 100px;
      cursor: pointer;
      transition: background 0.2s;
    }
    .filter-tag:hover, .filter-tag.active {
      background: rgba(255,255,255,0.4);
    }
    .section {
      padding: 64px 0;
    }
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
    }
    .section-title {
      font-size: 28px;
    }
    .properties-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }
    .property-card {
      overflow: hidden;
    }
    .property-image {
      height: 200px;
      background-size: cover;
      background-position: center;
    }
    .property-info {
      padding: 20px;
    }
    .property-price {
      font-size: 24px;
      font-weight: 700;
      background: var(--gradient-secondary);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 8px;
    }
    .property-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 8px;
    }
    .property-meta {
      display: flex;
      gap: 16px;
      color: var(--text-muted);
      font-size: 14px;
    }
    .requests-scroll {
      display: flex;
      gap: 20px;
      overflow-x: auto;
      padding-bottom: 12px;
    }
    .request-card {
      min-width: 320px;
      padding: 24px;
    }
    .request-budget {
      font-size: 22px;
      font-weight: 700;
      background: var(--gradient-primary);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 12px;
    }
    @media (max-width: 968px) {
      .properties-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 640px) {
      .hero h1 { font-size: 32px; }
      .properties-grid { grid-template-columns: 1fr; }
      .search-box { flex-direction: column; }
    }
  </style>
</head>
<body>
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <h1>找到你的理想家</h1>
        <p>海量真实房源，轻松租房</p>
        <div class="search-box">
          <input type="text" class="search-input" id="searchInput" placeholder="输入位置或小区名称...">
          <button class="btn btn-primary" id="searchBtn">搜索</button>
        </div>
        <div class="filter-tags">
          <span class="filter-tag active" data-filter="all">全部</span>
          <span class="filter-tag" data-filter="1">一居室</span>
          <span class="filter-tag" data-filter="2">二居室</span>
          <span class="filter-tag" data-filter="3">三居室+</span>
          <span class="filter-tag" data-filter="low">¥5000以下</span>
          <span class="filter-tag" data-filter="high">¥8000以上</span>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">热门房源</h2>
        <a href="publish.html" class="btn btn-secondary">发布房源</a>
      </div>
      <div class="properties-grid" id="propertiesGrid">
      </div>
    </div>
  </section>

  <section class="section" style="background: #fff;">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">最新求租</h2>
        <a href="request.html" class="btn btn-primary">发布求租</a>
      </div>
      <div class="requests-scroll" id="requestsScroll">
      </div>
    </div>
  </section>

  <script src="js/utils.js"></script>
  <script src="js/storage.js"></script>
  <script src="js/data.js"></script>
  <script src="js/main.js"></script>
  <script>
    let currentFilter = 'all';

    function renderProperties(filter = 'all') {
      const properties = Storage.get('properties', []);
      let filtered = properties.filter(p => p.status === 'available');
      
      if (filter === '1') filtered = filtered.filter(p => p.rooms === 1);
      else if (filter === '2') filtered = filtered.filter(p => p.rooms === 2);
      else if (filter === '3') filtered = filtered.filter(p => p.rooms >= 3);
      else if (filter === 'low') filtered = filtered.filter(p => p.price < 5000);
      else if (filter === 'high') filtered = filtered.filter(p => p.price > 8000);
      
      const grid = document.getElementById('propertiesGrid');
      grid.innerHTML = filtered.map(p => `
        <a href="detail.html?id=${p.id}" class="card property-card">
          <div class="property-image" style="background-image: url('${p.images[0]}')"></div>
          <div class="property-info">
            <div class="property-price">${formatPrice(p.price)}</div>
            <div class="property-title">${p.title}</div>
            <div class="property-meta">
              <span>${p.rooms}室</span>
              <span>${p.area}㎡</span>
              <span>${p.location}</span>
            </div>
          </div>
        </a>
      `).join('');
    }

    function renderRequests() {
      const requests = Storage.get('requests', []);
      const scroll = document.getElementById('requestsScroll');
      scroll.innerHTML = requests.map(r => `
        <div class="card request-card">
          <div class="request-budget">¥${r.budget.min} - ¥${r.budget.max}/月</div>
          <h3 style="margin-bottom: 12px;">${r.location} · ${r.rooms}室</h3>
          <p style="color: var(--text-secondary); font-size: 14px;">${r.description}</p>
          <div style="margin-top: 16px; color: var(--text-muted); font-size: 13px;">
            ${r.preferences.map(p => '#' + p).join(' ')}
          </div>
        </div>
      `).join('');
    }

    document.addEventListener('DOMContentLoaded', () => {
      renderProperties();
      renderRequests();
      
      document.querySelectorAll('.filter-tag').forEach(tag => {
        tag.addEventListener('click', () => {
          document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
          tag.classList.add('active');
          currentFilter = tag.dataset.filter;
          renderProperties(currentFilter);
        });
      });
      
      document.getElementById('searchBtn').addEventListener('click', () => {
        const keyword = document.getElementById('searchInput').value.toLowerCase();
        const properties = Storage.get('properties', []);
        const filtered = properties.filter(p => 
          p.status === 'available' && 
          (p.title.toLowerCase().includes(keyword) || p.location.toLowerCase().includes(keyword))
        );
        const grid = document.getElementById('propertiesGrid');
        grid.innerHTML = filtered.map(p => `
          <a href="detail.html?id=${p.id}" class="card property-card">
            <div class="property-image" style="background-image: url('${p.images[0]}')"></div>
            <div class="property-info">
              <div class="property-price">${formatPrice(p.price)}</div>
              <div class="property-title">${p.title}</div>
              <div class="property-meta">
                <span>${p.rooms}室</span>
                <span>${p.area}㎡</span>
                <span>${p.location}</span>
              </div>
            </div>
          </a>
        `).join('');
      });
    });
  </script>
</body>
</html>
```

---

### Task 3: 房源详情页 (detail.html)

**Files:**
- Create: `/workspace/detail.html`

- [ ] **Step 1: 创建详情页 HTML**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>房源详情 - 好房</title>
  <link rel="stylesheet" href="css/style.css">
  <style>
    .back-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: var(--text-secondary);
      margin: 24px 0;
    }
    .carousel {
      position: relative;
      height: 500px;
      overflow: hidden;
      border-radius: var(--radius-lg);
      margin-bottom: 32px;
    }
    .carousel-images {
      display: flex;
      height: 100%;
      transition: transform 0.5s;
    }
    .carousel-image {
      min-width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
    }
    .carousel-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: rgba(255,255,255,0.9);
      border: none;
      cursor: pointer;
      font-size: 24px;
    }
    .carousel-btn.prev { left: 16px; }
    .carousel-btn.next { right: 16px; }
    .detail-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 32px;
    }
    .detail-main h1 {
      font-size: 32px;
      margin-bottom: 16px;
    }
    .detail-price {
      font-size: 36px;
      font-weight: 700;
      background: var(--gradient-secondary);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 24px;
    }
    .detail-meta {
      display: flex;
      gap: 32px;
      padding: 24px;
      background: #f8fafc;
      border-radius: var(--radius-md);
      margin-bottom: 32px;
    }
    .meta-item { text-align: center; }
    .meta-value { font-size: 24px; font-weight: 700; }
    .meta-label { color: var(--text-muted); font-size: 14px; }
    .detail-section { margin-bottom: 32px; }
    .detail-section h3 { margin-bottom: 16px; }
    .facilities {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
    .facility {
      padding: 8px 16px;
      background: #f1f5f9;
      border-radius: var(--radius-sm);
    }
    .contact-card {
      padding: 24px;
      position: sticky;
      top: 100px;
    }
    .contact-btn {
      width: 100%;
      margin-bottom: 12px;
    }
    .favorite-btn {
      width: 100%;
      background: white;
      border: 2px solid #e2e8f0;
    }
    .favorite-btn.favorited {
      border-color: #f5576c;
      color: #f5576c;
    }
    @media (max-width: 968px) {
      .detail-content { grid-template-columns: 1fr; }
      .carousel { height: 350px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <a href="index.html" class="back-btn">← 返回列表</a>
  </div>
  
  <div class="container">
    <div class="carousel" id="carousel">
      <div class="carousel-images" id="carouselImages"></div>
      <button class="carousel-btn prev" id="prevBtn">←</button>
      <button class="carousel-btn next" id="nextBtn">→</button>
    </div>
  </div>

  <div class="container">
    <div class="detail-content">
      <div class="detail-main" id="detailMain"></div>
      <div class="detail-side">
        <div class="card contact-card" id="contactCard"></div>
      </div>
    </div>
  </div>

  <script src="js/utils.js"></script>
  <script src="js/storage.js"></script>
  <script src="js/data.js"></script>
  <script src="js/main.js"></script>
  <script>
    let currentSlide = 0;
    let property = null;

    function getPropertyById(id) {
      const properties = Storage.get('properties', []);
      return properties.find(p => p.id === id);
    }

    function renderCarousel(images) {
      const container = document.getElementById('carouselImages');
      container.innerHTML = images.map(img => `
        <div class="carousel-image" style="background-image: url('${img}')"></div>
      `).join('');
    }

    function goToSlide(index) {
      const container = document.getElementById('carouselImages');
      currentSlide = index;
      container.style.transform = `translateX(-${index * 100}%)`;
    }

    function renderDetail(p) {
      document.getElementById('detailMain').innerHTML = `
        <h1>${p.title}</h1>
        <div class="detail-price">${formatPrice(p.price)}</div>
        <div class="detail-meta">
          <div class="meta-item">
            <div class="meta-value">${p.rooms}室</div>
            <div class="meta-label">户型</div>
          </div>
          <div class="meta-item">
            <div class="meta-value">${p.area}㎡</div>
            <div class="meta-label">面积</div>
          </div>
          <div class="meta-item">
            <div class="meta-value">${p.status === 'available' ? '可租' : '已租'}</div>
            <div class="meta-label">状态</div>
          </div>
        </div>
        
        <div class="detail-section">
          <h3>位置</h3>
          <p>${p.location}</p>
        </div>
        
        <div class="detail-section">
          <h3>房源描述</h3>
          <p>${p.description}</p>
        </div>
        
        <div class="detail-section">
          <h3>配套设施</h3>
          <div class="facilities">
            ${p.facilities.map(f => `<span class="facility">${f}</span>`).join('')}
          </div>
        </div>
      `;
      
      const user = Storage.get('user', { favorites: [] });
      const isFavorited = user.favorites.includes(p.id);
      
      document.getElementById('contactCard').innerHTML = `
        <h3 style="margin-bottom: 20px;">联系房东</h3>
        <p style="margin-bottom: 8px;"><strong>${p.contact.name}</strong></p>
        <p style="color: var(--text-secondary); margin-bottom: 24px;">${p.contact.phone}</p>
        <button class="btn btn-primary contact-btn">📞 电话联系</button>
        <button class="btn favorite-btn ${isFavorited ? 'favorited' : ''}" id="favoriteBtn">
          ${isFavorited ? '❤️ 已收藏' : '🤍 收藏房源'}
        </button>
      `;
      
      document.getElementById('favoriteBtn').addEventListener('click', () => {
        const user = Storage.get('user', { favorites: [] });
        const idx = user.favorites.indexOf(p.id);
        if (idx > -1) user.favorites.splice(idx, 1);
        else user.favorites.push(p.id);
        Storage.set('user', user);
        renderDetail(p);
      });
    }

    document.addEventListener('DOMContentLoaded', () => {
      const params = new URLSearchParams(window.location.search);
      const id = params.get('id');
      property = getPropertyById(id);
      
      if (!property) {
        window.location.href = 'index.html';
        return;
      }
      
      renderCarousel(property.images);
      renderDetail(property);
      
      document.getElementById('prevBtn').addEventListener('click', () => {
        goToSlide(currentSlide > 0 ? currentSlide - 1 : property.images.length - 1);
      });
      document.getElementById('nextBtn').addEventListener('click', () => {
        goToSlide(currentSlide < property.images.length - 1 ? currentSlide + 1 : 0);
      });
    });
  </script>
</body>
</html>
```

---

### Task 4: 发布房源页 (publish.html)

**Files:**
- Create: `/workspace/publish.html`

- [ ] **Step 1: 创建发布页 HTML**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>发布房源 - 好房</title>
  <link rel="stylesheet" href="css/style.css">
  <style>
    .page-header {
      padding: 40px 0;
      text-align: center;
    }
    .steps {
      display: flex;
      justify-content: center;
      gap: 40px;
      margin-bottom: 40px;
    }
    .step {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      color: var(--text-muted);
    }
    .step-number {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
    }
    .step.active { color: var(--text-primary); }
    .step.active .step-number {
      background: var(--gradient-primary);
      color: white;
    }
    .form-card {
      max-width: 700px;
      margin: 0 auto;
      padding: 40px;
    }
    .form-group { margin-bottom: 24px; }
    .form-label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
    }
    .form-input {
      width: 100%;
      padding: 14px 16px;
      border: 2px solid #e2e8f0;
      border-radius: var(--radius-md);
      font-size: 16px;
      transition: border-color 0.2s;
    }
    .form-input:focus {
      outline: none;
      border-color: #667eea;
    }
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    textarea.form-input { min-height: 120px; resize: vertical; }
    .upload-area {
      border: 2px dashed #cbd5e1;
      border-radius: var(--radius-md);
      padding: 40px;
      text-align: center;
      cursor: pointer;
    }
    .upload-area:hover { border-color: #667eea; }
    .preview-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-top: 16px;
    }
    .preview-img {
      height: 100px;
      background-size: cover;
      background-position: center;
      border-radius: var(--radius-sm);
    }
    .facilities-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    }
    .facility-check {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px;
      border: 2px solid #e2e8f0;
      border-radius: var(--radius-md);
      cursor: pointer;
    }
    .facility-check.selected {
      border-color: #667eea;
      background: #f0f4ff;
    }
    .form-actions {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      margin-top: 32px;
    }
    .preview-card {
      padding: 24px;
      background: #f8fafc;
      border-radius: var(--radius-md);
    }
    @media (max-width: 640px) {
      .form-row { grid-template-columns: 1fr; }
      .facilities-grid { grid-template-columns: repeat(2, 1fr); }
    }
  </style>
</head>
<body>
  <div class="page-header">
    <div class="container">
      <h1 style="font-size: 32px; margin-bottom: 24px;">发布房源</h1>
      <div class="steps">
        <div class="step active" data-step="1">
          <div class="step-number">1</div>
          <div>基本信息</div>
        </div>
        <div class="step" data-step="2">
          <div class="step-number">2</div>
          <div>上传图片</div>
        </div>
        <div class="step" data-step="3">
          <div class="step-number">3</div>
          <div>详细描述</div>
        </div>
        <div class="step" data-step="4">
          <div class="step-number">4</div>
          <div>确认发布</div>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="card form-card">
      <form id="publishForm">
        <div class="step-content" id="step1">
          <div class="form-group">
            <label class="form-label">房源标题</label>
            <input type="text" class="form-input" id="title" placeholder="例如：朝阳CBD 精装一居室">
          </div>
          <div class="form-group">
            <label class="form-label">详细地址</label>
            <input type="text" class="form-input" id="location" placeholder="例如：北京市朝阳区建国路88号">
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">月租金 (元)</label>
              <input type="number" class="form-input" id="price" placeholder="5500">
            </div>
            <div class="form-group">
              <label class="form-label">户型 (几室)</label>
              <input type="number" class="form-input" id="rooms" placeholder="1">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">面积 (㎡)</label>
            <input type="number" class="form-input" id="area" placeholder="55">
          </div>
          <div class="form-actions">
            <button type="button" class="btn btn-primary" onclick="nextStep()">下一步</button>
          </div>
        </div>

        <div class="step-content" id="step2" style="display: none;">
          <div class="form-group">
            <label class="form-label">房源图片</label>
            <div class="upload-area" id="uploadArea">
              <div style="font-size: 48px;">📷</div>
              <p style="margin-top: 12px;">点击或拖拽上传图片</p>
              <input type="file" id="fileInput" accept="image/*" multiple style="display: none;">
            </div>
            <div class="preview-grid" id="previewGrid"></div>
          </div>
          <div class="form-actions">
            <button type="button" class="btn" onclick="prevStep()">上一步</button>
            <button type="button" class="btn btn-primary" onclick="nextStep()">下一步</button>
          </div>
        </div>

        <div class="step-content" id="step3" style="display: none;">
          <div class="form-group">
            <label class="form-label">房源描述</label>
            <textarea class="form-input" id="description" placeholder="请详细描述您的房源..."></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">配套设施</label>
            <div class="facilities-grid" id="facilitiesGrid">
              <div class="facility-check" data-facility="空调">
                <input type="checkbox"> 空调
              </div>
              <div class="facility-check" data-facility="洗衣机">
                <input type="checkbox"> 洗衣机
              </div>
              <div class="facility-check" data-facility="冰箱">
                <input type="checkbox"> 冰箱
              </div>
              <div class="facility-check" data-facility="WiFi">
                <input type="checkbox"> WiFi
              </div>
              <div class="facility-check" data-facility="独立卫生间">
                <input type="checkbox"> 独立卫生间
              </div>
              <div class="facility-check" data-facility="天然气">
                <input type="checkbox"> 天然气
              </div>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">联系人</label>
            <input type="text" class="form-input" id="contactName" placeholder="您的姓名">
          </div>
          <div class="form-group">
            <label class="form-label">联系电话</label>
            <input type="text" class="form-input" id="contactPhone" placeholder="您的手机号">
          </div>
          <div class="form-actions">
            <button type="button" class="btn" onclick="prevStep()">上一步</button>
            <button type="button" class="btn btn-primary" onclick="nextStep()">下一步</button>
          </div>
        </div>

        <div class="step-content" id="step4" style="display: none;">
          <h3 style="margin-bottom: 24px;">预览房源</h3>
          <div class="preview-card" id="previewCard"></div>
          <div class="form-actions">
            <button type="button" class="btn" onclick="prevStep()">上一步</button>
            <button type="button" class="btn btn-secondary" onclick="submitForm()">发布房源</button>
          </div>
        </div>
      </form>
    </div>
  </div>

  <script src="js/utils.js"></script>
  <script src="js/storage.js"></script>
  <script src="js/data.js"></script>
  <script src="js/main.js"></script>
  <script>
    let currentStep = 1;
    let formData = {
      images: [
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
      ]
    };

    function updateSteps() {
      document.querySelectorAll('.step').forEach(s => {
        s.classList.toggle('active', parseInt(s.dataset.step) <= currentStep);
      });
      document.querySelectorAll('.step-content').forEach(c => {
        c.style.display = 'none';
      });
      document.getElementById('step' + currentStep).style.display = 'block';
    }

    function nextStep() {
      if (currentStep < 4) {
        saveStepData();
        currentStep++;
        updateSteps();
        if (currentStep === 4) renderPreview();
      }
    }

    function prevStep() {
      if (currentStep > 1) {
        currentStep--;
        updateSteps();
      }
    }

    function saveStepData() {
      if (currentStep === 1) {
        formData.title = document.getElementById('title').value;
        formData.location = document.getElementById('location').value;
        formData.price = parseInt(document.getElementById('price').value);
        formData.rooms = parseInt(document.getElementById('rooms').value);
        formData.area = parseInt(document.getElementById('area').value);
      } else if (currentStep === 3) {
        formData.description = document.getElementById('description').value;
        formData.facilities = [];
        document.querySelectorAll('.facility-check.selected').forEach(f => {
          formData.facilities.push(f.dataset.facility);
        });
        formData.contactName = document.getElementById('contactName').value;
        formData.contactPhone = document.getElementById('contactPhone').value;
      }
    }

    function renderPreview() {
      document.getElementById('previewCard').innerHTML = `
        <div style="display: grid; grid-template-columns: 200px 1fr; gap: 20px; margin-bottom: 20px;">
          <div style="height: 150px; background-size: cover; background-position: center; border-radius: 8px; background-image: url('${formData.images[0]}')"></div>
          <div>
            <h3 style="margin-bottom: 8px;">${formData.title || '未填写'}</h3>
            <p style="font-size: 24px; font-weight: 700; background: var(--gradient-secondary); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${formData.price ? '¥' + formData.price + '/月' : '未填写'}</p>
            <p style="color: var(--text-muted);">${formData.rooms}室 · ${formData.area}㎡ · ${formData.location || '未填写'}</p>
          </div>
        </div>
        <p style="color: var(--text-secondary);">${formData.description || '未填写描述'}</p>
        <div style="margin-top: 16px;">${formData.facilities?.map(f => '#' + f).join(' ') || ''}</div>
      `;
    }

    function submitForm() {
      saveStepData();
      const user = Storage.get('user');
      const newProperty = {
        id: generateId(),
        title: formData.title,
        location: formData.location,
        price: formData.price,
        rooms: formData.rooms,
        area: formData.area,
        images: formData.images,
        description: formData.description,
        facilities: formData.facilities,
        contact: { name: formData.contactName, phone: formData.contactPhone },
        status: 'available',
        createdAt: new Date(),
        userId: user.id
      };
      const properties = Storage.get('properties', []);
      properties.unshift(newProperty);
      Storage.set('properties', properties);
      alert('发布成功！');
      window.location.href = 'profile.html';
    }

    document.addEventListener('DOMContentLoaded', () => {
      updateSteps();
      
      document.getElementById('uploadArea').addEventListener('click', () => {
        document.getElementById('fileInput').click();
      });
      
      document.querySelectorAll('.facility-check').forEach(check => {
        check.addEventListener('click', () => {
          check.classList.toggle('selected');
        });
      });
    });
  </script>
</body>
</html>
```

---

### Task 5: 求租需求页 (request.html)

**Files:**
- Create: `/workspace/request.html`

- [ ] **Step 1: 创建求租页 HTML**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>发布求租 - 好房</title>
  <link rel="stylesheet" href="css/style.css">
  <style>
    .page-header {
      padding: 40px 0;
      text-align: center;
      background: var(--gradient-secondary);
      color: white;
    }
    .page-header h1 { font-size: 32px; }
    .form-card {
      max-width: 700px;
      margin: 40px auto;
      padding: 40px;
    }
    .form-group { margin-bottom: 24px; }
    .form-label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
    }
    .form-input {
      width: 100%;
      padding: 14px 16px;
      border: 2px solid #e2e8f0;
      border-radius: var(--radius-md);
      font-size: 16px;
      transition: border-color 0.2s;
    }
    .form-input:focus { outline: none; border-color: #f5576c; }
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    textarea.form-input { min-height: 120px; resize: vertical; }
    .preferences-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
    .pref-tag {
      padding: 10px 20px;
      border: 2px solid #e2e8f0;
      border-radius: 100px;
      cursor: pointer;
    }
    .pref-tag.selected {
      border-color: #f5576c;
      background: #fff1f3;
    }
    .match-tip {
      background: #f0fdf4;
      border: 1px solid #86efac;
      padding: 16px;
      border-radius: var(--radius-md);
      margin-bottom: 24px;
    }
    @media (max-width: 640px) { .form-row { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <div class="page-header">
    <div class="container">
      <h1>发布求租需求</h1>
      <p style="opacity: 0.9; margin-top: 8px;">让房东找到你</p>
    </div>
  </div>

  <div class="container">
    <div class="card form-card">
      <div class="match-tip">
        💡 发布后，系统会自动为您匹配合适的房源
      </div>
      
      <div class="form-group">
        <label class="form-label">期望位置</label>
        <input type="text" class="form-input" id="reqLocation" placeholder="例如：朝阳区、海淀区">
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">预算最低 (元/月)</label>
          <input type="number" class="form-input" id="reqMin" placeholder="4000">
        </div>
        <div class="form-group">
          <label class="form-label">预算最高 (元/月)</label>
          <input type="number" class="form-input" id="reqMax" placeholder="6000">
        </div>
      </div>
      
      <div class="form-group">
        <label class="form-label">期望户型</label>
        <input type="number" class="form-input" id="reqRooms" placeholder="1">
      </div>
      
      <div class="form-group">
        <label class="form-label">其他偏好 (可多选)</label>
        <div class="preferences-grid">
          <span class="pref-tag" data-pref="地铁旁">地铁旁</span>
          <span class="pref-tag" data-pref="朝南">朝南</span>
          <span class="pref-tag" data-pref="独立卫生间">独立卫生间</span>
          <span class="pref-tag" data-pref="精装修">精装修</span>
          <span class="pref-tag" data-pref="可养宠物">可养宠物</span>
          <span class="pref-tag" data-pref="有车位">有车位</span>
        </div>
      </div>
      
      <div class="form-group">
        <label class="form-label">补充描述</label>
        <textarea class="form-input" id="reqDesc" placeholder="描述一下您的情况和要求..."></textarea>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">您的称呼</label>
          <input type="text" class="form-input" id="reqName" placeholder="您的姓名">
        </div>
        <div class="form-group">
          <label class="form-label">联系电话</label>
          <input type="text" class="form-input" id="reqPhone" placeholder="您的手机号">
        </div>
      </div>
      
      <button class="btn btn-secondary" style="width: 100%; margin-top: 16px;" id="submitReq">发布求租</button>
    </div>
  </div>

  <script src="js/utils.js"></script>
  <script src="js/storage.js"></script>
  <script src="js/data.js"></script>
  <script src="js/main.js"></script>
  <script>
    let selectedPrefs = [];

    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.pref-tag').forEach(tag => {
        tag.addEventListener('click', () => {
          tag.classList.toggle('selected');
          const pref = tag.dataset.pref;
          const idx = selectedPrefs.indexOf(pref);
          if (idx > -1) selectedPrefs.splice(idx, 1);
          else selectedPrefs.push(pref);
        });
      });

      document.getElementById('submitReq').addEventListener('click', () => {
        const user = Storage.get('user');
        const newRequest = {
          id: generateId(),
          budget: {
            min: parseInt(document.getElementById('reqMin').value),
            max: parseInt(document.getElementById('reqMax').value)
          },
          location: document.getElementById('reqLocation').value,
          rooms: parseInt(document.getElementById('reqRooms').value),
          preferences: selectedPrefs,
          description: document.getElementById('reqDesc').value,
          contact: {
            name: document.getElementById('reqName').value,
            phone: document.getElementById('reqPhone').value
          },
          createdAt: new Date(),
          userId: user.id
        };
        
        const requests = Storage.get('requests', []);
        requests.unshift(newRequest);
        Storage.set('requests', requests);
        alert('发布成功！');
        window.location.href = 'profile.html';
      });
    });
  </script>
</body>
</html>
```

---

### Task 6: 用户中心页 (profile.html)

**Files:**
- Create: `/workspace/profile.html`

- [ ] **Step 1: 创建用户中心 HTML**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>我的 - 好房</title>
  <link rel="stylesheet" href="css/style.css">
  <style>
    .profile-header {
      padding: 40px 0;
      background: var(--gradient-primary);
      color: white;
    }
    .profile-info {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    .profile-avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-size: cover;
      background-position: center;
      border: 4px solid rgba(255,255,255,0.3);
    }
    .profile-name {
      font-size: 28px;
      font-weight: 700;
    }
    .tabs {
      display: flex;
      gap: 8px;
      background: white;
      padding: 8px;
      border-radius: var(--radius-lg);
      margin-top: -30px;
      box-shadow: var(--shadow-md);
    }
    .tab {
      flex: 1;
      padding: 14px;
      text-align: center;
      border-radius: var(--radius-md);
      cursor: pointer;
      font-weight: 500;
      color: var(--text-secondary);
    }
    .tab.active {
      background: var(--gradient-primary);
      color: white;
    }
    .tab-content { margin-top: 40px; }
    .list-item {
      display: flex;
      gap: 20px;
      padding: 20px;
      margin-bottom: 16px;
    }
    .item-image {
      width: 160px;
      height: 120px;
      background-size: cover;
      background-position: center;
      border-radius: var(--radius-md);
    }
    .item-content { flex: 1; }
    .item-title { font-size: 18px; font-weight: 600; margin-bottom: 8px; }
    .item-price { font-size: 22px; font-weight: 700; background: var(--gradient-secondary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .item-actions { display: flex; gap: 8px; align-items: flex-start; }
    .btn-sm { padding: 8px 16px; font-size: 14px; }
    .empty-state {
      text-align: center;
      padding: 60px 0;
      color: var(--text-muted);
    }
    .empty-icon { font-size: 64px; margin-bottom: 16px; }
    .status-tag {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 100px;
      font-size: 12px;
      margin-left: 12px;
    }
    .status-available { background: #dcfce7; color: #16a34a; }
    .status-rented { background: #fee2e2; color: #dc2626; }
    @media (max-width: 640px) {
      .list-item { flex-direction: column; }
      .item-image { width: 100%; height: 200px; }
    }
  </style>
</head>
<body>
  <div class="profile-header">
    <div class="container">
      <div class="profile-info" id="profileInfo"></div>
    </div>
  </div>

  <div class="container">
    <div class="tabs">
      <div class="tab active" data-tab="properties">我的房源</div>
      <div class="tab" data-tab="requests">我的求租</div>
      <div class="tab" data-tab="favorites">我的收藏</div>
    </div>

    <div class="tab-content" id="tabContent"></div>
  </div>

  <script src="js/utils.js"></script>
  <script src="js/storage.js"></script>
  <script src="js/data.js"></script>
  <script src="js/main.js"></script>
  <script>
    let currentTab = 'properties';
    const user = Storage.get('user');

    function renderProfile() {
      document.getElementById('profileInfo').innerHTML = `
        <div class="profile-avatar" style="background-image: url('${user.avatar}')"></div>
        <div>
          <div class="profile-name">${user.name}</div>
          <div style="opacity: 0.8;">${user.phone}</div>
        </div>
      `;
    }

    function renderMyProperties() {
      const properties = Storage.get('properties', []).filter(p => p.userId === user.id);
      const container = document.getElementById('tabContent');
      
      if (properties.length === 0) {
        container.innerHTML = `
          <div class="empty-state">
            <div class="empty-icon">🏠</div>
            <p>还没有发布房源</p>
            <a href="publish.html" class="btn btn-primary" style="margin-top: 16px;">发布房源</a>
          </div>
        `;
        return;
      }
      
      container.innerHTML = properties.map(p => `
        <div class="card list-item">
          <div class="item-image" style="background-image: url('${p.images[0]}')"></div>
          <div class="item-content">
            <div class="item-title">
              ${p.title}
              <span class="status-tag ${p.status === 'available' ? 'status-available' : 'status-rented'}">
                ${p.status === 'available' ? '可租' : '已租'}
              </span>
            </div>
            <div class="item-price">${formatPrice(p.price)}</div>
            <p style="color: var(--text-muted); margin-top: 8px;">${p.location}</p>
          </div>
          <div class="item-actions">
            ${p.status === 'available' ? `<button class="btn btn-sm" onclick="markRented('${p.id}')">标记已租</button>` : ''}
            <button class="btn btn-sm" style="background: #fee2e2; color: #dc2626;" onclick="deleteProperty('${p.id}')">删除</button>
          </div>
        </div>
      `).join('');
    }

    function renderMyRequests() {
      const requests = Storage.get('requests', []).filter(r => r.userId === user.id);
      const container = document.getElementById('tabContent');
      
      if (requests.length === 0) {
        container.innerHTML = `
          <div class="empty-state">
            <div class="empty-icon">📋</div>
            <p>还没有发布求租需求</p>
            <a href="request.html" class="btn btn-secondary" style="margin-top: 16px;">发布求租</a>
          </div>
        `;
        return;
      }
      
      container.innerHTML = requests.map(r => `
        <div class="card list-item">
          <div class="item-content" style="flex: 1;">
            <div class="item-title">${r.location} · ${r.rooms}室</div>
            <div class="item-price">¥${r.budget.min} - ¥${r.budget.max}/月</div>
            <p style="color: var(--text-muted); margin-top: 8px;">${r.description}</p>
            <p style="margin-top: 8px;">${r.preferences.map(p => '#' + p).join(' ')}</p>
          </div>
          <div class="item-actions">
            <button class="btn btn-sm" style="background: #fee2e2; color: #dc2626;" onclick="deleteRequest('${r.id}')">删除</button>
          </div>
        </div>
      `).join('');
    }

    function renderFavorites() {
      const properties = Storage.get('properties', []);
      const favorites = properties.filter(p => user.favorites.includes(p.id));
      const container = document.getElementById('tabContent');
      
      if (favorites.length === 0) {
        container.innerHTML = `
          <div class="empty-state">
            <div class="empty-icon">❤️</div>
            <p>还没有收藏房源</p>
            <a href="index.html" class="btn btn-primary" style="margin-top: 16px;">去逛逛</a>
          </div>
        `;
        return;
      }
      
      container.innerHTML = favorites.map(p => `
        <a href="detail.html?id=${p.id}" class="card list-item" style="display: flex; color: inherit;">
          <div class="item-image" style="background-image: url('${p.images[0]}')"></div>
          <div class="item-content">
            <div class="item-title">${p.title}</div>
            <div class="item-price">${formatPrice(p.price)}</div>
            <p style="color: var(--text-muted); margin-top: 8px;">${p.location}</p>
          </div>
        </a>
      `).join('');
    }

    function markRented(id) {
      const properties = Storage.get('properties', []);
      const p = properties.find(prop => prop.id === id);
      if (p) {
        p.status = 'rented';
        Storage.set('properties', properties);
        renderMyProperties();
      }
    }

    function deleteProperty(id) {
      if (confirm('确定要删除这个房源吗？')) {
        const properties = Storage.get('properties', []).filter(p => p.id !== id);
        Storage.set('properties', properties);
        renderMyProperties();
      }
    }

    function deleteRequest(id) {
      if (confirm('确定要删除这个求租需求吗？')) {
        const requests = Storage.get('requests', []).filter(r => r.id !== id);
        Storage.set('requests', requests);
        renderMyRequests();
      }
    }

    function switchTab(tab) {
      currentTab = tab;
      document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
      if (tab === 'properties') renderMyProperties();
      else if (tab === 'requests') renderMyRequests();
      else if (tab === 'favorites') renderFavorites();
    }

    document.addEventListener('DOMContentLoaded', () => {
      renderProfile();
      renderMyProperties();
      
      document.querySelectorAll('.tab').forEach(t => {
        t.addEventListener('click', () => switchTab(t.dataset.tab));
      });
    });
  </script>
</body>
</html>
```

---

### Task 7: 测试与验证

**Files:**
- Test all pages

- [ ] **Step 1: 验证所有页面可以正常访问**

打开 index.html，检查：
- 导航栏是否显示
- Hero区域和搜索功能是否正常
- 房源卡片是否正确显示
- 筛选标签是否工作

- [ ] **Step 2: 测试房源详情页**
  - 点击任意房源卡片，应跳转到 detail.html
  - 图片轮播是否工作
  - 收藏功能是否正常

- [ ] **Step 3: 测试发布功能**
  - 访问 publish.html，测试多步表单
  - 提交后数据是否保存到 localStorage
  - 在用户中心能看到新发布的房源

- [ ] **Step 4: 测试求租功能**
  - 访问 request.html，填写表单
  - 提交后数据是否保存
  - 在用户中心能看到新发布的求租

- [ ] **Step 5: 测试用户中心**
  - 三个标签页切换是否正常
  - 标记房源已租是否工作
  - 删除功能是否正常

---

## 总结

这个计划涵盖了所有 5 个页面的实现，包含：
- 完整的 CSS 样式和设计系统
- 所有 JavaScript 功能逻辑
- localStorage 数据持久化
- 响应式设计支持

所有代码都是可直接运行的，只需要按顺序执行每个任务即可。

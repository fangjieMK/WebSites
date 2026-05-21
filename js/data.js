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

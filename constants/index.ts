export const navigationLinks = [
  {
    href: "/library",
    label: "Library",
  },

  {
    img: "/icons/user.svg",
    selectedImg: "/icons/user-fill.svg",
    href: "/my-profile",
    label: "My Profile",
  },
];

export const adminSideBarLinks = [
  {
    img: "/icons/admin/home.svg",
    route: "/admin",
    text: "Home",
  },
  {
    img: "/icons/admin/users.svg",
    route: "/admin/users",
    text: "All Users",
  },
  {
    img: "/icons/admin/book.svg",
    route: "/admin/books",
    text: "All Books",
  },
  {
    img: "/icons/admin/bookmark.svg",
    route: "/admin/book-requests",
    text: "Borrow Requests",
  },
  {
    img: "/icons/admin/user.svg",
    route: "/",
    text: "User Interface",
  },
];

export const FIELD_NAMES = {
  fullName: "Full name",
  email: "Email",
  universityId: "University ID Number",
  password: "Password",
  universityCard: "Upload University ID Card",
};

export const FIELD_TYPES = {
  fullName: "text",
  email: "email",
  universityId: "number",
  password: "password",
};

export const sampleBooks = [
  {
    "id": "book-1",
    "title": "The Midnight Library",
    "author": "Matt Haig",
    "genre": "Adventure",
    "rating": 4.6,
    "total_copies": 20,
    "available_copies": 10,
    "description": "A dazzling novel about all the choices that go into a life well lived, The Midnight Library tells the story of Nora Seed as she finds herself between life and death.",
    "color": "#1c1f40",
    "cover": "https://m.media-amazon.com/images/I/81J6APjwxlL.jpg",
    "video": "/sample-video.mp4?updatedAt=1722593504152",
    "summary": "A dazzling novel about all the choices that go into a life well lived, The Midnight Library tells the story of Nora Seed as she finds herself between life and death."
  },
  {
    "id": "book-2",
    "title": "Atomic Habits",
    "author": "James Clear",
    "genre": "Science",
    "rating": 4.9,
    "total_copies": 99,
    "available_copies": 50,
    "description": "A revolutionary guide to making good habits, breaking bad ones, and getting 1% better every day.",
    "color": "#fffdf6",
    "cover": "https://m.media-amazon.com/images/I/81F90H7hnML.jpg",
    "video": "/sample-video.mp4?updatedAt=1722593504152",
    "summary": "A revolutionary guide to making good habits, breaking bad ones, and getting 1% better every day."
  },
  {
    "id": "book-3",
    "title": "You Don't Know JS: Scope & Closures",
    "author": "Kyle Simpson",
    "genre": "Computer Science",
    "rating": 4.7,
    "total_copies": 9,
    "available_copies": 5,
    "description": "An essential guide to understanding the core mechanisms of JavaScript, focusing on scope and closures.",
    "color": "#f8e036",
    "cover": "https://m.media-amazon.com/images/I/7186YfjgHHL._AC_UF1000,1000_QL80_.jpg",
    "video": "/sample-video.mp4?updatedAt=1722593504152",
    "summary": "An essential guide to understanding the core mechanisms of JavaScript, focusing on scope and closures."
  },
  {
    "id": "book-4",
    "title": "The Alchemist",
    "author": "Paulo Coelho",
    "genre": "Adventure",
    "rating": 4.5,
    "total_copies": 78,
    "available_copies": 50,
    "description": "A magical tale of Santiago, an Andalusian shepherd boy, who embarks on a journey to find a worldly treasure.",
    "color": "#ed6322",
    "cover": "https://m.media-amazon.com/images/I/61HAE8zahLL._AC_UF1000,1000_QL80_.jpg",
    "video": "/sample-video.mp4?updatedAt=1722593504152",
    "summary": "A magical tale of Santiago, an Andalusian shepherd boy, who embarks on a journey to find a worldly treasure."
  },
  {
    "id": "book-5",
    "title": "Deep Work",
    "author": "Cal Newport",
    "genre": "Science",
    "rating": 4.7,
    "total_copies": 23,
    "available_copies": 23,
    "description": "Rules for focused success in a distracted world, teaching how to cultivate deep focus to achieve peak productivity.",
    "color": "#ffffff",
    "cover": "https://m.media-amazon.com/images/I/81JJ7fyyKyS.jpg",
    "video": "/sample-video.mp4?updatedAt=1722593504152",
    "summary": "Rules for focused success in a distracted world, teaching how to cultivate deep focus to achieve peak productivity."
  },
  {
    id: "book-6",
    title: "Clean Code",
    author: "Robert C. Martin",
    genre: "Computer Science",
    rating: 4.8,
    total_copies: 56,
    available_copies: 56,
    description:
      "A handbook of agile software craftsmanship, offering best practices and principles for writing clean and maintainable code.",
    color: "#080c0d",
    cover:
      "https://m.media-amazon.com/images/I/71T7aD3EOTL._UF1000,1000_QL80_.jpg",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "A handbook of agile software craftsmanship, offering best practices and principles for writing clean and maintainable code.",
  },
  {
    id: "book-7",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    genre: "Science",
    rating: 4.8,
    total_copies: 25,
    available_copies: 3,
    description:
      "A timeless guide for developers to hone their skills and improve their programming practices.",
    color: "#100f15",
    cover:
      "https://m.media-amazon.com/images/I/71VStSjZmpL._AC_UF1000,1000_QL80_.jpg",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "A timeless guide for developers to hone their skills and improve their programming practices.",
  },
  {
    id: "book-8",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    genre: "Finance",
    rating: 4.8,
    total_copies: 10,
    available_copies: 5,
    description:
      "Morgan Housel explores the unique behaviors and mindsets that shape financial success and decision-making.",
    color: "#ffffff",
    cover:
      "https://m.media-amazon.com/images/I/81Dky+tD+pL._AC_UF1000,1000_QL80_.jpg",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "Morgan Housel explores the unique behaviors and mindsets that shape financial success and decision-making.",
  },
  {
    id: "book-9",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    rating: 4.8,
    total_copies: 30,
    available_copies: 15,
    description: "A novel set in the American South during the 1930s, focusing on themes of racial injustice and moral growth.",
    color: "#f5e1d2",
    cover: "https://m.media-amazon.com/images/I/81OtwF1XfDL.jpg",
    video: "https://www.youtube.com/watch?v=Mi88P7KfaMA",
    summary: "A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice."
  },
  {
    id: "book-10",
    title: "1984",
    author: "George Orwell",
    genre: "Science",
    rating: 4.7,
    total_copies: 25,
    available_copies: 10,
    description: "A dystopian novel exploring themes of totalitarianism, surveillance, and individuality.",
    color: "#d3d3d3",
    cover: "https://m.media-amazon.com/images/I/71kxa1-0mfL.jpg",
    video: "https://www.youtube.com/watch?v=Z4rBDUJTnNU",
    summary: "A chilling prophecy about the future, presenting a startling and haunting vision of the world."
  },
  {
    id: "book-11",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    rating: 4.4,
    total_copies: 40,
    available_copies: 22,
    description: "A story of the young and mysterious millionaire Jay Gatsby and his obsession with the beautiful Daisy Buchanan.",
    color: "#e4c2f9",
    cover: "https://m.media-amazon.com/images/I/81xXAyLxK+L.jpg",
    video: "https://www.youtube.com/watch?v=rARN6agiW7o",
    summary: "A critique of the American Dream, wrapped in a tragic love story set in the Roaring Twenties."
  },
  {
    id: "book-12",
    title: "Brave New World",
    author: "Aldous Huxley",
    genre: "Science",
    rating: 4.6,
    total_copies: 20,
    available_copies: 12,
    description: "A futuristic society driven by technological advancements and state control, where human emotions are suppressed for societal stability.",
    color: "#c1e1c1",
    cover: "https://m.media-amazon.com/images/I/71uJWOGiXlL.jpg",
    video: "https://www.youtube.com/watch?v=ek5vse2_Aq0",
    summary: "A provocative vision of a dystopian future that critiques consumerism, conformity, and loss of individuality."
  },
  {
    id: "book-13",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    rating: 5,
    total_copies: 35,
    available_copies: 20,
    description: "A romantic novel that explores the manners and matrimonial machinations among the British gentry of the early 19th century.",
    color: "#fddde6",
    cover: "https://m.media-amazon.com/images/I/81eA+9cZpXL.jpg",
    video: "https://www.youtube.com/watch?v=fJA27Jujzq4",
    summary: "A witty and romantic novel about Elizabeth Bennet and her tumultuous relationship with the proud Mr. Darcy."
  },
  {
    id: "book-14",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Fiction",
    rating: 4,
    total_copies: 28,
    available_copies: 18,
    description: "A story about teenage rebellion and angst, following Holden Caulfield through New York City.",
    color: "#f4d03f",
    cover: "https://m.media-amazon.com/images/I/71FrNA6UdKL.jpg",
    video: "https://www.youtube.com/watch?v=LY8POfh-ZeY",
    summary: "A classic novel capturing the complexities of teenage life and the struggle for identity."
  }
];
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  images: string[];
  category: string;
  subCategory: string;
  rating: number;
  reviews: number;
  sizes: string[];
  colors: string[];
  description: string;
  inStock: boolean;
  trending: boolean;
  newArrival: boolean;
  featured: boolean;
}

// All images are women's/girls' fashion from Unsplash (appropriately licensed)
export const products: Product[] = [
  {
    id: 1,
    name: "Embroidered Anarkali Suit Set",
    price: 1499,
    originalPrice: 2999,
    discount: 50,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42cc?w=600&h=800&fit=crop",
    ],
    category: "Ethnic Wear",
    subCategory: "Suits",
    rating: 4.8,
    reviews: 124,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Maroon", "Royal Blue", "Emerald Green"],
    description: "Luxurious heavy embroidered Anarkali suit set with sequin and zari work. Complete set with dupatta and palazzo. Perfect for weddings and festive celebrations.",
    inStock: true,
    trending: true,
    newArrival: false,
    featured: true
  },
  {
    id: 2,
    name: "Designer Party Wear Gown",
    price: 1899,
    originalPrice: 3499,
    discount: 46,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=800&fit=crop",
    ],
    category: "Western Wear",
    subCategory: "Gowns",
    rating: 4.7,
    reviews: 89,
    sizes: ["S", "M", "L"],
    colors: ["Wine", "Black", "Navy"],
    description: "Stunning designer floor-length gown with elegant draping. Premium georgette fabric with delicate embellishments. Perfect for receptions and parties.",
    inStock: true,
    trending: true,
    newArrival: true,
    featured: true
  },
  {
    id: 3,
    name: "Cotton Printed A-Line Kurti",
    price: 599,
    originalPrice: 1199,
    discount: 50,
    image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1602810316693-3667c854239a?w=600&h=800&fit=crop",
    ],
    category: "Ethnic Wear",
    subCategory: "Kurtis",
    rating: 4.5,
    reviews: 234,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Mustard", "Teal", "Rani Pink"],
    description: "Comfortable cotton A-line kurti with beautiful block print design. Breathable fabric perfect for summer and daily wear. Three-quarter sleeves with side slits.",
    inStock: true,
    trending: false,
    newArrival: false,
    featured: true
  },
  {
    id: 4,
    name: "Georgette Designer Saree",
    price: 1299,
    originalPrice: 2499,
    discount: 48,
    image: "https://images.unsplash.com/photo-1610030006475-e1b46a491c3e?w=600&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1610030006475-e1b46a491c3e?w=600&h=800&fit=crop",
    ],
    category: "Ethnic Wear",
    subCategory: "Sarees",
    rating: 4.6,
    reviews: 156,
    sizes: ["Free Size"],
    colors: ["Red", "Pink", "Blue", "Green"],
    description: "Beautiful georgette designer saree with heavy border and matching blouse piece. Lightweight and easy to drape. Suitable for all occasions.",
    inStock: true,
    trending: true,
    newArrival: false,
    featured: true
  },
  {
    id: 5,
    name: "Korean Style Crop Top",
    price: 499,
    originalPrice: 999,
    discount: 50,
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=600&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop",
    ],
    category: "Western Wear",
    subCategory: "Tops",
    rating: 4.3,
    reviews: 167,
    sizes: ["XS", "S", "M", "L"],
    colors: ["White", "Blush Pink", "Lavender"],
    description: "Trendy Korean style crop top perfect for college and casual outings. Made with premium quality soft fabric. Pair with high-waist jeans or skirts.",
    inStock: true,
    trending: true,
    newArrival: true,
    featured: false
  },
  {
    id: 6,
    name: "Flared Palazzo Pants",
    price: 449,
    originalPrice: 899,
    discount: 50,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop",
    ],
    category: "Bottom Wear",
    subCategory: "Palazzos",
    rating: 4.4,
    reviews: 289,
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black", "Beige", "Navy"],
    description: "Comfortable and stylish flared palazzo pants with elastic waist. Soft rayon fabric for all-day comfort. Perfect for both ethnic and casual wear.",
    inStock: true,
    trending: false,
    newArrival: false,
    featured: false
  },
  {
    id: 7,
    name: "High-Waist Lycra Leggings",
    price: 349,
    originalPrice: 699,
    discount: 50,
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&h=800&fit=crop",
    ],
    category: "Bottom Wear",
    subCategory: "Leggings",
    rating: 4.3,
    reviews: 412,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Maroon", "Grey"],
    description: "High-quality high-waist lycra leggings with perfect stretch. Non-transparent fabric ideal for daily wear and pairing with kurtis.",
    inStock: true,
    trending: false,
    newArrival: false,
    featured: false
  },
  {
    id: 8,
    name: "Floral Print Maxi Dress",
    price: 899,
    originalPrice: 1799,
    discount: 50,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop",
    ],
    category: "Western Wear",
    subCategory: "Dresses",
    rating: 4.5,
    reviews: 145,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Floral Pink", "Floral Blue"],
    description: "Beautiful floral print maxi dress with flattering A-line fit. Soft rayon fabric that flows beautifully. Perfect for outings and summer parties.",
    inStock: true,
    trending: true,
    newArrival: true,
    featured: true
  },
  {
    id: 9,
    name: "Embroidered Kurti Set with Palazzo",
    price: 999,
    originalPrice: 1999,
    discount: 50,
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&h=800&fit=crop",
    ],
    category: "Ethnic Wear",
    subCategory: "Kurtis",
    rating: 4.6,
    reviews: 198,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Maroon", "Blue", "Green"],
    description: "Beautiful ethnic kurti set with intricate thread embroidery work. Comes with matching palazzo. Perfect for festivals and special occasions.",
    inStock: true,
    trending: true,
    newArrival: false,
    featured: true
  },
  {
    id: 10,
    name: "Women's Dress Material (Unstitched)",
    price: 799,
    originalPrice: 1599,
    discount: 50,
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&h=800&fit=crop",
    ],
    category: "Ethnic Wear",
    subCategory: "Dress Materials",
    rating: 4.4,
    reviews: 167,
    sizes: ["Free Size"],
    colors: ["Multi Print", "Pastel Shades"],
    description: "Premium quality unstitched dress material with printed dupatta. Get it tailored as per your style. Complete 2.5 meter set.",
    inStock: true,
    trending: false,
    newArrival: true,
    featured: false
  },
  {
    id: 11,
    name: "Bodycon Midi Dress",
    price: 749,
    originalPrice: 1499,
    discount: 50,
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=800&fit=crop",
    ],
    category: "Western Wear",
    subCategory: "Dresses",
    rating: 4.3,
    reviews: 112,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "Wine", "Navy"],
    description: "Stylish bodycon midi dress that flatters every figure. Stretchable fabric for comfortable fit. Great for parties and date nights.",
    inStock: true,
    trending: false,
    newArrival: true,
    featured: false
  },
  {
    id: 12,
    name: "High-Waist Skinny Jeans",
    price: 799,
    originalPrice: 1599,
    discount: 50,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=800&fit=crop",
    ],
    category: "Western Wear",
    subCategory: "Jeans",
    rating: 4.5,
    reviews: 234,
    sizes: ["26", "28", "30", "32"],
    colors: ["Light Blue", "Dark Blue", "Black"],
    description: "Trendy high-waist skinny jeans with perfect fit. Stretchable denim that pairs well with all types of tops and kurtis.",
    inStock: true,
    trending: true,
    newArrival: false,
    featured: false
  },
  {
    id: 13,
    name: "Silk Blend Festive Saree",
    price: 1599,
    originalPrice: 3199,
    discount: 50,
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42cc?w=600&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42cc?w=600&h=800&fit=crop",
    ],
    category: "Ethnic Wear",
    subCategory: "Sarees",
    rating: 4.7,
    reviews: 89,
    sizes: ["Free Size"],
    colors: ["Banarasi Red", "Royal Blue", "Gold"],
    description: "Elegant silk blend saree with rich zari border. Perfect for weddings and festive occasions. Comes with matching unstitched blouse.",
    inStock: true,
    trending: true,
    newArrival: false,
    featured: true
  },
  {
    id: 14,
    name: "Straight Cut Office Kurti",
    price: 549,
    originalPrice: 1099,
    discount: 50,
    image: "https://images.unsplash.com/photo-1602810316693-3667c854239a?w=600&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1602810316693-3667c854239a?w=600&h=800&fit=crop",
    ],
    category: "Ethnic Wear",
    subCategory: "Kurtis",
    rating: 4.3,
    reviews: 178,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Teal", "Mustard", "Olive"],
    description: "Classic straight cut kurti with side slits. Comfortable rayon fabric ideal for office and daily wear. Minimal elegant design.",
    inStock: true,
    trending: false,
    newArrival: false,
    featured: false
  },
  {
    id: 15,
    name: "Churidar Suit Set",
    price: 1099,
    originalPrice: 2199,
    discount: 50,
    image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&h=800&fit=crop&sat=-20",
    images: [
      "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&h=800&fit=crop&sat=-20",
    ],
    category: "Ethnic Wear",
    subCategory: "Suits",
    rating: 4.5,
    reviews: 134,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Peach", "Mint", "Lavender"],
    description: "Elegant churidar suit set with printed kameez and solid churidar. Comes with matching dupatta. Perfect for casual outings and family functions.",
    inStock: true,
    trending: false,
    newArrival: true,
    featured: false
  },
  {
    id: 16,
    name: "Printed Chiffon Dupatta",
    price: 299,
    originalPrice: 599,
    discount: 50,
    image: "https://images.unsplash.com/photo-1610030006475-e1b46a491c3e?w=600&h=800&fit=crop&bri=10",
    images: [
      "https://images.unsplash.com/photo-1610030006475-e1b46a491c3e?w=600&h=800&fit=crop&bri=10",
    ],
    category: "Accessories",
    subCategory: "Dupattas",
    rating: 4.2,
    reviews: 312,
    sizes: ["Free Size"],
    colors: ["Red", "Pink", "Blue", "Yellow"],
    description: "Beautiful printed chiffon dupatta with border. Lightweight and soft. Perfect accessory to complete any ethnic outfit. 2.5 meters length.",
    inStock: true,
    trending: false,
    newArrival: false,
    featured: false
  }
];

export const categories = [
  {
    name: "Ethnic Wear",
    icon: "🥻",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop",
    description: "Kurtis, Sarees & Suits"
  },
  {
    name: "Western Wear",
    icon: "👗",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop",
    description: "Dresses, Tops & Jeans"
  },
  {
    name: "Bottom Wear",
    icon: "👖",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=400&fit=crop",
    description: "Leggings & Palazzos"
  },
  {
    name: "Sarees",
    icon: "🎀",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42cc?w=400&h=400&fit=crop",
    description: "Silk, Georgette & More"
  },
  {
    name: "Kurtis",
    icon: "👚",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=400&fit=crop",
    description: "Cotton, Rayon & Silk"
  },
  {
    name: "Dresses",
    icon: "💃",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop",
    description: "Maxi, Midi & Gowns"
  },
];

export const banners = [
  {
    id: 1,
    title: "New Season Collection",
    subtitle: "Ethnic Elegance",
    description: "Discover our handpicked collection of designer kurtis, sarees and suits crafted for the modern woman",
    cta: "Shop Ethnic Wear",
    link: "/products?category=Ethnic+Wear",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1400&h=700&fit=crop"
  },
  {
    id: 2,
    title: "Trending Now",
    subtitle: "Western Chic",
    description: "From casual dresses to party gowns — styles that make you stand out",
    cta: "Explore Western Wear",
    link: "/products?category=Western+Wear",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1400&h=700&fit=crop"
  },
  {
    id: 3,
    title: "Festive Season",
    subtitle: "Silk & Elegance",
    description: "Premium silk sarees and festive suits for every celebration",
    cta: "Shop Sarees",
    link: "/products?category=Ethnic+Wear&sub=Sarees",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42cc?w=1400&h=700&fit=crop"
  }
];

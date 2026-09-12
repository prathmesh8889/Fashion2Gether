export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
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
}

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Korean Style Top",
    price: 499,
    originalPrice: 999,
    discount: 50,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop",
    category: "Western Wear",
    subCategory: "Tops",
    rating: 4.5,
    reviews: 128,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Pink", "White", "Blue"],
    description: "Trendy Korean style top perfect for casual outings. Made with premium quality fabric for comfortable all-day wear.",
    inStock: true,
    trending: true,
    newArrival: true
  },
  {
    id: 2,
    name: "Elegant Ethnic Kurti Set",
    price: 799,
    originalPrice: 1499,
    discount: 47,
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=500&fit=crop",
    category: "Ethnic Wear",
    subCategory: "Kurtis",
    rating: 4.7,
    reviews: 256,
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Red", "Green", "Blue"],
    description: "Beautiful ethnic kurti set with intricate embroidery work. Perfect for festivals and special occasions.",
    inStock: true,
    trending: true,
    newArrival: false
  },
  {
    id: 3,
    name: "Stylish Lycra Leggings",
    price: 299,
    originalPrice: 599,
    discount: 50,
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=500&fit=crop",
    category: "Bottom Wear",
    subCategory: "Leggings",
    rating: 4.3,
    reviews: 342,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Maroon", "Grey"],
    description: "High-quality lycra leggings with perfect stretch and comfort. Ideal for daily wear and pairing with kurtis.",
    inStock: true,
    trending: false,
    newArrival: false
  },
  {
    id: 4,
    name: "Designer Party Wear Dress",
    price: 1299,
    originalPrice: 2499,
    discount: 48,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
    category: "Western Wear",
    subCategory: "Dresses",
    rating: 4.8,
    reviews: 89,
    sizes: ["S", "M", "L"],
    colors: ["Black", "Red", "Gold"],
    description: "Stunning designer party wear dress that makes you stand out. Premium fabric with elegant design.",
    inStock: true,
    trending: true,
    newArrival: true
  },
  {
    id: 5,
    name: "Casual Cotton Kurti",
    price: 399,
    originalPrice: 799,
    discount: 50,
    image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&h=500&fit=crop",
    category: "Ethnic Wear",
    subCategory: "Kurtis",
    rating: 4.4,
    reviews: 178,
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Yellow", "Pink", "White", "Blue"],
    description: "Comfortable cotton kurti for everyday wear. Breathable fabric with beautiful print design.",
    inStock: true,
    trending: false,
    newArrival: false
  },
  {
    id: 6,
    name: "Trendy Crop Top",
    price: 349,
    originalPrice: 699,
    discount: 50,
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=500&fit=crop",
    category: "Western Wear",
    subCategory: "Tops",
    rating: 4.2,
    reviews: 95,
    sizes: ["S", "M", "L"],
    colors: ["White", "Black", "Pink"],
    description: "Fashionable crop top for the modern woman. Perfect for college and casual outings.",
    inStock: true,
    trending: true,
    newArrival: true
  },
  {
    id: 7,
    name: "Anarkali Suit Set",
    price: 1499,
    originalPrice: 2999,
    discount: 50,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=500&fit=crop",
    category: "Ethnic Wear",
    subCategory: "Suits",
    rating: 4.9,
    reviews: 67,
    sizes: ["M", "L", "XL"],
    colors: ["Maroon", "Royal Blue", "Emerald Green"],
    description: "Luxurious Anarkali suit set with heavy embroidery. Complete set with dupatta and palazzo.",
    inStock: true,
    trending: true,
    newArrival: false
  },
  {
    id: 8,
    name: "Palazzo Pants",
    price: 399,
    originalPrice: 799,
    discount: 50,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop",
    category: "Bottom Wear",
    subCategory: "Palazzos",
    rating: 4.5,
    reviews: 210,
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black", "Beige", "Navy"],
    description: "Comfortable and stylish palazzo pants. Perfect for both ethnic and casual wear.",
    inStock: true,
    trending: false,
    newArrival: true
  },
  {
    id: 9,
    name: "Saree with Blouse Piece",
    price: 899,
    originalPrice: 1799,
    discount: 50,
    image: "https://images.unsplash.com/photo-1610030006475-e1b46a491c3e?w=400&h=500&fit=crop",
    category: "Ethnic Wear",
    subCategory: "Sarees",
    rating: 4.6,
    reviews: 145,
    sizes: ["Free Size"],
    colors: ["Red", "Pink", "Blue", "Green"],
    description: "Beautiful saree with matching blouse piece. Elegant design suitable for all occasions.",
    inStock: true,
    trending: true,
    newArrival: false
  },
  {
    id: 10,
    name: "Denim Jacket",
    price: 999,
    originalPrice: 1999,
    discount: 50,
    image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&h=500&fit=crop",
    category: "Western Wear",
    subCategory: "Jackets",
    rating: 4.4,
    reviews: 76,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Black", "White"],
    description: "Classic denim jacket that never goes out of style. Perfect layering piece for any outfit.",
    inStock: true,
    trending: false,
    newArrival: true
  },
  {
    id: 11,
    name: "Printed Rayon Dress",
    price: 599,
    originalPrice: 1199,
    discount: 50,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop",
    category: "Western Wear",
    subCategory: "Dresses",
    rating: 4.3,
    reviews: 134,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Floral Print", "Abstract", "Stripes"],
    description: "Beautiful printed rayon dress with flattering fit. Soft and comfortable for all-day wear.",
    inStock: true,
    trending: false,
    newArrival: false
  },
  {
    id: 12,
    name: "Dress Material (Unstitched)",
    price: 699,
    originalPrice: 1399,
    discount: 50,
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=500&fit=crop",
    category: "Ethnic Wear",
    subCategory: "Dress Materials",
    rating: 4.5,
    reviews: 198,
    sizes: ["Free Size"],
    colors: ["Multi", "Pastel", "Bright"],
    description: "Premium quality unstitched dress material with dupatta. Get it tailored as per your style.",
    inStock: true,
    trending: true,
    newArrival: true
  }
];

export const categories = [
  { name: "Western Wear", icon: "👗", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&h=200&fit=crop" },
  { name: "Ethnic Wear", icon: "🥻", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&h=200&fit=crop" },
  { name: "Bottom Wear", icon: "👖", image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=200&h=200&fit=crop" },
  { name: "Dresses", icon: "💃", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&h=200&fit=crop" },
  { name: "Tops", icon: "👚", image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=200&h=200&fit=crop" },
  { name: "Sarees", icon: "🎀", image: "https://images.unsplash.com/photo-1610030006475-e1b46a491c3e?w=200&h=200&fit=crop" },
];

export const banners = [
  {
    id: 1,
    title: "FASHION2GETHER",
    subtitle: "Premium Collection",
    description: "Designed for women who love to stand out with elegance",
    cta: "Shop Now",
    gradient: "from-pink-500 via-purple-500 to-indigo-500"
  },
  {
    id: 2,
    title: "NEW ARRIVALS",
    subtitle: "Fresh Designs • Trendy Styles",
    description: "Latest Korean Collection starting at just ₹99",
    cta: "Explore Now",
    gradient: "from-orange-400 via-pink-500 to-purple-600"
  },
  {
    id: 3,
    title: "MEGA SALE",
    subtitle: "Up to 50% OFF",
    description: "On all ethnic wear, western wear & accessories",
    cta: "Grab Deals",
    gradient: "from-green-400 via-teal-500 to-blue-600"
  }
];

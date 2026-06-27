# Fashion Frenzy

<div align="center">

![Fashion Frenzy Banner](https://img.shields.io/badge/Next.js-15.3-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-06B6D4?style=for-the-badge&logo=tailwind-css)
![Status](https://img.shields.io/badge/Status-Active%20Development-brightgreen?style=for-the-badge)

**Empowering Independent Creators Through AI-Powered Fashion Commerce**

[Live Demo](#) • [Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Team](#-team)

</div>

---

## About Fashion Frenzy

Fashion Frenzy is a modern e-commerce platform dedicated to supporting small fashion brands and independent designers. We believe fashion is more than just clothing—it's a form of self-expression, creativity, and a way to support independent art.

Our mission is to build a vibrant community where independent fashion designers and small brands can thrive by providing them with a platform to showcase their unique designs while offering customers an exceptional shopping experience.

### Why Fashion Frenzy?

- **Support Independent Creators** - Every purchase directly supports small fashion brands
- **AI-Powered Shopping** - Virtual try-on and personalized style recommendations
- **Unique Collections** - Curated designs that stand apart from mass-produced trends
- **Quality First** - High-quality craftsmanship from passionate designers
- **Community Driven** - A platform celebrating creativity and originality

---

## Features

### E-Commerce
- **Responsive Product Catalog** - Browse hundreds of curated fashion items
- **Advanced Filtering** - Filter by category, price, style, and more
- **Product Reviews** - Read authentic customer reviews and ratings
- **Wishlist & Cart** - Save favorites and manage purchases
- **Multiple Payment Options** - Secure checkout with various payment methods

### AI-Powered Features
- **Virtual Try-On** - See how clothes look on you before purchasing
- **AI Style Assistant** - Get personalized style recommendations
- **Review Summarization** - AI-generated product review summaries
- **Smart Search** - Intelligent product discovery

### User Experience
- **Dark/Light Mode** - Seamless theme switching
- **Mobile Optimized** - Perfect experience on all devices
- **Fast Performance** - Optimized for speed and reliability
- **Accessibility** - WCAG compliant design

### Seller Dashboard
- **Product Management** - Manage inventory and listings
- **Analytics** - Track sales and customer insights
- **Order Management** - Monitor and fulfill orders

---

## Tech Stack

### Frontend
- **Next.js 15** - React framework for production
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework

### Backend & Services
- **Next.js API Routes** - Serverless backend functions
- **MongoDB** - NoSQL database
- **Cloudinary** - Image optimization & delivery
- **Google Genkit** - AI/ML powered features

### AI & ML
- **Hugging Face** - ML models integration
- **RapidAPI** - Virtual try-on integration

### Development Tools
- **Tailwind CSS** - Styling
- **ESLint** - Code linting
- **Next Auth** - Authentication

---

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MongoDB instance
- Firebase account
- Cloudinary account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/araiz-khan/Fashion-Frenzy.git
cd Fashion-Frenzy
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**

Create a `.env.local` file in the root directory:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name

# AI Services
GOOGLE_GENKIT_API_KEY=your_genkit_api_key
HUGGING_FACE_API_KEY=your_hugging_face_key
RAPIDAPI_KEY=your_rapidapi_key
```

4. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── (main)/            # Main application routes
│   ├── api/               # API routes
│   ├── login/             # Auth pages
│   └── signup/
├── components/            # Reusable React components
│   ├── layout/           # Layout components
│   ├── products/         # Product components
│   └── ui/               # UI components
├── contexts/             # React contexts (Cart, Currency, Wishlist)
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
│   ├── firebase/         # Firebase config
│   ├── mongodb/          # Database utilities
│   └── auth.ts           # Auth helpers
├── types/                # TypeScript type definitions
└── ai/                   # AI/ML features
    └── flows/            # Genkit flows
```

---

## Color Scheme

**Light Mode:**
- Background: Pure White
- Primary: Professional Blue (#0082CC)
- Accent: Highlight Green

**Dark Mode:**
- Background: Deep Gray
- Primary: Light Blue
- Accents maintain consistency

---

## Key Pages

- **Home** (`/`) - Landing page with featured products
- **Shop** (`/shop`) - Full product catalog with filters
- **Product Details** (`/products/:id`) - Individual product pages
- **Style Assistant** (`/style-assistant`) - AI style recommendations
- **Virtual Try-On** (`/ai-try-on`) - AI-powered try-on experience
- **Cart** (`/cart`) - Shopping cart management
- **Wishlist** (`/wishlist`) - Saved favorites
- **About Us** (`/about-us`) - Learn about the team
- **Checkout** (`/checkout`) - Secure payment processing

---

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## Contact & Support

- **Email** - support@fashionfrenzy.com
- **Website** - [fashionfrenzy.com](https://fashionfrenzy.com)
- **GitHub Issues** - Report bugs and request features
- **Discord** - Join our community (link coming soon)

---

## Acknowledgments

- Special thanks to all independent fashion designers and small brands
- Built with ❤️ for the fashion community
- Powered by cutting-edge AI technology

---

<div align="center">

**Made with ❤️ by the Fashion Frenzy Team**

[⬆ Back to top](#-fashion-frenzy---support-small-fashion-brands)

</div>

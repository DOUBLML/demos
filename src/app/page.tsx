// app/page.tsx
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, User, ShoppingBag, X } from "lucide-react";
import Link from "next/link";

export default function KnixHomepage() {
  const trendingProducts = [
    {
      id: "revolution-scoop-bra",
      name: "Revolution Scoop Bra",
      price: "$60.00",
      originalPrice: null,
      badge: "New",
      colors: ["#D4A574", "#000000", "#D4A574", "#F4C2C2", "#F4C2C2"],
      image: "bg-amber-100",
    },
    {
      id: "leakproof-ultrathin-no-show-bikini",
      name: "Leakproof UltraThin No-Show Bikini",
      price: "$27.00",
      originalPrice: null,
      badge: "Kristen's Fave",
      colors: [
        "#D4A574",
        "#000000",
        "#8B4513",
        "#F4C2C2",
        "#4682B4",
        "#DDA0DD",
      ],
      image: "bg-amber-200",
    },
    {
      id: "revolution-v-neck-bra",
      name: "Revolution V-Neck Bra",
      price: "$68.00",
      originalPrice: null,
      badge: "Best Seller",
      colors: [
        "#000000",
        "#D4A574",
        "#F5F5DC",
        "#8B4513",
        "#800080",
        "#654321",
      ],
      image: "bg-gray-900",
    },
    {
      id: "sculptrib-cotton-tank",
      name: "SculptRib™ Cotton Tank",
      price: "$40.80",
      originalPrice: "$48.00",
      badge: "Joanna's Pick",
      colors: ["#D4A574", "#000000", "#F5F5DC"],
      discount: "15% off",
      image: "bg-amber-50",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Banner */}
      <div className="bg-black text-white text-center py-2 text-sm">
        Bundle & Save on Leakproof Undies - starting at 3 for $60
      </div>

      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-black">knix</h1>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a
                  href="#"
                  className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium"
                >
                  Shop All
                </a>
                <a
                  href="#"
                  className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium"
                >
                  Leakproof
                </a>
                <a
                  href="#"
                  className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium"
                >
                  Bras
                </a>
                <a
                  href="#"
                  className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium"
                >
                  Underwear
                </a>
                <a
                  href="#"
                  className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium"
                >
                  Apparel
                </a>
                <a
                  href="#"
                  className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium"
                >
                  Swim
                </a>
                <a
                  href="#"
                  className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium"
                >
                  Teen
                </a>
                <a
                  href="#"
                  className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium"
                >
                  Sale & Offers
                </a>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="What can we help you find?"
                  className="w-64 pl-4 pr-10"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <User className="h-6 w-6 text-gray-600 cursor-pointer" />
              <ShoppingBag className="h-6 w-6 text-gray-600 cursor-pointer" />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[600px] bg-gray-100 overflow-hidden">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
            <div className="text-center text-gray-500">
              {/* Placeholder for hero image */}
              <div className="w-96 h-96 bg-red-400 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-white">Hero Image Placeholder</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-xl">
              <p className="text-sm text-gray-600 mb-2">
                WE'LL CHECK IF YOU WANT, BUT...
              </p>
              <h1 className="text-6xl font-bold text-white mb-4">
                Leakproof means <em className="italic">you're good</em>
              </h1>
              <p className="text-white mb-8">Featuring Kristen Bell</p>
              <div className="space-x-4">
                <Button className="bg-black text-white hover:bg-gray-800 px-8 py-3">
                  LEARN MORE
                </Button>
                <Button className="bg-black text-white hover:bg-gray-800 px-8 py-3">
                  SHOP LEAKPROOF
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Discount popup */}
        <div className="absolute bottom-6 left-6 bg-black text-white px-4 py-2 rounded flex items-center space-x-2">
          <span className="text-sm">Get 20% Off</span>
          <X className="h-4 w-4 cursor-pointer" />
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {[
            { name: "Kristen's Picks", image: "bg-blue-900" },
            { name: "Best-Sellers", image: "bg-gray-800" },
            { name: "New Arrivals", image: "bg-gray-200" },
            { name: "Bras", image: "bg-amber-700" },
            { name: "Leakproof Underwear", image: "bg-purple-300" },
            { name: "Cotton & Modal Essentials", image: "bg-blue-600" },
            { name: "Swim", image: "bg-green-400" },
          ].map((category, index) => (
            <Card
              key={index}
              className="cursor-pointer group hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-0">
                <div
                  className={`${category.image} h-48 rounded-t-lg flex items-center justify-center`}
                >
                  <span className="text-white text-sm">Image</span>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 group-hover:text-gray-600">
                    {category.name}
                  </h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Promotional Sections */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Underwear Packs */}
            <div className="relative bg-gray-100 rounded-lg overflow-hidden h-96">
              <div className="absolute top-4 right-4 bg-black text-white rounded-full w-20 h-20 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xs">UP TO</div>
                  <div className="text-sm font-bold">20% OFF</div>
                </div>
              </div>
              <div className="p-8 h-full flex flex-col justify-end">
                <div className="text-center mb-8">
                  <div className="flex justify-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-purple-300 rounded"></div>
                    <div className="w-16 h-16 bg-gray-800 rounded"></div>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-3xl font-bold italic mb-2">Save on</h3>
                  <p className="text-xl">underwear packs</p>
                </div>
              </div>
            </div>

            {/* Overnight Protection */}
            <div className="relative bg-gray-200 rounded-lg overflow-hidden h-96">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-200"></div>
              <div className="relative p-8 h-full flex items-center">
                <div className="max-w-xs">
                  <h3 className="text-4xl font-bold text-white mb-4">
                    Overnight leaks?
                    <br />
                    <span className="block">Not tonight.</span>
                  </h3>
                </div>
                <div className="absolute right-8 top-8">
                  <div className="w-48 h-48 bg-blue-300 rounded-lg flex items-center justify-center">
                    <span className="text-white">Product Image</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Now */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Trending Now</h2>
          <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
            Shop All →
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product, index) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <Card className="cursor-pointer group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative">
                    <div
                      className={`${product.image} h-64 rounded-t-lg flex items-center justify-center relative`}
                    >
                      <span className="text-gray-500 text-sm">
                        Product Image
                      </span>
                      {product.badge && (
                        <Badge
                          className={`absolute top-4 left-4 ${
                            product.badge === "New"
                              ? "bg-gray-200 text-gray-800"
                              : product.badge === "Kristen's Fave"
                              ? "bg-purple-100 text-purple-800"
                              : product.badge === "Best Seller"
                              ? "bg-black text-white"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {product.badge}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2 group-hover:text-gray-600">
                      {product.name}
                    </h3>

                    <div className="flex items-center space-x-2 mb-3">
                      <span className="font-bold text-gray-900">
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <>
                          <span className="text-sm text-gray-500 line-through">
                            {product.originalPrice}
                          </span>
                          {product.discount && (
                            <span className="text-sm text-blue-600">
                              {product.discount}
                            </span>
                          )}
                        </>
                      )}
                    </div>

                    <div className="flex items-center space-x-1">
                      {product.colors.map((color, colorIndex) => (
                        <div
                          key={colorIndex}
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                      {product.colors.length > 5 && (
                        <span className="text-xs text-gray-500">
                          +{product.colors.length - 5}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer would go here */}
    </div>
  );
}

"use client";

import Image from "next/image";
import { useState, use, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Minus, Plus, ChevronRight, ZoomIn, ArrowDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Helper function to get product index for dynamic images
const getProductIndex = (productId: string) => {
  const productIds = [
    "leakproof-classic-one-piece-swimsuit",
    "ruched-deep-v-bikini-top", 
    "sculpt-wrap-one-piece-swimsuit",
    "sculpt-ruched-bikini-top"
  ];
  return productIds.indexOf(productId) + 1;
};

// Mock product data - in a real app this would come from an API
const productData = {
  "leakproof-classic-one-piece-swimsuit": {
    name: "Leakproof Classic One Piece Swimsuit",
    price: "$125.00",
    originalPrice: null,
    badge: "Made-to-Measure",
    description:
      "The perfect blend of comfort and protection. Our signature leakproof technology meets swimwear innovation for confident water activities.",
    colors: [
      { name: "Cocoa", value: "#8B4513", isSelected: true },
      { name: "Black", value: "#000000" },
      { name: "Navy", value: "#2F4F4F" },
      { name: "Purple", value: "#9932CC" },
    ],
    features: [
      "Leakproof technology for added confidence",
      "Classic silhouette with modern fit",
      "Quick-dry fabric technology",
      "Built-in shelf bra for support",
      "Chlorine and saltwater resistant",
      "UPF 50+ sun protection",
    ],
    details: {
      fabric: "82% Nylon, 18% Elastane",
      care: "Rinse after use, machine wash cold, lay flat to dry",
      protection: "Leakproof gusset technology",
    },
  },
  "ruched-deep-v-bikini-top": {
    name: "Ruched Deep V Bikini Top",
    price: "$65.00",
    originalPrice: null,
    badge: "Made-to-Measure",
    description:
      "A flattering deep V-neck with ruched detailing for a customizable fit. The perfect bikini top for sun-soaked days.",
    colors: [
      { name: "Lime", value: "#9ACD32", isSelected: true },
      { name: "Black", value: "#000000" },
      { name: "White", value: "#FFFFFF" },
      { name: "Navy", value: "#2F4F4F" },
      { name: "Leopard Print", value: "#F0E68C" },
      { name: "Purple", value: "#9932CC" },
    ],
    features: [
      "Deep V-neckline for a flattering look",
      "Ruched detailing allows for customizable fit",
      "Adjustable tie straps",
      "Removable padding for versatile styling",
      "Quick-dry fabric technology",
      "Chlorine and saltwater resistant",
    ],
    details: {
      fabric: "80% Nylon, 20% Elastane",
      care: "Rinse after use, machine wash cold, lay flat to dry",
      support: "Light to medium support with removable padding",
    },
  },
  "sculpt-wrap-one-piece-swimsuit": {
    name: "Sculpt Wrap One Piece Swimsuit",
    price: "$135.00",
    originalPrice: null,
    badge: "Made-to-Measure",
    description:
      "A sophisticated wrap design that sculpts and flatters your silhouette. The perfect one-piece for poolside elegance.",
    colors: [
      { name: "Black", value: "#000000", isSelected: true },
      { name: "Purple", value: "#9932CC" },
      { name: "Leopard Print", value: "#F0E68C" },
    ],
    features: [
      "Wrap design creates a flattering silhouette",
      "Sculpting fit through the torso",
      "Adjustable wrap tie for custom fit",
      "Built-in shelf bra with removable padding",
      "Quick-dry fabric technology",
      "UPF 50+ sun protection",
    ],
    details: {
      fabric: "82% Nylon, 18% Elastane",
      care: "Rinse after use, machine wash cold, lay flat to dry",
      fit: "True to size with adjustable wrap styling",
    },
  },
  "sculpt-ruched-bikini-top": {
    name: "Sculpt Ruched Bikini Top",
    price: "$70.00",
    originalPrice: null,
    badge: "Made-to-Measure",
    description:
      "Features our signature sculpting technology with ruched detailing. A bikini top that flatters and supports in equal measure.",
    colors: [
      { name: "Leopard Print", value: "#F0E68C", isSelected: true },
      { name: "Black", value: "#000000" },
    ],
    features: [
      "Sculpting fit technology",
      "Ruched detailing for texture and style",
      "Supportive underwire construction",
      "Adjustable straps for perfect fit",
      "Quick-dry fabric technology",
      "Chlorine and saltwater resistant",
    ],
    details: {
      fabric: "80% Nylon, 20% Elastane",
      care: "Rinse after use, machine wash cold, lay flat to dry",
      support: "Medium to full support with underwire",
    },
  },
};

const relatedProducts = [
  {
    id: "leakproof-ultrathin-no-show-high-rise",
    name: "Leakproof UltraThin No-Show High Rise",
    price: "$32.00",
    badge: "Best Seller",
    image: "bg-amber-100",
  },
  {
    id: "revolution-v-neck-bra",
    name: "Revolution V-Neck Bra",
    price: "$68.00",
    badge: "Best Seller",
    image: "bg-gray-900",
  },
  {
    id: "revolution-push-up-bra",
    name: "Revolution Push-Up Bra",
    price: "$72.00",
    badge: "New",
    image: "bg-amber-200",
  },
];

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Use the 'use' hook to unwrap the Promise
  const resolvedParams = use(params);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedBandSize, setSelectedBandSize] = useState("");
  const [selectedCupSize, setSelectedCupSize] = useState("");
  const [doublIdOption, setDoublIdOption] = useState("input"); // "input" or "no-doubl-id"
  const [doublId, setDoublId] = useState("");
  const [selectedColorState, setSelectedColorState] = useState("");
  const router = useRouter();

  const product = productData[resolvedParams.id as keyof typeof productData];

  // Check for generated DOUBL ID when component mounts
  useEffect(() => {
    const generatedId = localStorage.getItem("generatedDoublId");
    if (generatedId) {
      setDoublId(generatedId);
      setDoublIdOption("input");
      // Clear the stored ID
      localStorage.removeItem("generatedDoublId");
    }
  }, []);

  if (!product) {
    return <div>Product not found</div>;
  }

  const selectedColor =
    product.colors.find((color) => color.isSelected) || product.colors[0];

  const handleApplyId = () => {
    if (!doublId.trim()) return;

    // Save product data to localStorage for checkout
    const checkoutData = {
      id: resolvedParams.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      selectedColor: selectedColor.name,
      selectedSize: selectedSize || "S", // Default to S if no size selected
      doublId: doublId,
      quantity: quantity,
    };

    localStorage.setItem("checkoutProduct", JSON.stringify(checkoutData));

    // Navigate to checkout
    router.push("/checkout");
  };

  const handleScanNow = () => {
    // Save current product info and navigate to generate DOUBL ID
    const productInfo = {
      id: resolvedParams.id,
      name: product.name,
      returnUrl: window.location.pathname,
    };
    localStorage.setItem("productInfo", JSON.stringify(productInfo));
    router.push("/generate-doubl-id");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Banner */}
      <div className="bg-black text-white text-center py-2 text-sm">
        Bundle & Save on Leakproof Undies - starting at 3 for $60
      </div>

      {/* Navigation - Same as homepage */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-2xl font-bold text-black">knix</h1>
              </Link>
            </div>
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
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/" className="hover:text-gray-900">
            Shop All Bras
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            {/* Main Product Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Front View */}
              <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
                <Image
                  src={`/product-${getProductIndex(resolvedParams.id)}.png`}
                  alt={`${product.name} front view`}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4">
                  <ZoomIn className="h-6 w-6 text-gray-600" />
                </div>
              </div>

              {/* Detail View */}
              <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
                <Image
                  src={`/product-${getProductIndex(resolvedParams.id)}-1.png`}
                  alt={`${product.name} detail view`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Additional Views */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
                <Image
                  src={`/product-${getProductIndex(resolvedParams.id)}-2.png`}
                  alt={`${product.name} back view`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
                <Image
                  src={`/product-${getProductIndex(resolvedParams.id)}-3.png`}
                  alt={`${product.name} side view`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Product Info Graphic */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-center mb-6">
                <div className="text-sm text-gray-600 mb-2">
                  Versatile neckline with
                </div>
                <div className="text-sm text-gray-600">
                  invisible construction
                </div>
              </div>

              <div className="relative bg-white rounded-lg p-8 mx-auto max-w-sm">
                <div className="bg-amber-200 rounded-lg h-32 flex items-center justify-center mb-4">
                  <span className="text-gray-600 text-sm">Product Diagram</span>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center">
                    <span>Customizable straps:</span>
                    <span className="text-gray-600">straight or racerback</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Wireless support with 3D</span>
                    <span className="text-gray-600">BeyondSmooth™ 4-way</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>printed stabilizers</span>
                    <span className="text-gray-600">
                      stretch fabric stays smooth
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Product Header */}
            <div>
              {product.badge && (
                <Badge className="mb-3 bg-gray-100 text-gray-800">
                  {product.badge}
                </Badge>
              )}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-gray-600 mb-6">{product.description}</p>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-2xl font-bold text-gray-900">
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    {product.originalPrice}
                  </span>
                )}
                <Badge className="bg-green-100 text-green-800">
                  10% off Bra & Underwear Sets*
                </Badge>
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-gray-900">
                  Color: {selectedColor.name}, limited edition
                </h3>
              </div>
              <div className="flex space-x-3">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColorState(color.name)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColorState === color.name ||
                      (!selectedColorState && color.isSelected)
                        ? "border-gray-900"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.value }}
                  />
                ))}
              </div>
            </div>

            {/* DOUBL Fit ID Section */}
            <div>
              <h3 className="font-medium text-gray-900 mb-4">
                How would you like to proceed?
              </h3>

              <Select value={doublIdOption} onValueChange={setDoublIdOption}>
                <SelectTrigger className="w-full mb-4">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="input">Input DOUBL ID</SelectItem>
                  <SelectItem value="no-doubl-id">
                    I don't have a DOUBL ID
                  </SelectItem>
                </SelectContent>
              </Select>

              {doublIdOption === "input" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Enter your DOUBL ID
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., AB12-34CD-5678"
                      value={doublId}
                      onChange={(e) => setDoublId(e.target.value)}
                      className="w-full"
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      Your encrypted fit profile; you'll confirm size at
                      checkout.
                    </p>
                  </div>
                  <Button
                    onClick={handleApplyId}
                    className="w-full text-white transition-all duration-200 hover:shadow-lg active:scale-95"
                    style={{ backgroundColor: "#7c0347" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#5a0233")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#7c0347")
                    }
                    disabled={!doublId}
                  >
                    Apply ID
                  </Button>
                </div>
              )}

              {doublIdOption === "no-doubl-id" && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Don't have a DOUBL ID yet? Create one in under 60 seconds.
                  </p>
                  <div className="flex gap-3">
                    <Button
                      onClick={handleScanNow}
                      className="text-white transition-all duration-200 hover:shadow-lg active:scale-95"
                      style={{ backgroundColor: "#7c0347" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#5a0233")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "#7c0347")
                      }
                    >
                      SCAN NOW
                    </Button>
                    <Button
                      variant="outline"
                      className="text-black border-gray-400 transition-all duration-200 hover:bg-gray-100 hover:border-gray-500 active:scale-95"
                      onClick={() => {
                        /* Add tooltip or modal functionality here if needed */
                      }}
                    >
                      What is DOUBL ID?
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button
                className="w-full text-white py-3 text-lg font-medium transition-all duration-200 hover:shadow-lg active:scale-95"
                style={{ backgroundColor: "#800020" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#5a0015")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#800020")
                }
              >
                ADD TO BAG - {product.price}
              </Button>

              <div className="bg-green-50 text-green-800 p-3 rounded-lg text-sm">
                10% off Bra & Underwear Sets*
              </div>

              <div className="text-sm text-gray-600">
                or 4 payments of 17.00 with <strong>sezzle</strong>
              </div>
            </div>

            {/* Size Selection Modal Trigger */}
            {/* <div className="relative">
              <div className="flex justify-center">
                <ArrowDown className="h-8 w-8 text-purple-700 animate-bounce" />
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-4">
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Size Selection
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Replace traditional sizes with your DOUBL ID or start a
                      quick scan.
                    </p>
                    <div className="space-y-3">
                      <h5 className="font-medium text-gray-900">
                        How would you like to proceed?
                      </h5>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Input DOUBL ID" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="input">Input DOUBL ID</SelectItem>
                        </SelectContent>
                      </Select>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-1">
                          Enter your DOUBL ID
                        </label>
                        <Input
                          placeholder="e.g., AB12-34CD-5678"
                          className="mb-2"
                        />
                        <p className="text-xs text-gray-600">
                          Your encrypted fit profile; you'll confirm size at
                          checkout.
                        </p>
                      </div>
                      <Button
                        className="w-full text-white"
                        style={{ backgroundColor: "#7c0347" }}
                      >
                        Apply ID
                      </Button>
                    </div>
                  </div>

                  
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Size Selection
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Replace traditional sizes with your DOUBL ID or start a
                      quick scan.
                    </p>
                    <div className="space-y-3">
                      <h5 className="font-medium text-gray-900">
                        How would you like to proceed?
                      </h5>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="I don't have a DOUBL ID" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="no-id">
                            I don't have a DOUBL ID
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-gray-600">
                        Don't have a DOUBL ID yet? Create one in under 60
                        seconds.
                      </p>
                      <div className="flex gap-2">
                        <Button
                          className="text-white"
                          style={{ backgroundColor: "#7c0347" }}
                        >
                          SCAN NOW
                        </Button>
                        <Button
                          variant="outline"
                          className="text-black border-gray-400 hover:bg-gray-50"
                        >
                          What is DOUBL ID?
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            {/* Shipping & Returns */}
            <div className="grid grid-cols-2 gap-4 py-4 border-t">
              <div>
                <h4 className="font-medium text-gray-900 mb-1">
                  Free Shipping
                </h4>
                <p className="text-sm text-gray-600">on orders $100+</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">
                  Rewards members
                </h4>
                <p className="text-sm text-gray-600">earn 68 points</p>
              </div>
            </div>

            {/* Collapsible Sections */}
            <div className="space-y-4 border-t pt-6">
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer py-2">
                  <span className="font-medium text-gray-900">Details</span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <div className="pt-2 pb-4">
                  <ul className="space-y-1 text-sm text-gray-600">
                    {product.features.map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              </details>

              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer py-2">
                  <span className="font-medium text-gray-900">How It Fits</span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <div className="pt-2 pb-4 text-sm text-gray-600">
                  <p>
                    True to size. For the best fit, we recommend using our size
                    guide.
                  </p>
                </div>
              </details>

              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer py-2">
                  <span className="font-medium text-gray-900">
                    Fabric & Care
                  </span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <div className="pt-2 pb-4 text-sm text-gray-600">
                  <p>
                    <strong>Fabric:</strong> {product.details.fabric}
                  </p>
                  <p>
                    <strong>Care:</strong> {product.details.care}
                  </p>
                </div>
              </details>

              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer py-2">
                  <span className="font-medium text-gray-900">
                    Shipping & Returns
                  </span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <div className="pt-2 pb-4 text-sm text-gray-600">
                  <p>
                    Free shipping on orders over $100. 30-day returns accepted.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>

        {/* You May Also Like */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              You May Also Like
            </h2>
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-gray-900"
            >
              →
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(productData)
              .filter(([id]) => id !== resolvedParams.id)
              .slice(0, 3)
              .map(([id, productInfo], index) => {
                const productIndex = Object.keys(productData).indexOf(id) + 1;
                return (
                  <Link key={id} href={`/products/${id}`}>
                    <Card className="cursor-pointer group hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <div className="relative">
                          <div className="relative h-80 rounded-t-lg overflow-hidden">
                            <Image
                              src={`/product-${productIndex}.png`}
                              alt={productInfo.name}
                              fill
                              className="object-cover object-top"
                            />
                            {productInfo.badge && (
                              <Badge
                                className={`absolute top-4 left-4 ${
                                  productInfo.badge === "New"
                                    ? "bg-gray-200 text-gray-800"
                                    : productInfo.badge === "Kristen's Fave"
                                    ? "bg-purple-100 text-purple-800"
                                    : productInfo.badge === "Best Seller"
                                    ? "bg-black text-white"
                                    : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {productInfo.badge}
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="p-4">
                          <h3 className="font-medium text-gray-900 mb-2 group-hover:text-gray-600">
                            {productInfo.name}
                          </h3>
                          <div className="flex items-center space-x-2 mb-3">
                            <span className="font-bold text-gray-900">
                              {productInfo.price}
                            </span>
                            {productInfo.originalPrice && (
                              <>
                                <span className="text-sm text-gray-500 line-through">
                                  {productInfo.originalPrice}
                                </span>
                                <span className="text-sm text-blue-600">
                                  15% off
                                </span>
                              </>
                            )}
                          </div>
                          <div className="flex items-center space-x-1">
                            {productInfo.colors
                              .slice(0, 5)
                              .map((color, colorIndex) => (
                                <div
                                  key={colorIndex}
                                  className="w-4 h-4 rounded-full border border-gray-300"
                                  style={{ backgroundColor: color.value }}
                                />
                              ))}
                            {productInfo.colors.length > 5 && (
                              <span className="text-xs text-gray-500">
                                +{productInfo.colors.length - 5}
                              </span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

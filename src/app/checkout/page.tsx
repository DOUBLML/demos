"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";
import Image from "next/image";

export default function CheckoutPage() {
  const [productData, setProductData] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("Canada");
  const [discountCode, setDiscountCode] = useState("");
  const [emailOffers, setEmailOffers] = useState(false);

  useEffect(() => {
    // Get product data from localStorage or URL params
    const savedProduct = localStorage.getItem("checkoutProduct");
    if (savedProduct) {
      setProductData(JSON.parse(savedProduct));
    }
  }, []);

  const subtotal = productData?.price
    ? parseFloat(productData.price.replace("$", ""))
    : 65.0;
  const taxes = 8.45;
  const total = subtotal + taxes;

  const handleApplyDiscount = () => {
    console.log("Applying discount:", discountCode);
  };

  if (!productData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Loading checkout...
          </h2>
          <p className="text-gray-600">Preparing your order</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16">
            <h1 className="text-2xl font-bold text-black">knix</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Checkout Form */}
          <div className="space-y-8">
            {/* Express Checkout */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Express checkout
              </h2>
              <div className="grid grid-cols-3 gap-3">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md">
                  <span className="font-semibold">Shop</span>
                  <span className="ml-1 font-normal">Pay</span>
                </Button>
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-md font-semibold">
                  PayPal
                </Button>
                <Button className="bg-black hover:bg-gray-800 text-white py-3 rounded-md">
                  <span className="mr-2">G</span>Pay
                </Button>
              </div>
              <div className="text-center my-6">
                <span className="text-gray-500 text-sm">OR</span>
              </div>
            </div>

            {/* Contact */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">Contact</h2>
                <button className="text-sm text-gray-600 underline">
                  Login / Create an Account
                </button>
              </div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-4"
              />
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="email-offers"
                  checked={emailOffers}
                  onCheckedChange={(checked) =>
                    setEmailOffers(checked as boolean)
                  }
                />
                <label htmlFor="email-offers" className="text-sm text-gray-600">
                  Email me with news and offers
                </label>
              </div>
            </div>

            {/* Delivery */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Delivery
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country/Region
                  </label>
                  <Select value={country} onValueChange={setCountry}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="United States">
                        United States
                      </SelectItem>
                      <SelectItem value="United Kingdom">
                        United Kingdom
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <Input
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <Input
                  placeholder="Company (optional)"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />

                <div className="relative">
                  <Input
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="pr-10"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            {/* Product */}
            <div className="flex items-center space-x-4 p-4 border rounded-lg">
              <div className="relative">
                <div className="w-16 h-16 bg-green-200 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-gray-600">Product</span>
                </div>
                <div className="absolute -top-2 -right-2 bg-gray-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  1
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">
                  {productData.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {productData.selectedColor} /{" "}
                  {productData.selectedSize || "S"}
                </p>
                <p className="text-sm text-gray-600">Easy Returns</p>
              </div>
              <div className="text-right">
                <span className="font-medium text-gray-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Discount Code */}
            <div>
              <div className="flex gap-2">
                <Input
                  placeholder="Discount code or gift card"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  onClick={handleApplyDiscount}
                  className="px-6"
                >
                  Apply
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <button className="text-sm text-gray-600 underline">
                  Enter shipping address
                </button>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Estimated taxes</span>
                <span className="font-medium">${taxes.toFixed(2)}</span>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <div className="text-right">
                    <span className="text-sm text-gray-500 mr-2">CAD</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <Button
              className="w-full py-3 text-lg font-medium text-white"
              style={{ backgroundColor: "#800020" }}
            >
              Continue to shipping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

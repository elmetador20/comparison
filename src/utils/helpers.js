import clsx from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatPriceCompact(price) {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(1)}Cr`
  } else if (price >= 100000) {
    return `₹${(price / 100000).toFixed(1)}L`
  } else if (price >= 1000) {
    return `₹${(price / 1000).toFixed(1)}K`
  }
  return `₹${price}`
}

export function calculateSavings(originalPrice, currentPrice) {
  return originalPrice - currentPrice
}

export function calculateDiscountPercentage(originalPrice, currentPrice) {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
}

export function debounce(func, wait) {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

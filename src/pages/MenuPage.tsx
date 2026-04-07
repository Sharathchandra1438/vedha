import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/PageHero";

// ─── Types ───────────────────────────────────────────────────────────────────
type TopCategory =
  | "soups"
  | "starters"
  | "noodles"
  | "curries"
  | "tandoori"
  | "rice"
  | "biryani"
  | "breads"
  | "salads"
  | "desserts"
  | "beverages";

type SubCategory = string;

interface MenuItem {
  name: string;
  desc?: string;
  price: string;
  price2?: string;
  price3?: string;
  priceLabel2?: string;
  priceLabel3?: string;
}

interface MenuSection {
  sub: SubCategory;
  items: MenuItem[];
}

// ─── Menu Data ───────────────────────────────────────────────────────────────
const menuData: Record<TopCategory, MenuSection[]> = {
  soups: [
    {
      sub: "Veg",
      items: [
        { name: "Cream Tomato Soup", price: "₹119" },
        { name: "Cream Palak Soup", price: "₹119" },
        { name: "French Onion Soup", price: "₹119" },
        { name: "Manchow Soup", price: "₹119" },
        { name: "Hot & Sour Soup", price: "₹119" },
        { name: "Sweet Corn Soup", price: "₹119" },
        { name: "Schezwan Soup", price: "₹119" },
        { name: "Mushroom Soup", price: "₹119" },
        { name: "Vedha's Spl Veg Soup", price: "₹129" },
      ],
    },
    {
      sub: "Non Veg",
      items: [
        { name: "Sweet Corn Chicken Soup", price: "₹139" },
        { name: "Chicken Hot & Sour Soup", price: "₹139" },
        { name: "Chicken Schezwan Soup", price: "₹139" },
        { name: "Chicken Garlic Soup", price: "₹139" },
        { name: "Chicken Manchow Soup", price: "₹139" },
        { name: "Chicken Clear Soup", price: "₹139" },
        { name: "Chicken Lemon Soup", price: "₹139" },
        { name: "Mutton Hot & Sour Soup", price: "₹149" },
        { name: "Mutton Schezwan Soup", price: "₹149" },
        { name: "Vedha's Spl Non-Veg Soup", price: "₹159" },
      ],
    },
  ],

  starters: [
    {
      sub: "Veg",
      items: [
        { name: "Paneer Pakoda", price: "₹229" },
        { name: "Paneer Manchurian", price: "₹239" },
        { name: "Paneer Swasthik", price: "₹249" },
        { name: "Paneer Chilli", price: "₹249" },
        { name: "Paneer Majestic", price: "₹259" },
        { name: "Paneer 65", price: "₹259" },
        { name: "Crispy Paneer", price: "₹259" },
        { name: "Mushroom Manchurian", price: "₹259" },
        { name: "Mushroom Chilli", price: "₹259" },
        { name: "Veg Banjara", price: "₹259" },
        { name: "Golden Veg", price: "₹259" },
        { name: "Baby Corn Banjara", price: "₹259" },
        { name: "Gobi Chilli", price: "₹269" },
        { name: "Gobi 65", price: "₹269" },
        { name: "Gobi Manchurian", price: "₹269" },
        { name: "Aloo 65", price: "₹189" },
        { name: "Crispy Corn", price: "₹189" },
        { name: "Chilli Baby Corn", price: "₹229" },
        { name: "French Fries", price: "₹189" },
        { name: "Veg Manchurian", price: "₹249" },
      ],
    },
    {
      sub: "Veg Wet",
      items: [
        { name: "Veg Manchurian Wet", price: "₹239" },
        { name: "Veg Chilli Wet", price: "₹239" },
        { name: "Chinese Veg Wet", price: "₹239" },
        { name: "Chilli Paneer Wet", price: "₹249" },
        { name: "Ginger Paneer Wet", price: "₹249" },
        { name: "Ginger Gobi Wet", price: "₹239" },
        { name: "Chilli Mushroom Wet", price: "₹249" },
      ],
    },
    {
      sub: "Chicken",
      items: [
        { name: "Chicken Chilli", price: "₹329" },
        { name: "Chicken Manchurian", price: "₹329" },
        { name: "Chicken 65", price: "₹329" },
        { name: "Chicken Golden Fry", price: "₹329" },
        { name: "Chicken Goa", price: "₹329" },
        { name: "Chicken Mejistic", price: "₹329" },
        { name: "Chicken Lollipop 6p", price: "₹329" },
        { name: "Chicken Ginger Dry", price: "₹329" },
        { name: "Chicken Drumsticks 6p", price: "₹329" },
        { name: "Chicken Dragon", price: "₹329" },
        { name: "Chicken Nasik Dry", price: "₹349" },
        { name: "Chicken 100 (With bone)", price: "₹349" },
        { name: "Chicken 555", price: "₹349" },
        { name: "Pudina Chicken", price: "₹349" },
        { name: "Chicken Kaju Nut", price: "₹349" },
        { name: "Chicken Wings Crispy 6p", price: "₹349" },
        { name: "Chicken Roast", price: "₹349" },
        { name: "Pepper Chicken", price: "₹349" },
        { name: "Chicken Hot Garlic Dry", price: "₹349" },
        { name: "Schezwan Chicken Dry", price: "₹349" },
        { name: "Chicken Bhurani", price: "₹349" },
        { name: "Vedha's Spl Chicken Dry", price: "₹369" },
      ],
    },
    {
      sub: "Chicken Wet",
      items: [
        { name: "Chicken Chilli Wet", price: "₹319" },
        { name: "Chicken Manchurian Wet", price: "₹319" },
        { name: "Chicken Ginger Wet", price: "₹319" },
      ],
    },
    {
      sub: "Egg",
      items: [
        { name: "Egg Ellora", price: "₹229" },
        { name: "Egg Manchurian", price: "₹229" },
        { name: "Egg 65", price: "₹229" },
        { name: "Egg Chilli", price: "₹239" },
        { name: "Egg Pepper Garlic Fry", price: "₹239" },
        { name: "Egg Nasik Dry", price: "₹239" },
        { name: "Egg Hot Garlic Dry", price: "₹239" },
        { name: "Vedha's Spl Egg Dry", price: "₹249" },
      ],
    },
    {
      sub: "Mutton",
      items: [
        { name: "Mutton Chilli", price: "₹399" },
        { name: "Mutton Manchurian", price: "₹399" },
        { name: "Mutton 65", price: "₹399" },
        { name: "Mutton Korea", price: "₹399" },
        { name: "Mutton Golden Fry", price: "₹409" },
        { name: "Mutton Ginger Dry", price: "₹409" },
        { name: "Vedha's Spl Mutton Dry", price: "₹419" },
      ],
    },
    {
      sub: "Mutton Wet",
      items: [
        { name: "Mutton Chilli Wet", price: "₹389" },
        { name: "Mutton Ginger Wet", price: "₹399" },
        { name: "Mutton Hot Garlic Wet", price: "₹399" },
      ],
    },
    {
      sub: "Fish",
      items: [
        { name: "Apollo Fish", price: "₹369" },
        { name: "Fish Manchuria", price: "₹369" },
        { name: "Fish Chilli", price: "₹369" },
        { name: "Fish 65", price: "₹369" },
        { name: "Fish Ginger Dry", price: "₹369" },
        { name: "Fish Fingers", price: "₹369" },
        { name: "Schezwan Fish Dry", price: "₹369" },
        { name: "Vedha's Spl Fish Dry", price: "₹389" },
      ],
    },
    {
      sub: "Prawns",
      items: [
        { name: "Prawns Hot Garlic Dry", price: "₹369" },
        { name: "Prawns Hariyali", price: "₹369" },
        { name: "Prawns Manchurian", price: "₹369" },
        { name: "Prawns Chilli", price: "₹369" },
        { name: "Prawns 65", price: "₹369" },
        { name: "Prawns Golden Dry", price: "₹369" },
        { name: "Prawns Ellora", price: "₹369" },
        { name: "Schezwan Prawns Dry", price: "₹369" },
        { name: "Loose Prawns", price: "₹369" },
        { name: "Vedha's Spl Prawns Dry", price: "₹389" },
      ],
    },
    {
      sub: "Fish / Prawns Wet",
      items: [
        { name: "Fish Manchurian Wet", price: "₹359" },
        { name: "Chilli Fish Wet", price: "₹359" },
        { name: "Fish Ginger Wet", price: "₹359" },
        { name: "Prawns Manchurian Wet", price: "₹359" },
        { name: "Prawns Chilli Wet", price: "₹359" },
        { name: "Schezwan Prawns Wet", price: "₹359" },
      ],
    },
  ],

  noodles: [
    {
      sub: "Veg",
      items: [
        { name: "Veg Soft Noodles", price: "₹199" },
        { name: "Veg Crispy Noodles", price: "₹199" },
        { name: "Veg Kashmiri Noodles", price: "₹209" },
        { name: "Veg Singapoor Noodles", price: "₹209" },
        { name: "Veg Chow Min Wet Noodles", price: "₹209" },
        { name: "Vedha's Spl Wet Noodles", price: "₹219" },
      ],
    },
    {
      sub: "Non Veg",
      items: [
        { name: "Chicken Soft Noodles", price: "₹239" },
        { name: "Mutton Soft Noodles", price: "₹259" },
        { name: "Egg Soft Noodles", price: "₹219" },
        { name: "Prawn Soft Noodles", price: "₹239" },
        { name: "American Chopsuey Non Veg", price: "₹279" },
        { name: "Vedha's SPL Non Veg Soft Noodles", price: "₹279" },
      ],
    },
  ],

  curries: [
    {
      sub: "Veg",
      items: [
        { name: "Navratan Korma", price: "₹289" },
        { name: "Shahi Veg", price: "₹289" },
        { name: "Maharani Veg", price: "₹289" },
        { name: "Malaysia Veg", price: "₹289" },
        { name: "Kolhapuri Veg", price: "₹289" },
        { name: "Kadai Veg", price: "₹289" },
        { name: "Telangana Veg Curry", price: "₹279" },
        { name: "Jaipuri Veg", price: "₹289" },
        { name: "Singapore Veg", price: "₹289" },
        { name: "Mix Veg Curry", price: "₹279" },
        { name: "Mutter Aloo", price: "₹279" },
        { name: "Gobi Palak", price: "₹279" },
        { name: "Methi Tomato", price: "₹279" },
        { name: "Dhai Pakoda Curry", price: "₹289" },
        { name: "Til Mirchi Masala", price: "₹289" },
        { name: "Vedha's Spl Veg Curry", price: "₹309" },
      ],
    },
    {
      sub: "Paneer",
      items: [
        { name: "Kaju Paneer", price: "₹349" },
        { name: "Methi Chaman", price: "₹339" },
        { name: "Shahi Paneer", price: "₹339" },
        { name: "Paneer Man Pasand", price: "₹339" },
        { name: "Paneer Bhurji", price: "₹339" },
        { name: "Palak Paneer", price: "₹329" },
        { name: "Kadai Paneer", price: "₹339" },
        { name: "Kaju Kadai", price: "₹349" },
        { name: "Paneer Butter Masala", price: "₹329" },
        { name: "Vedha's Spl Paneer", price: "₹359" },
      ],
    },
    {
      sub: "Mushroom",
      items: [
        { name: "Mushroom Palak", price: "₹269" },
        { name: "Mushroom Butter Masala", price: "₹269" },
        { name: "Kadai Mushroom", price: "₹269" },
        { name: "Aloo Mushroom Masala", price: "₹269" },
        { name: "Mushroom Tomato", price: "₹269" },
        { name: "Vedha's Spl Mushroom Curry", price: "₹289" },
      ],
    },
    {
      sub: "Kofta",
      items: [
        { name: "Malai Kofta Curry", price: "₹289" },
        { name: "Palak Kashmiri Kofta", price: "₹289" },
        { name: "Paneer Kofta", price: "₹309" },
        { name: "Veg Kofta Curry", price: "₹289" },
        { name: "Vedha's Spl Veg Kofta", price: "₹319" },
      ],
    },
    {
      sub: "Chicken",
      items: [
        { name: "Butter Chicken", price: "₹369" },
        { name: "Mughlai Chicken", price: "₹369" },
        { name: "Kolhapuri Chicken", price: "₹359" },
        { name: "Kadai Chicken", price: "₹359" },
        { name: "Punjabi Chicken", price: "₹359" },
        { name: "Malaysia Chicken", price: "₹359" },
        { name: "Murg Mussalam", price: "₹379" },
        { name: "Hyderabadi Chicken", price: "₹359" },
        { name: "Maharaja Chicken", price: "₹359" },
        { name: "Saghwala Chicken", price: "₹359" },
        { name: "Chicken Masala", price: "₹359" },
        { name: "Chicken Curry", price: "₹349" },
        { name: "Chicken Fry", price: "₹359" },
        { name: "Telangana Chicken", price: "₹359" },
        { name: "Vedha's Spl Chicken Curry", price: "₹379" },
      ],
    },
    {
      sub: "Mutton",
      items: [
        { name: "Mutton Mughlai", price: "₹449" },
        { name: "Mutton Kolhapuri", price: "₹449" },
        { name: "Kadai Mutton", price: "₹449" },
        { name: "Mutton Punjabi", price: "₹439" },
        { name: "Mutton Afghani", price: "₹449" },
        { name: "Mutton Rogan Josh", price: "₹439" },
        { name: "Mutton Masala", price: "₹439" },
        { name: "Mutton Malaysia", price: "₹449" },
        { name: "Mutton Sanghwala", price: "₹449" },
        { name: "Mutton Hyderabadi", price: "₹449" },
        { name: "Mutton Maharaja", price: "₹449" },
        { name: "Mutton Manpasand", price: "₹449" },
        { name: "Mutton Kofta Curry", price: "₹459" },
        { name: "Mutton Keema Curry", price: "₹459" },
        { name: "Vedha's SPL Mutton Curry", price: "₹469" },
      ],
    },
    {
      sub: "Prawns",
      items: [
        { name: "Prawns Masala", price: "₹379" },
        { name: "Telangana Prawns", price: "₹379" },
        { name: "Prawns Kolhapuri", price: "₹389" },
        { name: "Kadai Prawns", price: "₹389" },
        { name: "Prawns Curry", price: "₹379" },
        { name: "Buttered Prawns Masala", price: "₹389" },
        { name: "Vedha's SPL Prawns Curry", price: "₹399" },
      ],
    },
    {
      sub: "Fish",
      items: [
        { name: "Fish Curry", price: "₹369" },
        { name: "Telangana Fish Curry", price: "₹369" },
        { name: "Fish Kolhapuri", price: "₹379" },
        { name: "Kadai Fish", price: "₹379" },
        { name: "Fish Masala", price: "₹369" },
        { name: "Vedha's SPL Fish Curry", price: "₹389" },
      ],
    },
    {
      sub: "Egg",
      items: [
        { name: "Egg Bhurji", price: "₹189" },
        { name: "Egg Masala", price: "₹219" },
        { name: "Egg Curry", price: "₹219" },
        { name: "Egg Maharaja", price: "₹229" },
        { name: "Egg Chettinad", price: "₹229" },
        { name: "Italian Egg Curry", price: "₹229" },
      ],
    },
    {
      sub: "Dal",
      items: [
        { name: "Dal Fry", price: "₹219" },
        { name: "Tomato Tadka Dal", price: "₹219" },
        { name: "Kashmiri Dal", price: "₹239" },
        { name: "Punjabi Dal", price: "₹229" },
        { name: "Palak Dal", price: "₹219" },
        { name: "Kolhapuri Dal", price: "₹229" },
        { name: "Vedha's Spl Dal Tadka", price: "₹249" },
      ],
    },
  ],

  tandoori: [
    {
      sub: "Tandoori",
      items: [
        { name: "Chicken Tikka (8 Pc)", price: "₹349" },
        {
          name: "Kalmi Kabab",
          price: "₹359",
          price2: "₹189",
          priceLabel2: "2 Pc",
        },
        {
          name: "Tangdi Kabab",
          price: "₹359",
          price2: "₹189",
          priceLabel2: "2 Pc",
        },
        { name: "Banjara Kabab", price: "₹359" },
        { name: "Chicken Malai Kabab", price: "₹359" },
        { name: "Garlic Chicken Kabab", price: "₹359" },
        {
          name: "Tandoori Chicken",
          price: "₹599",
          price2: "₹299",
          priceLabel2: "Half",
        },
        { name: "Fish Tikka (8 Pc)", price: "₹369" },
        { name: "Paneer Tikka", price: "₹279" },
      ],
    },
  ],

  rice: [
    {
      sub: "Veg",
      items: [
        { name: "Veg Fried Rice", price: "₹229" },
        { name: "Jeera Fried Rice", price: "₹239" },
        { name: "Onion & Chilli Fried Rice", price: "₹239" },
        { name: "Palak Fried Rice", price: "₹239" },
        { name: "Mushroom Fried Rice", price: "₹239" },
        { name: "Seven-O Fried Rice", price: "₹239" },
        { name: "Paneer Fried Rice", price: "₹239" },
        { name: "Baby Corn Fried Rice", price: "₹239" },
        { name: "Lemon & Coconut Corn Fried Rice", price: "₹239" },
        { name: "Tomato Fried Rice", price: "₹229" },
        { name: "Biryani Rice Full", price: "₹179" },
        { name: "Plain Rice", price: "₹69" },
        { name: "Curd Rice", price: "₹139" },
        { name: "Vedha's Spl Curd Rice", price: "₹159" },
        { name: "Sambar Rice", price: "₹189" },
        { name: "Dal Khichidi", price: "₹189" },
      ],
    },
    {
      sub: "Non Veg",
      items: [
        { name: "Chicken Fried Rice", price: "₹269" },
        { name: "Mutton Fried Rice", price: "₹289" },
        { name: "Egg Fried Rice", price: "₹239" },
        { name: "Fish Fried Rice", price: "₹259" },
        { name: "Prawns Fried Rice", price: "₹259" },
        { name: "Vedha's Spl Mutton Fried Rice", price: "₹299" },
        { name: "Vedha's Spl Chicken Fried Rice", price: "₹279" },
        { name: "Schezwan Chicken Fried Rice", price: "₹269" },
        { name: "Schezwan Mutton Fried Rice", price: "₹269" },
        { name: "Schezwan Fish Fried Rice", price: "₹269" },
        { name: "Schezwan Prawns Fried Rice", price: "₹269" },
        { name: "Chicken Sambar Rice", price: "₹209" },
        { name: "Vedha's Spl Mixed Fried Rice", price: "₹319" },
      ],
    },
  ],

  biryani: [
    {
      sub: "Veg Biryani",
      items: [
        {
          name: "Veg Biryani",
          price: "₹159",
          price2: "₹249",
          price3: "₹499",
          priceLabel2: "Handi",
          priceLabel3: "Family",
        },
        { name: "Kashmiri Veg Biryani Full", price: "₹259" },
        { name: "Vedha's Spl Veg Biryani", price: "₹259" },
        { name: "Paneer Kaju Biryani", price: "₹239", price2: "₹339", priceLabel2: "Handi" },
        {
          name: "Paneer Biryani",
          price: "₹209",
          price2: "₹299",
          price3: "₹599",
          priceLabel2: "Handi",
          priceLabel3: "Family",
        },
        { name: "Kaju Biryani", price: "₹329" },
        { name: "Mushroom Biryani", price: "₹299" },
      ],
    },
    {
      sub: "Non Veg Biryani",
      items: [
        {
          name: "Chicken Dum Biryani",
          price: "₹219",
          price2: "₹319",
          price3: "₹629",
          priceLabel2: "Handi",
          priceLabel3: "Family",
        },
        {
          name: "Mutton Dum Biryani",
          price: "₹269",
          price2: "₹389",
          price3: "₹739",
          priceLabel2: "Handi",
          priceLabel3: "Family",
        },
        { name: "Prawns Biryani", price: "₹269", price2: "₹389", priceLabel2: "Handi" },
        { name: "Fish Biryani", price: "₹269", price2: "₹389", priceLabel2: "Handi" },
        { name: "Egg Biryani", price: "₹249" },
        { name: "Vedha's Spl Chicken Biryani", price: "₹349" },
        { name: "Vedha's Spl Mutton Biryani", price: "₹419" },
        { name: "Mutton Keema Biryani", price: "₹459" },
        { name: "Mutton Mughlai Biryani", price: "₹449" },
        { name: "Chicken Mughlai Biryani", price: "₹389" },
        { name: "Joint Chicken Biryani", price: "₹339" },
        { name: "Fried Piece Chicken Biryani", price: "₹219", price2: "₹319", priceLabel2: "Handi" },
      ],
    },
    {
      sub: "Pulao",
      items: [
        { name: "Kashmiri Kesar Pulao", price: "On Request" },
        { name: "Green Peas Pulao", price: "On Request" },
        { name: "Paneer Tikka Pulao", price: "On Request" },
        { name: "Egg Pulao", price: "On Request" },
        { name: "Chicken Pulao", price: "On Request" },
        { name: "Prawn Pulao", price: "On Request" },
        { name: "Fish Pulao", price: "On Request" },
        { name: "Mixed Non-Veg Pulao", price: "On Request" },
        { name: "Vegetable Pulao", price: "On Request" },
      ],
    },
    {
      sub: "Jumbo Specials",
      items: [
        { name: "Vedha's SPL Jumbo Mutton", price: "₹1,099" },
        { name: "Vedha's SPL Jumbo Chicken", price: "₹999" },
      ],
    },
  ],

  breads: [
    {
      sub: "Roti / Naan / Indian Breads",
      items: [
        { name: "Roti", price: "₹30" },
        { name: "Butter Roti", price: "₹35" },
        { name: "Naan", price: "₹40" },
        { name: "Butter Naan", price: "₹45" },
        { name: "Garlic Naan", price: "₹55" },
        { name: "Kulcha", price: "₹45" },
        { name: "Garlic Kulcha", price: "₹60" },
        { name: "Masala Kulcha", price: "₹60" },
        { name: "Aloo Paratha", price: "₹55" },
        { name: "Lacha Paratha", price: "₹50" },
        { name: "Pudina Paratha", price: "₹50" },
        { name: "Menthi Paratha", price: "₹50" },
        { name: "Pulka", price: "₹30" },
        { name: "Butter Pulka", price: "₹35" },
        { name: "Roasted Papad", price: "₹30" },
        { name: "Fry Papad", price: "₹35" },
        { name: "Roasted Masala Papad", price: "₹45" },
        { name: "Fry Masala Papad", price: "₹45" },
      ],
    },
  ],

  salads: [
    {
      sub: "Salads",
      items: [
        { name: "Onion Salad", price: "₹70" },
        { name: "Tomato Salad", price: "₹90" },
        { name: "Cucumber Salad", price: "₹90" },
        { name: "Carrot & Beetroot Salad", price: "₹90" },
        { name: "Green Salad", price: "₹90" },
        { name: "Spl Veg Salad", price: "₹130" },
      ],
    },
    {
      sub: "Raita & Curd",
      items: [
        { name: "Curd", price: "₹40" },
        { name: "Mix Raita", price: "₹60" },
        { name: "Onion Raita", price: "₹50" },
        { name: "Cucumber Raita", price: "₹50" },
      ],
    },
  ],

  desserts: [
    {
      sub: "Desserts",
      items: [
        { name: "Gulab Jamun + Ice Cream", price: "₹99" },
        { name: "Gulab Jamun", price: "₹59" },
        { name: "Double Ka Meetha", price: "₹59" },
        { name: "Kaddu Ka Kheer", price: "₹59" },
        { name: "Qurbani Ka Meetha", price: "₹99" },
        { name: "Qurbani Ka Meetha + Ice Cream", price: "₹149" },
      ],
    },
  ],

  beverages: [
    {
      sub: "Beverages",
      items: [
        { name: "Fresh Lime Soda", price: "₹69" },
        { name: "Butter Milk", price: "₹69" },
        { name: "Lassi", price: "₹69" },
        { name: "Milk Shake", price: "₹149" },
        { name: "Mojito", price: "₹149" },
        { name: "Ice Cream", price: "₹99" },
        { name: "Fruit Salad", price: "₹149" },
        { name: "Soft Drink", price: "₹40" },
        { name: "Water Bottle", price: "₹25" },
      ],
    },
  ],
};

// ─── Tab Config ───────────────────────────────────────────────────────────────
const topCategories: { key: TopCategory; label: string;  }[] = [
  { key: "soups", label: "Soups" },
  { key: "starters", label: "Starters" },
  { key: "noodles", label: "Noodles" },
  { key: "curries", label: "Curries" },
  { key: "tandoori", label: "Tandoori" },
  { key: "rice", label: "Rice" },
  { key: "biryani", label: "Biryani" },
  { key: "breads", label: "Breads" },
  { key: "salads", label: "Salads"},
  { key: "desserts", label: "Desserts" },
  { key: "beverages", label: "Beverages" },
];

// ─── Price Display Helper ─────────────────────────────────────────────────────
const PriceDisplay = ({ item }: { item: MenuItem }) => {
  if (item.price2 || item.price3) {
    return (
      <div className="flex flex-col items-end gap-1 min-w-[120px]">
        <div className="flex items-center gap-2">
          <span className="font-body text-xs text-muted-foreground">
            {item.price3 ? "Bachelor" : ""}
          </span>
          <span className="font-display text-base font-semibold text-primary">
            {item.price}
          </span>
        </div>
        {item.price2 && (
          <div className="flex items-center gap-2">
            <span className="font-body text-xs text-muted-foreground">
              {item.priceLabel2 ?? ""}
            </span>
            <span className="font-display text-base font-semibold text-primary">
              {item.price2}
            </span>
          </div>
        )}
        {item.price3 && (
          <div className="flex items-center gap-2">
            <span className="font-body text-xs text-muted-foreground">
              {item.priceLabel3 ?? ""}
            </span>
            <span className="font-display text-base font-semibold text-primary">
              {item.price3}
            </span>
          </div>
        )}
      </div>
    );
  }
  return (
    <span className="font-display text-lg font-semibold text-primary whitespace-nowrap">
      {item.price}
    </span>
  );
};

// ─── Component ────────────────────────────────────────────────────────────────
const MenuPage = () => {
  const [activeTop, setActiveTop] = useState<TopCategory>("soups");
  const [activeSub, setActiveSub] = useState<string>(
    menuData["soups"][0].sub
  );

  const handleTopChange = (key: TopCategory) => {
    setActiveTop(key);
    setActiveSub(menuData[key][0].sub);
  };

  const sections = menuData[activeTop];
  const hasSubs = sections.length > 1;
  const visibleItems = hasSubs
    ? sections.find((s) => s.sub === activeSub)?.items ?? []
    : sections[0].items;

  return (
    <>
      <PageHero title="Our Menu" subtitle="A Culinary Journey" />

      <section className="section-padding bg-background">
        <div className="max-w-4xl mx-auto">

          {/* ── Top Category Tabs ── */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {topCategories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => handleTopChange(cat.key)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-body text-sm uppercase tracking-widest transition-all duration-300 ${
                  activeTop === cat.key
                    ? "gold-gradient text-secondary"
                    : "border border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {/* <span>{cat.icon}</span> */}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* ── Sub-Category Tabs (shown only when multiple subs) ── */}
          {hasSubs && (
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {sections.map((sec) => (
                <button
                  key={sec.sub}
                  onClick={() => setActiveSub(sec.sub)}
                  className={`px-4 py-1.5 rounded font-body text-xs uppercase tracking-widest transition-all duration-300 ${
                    activeSub === sec.sub
                      ? "bg-primary/20 text-primary border border-primary"
                      : "border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary"
                  }`}
                >
                  {sec.sub}
                </button>
              ))}
            </div>
          )}

          {/* ── Menu Items List ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTop}-${activeSub}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="space-y-0"
            >
              {visibleItems.map((item) => (
                <div
                  key={item.name}
                  className="flex items-start justify-between py-5 border-b border-border/50 last:border-0"
                >
                  <div className="flex-1 pr-4">
                    <h3 className="font-display text-base font-semibold text-foreground leading-snug">
                      {item.name}
                    </h3>
                    {item.desc && (
                      <p className="font-body text-muted-foreground text-sm mt-0.5">
                        {item.desc}
                      </p>
                    )}
                  </div>
                  <PriceDisplay item={item} />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
};

export default MenuPage;
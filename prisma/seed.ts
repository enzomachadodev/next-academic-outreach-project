import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

import { getUserDataSelect, UserData } from "../src/features/users/lib/types";

const prisma = new PrismaClient();

const posts: {
  content: string;
  comments: string[];
  images: string[];
  likes: number;
}[] = [
  {
    content:
      "Just launched my handmade candle collection! They’re made with eco-friendly wax and scents inspired by nature. Any tips on reaching more customers?\n\n#SmallBusiness #Entrepreneur #Sustainable",
    comments: [
      "That sounds amazing! Best of luck!",
      "This is such a great idea!",
      "Looking forward to seeing more of your work!",
    ],
    images: [
      "https://plus.unsplash.com/premium_photo-1736517212031-4ebd3a558bd4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    likes: 14,
  },
  {
    content:
      "Excited to share my new line of recycled fabric bags!\n\n#SmallBusiness #Entrepreneur #Sustainable",
    comments: [
      "These look amazing! Where can I buy one?",
      "Love the eco-friendly vibe—great job!",
      "What’s the price range?",
    ],
    images: [
      "https://images.unsplash.com/photo-1656182806674-f631457519dd?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    likes: 23,
  },
  {
    content:
      "Grateful for the $50 donation from Maria! It’s going straight into buying supplies for my pottery business.",
    comments: [],
    images: [
      "https://plus.unsplash.com/premium_photo-1675719068414-6b261cffeb08?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1740478949627-155c907b3ca0?q=80&w=1503&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    likes: 19,
  },
  {
    content:
      "Looking for a collaborator to create a sustainable jewelry line. Anyone interested in partnering up?",
    comments: [],
    images: [
      "https://plus.unsplash.com/premium_photo-1681276170758-d6ca6e6e276a?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    likes: 5,
  },
  {
    content:
      "My freelance graphic design gig just landed a big client! Celebrating with a cup of coffee and some sketching today.",
    comments: ["Congrats! That’s huge!", "What kind of project is it?"],
    images: [
      "https://plus.unsplash.com/premium_photo-1661497401345-938fce8c71ee?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1663334840232-03a3c8631089?q=80&w=1488&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    likes: 27,
  },
  {
    content: "Selling organic honey from my backyard bees!",
    comments: [
      "This looks delicious! Do you ship?",
      "How do you manage the bees? So cool!",
    ],
    images: [
      "https://plus.unsplash.com/premium_photo-1673505276422-01702bc4809b?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    likes: 12,
  },
  {
    content:
      "Need help with social media ads for my bakery. Any entrepreneurs out there with experience to share?",
    comments: [],
    images: [
      "https://plus.unsplash.com/premium_photo-1661603983847-671026cbd156?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    likes: 3,
  },
  {
    content:
      "Thanks to your support, I’ve upgraded my sewing machine! Excited to take on bigger orders now.",
    comments: [],
    images: [
      "https://plus.unsplash.com/premium_photo-1682142721713-2b076bc2b29b?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    likes: 16,
  },
  {
    content:
      "Running a pop-up stall at the local market this weekend. Stop by for some homemade cookies and a chat!",
    comments: [],
    images: [
      "https://plus.unsplash.com/premium_photo-1699555728731-70a9bf22526a?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1673886089869-a9b1c71a8138?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    likes: 21,
  },
  {
    content: "Just finished a batch of wooden toys for kids.",
    comments: [
      "These are adorable! Perfect for my nephew.",
      "Do you do custom orders?",
      "Great craftsmanship!",
    ],
    images: [
      "https://plus.unsplash.com/premium_photo-1661698976513-94ddedafbfa8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    likes: 25,
  },
  {
    content:
      "Small business tip: Consistency is key! I post every day to keep my followers engaged. What’s your secret?",
    comments: [],
    images: [
      "https://images.unsplash.com/photo-1632152943364-728220ee6b4a?q=80&w=1297&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    likes: 10,
  },
  {
    content:
      "Dreaming of opening a second location for my flower shop. Any advice on securing funding?",
    comments: [],
    images: [
      "https://images.unsplash.com/photo-1588340154485-3da46e3eda28?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    likes: 7,
  },
  {
    content:
      "Made my first international sale today—shipping handmade scarves to Canada! Feeling on top of the world.",
    comments: [],
    images: [
      "https://plus.unsplash.com/premium_photo-1673298260591-7000cd0b2f79?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1730808558111-11bcb892065f?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    likes: 18,
  },
  {
    content: "Looking for eco-friendly packaging ideas for my soap bars.",
    comments: [
      "Try beeswax wraps—they’re sustainable and cute!",
      "I use recycled paper boxes for mine.",
    ],
    images: [
      "https://images.unsplash.com/photo-1604565750665-3501b2c00194?q=80&w=1310&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    likes: 13,
  },
  {
    content:
      "Big thanks to João for the $20 donation! It’s helping me print flyers for my dog-walking service.",
    comments: [],
    images: [
      "https://images.unsplash.com/photo-1511525719693-258742ab7ee1?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    likes: 15,
  },
  {
    content:
      "Hosting a webinar on sustainable entrepreneurship next week. DM me to join—it’s free!",
    comments: [],
    images: [
      "https://images.unsplash.com/photo-1636275133457-b57780aeeab0?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    likes: 9,
  },
  {
    content: "My online store hit 100 sales this month!",
    comments: [
      "Wow, that’s inspiring! Congrats!",
      "What’s your best-selling product?",
      "Amazing milestone—keep it up!",
      "How long did it take to get here?",
    ],
    images: [
      "https://images.unsplash.com/photo-1735302616103-587edb9cd96c?q=80&w=1538&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    likes: 28,
  },
  {
    content:
      "Need a photographer to shoot my new jewelry collection. Anyone local to São Paulo?",
    comments: [],
    images: [
      "https://plus.unsplash.com/premium_photo-1740020263676-d8fd6ac419af?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    likes: 4,
  },
  {
    content:
      "Just crafted a custom guitar for a client. It’s my best work yet—feeling proud!",
    comments: [],
    images: [
      "https://images.unsplash.com/photo-1587159973221-8f63e8d75d69?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1695727036766-4d06ac90d7f3?q=80&w=1373&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    likes: 22,
  },
  {
    content: "Offering 20% off my crochet blankets this week!",
    comments: ["Perfect timing—I need a gift!", "That blanket looks so comfy."],
    images: [
      "https://images.unsplash.com/photo-1649113757783-80dd7ebf9859?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    likes: 17,
  },
  {
    content:
      "How do you balance work and family as an entrepreneur? I could use some tips!",
    comments: [],
    images: [
      "https://images.unsplash.com/photo-1661701958227-5bd5cb2c58a2?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    likes: 11,
  },
  {
    content:
      "Partnered with a local farm to sell fresh veggies online. Supporting small businesses feels so good!",
    comments: [],
    images: [
      "https://images.unsplash.com/photo-1619153422227-08d462800327?q=80&w=1448&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1678274324663-afc2c68eeeec?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    likes: 20,
  },
  {
    content: "My candle-making workshop sold out!",
    comments: [
      "So jealous—any more workshops soon?",
      "Congrats on the sell-out!",
      "What was your favorite part to teach?",
      "Wish I lived closer to join!",
    ],
    images: [
      "https://plus.unsplash.com/premium_photo-1663099908294-e235675ca558?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    likes: 26,
  },
  {
    content:
      "Struggling with shipping costs for my art prints. Any cost-saving hacks out there?",
    comments: [],
    images: [
      "https://images.unsplash.com/photo-1660494208882-e0fe803560e9?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    likes: 6,
  },
  {
    content:
      "Celebrating one year of my tutoring service! Grateful for every student and supporter along the way.",
    comments: [],
    images: [
      "https://images.unsplash.com/photo-1599827083902-7ebdbad1744c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1603337514975-1a2f2dca8b0b?q=80&w=1286&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    likes: 24,
  },
  {
    content: "New product alert: Herbal teas blended from my garden.",
    comments: [
      "What flavors do you have?",
      "This looks so relaxing—ordering now!",
    ],
    images: [
      "https://images.unsplash.com/photo-1612706965205-7570f423e339?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    likes: 15,
  },
  {
    content:
      "Looking for feedback on my logo design for my catering business. Willing to trade some cupcakes for opinions!",
    comments: [],
    images: [
      "https://images.unsplash.com/photo-1626251851903-1143b5c6f057?q=80&w=1546&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1663133737289-448f4954f042?q=80&w=1285&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    likes: 2,
  },
  {
    content:
      "Just shipped a batch of custom phone cases! Loving the creative process and hearing from happy customers.",
    comments: [],
    images: [
      "https://images.unsplash.com/photo-1593055454503-531d165c2ed8?q=80&w=1315&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    likes: 13,
  },
  {
    content:
      "Inspired by the UN SDGs, I’m donating 10% of my profits to local education programs. Who’s with me?",
    comments: [],
    images: [
      "https://images.unsplash.com/photo-1680178776508-41a276595b0f?q=80&w=1516&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1590274853856-f22d5ee3d228?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    likes: 19,
  },
  {
    content:
      "Just launched my handmade candle collection! They’re made with eco-friendly wax and scents inspired by nature. Any tips on reaching more customers?\n\n#SmallBusiness #Entrepreneur #Sustainable",
    comments: [
      "That sounds amazing! Best of luck!",
      "This is such a great idea!",
      "Looking forward to seeing more of your work!",
    ],
    images: [
      "https://plus.unsplash.com/premium_photo-1736517212031-4ebd3a558bd4?q=80&w=1470&auto=format&fit=crop",
    ],
    likes: 14,
  },
  {
    content:
      "Struggling to keep my coffee shop afloat this month. Could use some advice on affordable marketing strategies!\n\n#SmallBusiness #Entrepreneur #Sustainable",
    comments: [
      "Try posting on local Facebook groups—it worked for me!",
      "Have you considered a loyalty card program?",
    ],
    images: [
      "https://images.unsplash.com/photo-1599229809585-f92ea053b547?q=80&w=1335&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1532713107108-dfb5d8d2fc42?q=80&w=1364&auto=format&fit=crop",
    ],
    likes: 8,
  },
  {
    content:
      "Excited to share my new line of recycled fabric bags!\n\n#SmallBusiness #Entrepreneur #Sustainable",
    comments: [
      "These look amazing! Where can I buy one?",
      "Love the eco-friendly vibe—great job!",
      "What’s the price range?",
    ],
    images: [
      "https://images.unsplash.com/photo-1656182806674-f631457519dd?q=80&w=1335&auto=format&fit=crop",
    ],
    likes: 23,
  },
  {
    content:
      "Starting my journey into handmade ceramic art. 🎨✨ I'm excited to explore the creativity and craftsmanship that comes with molding clay into unique pieces.\n\nPricing my products has been a challenge, and I'd love to hear insights from experienced ceramic artists. 💡 What factors should I consider when setting prices? Material costs, time invested, market demand?\n\nLet's discuss and support each other in this creative journey!\n\n#Handmade #Ceramics #Artisan #SmallBusiness",
    comments: [
      "Love ceramic art! Pricing is key!",
      "Check out some online marketplaces for ideas.",
    ],
    images: [
      "https://images.unsplash.com/photo-1520408222757-6f9f95d87d5d?q=80&w=1280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    likes: 12,
  },
  {
    content:
      "Recently switched to biodegradable packaging for my bakery. 🌿🥐 Not only does it help reduce waste, but it also gives my products a fresh, eco-friendly touch!\n\nSustainability is something I truly care about, and I'm thrilled to take this step towards reducing my environmental footprint. ♻️ Have you made any sustainable changes in your business? Let’s inspire each other!\n\n#EcoFriendly #Sustainability #GreenBusiness #Bakery",
    comments: [
      "That’s a fantastic initiative!",
      "Sustainability is so important!",
    ],
    images: [
      "https://images.unsplash.com/photo-1586014927192-021030327c45?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    likes: 19,
  },
  {
    content:
      "Excited to introduce my new collection of wooden phone cases! 📱🌿 Crafted from high-quality wood, these cases are both durable and stylish—a perfect blend of aesthetics and sustainability.\n\nEach piece is unique, featuring natural wood grain patterns that make every case one of a kind. 🍃 What’s your favorite material for phone accessories? Let’s talk sustainable fashion!\n\n#SustainableLiving #HandmadeGoods #EcoTech #WoodenDesign",
    comments: ["Those sound perfect!", "Wooden cases are so unique."],
    images: [
      "https://images.unsplash.com/photo-1638726302618-d1d33ab13266?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    likes: 8,
  },
  {
    content:
      "📢 Hosting a FREE online workshop on branding for small businesses next week! 🚀\n\nIf you're an entrepreneur looking to build a strong brand identity, this is for you! We'll cover essential branding strategies, social media presence, and how to connect with your audience effectively.\n\nInterested? Drop a comment or DM me for details! 📩 Let’s grow together! 🔥\n\n#Branding #SmallBusiness #Marketing #Entrepreneurship",
    comments: ["I’d love to join!", "Branding is everything!"],
    images: [
      "https://images.unsplash.com/photo-1722218530906-ebde00f48849?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    likes: 17,
  },
  {
    content:
      "🎨 My latest artwork is now available for purchase! 🎨\n\nEach piece tells a unique story, inspired by nature, emotions, and the beauty of everyday life. Creating art has always been my passion, and I'm so happy to share my work with the world. 🌎💛\n\nI’d love to hear your thoughts! Which colors or styles resonate with you the most? Let’s talk art! 🖌️\n\n#Artist #HandmadeArt #CreativeJourney #SupportSmallArtists",
    comments: ["That’s wonderful!", "Where can I see the collection?"],
    images: [
      "https://plus.unsplash.com/premium_photo-1677609898243-63280b6c89a1?q=80&w=1283&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    likes: 8,
  },
  {
    content:
      "Struggling to keep my coffee shop afloat this month. Could use some advice on affordable marketing strategies!\n\n#SmallBusiness #Entrepreneur #Sustainable",
    comments: [
      "Try posting on local Facebook groups—it worked for me!",
      "Have you considered a loyalty card program?",
    ],
    images: [
      "https://images.unsplash.com/photo-1599229809585-f92ea053b547?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1532713107108-dfb5d8d2fc42?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    likes: 8,
  },
];

type UserSeed = UserData & { sex: "female" | "male" };

async function seed() {
  const users: UserSeed[] = [];

  for (let i = 0; i < 30; i++) {
    const sex = i % 2 == 0 ? "female" : "male";

    const firstName = faker.person.firstName(sex);
    const lastName = faker.person.lastName(sex);
    const username = faker.internet.username({ firstName, lastName });

    const user = await prisma.user.create({
      data: {
        username,
        name: `${firstName} ${lastName}`,
        email: faker.internet.email(),
        bio: faker.lorem.sentence({ min: 10, max: 40 }),
        image: faker.image.personPortrait({
          sex,
          size: 256,
        }),
      },
      select: getUserDataSelect(),
    });

    users.push({ ...user, sex });
  }

  const followPromises = [];

  for (const follower of users) {
    for (const following of users) {
      if (follower.id !== following.id) {
        followPromises.push(
          prisma.follow.create({
            data: {
              followerId: follower.id,
              followingId: following.id,
            },
          }),
        );
      }
    }
  }

  await Promise.all(followPromises);

  await prisma.$transaction(async (prisma) => {
    for (const { content, images, comments, likes } of posts) {
      const randomUserPost = faker.helpers.arrayElement(users);

      const post = await prisma.post.create({
        data: {
          content,
          userId: randomUserPost.id,
        },
      });

      await Promise.all(
        images.map((image) =>
          prisma.media.create({
            data: {
              postId: post.id,
              url: image,
              type: "IMAGE",
            },
          }),
        ),
      );

      await Promise.all(
        Array.from({ length: likes }).map(async (_, i) => {
          if (i < users.length) {
            await prisma.like.create({
              data: {
                postId: post.id,
                userId: users[i].id,
              },
            });
          }
        }),
      );

      await Promise.all(
        comments.map((comment) => {
          const randomUserComment = faker.helpers.arrayElement(users);
          return prisma.comment.create({
            data: {
              content: comment,
              postId: post.id,
              userId: randomUserComment.id,
            },
          });
        }),
      );
    }
  });

  console.log("Seed concluído com sucesso!");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

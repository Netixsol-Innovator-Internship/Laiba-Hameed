import person from "../assets/header/person.svg";
import local_mall from "../assets/header/local_mall.svg";
import Search from "../assets/header/Search.png";


// New feature icons 
import teaCup from "../assets/home/features/local_cafe.svg";
import organicBadge from "../assets/home/features/redeem.svg";
import deliveryTruck from "../assets/home/features/local_shipping.svg";
import sampleTag from "../assets/home/features/sell.svg";

// Tea collection images
import blackTea from "../assets/home/collections/Image Holder.svg";
import greenTea from "../assets/home/collections/Image Holder1.svg";
import whiteTea from "../assets/home/collections/Image Holder2.svg";
import matcha from "../assets/home/collections/Image Holder3.svg";
import herbalTea from "../assets/home/collections/Image Holder4.svg";
import chai from "../assets/home/collections/Image Holder5.svg";
import oolong from "../assets/home/collections/Image Holder6.svg";
import rooibos from "../assets/home/collections/Image Holder7.svg";
import teaware from "../assets/home/collections/Image Holder8.svg";

export const NavList = {
    tea_collections: {
        id: 1,
        value: "TEA COLLECTIONS",
        path: "/",
    },
    accessories: {
        id: 2,
        value: "accessories",
        path: "/",
    },
    blog: {
        id: 3,
        value: "blog",
        path: "/",
    },
    contact_us :{
        id: 4,
        value:" contact us",
        path: "/"
    }
};


export const Icons = {
    search: {
        id: 1,
        src: Search, // path to your image file
        alt: "Search Icon",
        path: "/search"
    },
    user: {
        id: 2,
        src: person,
        alt: "person Icon",
        path: "/user"
    },
    mail: {
        id: 3,
        src: local_mall,
        alt: "local Icon",
        path: "/mail"
    }
};

// home page feature list 
export const Features = [
    { id: 1 ,icon: teaCup, text: "450+ KIND OF LOOSEF TEA" },
    { id: 2 ,icon: organicBadge, text: "CERTIFICATED ORGANIC TEAS" },
    { id: 3 ,icon: deliveryTruck, text: "FREE DELIVERY" },
    { id: 4 ,icon: sampleTag, text: "SAMPLE FOR ALL TEAS" }
];


// Collections data
export const Collections = [
    { id: 1 ,img: blackTea, title: "BLACK TEA" },
    { id: 2 ,img: greenTea, title: "GREEN TEA" },
    { id: 3 ,img: whiteTea, title: "WHITE TEA" },
    { id: 4 ,img: matcha, title: "MATCHA" },
    { id: 5 ,img: herbalTea, title: "HERBAL TEA" },
    { id: 6 ,img: chai, title: "CHAI" },
    { id: 7 ,img: oolong, title: "OOLONG" },
    { id: 8 ,img: rooibos, title: "ROOIBOS" },
    { id: 9 ,img: teaware, title: "TEAWARE" }
];
export const Products = {
    
}
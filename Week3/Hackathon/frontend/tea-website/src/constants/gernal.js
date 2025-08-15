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
        value: "TEA COLLECTIONS",
        path: "/",
    },
    accessories: {
        value: "accessories",
        path: "/",
    },
    blog: {
        value: "blog",
        path: "/",
    },
    contact_us :{
        value:" contact us",
        path: "/"
    }
};


export const Icons = {
    search: {
        src: Search, // path to your image file
        alt: "Search Icon",
    },
    user: {
        src: person,
        alt: "person Icon",
    },
    mail: {
        src: local_mall,
        alt: "local Icon",
    }
};

// home page feature list 
export const Features = [
    { icon: teaCup, text: "450+ KIND OF LOOSEF TEA" },
    { icon: organicBadge, text: "CERTIFICATED ORGANIC TEAS" },
    { icon: deliveryTruck, text: "FREE DELIVERY" },
    { icon: sampleTag, text: "SAMPLE FOR ALL TEAS" }
];


// Collections data
export const Collections = [
    { img: blackTea, title: "BLACK TEA" },
    { img: greenTea, title: "GREEN TEA" },
    { img: whiteTea, title: "WHITE TEA" },
    { img: matcha, title: "MATCHA" },
    { img: herbalTea, title: "HERBAL TEA" },
    { img: chai, title: "CHAI" },
    { img: oolong, title: "OOLONG" },
    { img: rooibos, title: "ROOIBOS" },
    { img: teaware, title: "TEAWARE" }
];
export const Products = {
    
}
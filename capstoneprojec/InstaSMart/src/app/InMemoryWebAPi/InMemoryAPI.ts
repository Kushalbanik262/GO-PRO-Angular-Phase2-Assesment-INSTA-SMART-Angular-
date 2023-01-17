import { sales } from './../Entities/sales';
import { Products, productCat } from './../Entities/products';
import { UserPriviledges, Users } from './../Entities/users';
import { InMemoryDbService } from "angular-in-memory-web-api";
import { Cart } from '../Entities/cart';


//This Is the Specific Class For Driving InMemmory WebApi Service
export class InMemoryWebApi implements InMemoryDbService{ //It Implements InMemoryDbService

  createDb(){ //It Overrides The CreateDB Method
    let users:Users[] = [ //Creating Some dummy Users
      {
        id:101,
        name:"Kushal Banik",
        username:"kushal",
        password:"kushal1234",
        priviledge:UserPriviledges.USER, //This is the Normal User With name Kushal Banik
        address:"Khardah,Kolkata",
        contact:"kushalbanik93@gmail.com",
        buy:[],
        card:[{
          id:102900147852,
          cvv:"078",
          name:"SIMPLY CLICK:State Bank Of India"
        }],
        locked:false
      },

      {//Creating Another User
        id:302,
        name:"Ayan Sinha",
        username:"ayan",
        password:"ayan1234",
        priviledge:UserPriviledges.ADMIN, //This is the Admin User
        address:"Nion City Bangalore",
        contact:"ayan2023@gmail.com",
        buy:[],
        card:[{
          id:102900147852,
          cvv:"234",
          name:"PULSE:INDIAN OVERSIS BANK"
        }],
        locked:false
      }
    ];


    let sales:sales[] = [ //Creating five Sales Which will be displayed through Moving caraousel as given Rubrics
      {
        id:1,
        category:"Winter Sale",
        details:"All Electronics ",
        image:"https://img.paisawapas.com/ovz3vew9pw/2017/07/26205443/AMAZON-DEAL-THUMBNAIL2.jpg",
        name:"Mega Winter Off",
        offer:"20% Off Over Headphones"
      },
      {
        id:2,
        category:"The Grand Gadget Sale",
        details:"All Gadgets",
        image:"https://pbs.twimg.com/media/ETZ7jT2XkAATR1m.jpg",
        name:"Bonanza On New Gadgets",
        offer:"30% CashBack"
      },
      {
        id:3,
        category:"Best Of Gadget",
        details:"For All The Electronics & Gadgets",
        image:"https://images.gizbot.com/fit-in/img/600x338/2021/03/amazon-best-tech-gadgets-2021-offer-on-laptops-gaming-devices-electronics-devices-1615363455.jpg",
        name:"New Year Sales",
        offer:"50% CashBack over SBI"
      },
      {
        id:4,
        category:"vegetable Sale",
        details:"All Winter Vgetables",
        image:"https://cdn2.vectorstock.com/i/1000x1000/88/16/discount-sale-poster-with-fresh-vegetable-vector-13778816.jpg",
        name:"Yearly Mart Sale",
        offer:"10 Coupons Free!"
      },
      {
        id:5,
        category:"Fruit Fanta",
        details:"All Dry Fruits",
        image:"https://thumbs.dreamstime.com/z/fruits-sale-shop-6621533.jpg",
        name:"Fruit Foodies Sale",
        offer:"5% Off"
      }
    ];


    let products:Products[] = [ //Creating Three Products For Initial User of 'Products' Type
      {
        id:12,
        name:"Onion",
        category:productCat.Daily,
        details:"Our Onions Comes Direct From the farmer with freashness",
        price:110,
        ratings:3.7,
        feedback:"Good in Nature and Fresh!",
        image:[
          "https://m.media-amazon.com/images/I/81gv--xMImL._SX679_.jpg",
          "https://cdn-prod.medicalnewstoday.com/content/images/articles/276/276714/red-and-white-onions.jpg",
          "https://www.southernliving.com/thmb/lz4xg7kerf1aCahRlp4WhLbYi5k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1279120925-1-175489607f764e03be03927e5b90c11a.jpg"],
        reviews:[
          {
            content:"It Got me tears :))",
            image:"https://cs-tf.com/wp-content/uploads/2021/08/can-chickens-eat-cooked-onions.jpg"
          },
          {
            content:"Thanks For delivery",
            image:"https://post.greatist.com/wp-content/uploads/sites/2/2020/04/GRT-how-to-cut-onion-1200x628-facebook-1200x628.jpg"
          },
          {
            content:"Yummy Chicken is coming Up who wants to taste!!!",
            image:"https://img.freepik.com/free-photo/curry-with-chicken-onions-indian-food-asian-cuisine_2829-4415.jpg"
          }
        ]
      },
      {
        id:13,
        name:"Dolby Atmos Head Phone",
        category:productCat.Electronics,
        details:"This is The Headphone from SOat Company, with dolby Tech",
        price:2678,
        feedback:"Comes With crystal Clear sound and noise cancelation",
        image:[
          "https://cdn.shopify.com/s/files/1/1603/9553/products/MuffsA1200x1200Black1.jpg?v=1652264702",
          "https://cdn.shopify.com/s/files/1/1676/7297/products/Main-Image_5dd17660-d566-4297-bc2e-e43de833b2fc_600x.jpg?v=1613028178",
          "https://m.media-amazon.com/images/I/513PuLtilUL._SY355_.jpg"
        ],
        ratings:4.5,
        reviews:[
          {
            content:"Nice Headphones",
            image:"https://images.indianexpress.com/2022/04/Urbanista-los-angeles-review-featured.jpg"
          },
          {
            content:"Got The Headphone Broken",
            image:"https://preview.redd.it/ewfpxs0yc5q61.jpg?auto=webp&s=864a2cd660ffb4576386f7eba301beeb71e49435"
          }
        ]
      },
      {
        id:20,
        category:productCat.LifeStyle,
        details:"This Is Fresh Moisturizer perfect for the winter",
        feedback:"This is our one of the best selling product",
        name:"Nivea Moisturizing Cream",
        image:[
          "https://images-us.nivea.com/-/media/media-center-items/8/d/a/295036-web_1010x1180_transparent_png.png",
          "https://www.jiomart.com/images/product/original/490998044/nivea-soft-light-moisturiser-cream-for-face-hands-body-300-ml-product-images-o490998044-p490998044-0-202209150720.jpg",
          "https://images-static.nykaa.com/media/catalog/product/2/7/270816c4005808679829.jpg"
        ],
        price:180,
        ratings:3,
        reviews:[]
      }
    ];


    let cart:Cart[] =[]; //Creating a Empty Cart as When The Application is Loaded First No operations is performed

    return {users,products,cart,sales}; //Returing The users,Products,cart and sales for using apis
  }

}

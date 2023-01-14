import { Products, productCat } from './../Entities/products';
import { UserPriviledges, Users } from './../Entities/users';
import { InMemoryDbService } from "angular-in-memory-web-api";
import { Cart } from '../Entities/cart';



export class InMemoryWebApi implements InMemoryDbService{

  createDb(){
    let users:Users[] = [
      {
        id:101,
        name:"Kushal Banik",
        username:"kushal",
        password:"kushal1234",
        priviledge:UserPriviledges.USER,
        address:"Khardah,Kolkata",
        contact:"kushalbanik93@gmail.com",
        buy:[],
        card:[{
          id:147852,
          cvv:"078",
          name:"Simpli Click"
        }],
        locked:false
      }
    ];


    let products:Products[] = [
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
        category:productCat.HouseHold,
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
        details:"This Is Fresh Mostorizer perfect for the winter",
        feedback:"This is our one of the best selling product",
        name:"Nivea Mostorizing Cream",
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


    let cart:Cart[] =[];

    return {users,products,cart};
  }

}

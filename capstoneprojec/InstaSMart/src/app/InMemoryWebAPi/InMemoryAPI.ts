import { Products } from './../Entities/products';
import { UserPriviledges, Users } from './../Entities/users';
import { InMemoryDbService } from "angular-in-memory-web-api";



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
    ]

    return {users};
  }

}

import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, getTestBed } from '@angular/core/testing';
import { UserPriviledges, Users } from '../Entities/users';
import { UserService } from './../Services/User.service';

/**
 * Spec To test User Service
 */


describe('User Service', () => {
  /**
   * Variables For Service,injector,httpMock and Users
   */
  let service:UserService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let users:Users[];

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
      ],
      providers: [UserService]

    }).compileComponents();

  service=TestBed.get(UserService);//Creating The Service By Injecting
  injector = getTestBed();
  httpMock = injector.get(HttpTestingController); //Creating The Mock Using Injector

  //Creating Some Dummy Users
   users =[
    {
      id:101,
      address:"Kolkata",
      buy:[],
      card:[
        {
          cvv:"003",
          id:7489,
          name:"SBI CLICK"
        }
      ],
      contact:"kushalbanik@gmail.com",
      locked:false,
      name:"Kushal Banik",
      password:"xyz1234",
      priviledge:UserPriviledges.USER,
      username:"kushalbanik"
    },
    {
      id:102,
      address:"Bangalore",
      buy:[],
      card:[
        {
          cvv:"715",
          id:9967,
          name:"SBI Pulse"
        }
      ],
      contact:"kushalbanik@gmail.com",
      locked:false,
      name:"Ayan Sinha",
      password:"asdasd7",
      priviledge:UserPriviledges.ADMIN,
      username:"ayansinha"
    }
   ];

  });



  /**
   * Verify Must be Called After each test to close the http connection for testing
   */
  afterEach(() => {
    console.log("After Each Called");
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * Fetching All The Users Successful or not
   */

  it("Get All Current Carts",()=>{
    let response:Users;
    const fn=spyOn(service, 'getAllUsers').and.returnValue( //Spying on the service for 'getAllUsers' method
     of(users)
    );

    service.getAllUsers().subscribe(response=>{
      expect(response).toEqual(users); //Fethed All The Datas Must be Equals to the created Users
    });

   expect(fn).toHaveBeenCalled(); //Expecting The Spy Method to Have Been called Once
  });



})

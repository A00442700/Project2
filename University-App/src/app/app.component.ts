import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name!: string;
  sName!: string;
  address!: string;
  phone!: string;
  message:any;
  data=[{Name:"",Address:"",Phone:""}];
  errorMessage:any;
  constructor(private http: HttpClient){
  
  }
  ngOnInit(){
  }
  saveUniversity()
  {
  var data = {
          "Name": this.name,
          "Address": this.address,
          "Phone": this.phone
          }
    console.log(data);
    const jsonData = JSON.parse(JSON.stringify(data))
    if (!this.name) {
      alert("Please enter the name of the university!");
      return false;
  }
  if (!this.address ) {
      alert("Please enter the address of the university!");
      return false;
  }
  if (!this.phone) {
      alert("Please enter the phone number of the university!");
      return false;
  }
  
      this.http.post<any>('http://dev.cs.smu.ca:9898/addUniversity',
      jsonData).subscribe({
          next:data=>{
              this.message=data.message;
                console.log(this.message);
                },
          error:error=>{
              this.errorMessage=error.message;
                  console.log('Error is ',this.errorMessage);
                }
      })  
      return true;         
  }
  removeUniversity()
  {
    if (!this.name) {
      alert("Please enter the name of the university!");
      return false;
  }
  const data = {
          'Name': this.name,
          }
      this.http.post<any>('http://dev.cs.smu.ca:9898/deleteUniversity',
          data).subscribe( 
          (res) => {if(res.n==0){
            alert('University not found')
          }else{
            alert('University deleted Successfully')
          }
        },
          (err) => console.log(err)
      );   
      return true;       
  }
  searchUniversity()
  {
    if (!this.sName) {
      alert("Please enter the name of the university!");
      return false;
  }
  
  const data= {
          'Name': this.sName
          }
      this.http.post<any>('http://dev.cs.smu.ca:9898/searchUniversity',
          data).subscribe( 

            {
              next:data=>{
                  this.message=data.message;
                 this.data=data;
                 if(data.length==0){
                  alert('University not found')
                }
                    },
              error:error=>{
                  this.errorMessage=error.message;
                      console.log('Error is ',this.errorMessage);
                    }
          }
      )  
  return true;       
  }
  searchAllUniversity()
  {
  const data = {}
      this.http.post<any>('http://dev.cs.smu.ca:9898/searchAllUniversity',
          data).subscribe( 
          {
            next:data=>{
                this.message=data.message;
               this.data=data;
               if(data.length==0){
                alert('Please add University')
              }
                  },
            error:error=>{
                this.errorMessage=error.message;
                    console.log('Error is ',this.errorMessage);
                  }
        }
      )     
}
}


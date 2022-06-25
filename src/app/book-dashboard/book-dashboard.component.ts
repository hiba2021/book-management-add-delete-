import { Book } from './book.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';




@Component({
  selector: 'app-book-dashboard',
  styleUrls: ['./book-dashboard.component.css'],
  template:`

<section>
  <form [formGroup]="bookform">
        <mat-form-field>
            <input matInput
              type="email"
              matInput
              placeholder="Name of the book"
              formControlName="bookName"
             >
              
          </mat-form-field>
          <button mat-raised-button color="primary" (click)="addBook()"  [disabled]="bookform.invalid">Add Book</button>

  </form>

  <mat-table [dataSource]="dataSource"  matSort>

<ng-container matColumnDef="id"> 
  <mat-header-cell *matHeaderCellDef mat-sort-header>ID</mat-header-cell>
  <mat-cell *matCellDef="let book ">{{book.id |number}}</mat-cell>
</ng-container>

<ng-container matColumnDef="bookName" > 
  <mat-header-cell *matHeaderCellDef mat-sort-header>Name</mat-header-cell>
  <mat-cell *matCellDef="let book ">{{book.name}}</mat-cell>
</ng-container>

<ng-container matColumnDef="operations" > 
        <mat-header-cell *matHeaderCellDef>delete Book</mat-header-cell>
        <mat-cell *matCellDef="let book">     
              <button mat-raised-button (click)="delete(book)" >
              Delete
              </button>
           
        </mat-cell>
      </ng-container>


<mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
          <mat-row *matRowDef="let row; columns:displayedColumns;"></mat-row>  

  </mat-table>
         
      </section>
  `
})
export class BookDashboardComponent implements OnInit {

  
  displayedColumns:string[] = ['id', 'bookName','operations'];
  dataSource=new MatTableDataSource<Book>();
 bookList : Book[] = [];
 lastId:number=1;

 bookform=this.fb.group({
  bookName : new FormControl('', [Validators.required])
})



  constructor(
    private fb:FormBuilder

  ) { }

  ngOnInit(): void {
   
  }

  addBook(){
    console.log(this.bookList.length, 'length in the begining');


    const id = this.bookList.length+1;
console.log(this.bookform.value['bookName'],'formvalue');
//this.bookList.push(this.bookform.value);
console.log(this.lastId,'lastId');
this.bookList.push({"id":this.bookList.length<this.lastId?this.lastId:id+1,"name":this.bookform.value['bookName']});
console.log(this.bookList,'this.booklist');
console.log(this.bookList.length,'length after push');
this.lastId=this.bookList.length+1;
this.dataSource.data=this.bookList;
console.log(this.dataSource.data,'dataSource');

  }

  delete(book:Book){
    console.log(book,'the book to be deleted');
    this.bookList.forEach((value,index)=>{
      if(value.id==book.id) this.bookList.splice(index,1);
  });
  console.log(this.bookList.length,'length after delete');

  this.dataSource.data=this.bookList;
  
  }

}

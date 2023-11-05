import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIService } from '../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {
  

  bookForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder ,
    private apiService:APIService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      author: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
      description: ['', Validators.required],
      publicationYear: ['', [Validators.required, Validators.pattern('^\\d{4}$')]],
      isbn: ['', [Validators.required, Validators.pattern('^\\d{13}$')]]
    });
  }

  onSubmit() {
    if (this.bookForm.valid) {
      // You can add code here to save the book data or perform other actions.
      // Access the form values using this.bookForm.value
      console.log(this.bookForm.value);
      var bookDetails = this.bookForm.value

      this.apiService.postData(bookDetails , '/book/createNewBook').subscribe((res:any)=>{
        console.log(res);
        if(res.status){
          this.bookForm.reset();
          this.router.navigate(['/']);
          
        }
      })

    }
  }

}

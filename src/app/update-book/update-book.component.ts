import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { APIService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.scss']
})
export class UpdateBookComponent implements OnInit {

  bookDetails = {
    Id: ''
  };

  bookValue: any = {
    title: '',
    author: '',
    description: '',
    publicationYear: '',
    isbn: ''
  };

  updateFrom!: FormGroup;
  FormBuilder: any;
  bookValues: any;

  constructor(public route: ActivatedRoute, private apiService: APIService,
    private formBuilder: FormBuilder ,
    ) { }
  ngOnInit(): void {
    this.updateFrom = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      author: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
      description: ['', Validators.required],
      publicationYear: ['', [Validators.required, Validators.pattern('^\\d{4}$')]],
      isbn: ['', [Validators.required, Validators.pattern('^\\d{13}$')]]
    });

   this.getBookDeatis()

  }

  getBookDeatis() {
    this.bookDetails.Id = this.route.snapshot.params['id'];
    console.log(this.bookDetails.Id);

    this.apiService.postData(this.bookDetails, '/book/viewBook').subscribe((res: any) => {
      console.log(res,"success");
      if(res.status){
        this.bookValues = res.data[0];

        this.updateFrom.setValue({
          title: res.data.title,
          author: res.data.author,
          description: res.data.description,
          publicationYear: res.data.publicationYear,
          isbn: res.data.isbn,
        });
      }
    })
  }

  onSubmit() {
    console.log("onSubmit");

    var bookDetails = this.updateFrom.value

    this.apiService.postData(bookDetails , '/book/updatebook').subscribe((res:any)=>{
      console.log(res);
      if(res.status){
        this.getBookDeatis();
      }
    })
  }

}

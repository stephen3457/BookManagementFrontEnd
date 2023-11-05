import { Component, OnInit } from '@angular/core';
import { APIService } from '../app/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  books: any;
  bookDetails = {
    Id: ''
  };
  searchTerm: string = '';
  searchStatus = false;

  filteredBooks:any = [];
  itemsPerPage: number = 5;
  currentPage: number = 1;
  searchText: string = '';
  
  constructor(
    private apiService: APIService
  ) { }
  ngOnInit(): void {
    this.apiService.getData('/book/allBooks').subscribe((res: any) => {
      if (res.status) {
        this.books = res.data;
    this.filteredBooks = [...this.books];

      } else {
        console.log("error");
      }
    })
  }

  deleteBook(id: any) {
    this.bookDetails.Id = id;
    this.apiService.postData(this.bookDetails, '/book/deleteBook').subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        // this.books = res.data;
      }
    })
  }
  searchBooks() {
    this.filteredBooks = this.books.filter((book:any) =>
      book.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
      book.author.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  changePage(page: number) {
    this.currentPage = page;
  }
  getPaginatedBooks() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredBooks.slice(startIndex, endIndex);
  }
 paginationArray() {
    if (this.filteredBooks) {
      const totalPages = Math.ceil(this.filteredBooks.length / this.itemsPerPage);
      return new Array(totalPages).fill(0).map((_, index) => index + 1);
    } else {
      return [];
    }
  }
}

import { Component, OnInit } from '@angular/core';

import { CrudService } from './service/crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'News App';

  news: any;
  newsTitle: string;

  constructor(private crudService: CrudService) { }

  ngOnInit() {
    this.crudService.read_News().subscribe(data => {

      this.news = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Title: e.payload.doc.data()['Title'],
        };
      })
      console.log(this.news);

    });
  }

  CreateRecord() {
    let record = {};
    record['Title'] = this.newsTitle;
    this.crudService.create_NewNews(record).then(resp => {
      this.newsTitle = '';
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }

  RemoveRecord(rowID) {
    this.crudService.delete_News(rowID);
  }

  EditRecord(record) {
    record.isEdit = true;
    record.EditTitle = record.Title;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['Title'] = recordRow.EditTitle;
    this.crudService.update_News(recordRow.id, record);
    recordRow.isEdit = false;
  }

}

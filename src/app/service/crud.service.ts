import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class CrudService  {

  constructor(
    private firestore: AngularFirestore
  ) { }

  create_NewNews(record) {
    return this.firestore.collection('news').add(record);
  }

  read_News() {
    return this.firestore.collection('news').snapshotChanges();
  }

  update_News(recordID, record) {
    this.firestore.doc('news/' + recordID).update(record);
  }

  delete_News(record_id) {
    this.firestore.doc('news/' + record_id).delete();
  }

}

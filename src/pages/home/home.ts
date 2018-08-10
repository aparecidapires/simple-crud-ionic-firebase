import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public edit = false;

  categoryName: string;
  categoriesCollection: AngularFirestoreCollection<any> = this.afs.collection('categories');
  categoriesList = this.categoriesCollection.valueChanges();
  idCategory: string;

  constructor(public navCtrl: NavController, public afs: AngularFirestore) { }

  ionViewDidLoad() { }

  categoryData() {
    return this.categoriesList.subscribe(category => {
      category.forEach(res => {
        this.idCategory = res.id,
          this.categoryName = res.name
      })
    })
  }

  add() {
    this.idCategory = this.afs.createId();
    this.categoriesCollection.doc(this.idCategory).set({
      id: this.idCategory,
      name: this.categoryName
    }).then(() => {
      this.categoryName = ''
    })
  }

  save() {
    this.categoriesCollection.doc(this.idCategory).update({
      name: this.categoryName
    }).then(() => {
      this.categoryName = ''
    })
    this.edit = false;
  }

  update(id, name) {
    this.categoryName = name
    this.edit = true
  }

  delete(id) {
    this.categoriesCollection.doc(id).delete()
  }

}
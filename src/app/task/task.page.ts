import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {
  task: any = [];
  modal_tambah = false;
  modal_edit = false;
  id: any;
  title: any;
  desk: any;
  status: any;

  constructor(public _apiService: ApiService, private modal: ModalController) { }

  ngOnInit() {
    this.getTask();
  }
  getTask() {
    this._apiService.tampil('tampil.php').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.task = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    })
  }
  reset_model() {
    this.id = null;
    this.title = '';
    this.desk = '';
    this.status = '';
  }
  open_modal_tambah(isOpen: boolean) {
    this.modal_tambah = isOpen;
    this.reset_model();
    this.modal_tambah = true;
    this.modal_edit = false;
  }
  open_modal_edit(isOpen: boolean, idget: any) {
    this.modal_edit = isOpen;
    this.id = idget;
    console.log(this.id);
    this.getTaskId(this.id);
    this.modal_tambah = false;
    this.modal_edit = true;
  }
  cancel() {
    this.modal.dismiss();
    this.modal_tambah = false;
    this.reset_model();
  }
  addTask() {
    if (this.title != '' && this.desk != '') {
      let data = {
        title: this.title,
        desk: this.desk
      };

      this._apiService.tambah(data, '/tambah.php').subscribe({
        next: (hasil: any) => {
          this.reset_model();
          console.log('berhasil tambah task');
          this.getTask();
          this.modal_tambah = false;
          this.modal.dismiss();
        },
        error: (err: any) => {
          console.error('gagal tambah task', err);
        },
      });
    } else {
      console.log('gagal tambah task karena masih ada data yg kosong');
    }
  }



  delTask(id: any) {
    this._apiService.hapus(id, '/hapus.php?id=').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.getTask();
        console.log('berhasil hapus data');
      },
      error: (error: any) => {
        console.log('gagal');
      }
    })
  }
  getTaskId(id: any) {
    this._apiService.lihat(id,
      '/lihat.php?id=').subscribe({
        next: (hasil: any) => {
          console.log('sukses', hasil);
          let task = hasil;
          this.id = task.id;
          this.title = task.title;
          this.desk = task.desk;
          this.status = task.status
        },
        error: (error: any) => {
          console.log('gagal ambil data');
        }
      })
  }
  editTask() {
    let data = {
      id: this.id,
      title: this.title,
      desk: this.desk,
      status: this.status,
    };

    this._apiService.edit(data, '/edit.php').subscribe({
      next: (hasil: any) => {
        console.log(hasil);
        this.reset_model();
        this.getTask();
        console.log('berhasil edit task');
        this.modal_edit = false;
        this.modal.dismiss();
      },
      error: (err: any) => {
        console.error('gagal edit task', err);
      },
    });
  }

}

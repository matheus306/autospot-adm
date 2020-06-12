import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-new-list-autospot',
  templateUrl: './dialog-new-list-autospot.component.html',
  styleUrls: ['./dialog-new-list-autospot.component.css']
})
export class DialogNewListAutospotComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogNewListAutospotComponent>) { }

  ngOnInit(): void {}

  criarLista() {
    this.dialogRef.close(true);
   }

  fechar() {
    this.dialogRef.close(false);
  }
}

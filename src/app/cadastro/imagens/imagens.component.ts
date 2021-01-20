import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UploadImgService , AnoModeloService} from '@app/_services/';
import { AmazonImage } from '@app/_models';
import { AnoModelo } from '@app/_models';

@Component({
  selector: 'app-imagens',
  templateUrl: './imagens.component.html',
  styleUrls: ['./imagens.component.css']
})
export class ImagensComponent implements OnInit {

  constructor(private uploadService : UploadImgService, private anoModeloService : AnoModeloService) { }
  currentFile: File;
  progress = 0;
  message = '';
  selectedFiles: FileList;
  anoModeloParam : AnoModelo;
  fileInfos: Observable<any>;
  dataSource: MatTableDataSource<AmazonImage>;
  displayedColumns: string[] = ['imageUrl', 'url', 'principal', 'act'];
  loading = false;

  @ViewChild(MatPaginator, {static: true}) 
  paginator: MatPaginator;

  ngOnInit(): void {}

  selecionarModelo(anoModelo : AnoModelo) {
    this.anoModeloParam = anoModelo;
    this.aposSelecionarModelo()
  }

  atualizaImagePrincipal(amazonImage : AmazonImage) {
    this.loading = true;
    amazonImage.anoModelo = {}
    amazonImage.anoModelo.id = this.anoModeloParam.id;
    this.uploadService.setarImagemPrincipal(amazonImage).subscribe(retorno => {
      this.atualizarAnoModeloAposAcao();
    })
  }

  private atualizarAnoModeloAposAcao() {
    this.anoModeloService.findById(this.anoModeloParam.id).subscribe(obj => {
      this.anoModeloParam = obj;
      this.aposSelecionarModelo();
      this.loading = false;
    });
  }

  aposSelecionarModelo() {
    this.dataSource = new MatTableDataSource<AmazonImage>(this.anoModeloParam.imagens);
    this.dataSource.paginator = this.paginator;
    this.progress = 0;
    this.currentFile = undefined;
    this.selectedFiles = undefined;
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  excluir(amazonImage : AmazonImage) {
    if(confirm("Tem certeza que deseja excluir? ")) {
      this.loading = true;
      this.uploadService.excluir(amazonImage.id).subscribe(obj => {
        this.atualizarAnoModeloAposAcao();
      });
    }
  }

  

  upload(): void {
    this.progress = 0;
    this.currentFile = this.selectedFiles.item(0);
    this.uploadService.upload(this.currentFile, this.anoModeloParam).subscribe(
      
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.atualizarAnoModeloAposAcao()
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });
    this.selectedFiles = undefined;
  }
}

import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';
import {Image} from '../Image.model';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
  images:Image [];
  imagesFound: boolean = false;
  searching: boolean = false;
  research:boolean=false;
  list=[];
  searchQuery;
public i=0;

  handleSuccess(data){
    this.imagesFound = true;
    this.images = data.hits;
    console.log(data.hits);
    for(let k of this.images)
    {
      let  m=k.webformatURL;
      localStorage.setItem("search"+this.i,m);
    
      this.i=this.i+1;
    }
  }

  handleError(error){
    console.log(error);
  }

  constructor(private _imageService : ImageService) { }

  searchImages(query: string){
    this.searching = true;
    this.research=false;
     this._imageService.getImage(query).subscribe(
      data => this.handleSuccess(data),
      error => this.handleError(error),
      () => this.searching = false
    )
  
  }
  researchImages()
  {
    this.research=true;
    this.imagesFound=false;
  
for(let k=0;k<this.i;k++)
{
  console.log(localStorage.getItem("search"+k));
  let p=localStorage.getItem("search"+k);
 this.list.push(p);
 console.log(p);
}
  }

  ngOnInit() {
  }

}
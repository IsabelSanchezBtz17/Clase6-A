import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-uno',
  templateUrl: './uno.component.html',
  styleUrls: ['./uno.component.scss']
})
export class UnoComponent  {

  public personaje$! : Observable <any>; 
  constructor(private activeRoute: ActivatedRoute) { 
    this.personaje$= this.activeRoute.data.pipe(
      
      tap((resp)=>{
        console.log(resp)
      })


    )
  }

  /*ngOnInit(): void {
    console.log('In component:')
    this.activeRoute.data.subscribe(
    {
      next: (resp) => {
       // console.log('Componente-1',resp)
      }
    }
    )
  } */

}

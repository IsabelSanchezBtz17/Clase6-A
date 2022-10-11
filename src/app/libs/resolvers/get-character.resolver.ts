import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, concatMap, Observable, of, tap } from 'rxjs';
import { UnoService } from 'src/app/services/uno.service';

@Injectable({
  providedIn: 'root'
})
export class GetCharacterResolver implements Resolve<any> {

  constructor(private dataS: UnoService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

   let name: any = state.root.queryParams;

    console.log("Personaje a buscar:", name.name);

    return this.dataS.getCharacters().pipe(



      
      tap((resp)=>{
        console.log('Antes de salir del resolver', resp)
      

        let temp=  (resp.results as any[]).find ((item)=>{
          console.log("item", item)
          return item.name.includes(name.name)
        })?.name
       
        if(!temp){
          throw {
            status: 404
          }
        }
        console.log("find", temp)
      })


      ,concatMap( (resp: any) => {
        
        return this.dataS.getCharacter(name.name);
      },

      ),
      catchError((err: any) => {
        console.log('Error: ', err)
        if (err.status === 404) {
          this.router.navigate(['404'])
        }
        return of(err);
      }


      )
    )
  }
}


/*
 of( //of es un observable que nos permite retornar el observable planteado
      {
      mensaje: 'hola'
      }
    );
*/ 
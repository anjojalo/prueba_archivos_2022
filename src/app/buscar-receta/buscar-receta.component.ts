import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { startWith } from 'rxjs';
import { platosMenu } from 'src/class/platos.menu';
import Swal from 'sweetalert2';
//import { type } from 'os';
import { JsonService } from '../services/json.service';
import { MenuArrayService } from '../services/menu-array.service';

@Component({
  selector: 'app-buscar-receta',
  templateUrl: './buscar-receta.component.html',
  styleUrls: ['./buscar-receta.component.css']
})
export class BuscarRecetaComponent implements OnInit {

  constructor(public json: JsonService, private http: HttpClient, private serviagregarplato:MenuArrayService ){

  this.miMenu=this.serviagregarplato.miMenu

}

  ngOnInit(): void {
  }

/**variables */

contadorVegan:number=0;

miMenu:platosMenu[]=[]
miPlato:string="";

postId: any;


resultadoPeticion!: Object;

recetaId!:number
recipe:string=""
imageRecipe:string=""
tiempoPreparacion!:number;
healthScore!:number;
vegetariano!:boolean;
price!:number;
platoExiste:boolean=false;
platosNatioExiste:string="";
tamanoArray:number=0;
noDatosOrPlate:string="";
noDatos:string=""
error:string=""
readyInMinutes:number=0;



/** */




  buscarPlato() {

    if(this.miPlato==""){
      this.noDatos=""
      this.noDatos="Debes ingresar un valor"
      this.imageRecipe="";
      this.price=0;
      this.tiempoPreparacion=0;
      this.healthScore=0;
      this.vegetariano=false;
      Swal.fire({
        title: 'Debes escribir un nombre',
        icon:'error',
        timer: 2000
      })
    }
    else{
      Swal.fire({
        title: 'Buscando Plato',
        icon:'question',
        timer: 2000
      })
      this.noDatos="";
      this.imageRecipe="";
      this.price=0;
      this.tiempoPreparacion=0;
      this.healthScore=0;
      this.vegetariano=false;

    this.json.getJson(`https://api.spoonacular.com/recipes/complexSearch?apiKey=00b9bb9e14624423a75785313580b3b5&number=1&query=${this.miPlato}`).subscribe((res)=>{

 
    this.imageRecipe=res.results[0].image;
    this.recetaId=res.results[0].id


      this.json.getJson2(`https://api.spoonacular.com/recipes/${this.recetaId}/information?apiKey=00b9bb9e14624423a75785313580b3b5&includeNutrition=false`).subscribe((res)=>{


        this.price=res.pricePerServing;
        this.tiempoPreparacion=res.preparationMinutes;
        console.log("preparationMinutes",this.tiempoPreparacion);

        this.healthScore=res.healthScore;
        this.readyInMinutes=res.readyInMinutes;
        console.log("readyInMinutes", this.readyInMinutes);
        this.vegetariano=res.vegetarian;
      })


    }, error=>{
      this.error="";
      this.error ="Error no se encuentra plato";

    })

  }

}



  agregarPlatoArray(){

     if((this.miMenu.some(menu => menu.id ===this.recetaId)==true) || (this.recetaId==undefined) ){
      
     /*  this.noDatosOrPlate="El plato ya existe o no hay ninguna plato que gregar" */
      Swal.fire({
        title: 'El plato ya existe o no hay ninguna plato que gregar',
        icon:'question',
        timer: 3000
      })

    }
    else{
      /* console.log("no existe"); */
      Swal.fire({
        title: 'Agregando al menu',
        icon:'success',
        timer: 1000
      })
      let miplato= new platosMenu(this.healthScore, this.price, this.imageRecipe, this.recetaId, this.vegetariano)

    this.serviagregarplato.agregarPlatos(miplato)
    this.noDatosOrPlate=""

    }

    for(let inner of this.miMenu){
      if(inner.vegetariano==true){
        this.contadorVegan++
      }

  }

    if(this.contadorVegan>2){
      
      }

    if(this.tamanoArray>=4){
      
      Swal.fire({
        title: 'Menu Completo',
        icon:'error',
        timer: 1000
      })
    }
  }

  /**finagregarPlatoArray() */


  calculaTamanoArray(){
    this.tamanoArray=this.serviagregarplato.miMenu.length
  }

  loginOut(){
    Swal.fire({
      title: 'Saliendo de la aplicacion',
      icon:'success',
      timer: 2000
    })
    localStorage.removeItem("token")
   }

}

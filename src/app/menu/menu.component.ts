import { Component, OnInit } from '@angular/core';
import { platosMenu } from 'src/class/platos.menu';
import Swal from 'sweetalert2';
import { MenuArrayService } from '../services/menu-array.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private mostrarPlatos:MenuArrayService) {
  this.miMenu=this.mostrarPlatos.miMenu;
  this.healtCore=this.mostrarPlatos.acumuladoHealtCore
  this.price=this.mostrarPlatos.acumuladoPrecio

  }

  healtCore:number=0;
  price:number=0;
  acumuladoPrecio:number=0;
  acumuladoHealtCore:number=0;



  miMenu:platosMenu[]=[];

  ngOnInit(): void {
    this.miMenu=this.mostrarPlatos.miMenu;
    /* this.mostrarPlatos.calcularEstadisticas();
    this.acumuladoHealtCore=this.mostrarPlatos.acumuladoHealtCore(); */

  }

  miId(id:number){
    Swal.fire({
      title: 'Borrando plato del menu',
      icon:'success',
      timer: 1000
    })
    this.miMenu.splice(id,1)
  }


  calcularPrecioTotal(){
    if(this.miMenu.length<=0 || this.miMenu.length==0) {

    }else{
      var sumatoriaObjeto = this.miMenu.reduce(function(acumulador, siguienteValor){
        return {
          price: acumulador.price + siguienteValor.price
        };
      }, {price: 0});
      
      this.acumuladoPrecio=sumatoriaObjeto.price;
    }
  }


  calcularHealtCore(){
    if(this.miMenu.length<=0 || this.miMenu.length==0 ){

    }else{
      var sumatoriaObjeto = this.miMenu.reduce(function(acumulador, siguienteValor){
        return {
          HealthScore: acumulador.HealthScore + siguienteValor.HealthScore
        };
      }, {HealthScore: 0});
      
      this.acumuladoHealtCore=(sumatoriaObjeto.HealthScore/this.miMenu.length);

    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Product } from '../produto';
import { WebServiceService } from '../web-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  productsList : Product[]; //declarando lista de produtos
  
  hasProducts : boolean = true; //se valor "true", apresenta a tabela de produtos

  register : boolean = false; //se valor "true" mostra formulário de registro de produto

  update : boolean = false; //se valor "true" mostra formulário de edição de produto
  
  //inicializando variável "product"
  product = {
    title : '',
    description: '',
    price: 0,
  }

  //armazena o produto escolhida para ser editado
  selectedProduct = {
    title : '',
    description: '',
    price: 0,
  }; 

  idSelectedProduct : string; //armazena o "id" do produto escolhida para ser editado

  constructor(private service : WebServiceService) { }

  //inicia processo registro mostrando formulário
  starRegister() {
    this.register = true;
    this.update = false;
  }

  //cancela processo de registro escondendo formulário
  cancelRegister() {
    this.register = false;
  }

  //reinicializa os campos do formulário de registro
  cleanRegisterForm(){
    this.product = {
      title : '',
      description: '',
      price: 0,
    }
  }

  //registra produto
  registerProduct() {
    this.service.registerProduct(this.product).subscribe(res => {
      if(res.ok == true) {
        this.getProducts();
        alert("Produto cadastrado com com sucesso!");
        this.cleanRegisterForm();
        this.cancelRegister();
      } else {
        alert("Erro, o produto não foi cadastrado!");
      }
    });
  }
  
  //checa se exitem produtos cadastrados
  checkByProducts() {
    if(this.productsList.length == 0) {
      this.hasProducts = false;
    } else {
      this.hasProducts = true;
    }
  }

  //adiquire lista de produtos cadastrados
  getProducts() : void{
    this.service.getProducts().subscribe(res => {
      this.productsList = res;
      console.log(res);
      this.checkByProducts(); 
    });
  }

  //inicia processo de atualização de um produto passando o "id" do mesmo e mostrando o formulário
  startUpdate(pTitle:string, pDesctription : string, pPrice : number, pId : string) {
    this.selectedProduct = {
      title: pTitle,
      description: pDesctription,
      price: pPrice,

    };
    this.update = true;
    this.idSelectedProduct = pId;
    this.register = false;
  }

  //cancela processo de atualização de produto escondendo formulário
  cancelUpdate() {
    this.update = false;
  }

  //editado o produto selecionado
  updateProduct(idSelectedProduct : string) {
    this.service.updateProduct(this.selectedProduct, idSelectedProduct).subscribe(res => {
      if(res.ok == true) {
        this.getProducts();
        alert("O produto foi atualizado com sucesso!");
        this.cancelUpdate();
      } else {
        alert("Erro, o produto não foi atualizado!");
      }
    });
  }

  //deleta um produto específico
  deleteProduct(id : string) {
    let check = confirm("Tem certeza que deseja deletar esse produto?");
    if (check) {
      this.service.deleteProduct(id).subscribe(res => {
        if(res.ok == true) {
          this.getProducts();
          alert("O produto foi deletado com sucesso!");
        } else {
          alert("Erro, o produto não foi deletado!");
        }
      });
    }
    
  }
  ngOnInit(): void {
    this.getProducts();
  }


}

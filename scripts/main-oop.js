class Opcao {
  constructor(nome, imagem, descricao, preco) {
    this.nome = nome
    this.imagem = imagem
    this.descricao = descricao
    this.preco = preco
  }
}

class Prato extends Opcao {
  constructor(nome, imagem, descricao, preco) {
    super(nome, imagem, descricao, preco)
  }

  selecionarPrato(elemento) {
    const selecionado = document.querySelector(".prato .selecionado");
    if (selecionado !== null) {
      selecionado.classList.remove("selecionado");
    }
    elemento.classList.add("selecionado");
  
    menu.pratoSelecionado = {
      nome: this.nome,
      preco: this.preco,
    };
  
    menu.verificarPedido();
  }

  getPratoView() {
    const view = document.createElement("div");
    view.classList.add("opcao");
    view.addEventListener("click", () => this.selecionarPrato(view));
    view.innerHTML = `
          <img src="${this.imagem}" />
          <div class="titulo">${this.nome}</div>
          <div class="descricao">${this.descricao}</div>
          <div class="fundo">
              <div class="preco">R$ ${this.preco?.toFixed(2)}</div>
              <div class="check">
                  <ion-icon name="checkmark-circle"></ion-icon>
              </div>
          </div>
      `;
  
    return view;
  }
}

class Bebida extends Opcao {
  constructor(nome, imagem, descricao, preco) {
    super(nome, imagem, descricao, preco)
  }

  selecionarBebida(elemento) {
   const selecionado = document.querySelector(".bebida .selecionado");
   if (selecionado !== null) {
     selecionado.classList.remove("selecionado");
   }
   elemento.classList.add("selecionado");

   menu.bebidaSelecionada = { nome: this.nome, preco: this.preco };
  
   menu.verificarPedido();
  }

  getBebidaView() {
    const view = document.createElement("div");
    view.classList.add("opcao");
    view.addEventListener("click", () => this.selecionarBebida(view));
    view.innerHTML = `
          <img src="${this.imagem}" />
          <div class="titulo">${this.nome}</div>
          <div class="descricao">${this.descricao}</div>
          <div class="fundo">
              <div class="preco">R$ ${this.preco.toFixed(2)}</div>
              <div class="check">
                  <ion-icon name="checkmark-circle"></ion-icon>
              </div>
          </div>
      `;
  
    return view;
  }
}

class Sobremesa extends Opcao {
  constructor(nome, imagem, descricao, preco) {
    super(nome, imagem, descricao, preco)
  }

  selecionarSobremesa(elemento) {
    const selecionado = document.querySelector(".sobremesa .selecionado");
    if (selecionado !== null) {
      selecionado.classList.remove("selecionado");
    }
    elemento.classList.add("selecionado");

    menu.sobremesaSelecionada = { nome: this.nome, preco: this.preco };
  
    menu.verificarPedido();
  }

  getSobremesaView() {
    const view = document.createElement("div");
    view.classList.add("opcao");
    view.addEventListener("click", () => this.selecionarSobremesa(view));
    view.innerHTML = `
          <img src="${this.imagem}" />
          <div class="titulo">${this.nome}</div>
          <div class="descricao">${this.descricao}</div>
          <div class="fundo">
              <div class="preco">R$ ${this.preco.toFixed(2)}</div>
              <div class="check">
                  <ion-icon name="checkmark-circle"></ion-icon>
              </div>
          </div>
      `;
  
    return view;
  }
}

class Menu {
  constructor(opcoes) {
    this.opcoes = opcoes
    this.pratoSelecionado = null
    this.bebidaSelecionada = null
    this.sobremesaSelecionada = null
  }

  renderizarCategoriaPrato() {
    const pratosContainer = document.querySelector(".opcoes.prato");
    this.opcoes.pratos.forEach((prato) => {
      pratosContainer.appendChild(new Prato(prato.nome, prato.imagem, prato.descricao, prato.preco).getPratoView());
    });
  }

  renderizarCategoriaBebida() {
    const bebidasContainer = document.querySelector(".opcoes.bebida");
    this.opcoes.bebidas.forEach((bebida) => {
      bebidasContainer.appendChild(new Bebida(bebida.nome, bebida.imagem, bebida.descricao, bebida.preco).getBebidaView());
    });
  }

  renderizarCategoriaSobremesa() {
    const sobremesasContainer = document.querySelector(".opcoes.sobremesa");
    this.opcoes.sobremesas.forEach((sobremesa) => {
      sobremesasContainer.appendChild(new Sobremesa(sobremesa.nome, sobremesa.imagem, sobremesa.descricao, sobremesa.preco).getSobremesaView());
    });
  }

  getPrecoTotal() {
    return (
      this.pratoSelecionado.preco +
      this.bebidaSelecionada.preco +
      this.sobremesaSelecionada.preco
    );
  }

  confirmarPedido() {
    const modal = document.querySelector(".overlay");
    modal.classList.remove("escondido");
  
    document.querySelector(".confirmar-pedido .prato .nome").innerHTML =
    this.pratoSelecionado.nome;
    document.querySelector(".confirmar-pedido .prato .preco").innerHTML =
    this.pratoSelecionado.preco.toFixed(2);
  
    document.querySelector(".confirmar-pedido .bebida .nome").innerHTML =
    this.bebidaSelecionada.nome;
    document.querySelector(".confirmar-pedido .bebida .preco").innerHTML =
    this.bebidaSelecionada.preco.toFixed(2);
  
    document.querySelector(".confirmar-pedido .sobremesa .nome").innerHTML =
    this.sobremesaSelecionada.nome;
    document.querySelector(".confirmar-pedido .sobremesa .preco").innerHTML =
    this.sobremesaSelecionada.preco.toFixed(2);
  
    document.querySelector(".confirmar-pedido .total .preco").innerHTML =
      `R$ ${this.getPrecoTotal().toFixed(2)}`;
  }

  cancelarPedido() {
    const modal = document.querySelector(".overlay");
    modal.classList.add("escondido");
  }

  enviarZap() {
    const telefoneRestaurante = 553299999999;
    const encodedText = encodeURIComponent(
      `Olá, gostaria de fazer o pedido: \n- Prato: ${
        this.pratoSelecionado.nome
      } \n- Bebida: ${this.bebidaSelecionada.nome} \n- Sobremesa: ${
        this.sobremesaSelecionada.nome
      } \nTotal: R$ ${this.getPrecoTotal().toFixed(2)}`
    );
  
    const urlWhatsapp = `https://wa.me/${telefoneRestaurante}?text=${encodedText}`;
    window.open(urlWhatsapp);
  }
  
  verificarPedido() {
    if (this.pratoSelecionado && this.bebidaSelecionada && this.sobremesaSelecionada) {
      btnPedir.classList.add("ativo");
      btnPedir.disabled = false;
      btnPedir.innerHTML = "Fazer pedido";
    }
  }
}

const pratos = [
  {
    nome: "Estrombelete de Frango",
    imagem: "img/frango_yin_yang.png",
    descricao: "Um pouco de batata, um pouco de salada",
    preco: 14.9,
  },
  {
    nome: "Asa de Boi",
    imagem: "img/frango_yin_yang.png",
    descricao: "Com molho shoyu",
    preco: 14.9,
  },
  {
    nome: "Carne de Monstro",
    imagem: "img/frango_yin_yang.png",
    descricao: "Com batata assada e farofa",
    preco: 14.9,
  },
];

const bebidas = [
  {
    nome: "Coquinha gelada",
    imagem: "img/coquinha_gelada.png",
    descricao: "Lata 350ml",
    preco: 4.9,
  },
  {
    nome: "Caldo de Cana",
    imagem: "img/coquinha_gelada.png",
    descricao: "Copo 600ml",
    preco: 4.9,
  },
  {
    nome: "Corote Gelado",
    imagem: "img/coquinha_gelada.png",
    descricao: "Garrafa 400ml",
    preco: 4.9,
  },
];

const sobremesas = [
  {
    nome: "Pudim",
    imagem: "img/pudim.png",
    descricao: "Gosto de doce de leite",
    preco: 7.9,
  },
  {
    nome: "Flam",
    imagem: "img/pudim.png",
    descricao: "Gosto de chocolate",
    preco: 7.9,
  },
  {
    nome: "Brigadeiro",
    imagem: "img/pudim.png",
    descricao: "3 unidades",
    preco: 7.9,
  },
];

const menu = new Menu({ pratos, bebidas, sobremesas });

menu.renderizarCategoriaPrato();
menu.renderizarCategoriaBebida();
menu.renderizarCategoriaSobremesa();

const btnConfirmar = document.querySelector(".confirmar");
const btnCancelar = document.querySelector(".cancelar");
const btnPedir = document.querySelector(".fazer-pedido");

btnConfirmar.addEventListener("click", () => {
  menu.enviarZap();
});

btnCancelar.addEventListener("click", () => {
  menu.cancelarPedido();
});

btnPedir.addEventListener("click", () => {
  menu.confirmarPedido();
});

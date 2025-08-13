function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
let campo = [];
let cidade = [];
let conexao = [];
let carros = [];
let nuvens = [];

function setup() {
  createCanvas(800, 600);
  noFill();
  
  // Criando elementos do campo (árvores)
  for (let i = 0; i < 5; i++) {
    campo.push(new ElementoCampo(random(100, 400), random(490, 480))); // Árvores mais próximas do chão
  }

  // Criando elementos da cidade (prédios e carros)
  for (let i = 0; i < 5; i++) {
    cidade.push(new ElementoCidade(random(300, 700), height - 50 - (900, 199))); // Prédios conectados à rua
  }
  
  // Criando carros na cidade
  for (let i = 0; i < 3; i++) {
    carros.push(new Carro(random(500, 700), height - 120)); // Carros mais próximos da rua
  }

  // Criando nuvens
  for (let i = 0; i < 5; i++) {
    nuvens.push(new Nuvem(random(50, 750), random(50, 150)));
  }
}

function draw() {
  // Fundo do céu azul
  background(135, 206, 235); // Azul claro para o céu
  
  // Exibindo nuvens
  for (let i = 0; i < nuvens.length; i++) {
    nuvens[i].move();
    nuvens[i].show();
  }

  // Exibindo elementos do campo (árvores com emoji)
  for (let i = 0; i < campo.length; i++) {
    campo[i].show();
  }

  // Exibindo elementos da cidade (prédios)
  for (let i = 0; i < cidade.length; i++) {
    cidade[i].show();
  }

  // Exibindo carros na rua
  for (let i = 0; i < carros.length; i++) {
    carros[i].show(20);
    carros[i].move(10);
  }

  // Criando e desenhando as conexões
  conexao = [];
  for (let i = 0; i < campo.length; i++) {
    for (let j = 0; j < cidade.length; j++) {
      let distCampoCidade = dist(campo[i].x, campo[i].y, cidade[j].x, cidade[j].y);
      if (distCampoCidade < 200) {
        conexao.push([campo[i], cidade[j]]);
      }
    }
  }

  // Desenhando as conexões entre o campo e a cidade
  for (let i = 0; i < conexao.length; i++) {
    let alpha = map(dist(conexao[i][0].x, conexao[i][0].y, conexao[i][1].x, conexao[i][1].y), 0, 200, 255, 50);
    stroke(0, 100, 255, alpha); // Azul, com transparência dinâmica
    line(conexao[i][0].x, conexao[i][0].y, conexao[i][1].x, conexao[i][1].y);
  }

  // Desenhando o chão (terra)
  fill(139, 69, 19); // Cor marrom (terra)
  rect(0, height - 50, width, 50); // Chão na parte inferior

  // Desenhando a rua
  drawStreet();
}

// Função para desenhar a rua
function drawStreet() {
  fill(50); // Cor cinza para a rua
  rect(0, height - 100, width, 50); // Rua (asfalto)

  // Linhas divisórias da rua
  stroke(255); // Cor branca para as linhas
  strokeWeight(3);
  for (let i = 0; i < width; i += 60) {
    line(i, height - 75, i + 30, height - 75); // Linhas de divisão (faixa)
  }
}

// Elemento do Campo (Árvore com emoji)
class ElementoCampo {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.emoji = "🌳"; // Emoji da árvore
    this.size = random(30, 50);
  }

  show() {
    textSize(this.size);
    textAlign(CENTER, CENTER);
    text(this.emoji, this.x, this.y); // Usando o emoji de árvore
  }
}

// Elemento da Cidade (Prédio com janelas)
class ElementoCidade {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = random(40, 70);
    this.height = random(70, 100);
  }

  show() {
    // Corpo do prédio
    fill(169, 169, 169); // Cor cinza (prédio)
    rect(this.x, this.y, this.width, this.height);

    // Adicionando janelas
    fill(255); // Cor branca para as janelas
    let janelaSize = 10;
    let numJanelasHorizontal = int(this.width / (janelaSize * 2));
    let numJanelasVertical = int(this.height / (janelaSize * 2));
    
    for (let i = 0; i < numJanelasHorizontal; i++) {
      for (let j = 0; j < numJanelasVertical; j++) {
        rect(this.x + i * janelaSize * 2 + 5, this.y + j * janelaSize * 2 + 5, janelaSize, janelaSize);
      }
    }
  }
}

// Carro na Cidade (Agora com emojis)
class Carro {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 15;
    this.emoji = "🚗"; // Emoji de carro
  }

  show() {
    textSize(32);
    textAlign(CENTER, CENTER);
    text(this.emoji, this.x, this.y); // Usando o emoji de carro
  }

  move() {
    this.x += random(0, 2);
    if (this.x > width) {
      this.x = -this.width;
    }
  }
}

// Nuvens no Céu
class Nuvem {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(50, 80);
  }

  show() {
    fill(255); // Cor branca para as nuvens
    ellipse(this.x, this.y, this.size, this.size);
  }

  move() {
    this.x += random(0.2, 0.5); // Movimento suave para a direita
    if (this.x > width) {
      this.x = -this.size; // Reaparece no lado esquerdo
    }
  }
}

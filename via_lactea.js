//  VIA LÁCTEA — Estrelas mais próximas do Sol
//  Trabalho de JavaScript · p5.js
//  Conceitos utilizados:
//    · Coordenadas polares → cartesianas: x = cos(ang) * dist
//    · lerp()  — interpolação linear para animações suaves
//    · sin()   — oscilação para efeito de pulso e cintilação
//    · push() / pop() — isolar transformações de câmara
//    · Objetos e arrays para guardar dados científicos
//  DADOS CIENTÍFICOS REAIS  (fonte: Hipparcos Catalogue / NASA)
//  Cada estrela tem: nome, distância (anos-luz), ângulo (radianos),
//  cor RGB, raio visual, tipo espectral e dados para o painel.
const ESTRELAS = [
  {
    nome: "Sol", dist: 0, ang: 0,
    cor: [255, 240, 150], r: 14, ehSol: true,
    tipo: "Anã Amarela (G2V)",
    massa: "1.0 M☉", lum: "1.0 L☉", temp: "5 778 K", plan: 8,
    info: "A nossa estrela! Tem 4.6 mil milhões de anos e daqui a 5 mil milhões tornará numa gigante vermelha."
  },
  {
    nome: "Próxima Centauri", dist: 4.24, ang: 2.20,
    cor: [255, 90, 60], r: 5,
    tipo: "Anã Vermelha (M5.5Ve)",
    massa: "0.12 M☉", lum: "0.0017 L☉", temp: "3 042 K", plan: 2,
    info: "A estrela mais próxima da Terra! Tem um exoplaneta na zona habitável: Próxima b."
  },
  {
    nome: "Alpha Centauri A", dist: 4.37, ang: 2.25,
    cor: [255, 245, 180], r: 9,
    tipo: "Anã Amarela (G2V)",
    massa: "1.10 M☉", lum: "1.52 L☉", temp: "5 790 K", plan: 0,
    info: "Muito semelhante ao Sol! Parte de um sistema triplo com Alpha Centauri B e Próxima."
  },
  {
    nome: "Alpha Centauri B", dist: 4.37, ang: 2.30,
    cor: [255, 180, 100], r: 7,
    tipo: "Anã Laranja (K1V)",
    massa: "0.91 M☉", lum: "0.50 L☉", temp: "5 260 K", plan: 0,
    info: "Par binário com Alpha Centauri A. Orbitam-se mutuamente a cada 79.9 anos."
  },
  {
    nome: "Estrela de Barnard", dist: 5.96, ang: 4.50,
    cor: [255, 80, 40], r: 4,
    tipo: "Anã Vermelha (M4.0Ve)",
    massa: "0.16 M☉", lum: "0.0035 L☉", temp: "3 134 K", plan: 1,
    info: "A estrela com maior movimento próprio observado! Move-se 10.3'' por ano no céu."
  },
  {
    nome: "Luhman 16 A", dist: 6.59, ang: 3.80,
    cor: [200, 80, 20], r: 4,
    tipo: "Anã Castanha (L7.5)",
    massa: "0.032 M☉", lum: "0.00014 L☉", temp: "1 350 K", plan: 0,
    info: "Anã castanha: quente demais para ser planeta, fria demais para ser estrela."
  },
  {
    nome: "Luhman 16 B", dist: 6.59, ang: 3.85,
    cor: [180, 60, 10], r: 4,
    tipo: "Anã Castanha (T0.5)",
    massa: "0.027 M☉", lum: "0.000095 L☉", temp: "1 210 K", plan: 0,
    info: "Par binário com Luhman 16 A. Descoberto apenas em 2013 por infravermelhos!"
  },
  {
    nome: "Wolf 359", dist: 7.78, ang: 1.30,
    cor: [255, 70, 30], r: 4,
    tipo: "Anã Vermelha (M6.0Ve)",
    massa: "0.09 M☉", lum: "0.0014 L☉", temp: "2 800 K", plan: 0,
    info: "Uma das estrelas menos luminosas conhecidas. Famosa pela série Star Trek!"
  },
  {
    nome: "Lalande 21185", dist: 8.29, ang: 5.50,
    cor: [255, 100, 50], r: 5,
    tipo: "Anã Vermelha (M2.0V)",
    massa: "0.46 M☉", lum: "0.025 L☉", temp: "3 828 K", plan: 1,
    info: "Tem um planeta confirmado. É a 4ª estrela mais próxima visível (com dificuldade) a olho nu."
  },
  {
    nome: "Sirius A", dist: 8.58, ang: 0.30,
    cor: [180, 210, 255], r: 11,
    tipo: "Estrela Branca (A1V)",
    massa: "2.06 M☉", lum: "25.4 L☉", temp: "9 940 K", plan: 0,
    info: "A estrela mais brilhante do céu noturno! 'Sirius' significa 'abrasador' em grego."
  },
  {
    nome: "Sirius B", dist: 8.58, ang: 0.35,
    cor: [220, 235, 255], r: 4,
    tipo: "Anã Branca (DA2)",
    massa: "1.02 M☉", lum: "0.056 L☉", temp: "25 200 K", plan: 0,
    info: "Anã branca: remanescente de uma estrela morta. Uma colher de chá pesa ~5 toneladas!"
  },
  {
    nome: "Ross 154", dist: 9.69, ang: 3.20,
    cor: [255, 80, 40], r: 4,
    tipo: "Anã Vermelha (M3.5Ve)",
    massa: "0.17 M☉", lum: "0.0038 L☉", temp: "3 340 K", plan: 0,
    info: "Estrela flare: emite explosões de radiação súbitas e intensas com regularidade."
  },
  {
    nome: "Ross 248", dist: 10.32, ang: 5.90,
    cor: [255, 75, 35], r: 4,
    tipo: "Anã Vermelha (M6.0Ve)",
    massa: "0.12 M☉", lum: "0.0018 L☉", temp: "2 797 K", plan: 0,
    info: "Em ~36 000 anos será a estrela mais próxima da Terra, a apenas 3.0 anos-luz!"
  },
];
//  VARIÁVEIS GLOBAIS
let hov = null;       // estrela sob o cursor (hover)
let sel = null;       // estrela selecionada (clique)
let painelA = 0;      // opacidade do painel de info (0–255)
// Câmara — posição atual e posição alvo (para lerp suave)
let camX = 0, camY = 0;
let camXt = 0, camYt = 0;
// Zoom — atual e alvo
let zm = 1, zmt = 1;
// Variáveis de arrasto do rato
let drag = false, mxi, myi, cxi, cyi;
let ESC = 28;   // escala: quantos px vale 1 ano-luz (com zoom=1)
let t   = 0;    // contador de frames (tempo da animação)
// Arrays de partículas
let gal = [];   // partículas da galáxia espiral
let fd  = [];   // estrelas de fundo distantes
//  SETUP — executado uma única vez no início
function setup() {
  createCanvas(windowWidth, windowHeight);
  // Converter coordenadas polares → cartesianas para cada estrela
  // Fórmula: x = cos(ângulo) × distância × escala
  //          y = sin(ângulo) × distância × escala × 0.6  (perspetiva)
  for (let e of ESTRELAS) {
    if (e.ehSol) {
      e.x = 0;
      e.y = 0;
    } else {
      e.x = cos(e.ang) * e.dist * ESC;
      e.y = sin(e.ang) * e.dist * ESC * 0.6;
    }
  }
  gerarGalaxia();
}
//  Gera as partículas que formam a galáxia espiral ao fundo
function gerarGalaxia() {
  gal = [];
  fd  = [];

  // 4 braços espirais — cada braço começa com um ângulo diferente
  for (let b = 0; b < 4; b++) {
    let anguloBase = (TWO_PI / 4) * b;

    for (let i = 0; i < 380; i++) {
      let tt    = i / 380;
      let r     = tt * 420 + 30;
      let theta = anguloBase + tt * PI * 2.5;       // ângulo em espiral
      let sp    = random(-18, 18) * (1 + tt * 2);   // dispersão aleatória

      let px = cos(theta + sp * 0.02) * (r + sp);
      let py = sin(theta + sp * 0.02) * (r + sp) * 0.45;

      // Cor da partícula: amarelada, azulada ou avermelhada
      let br  = random(140, 255);
      let rnd = random();
      let cor = rnd < 0.6 ? [br, br * 0.88, br * 0.7]
              : rnd < 0.8 ? [br * 0.7, br * 0.8, br]
              :              [br, br * 0.6, br * 0.5];

      gal.push({ px, py, r: random(0.4, 1.8), cor, a: random(20, 80) * (1 - tt * 0.5) });
    }
  }

  // Núcleo central brilhante (distribuição gaussiana)
  for (let i = 0; i < 280; i++) {
    let a = random(TWO_PI);
    let d = randomGaussian(0, 45);
    gal.push({
      px: cos(a) * d,
      py: sin(a) * d * 0.45,
      r:  random(0.3, 1.4),
      cor: [255, random(220, 255), random(150, 220)],
      a:  random(30, 100)
    });
  }

  // Estrelas de fundo (muito distantes, sem zoom)
  for (let i = 0; i < 280; i++) {
    fd.push({
      x: random(width), y: random(height),
      r: random(0.3, 1.2),
      a: random(30, 130),
      v: random(0.4, 2.0),   // velocidade de cintilação
      f: random(TWO_PI)      // fase inicial do sin()
    });
  }
}

//  DRAW — loop principal, corre ~60 vezes por segundo
function draw() {
  t++;

  // lerp() interpola suavemente entre posição atual e posição alvo
  // Sintaxe: lerp(valor_atual, valor_alvo, fator)  — fator 0.08 = 8% por frame
  camX = lerp(camX, camXt, 0.08);
  camY = lerp(camY, camYt, 0.08);
  zm   = lerp(zm,   zmt,   0.08);
  painelA = lerp(painelA, sel ? 255 : 0, 0.1);

  background(3, 3, 12);

  // --- Estrelas de fundo (sem transformação de câmara) ---
  noStroke();
  for (let s of fd) {
    // sin() cria o efeito de cintilação (twinkle)
    let brilho = s.a * (sin(t * 0.01 * s.v + s.f) * 0.3 + 0.7);
    fill(255, 255, 240, brilho);
    ellipse(s.x, s.y, s.r * 2);
  }

  // push/pop: isolam as transformações de câmara do resto do desenho
  push();
  translate(width / 2 + camX, height / 2 + camY);
  scale(zm);

  desenharGalaxia();
  desenharCirculos();
  desenharLinhaSelecao();
  desenharEstrelas();

  pop(); // fim da zona de câmara

  // Interface de utilizador (por cima, sem zoom)
  uiTitulo();
  uiPainel();
  uiControlos();
  uiEscala();
}

//  Galáxia espiral ao fundo
function desenharGalaxia() {
  noStroke();
  for (let p of gal) {
    // sin() faz as partículas "respirar" suavemente
    let alfa = p.a * (sin(t * 0.005 + p.px * 0.01) * 0.15 + 0.85);
    fill(p.cor[0], p.cor[1], p.cor[2], alfa);
    ellipse(p.px, p.py, p.r * 2);
  }
  // Brilho do núcleo galáctico
  for (let i = 5; i >= 1; i--) {
    fill(255, 230, 180, map(i, 1, 5, 50, 6));
    ellipse(0, 0, 80 * i, 36 * i);
  }
}

//  Círculos de distância em anos-luz
function desenharCirculos() {
  for (let d of [2, 4, 6, 8, 10]) {
    noFill();
    stroke(80, 110, 160, 35);
    strokeWeight(0.6);
    ellipse(0, 0, d * ESC * 2, d * ESC * 2 * 0.6);

    noStroke();
    fill(80, 110, 160, 90);
    textAlign(CENTER);
    textSize(max(8, 9 / zm));
    text(d + " a.l.", d * ESC + 6 / zm, -3 / zm);
  }
}

//  Linha tracejada do Sol à estrela selecionada
function desenharLinhaSelecao() {
  if (!sel || sel.ehSol) return;

  // drawingContext dá acesso direto ao Canvas2D para linhas tracejadas
  drawingContext.setLineDash([4 / zm, 6 / zm]);
  stroke(sel.cor[0], sel.cor[1], sel.cor[2], 80);
  strokeWeight(0.8 / zm);
  line(0, 0, sel.x, sel.y);
  drawingContext.setLineDash([]);

  // Etiqueta de distância no meio da linha
  noStroke();
  fill(255, 255, 255, 160);
  textAlign(CENTER);
  textSize(max(8, 10 / zm));
  text(sel.dist + " anos-luz", sel.x / 2, sel.y / 2 - 10 / zm);
}

//  Desenhar todas as estrelas
function desenharEstrelas() {
  for (let e of ESTRELAS) {
    let h = (hov === e);  // está em hover?
    let s = (sel === e);  // está selecionada?

    // Pulso suave com sin() — cada estrela pulsa em fase diferente
    let pulso = 1 + sin(t * 0.04 + e.dist) * 0.06;

    noStroke();

    // Glow exterior (brilho difuso ao redor da estrela)
    for (let i = 4; i >= 1; i--) {
      fill(e.cor[0], e.cor[1], e.cor[2], (s ? 35 : h ? 25 : 10) / i);
      ellipse(e.x, e.y, (e.r + i * 5) * 2 * pulso);
    }

    // Anel de destaque quando hover ou selecionada
    if (h || s) {
      noFill();
      stroke(e.cor[0], e.cor[1], e.cor[2], s ? 200 : 100);
      strokeWeight((s ? 1.5 : 0.8) / zm);
      ellipse(e.x, e.y, (e.r + 9) * 2);
    }

    // Corpo da estrela: gradiente radial simulado com múltiplas ellipses
    noStroke();
    for (let i = e.r * pulso; i > 0; i -= 0.5) {
      let tt = i / (e.r * pulso);
      fill(
        lerp(255, e.cor[0] * 0.4, tt),
        lerp(255, e.cor[1] * 0.4, tt),
        lerp(255, e.cor[2] * 0.4, tt)
      );
      ellipse(e.x, e.y, i * 2);
    }

    // Reflexo especular (brilho de luz)
    fill(255, 255, 255, e.ehSol ? 60 : 35);
    ellipse(e.x - e.r * 0.28, e.y - e.r * 0.32, e.r * 0.55);

    // Símbolo do Sol
    if (e.ehSol) {
      fill(255, 230, 100, 200);
      textSize(max(8, 11 / zm));
      textAlign(CENTER);
      text("☀", e.x, e.y - e.r - 6 / zm);
    }

    // Nome e distância
    fill(255, 255, 255, (h || s) ? 240 : 140);
    noStroke();
    textAlign(CENTER);
    textSize(max(7, (h || s ? 11 : 9) / zm));
    if (h || s) textStyle(BOLD);
    text(e.nome, e.x, e.y + e.r + 11 / zm);
    textStyle(NORMAL);

    if ((h || s) && !e.ehSol) {
      fill(180, 200, 240, 180);
      textSize(max(6, 8 / zm));
      text(e.dist + " a.l.", e.x, e.y + e.r + 21 / zm);
    }
  }
}

//  UI — TÍTULO (canto superior esquerdo)
function uiTitulo() {
  noStroke();
  fill(3, 5, 18, 210);
  rect(10, 10, 310, 78, 8);
  stroke(60, 90, 150, 100);
  strokeWeight(0.5);
  noFill();
  rect(10, 10, 310, 78, 8);

  noStroke();
  fill(180, 210, 255, 240);
  textAlign(LEFT);
  textSize(20);
  textStyle(BOLD);
  text("Via Láctea", 24, 40);
  textStyle(NORMAL);

  fill(120, 150, 200, 200);
  textSize(11);
  text("Estrelas mais próximas do Sol", 24, 57);

  stroke(60, 90, 150, 80);
  line(24, 65, 305, 65);

  noStroke();
  fill(100, 130, 180, 180);
  textSize(9);
  text(ESTRELAS.length + " estrelas  ·  raio 10 anos-luz  ·  Vizinhança Solar", 24, 78);
}

//  UI — PAINEL DE INFORMAÇÃO (quando uma estrela está selecionada)
function uiPainel() {
  if (painelA < 5 || !sel) return;

  let e  = sel;
  let a  = painelA;
  let pw = 300, ph = 250;
  let px = width - pw - 14;
  let py = 14;

  // Fundo e borda
  noStroke();
  fill(0, 0, 0, a * 0.35);
  rect(px + 5, py + 5, pw, ph, 10); // sombra
  fill(4, 7, 20, a * 0.97);
  rect(px, py, pw, ph, 10);
  stroke(e.cor[0], e.cor[1], e.cor[2], a * 0.9);
  strokeWeight(1);
  noFill();
  rect(px, py, pw, ph, 10);

  // Nome e tipo
  noStroke();
  fill(e.cor[0], e.cor[1], e.cor[2], a);
  textAlign(LEFT);
  textSize(18);
  textStyle(BOLD);
  text(e.nome, px + 16, py + 32);
  textStyle(NORMAL);
  fill(150, 175, 220, a * 0.85);
  textSize(10);
  text(e.tipo, px + 16, py + 50);

  stroke(e.cor[0], e.cor[1], e.cor[2], a * 0.3);
  strokeWeight(0.5);
  line(px + 16, py + 60, px + pw - 16, py + 60);

  // Dados científicos em lista
  let dados = [
    ["Distância", e.ehSol ? "0 (somos nós!)" : e.dist + " anos-luz"],
    ["Massa",        e.massa],
    ["Luminosidade", e.lum],
    ["Temperatura",  e.temp],
    ["Planetas",     e.plan > 0 ? e.plan + (e.plan === 1 ? " planeta" : " planetas") : "Nenhum confirmado"]
  ];

  noStroke();
  for (let i = 0; i < dados.length; i++) {
    let dy = py + 78 + i * 26;
    fill(110, 135, 180, a * 0.75);
    textSize(8);
    textAlign(LEFT);
    text(dados[i][0].toUpperCase(), px + 16, dy);
    fill(210, 225, 255, a);
    textSize(11);
    text(dados[i][1], px + 16, dy + 13);
  }

  // Curiosidade
  stroke(e.cor[0], e.cor[1], e.cor[2], a * 0.2);
  line(px + 16, py + ph - 65, px + pw - 16, py + ph - 65);
  noStroke();
  fill(120, 150, 200, a * 0.8);
  textSize(8);
  text("CURIOSIDADE", px + 16, py + ph - 51);
  fill(200, 218, 250, a * 0.95);
  textSize(9.5);
  textLeading(15);
  text(e.info, px + 16, py + ph - 40, pw - 32, 45);

  // Botão fechar [✕]
  fill(60, 30, 30, a * 0.9);
  ellipse(px + pw - 18, py + 18, 16);
  fill(200, 140, 140, a);
  textAlign(CENTER);
  textSize(10);
  text("✕", px + pw - 18, py + 23);
}

//  UI — CONTROLOS (canto inferior esquerdo)
function uiControlos() {
  let cmds = [
    ["Clique",   "Selecionar estrela"],
    ["Scroll",   "Zoom in / out"],
    ["Arrastar", "Mover a vista"],
    ["R",        "Resetar câmara"],
    ["Esc",      "Fechar painel"]
  ];
  let bx = 14;
  let by = height - 14 - cmds.length * 20 - 24;

  noStroke();
  fill(3, 5, 18, 200);
  rect(bx, by, 200, cmds.length * 20 + 24, 7);
  stroke(50, 75, 130, 80);
  strokeWeight(0.5);
  noFill();
  rect(bx, by, 200, cmds.length * 20 + 24, 7);

  noStroke();
  fill(100, 130, 185, 180);
  textAlign(LEFT);
  textSize(8);
  text("CONTROLOS", bx + 12, by + 15);
  stroke(50, 75, 130, 60);
  line(bx + 12, by + 20, bx + 188, by + 20);

  for (let i = 0; i < cmds.length; i++) {
    let cy2 = by + 33 + i * 20;
    noStroke();
    fill(80, 130, 200, 200);
    textSize(9);
    textAlign(LEFT);
    text(cmds[i][0], bx + 12, cy2);
    fill(160, 185, 230, 180);
    textAlign(RIGHT);
    text(cmds[i][1], bx + 188, cy2);
  }
}

//  UI — BARRA DE ESCALA (canto inferior direito)
function uiEscala() {
  let largPx = 2 * ESC * zm; // 2 anos-luz em píxeis (com zoom)
  let ex = width - 20 - largPx;
  let ey = height - 22;

  noStroke();
  fill(3, 5, 18, 200);
  rect(ex - 10, ey - 18, largPx + 20, 28, 5);

  stroke(140, 170, 220, 200);
  strokeWeight(1.2);
  line(ex, ey, ex + largPx, ey);
  line(ex, ey - 5, ex, ey + 5);
  line(ex + largPx, ey - 5, ex + largPx, ey + 5);

  noStroke();
  fill(180, 210, 255, 220);
  textAlign(CENTER);
  textSize(9);
  text("2 anos-luz", ex + largPx / 2, ey - 5);
}

//  INTERAÇÃO — MOUSE

// Converte coordenadas do ecrã → coordenadas do mundo (com zoom e câmara)
function posicaoMundo() {
  return {
    wx: (mouseX - width / 2 - camX) / zm,
    wy: (mouseY - height / 2 - camY) / zm
  };
}

function mouseMoved() {
  hov = null;
  cursor(ARROW);
  let { wx, wy } = posicaoMundo();
  for (let e of ESTRELAS) {
    if (dist(wx, wy, e.x, e.y) < e.r + 8) {
      hov = e;
      cursor(HAND);
      break;
    }
  }
  // Cursor de mão sobre o botão fechar
  if (sel && dist(mouseX, mouseY, width - 14 - 18, 14 + 18) < 10) cursor(HAND);
}

function mousePressed() {
  // Fechar painel ao clicar no [✕]
  if (sel && dist(mouseX, mouseY, width - 14 - 18, 14 + 18) < 10) {
    sel = null;
    return;
  }
  // Selecionar / desselecionar estrela
  let { wx, wy } = posicaoMundo();
  for (let e of ESTRELAS) {
    if (dist(wx, wy, e.x, e.y) < e.r + 8) {
      sel = (sel === e) ? null : e;
      return;
    }
  }
  // Iniciar arrasto da câmara
  drag = true;
  mxi = mouseX; myi = mouseY;
  cxi = camXt;  cyi = camYt;
  sel = null;
}

function mouseDragged() {
  if (drag) {
    camXt = cxi + (mouseX - mxi);
    camYt = cyi + (mouseY - myi);
  }
}

function mouseReleased() { drag = false; }

function mouseWheel(event) {
  // event.delta > 0 = scroll para baixo = zoom out
  let fator = event.delta > 0 ? 0.88 : 1.14;
  zmt = constrain(zmt * fator, 0.25, 5.0);
  return false; // evitar scroll da página
}

//  INTERAÇÃO — TECLADO
function keyPressed() {
  if (key === 'r' || key === 'R' || key === ' ') {
    camXt = 0; camYt = 0; zmt = 1.0; sel = null;
  }
  if (key === '+' || key === '=') zmt = constrain(zmt * 1.25, 0.25, 5.0);
  if (key === '-')                zmt = constrain(zmt * 0.80, 0.25, 5.0);
  if (keyCode === ESCAPE)         sel = null;
}

//  REDIMENSIONAR JANELA
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  gerarGalaxia();
}

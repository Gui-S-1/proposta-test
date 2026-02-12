/* ═══════════════════════════════════════════════════════════
   PANIFICADORA PÃO DE MILHO — SPA ENGINE
   Router + Pages + Cart + PadaMatch + Sugestões
   ═══════════════════════════════════════════════════════════ */

/* ─── IMAGE HELPERS ─── */
const _MI='https://assets.menuintegrado.com/rails/active_storage/representations/proxy/';
const _MV='/w200_q75.webp';
const mimg=(id)=>`${_MI}${id}${_MV}`;

/* ─── FALLBACK FOOD IMAGES (free Unsplash) ─── */
const foodImg = {
  // Pães
  'Pão Francês':        'https://images.unsplash.com/photo-1549931319-a545753467c8?w=400&h=300&fit=crop',
  'Pão de Milho':       'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
  'Pão de Forma':       'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=400&h=300&fit=crop',
  'Pão Doce':           'https://images.unsplash.com/photo-1620921568790-c1cf8984624c?w=400&h=300&fit=crop',
  'Pão de Queijo':      'https://images.unsplash.com/photo-1598142982901-df6cec890871?w=400&h=300&fit=crop',
  'Broa de Fubá':       'https://images.unsplash.com/photo-1586444248879-bc604bc77ddd?w=400&h=300&fit=crop',
  'Rosca Doce':         'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop',
  'Pão Integral':       'https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=400&h=300&fit=crop',
  'Pão na Chapa':       'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop',
  'Pão de Batata':      'https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=400&h=300&fit=crop',
  'Pão Australiano':    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
  // Salgados
  'Coxinha':            'https://images.unsplash.com/photo-1630409351241-e90e7f5e434d?w=400&h=300&fit=crop',
  'Empada de Frango':   'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=300&fit=crop',
  'Esfiha de Carne':    'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop',
  'Pastel de Queijo':   'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
  'Enroladinho de Salsicha':'https://images.unsplash.com/photo-1619221882220-947b3d3c8861?w=400&h=300&fit=crop',
  'Torta de Frango':    'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop',
  'Quibe Frito':        'https://images.unsplash.com/photo-1579888944880-d98341245702?w=400&h=300&fit=crop',
  'Torta de Palmito':   'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop',
  'Empanada':           'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=300&fit=crop',
  // Lanches
  'X-Bacon Artesanal':  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
  'X-Tudo Especial':    'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop',
  'Misto Quente':       'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop',
  'Bauru Especial':     'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400&h=300&fit=crop',
  'Hot Dog Tradicional':'https://images.unsplash.com/photo-1612392062126-4a3f0286b5e0?w=400&h=300&fit=crop',
  'Cachorro Quente Especial':'https://images.unsplash.com/photo-1612392062126-4a3f0286b5e0?w=400&h=300&fit=crop',
  'Croissant Recheado': 'https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=400&h=300&fit=crop',
  'Wrap de Frango':     'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop',
  // Doces
  'Bolo de Chocolate':  'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
  'Bolo de Cenoura':    'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=300&fit=crop',
  'Torta de Limão':     'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&h=300&fit=crop',
  'Pudim de Leite':     'https://images.unsplash.com/photo-1614961908643-0e775e0a3087?w=400&h=300&fit=crop',
  'Brigadeiro Gourmet': 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=400&h=300&fit=crop',
  'Sonho Recheado':     'https://images.unsplash.com/photo-1558326567-98ae2405596b?w=400&h=300&fit=crop',
  'Croissant de Chocolate':'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=400&h=300&fit=crop',
  'Bolo de Fubá':       'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&h=300&fit=crop',
  'Carolina':           'https://images.unsplash.com/photo-1612203985729-70726954388c?w=400&h=300&fit=crop',
  'Bolinho de Chuva':   'https://images.unsplash.com/photo-1558326567-98ae2405596b?w=400&h=300&fit=crop',
  // Bebidas
  'Café Expresso':      'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=300&fit=crop',
  'Cappuccino':         'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop',
  'Suco de Laranja':    'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop',
  'Chocolate Quente':   'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400&h=300&fit=crop',
  'Vitamina de Banana': 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop',
  'Chá Gelado':         'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop',
  'Limonada Suíça':     'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=300&fit=crop',
  'Café com Leite':     'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop',
  'Açaí 500ml':         'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=400&h=300&fit=crop',
  'Frappuccino':        'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop',
  // Combos
  'Combo Café da Manhã':'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&h=300&fit=crop',
  'Combo Lanche':       'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
  'Combo Família':      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
  'Combo Doce':         'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
};

/* Apply fallback images to all items */
function applyFoodImages() {
  allItems.forEach(item => { if(foodImg[item.n]) item.img = foodImg[item.n]; });
  combos.forEach(item => { if(foodImg[item.n]) item.img = foodImg[item.n]; });
}

/* ─── FOOD DATABASE ─── */
const allItems=[
{id:1,n:'Pão Francês',d:'Crocante por fora, macio por dentro — o clássico de todo dia.',p:0.75,c:'paes',r:4.9,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4MzQsInB1ciI6ImJsb2JfaWQifX0=--bf43ef2e42a0e7ef02a2ef45e24dd26c070b6e30/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5'),b:true},
{id:2,n:'Pão de Milho',d:'Nosso carro-chefe! Receita artesanal com milho selecionado.',p:2.50,c:'paes',r:5.0,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4MjcsInB1ciI6ImJsb2JfaWQifX0=--d10f7ea0f51e05a8c24e0614d5da135097fedd3e/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5'),b:true},
{id:3,n:'Pão de Forma',d:'Macio, versátil e perfeito para o dia a dia da família.',p:8.00,c:'paes',r:4.7,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4MzUsInB1ciI6ImJsb2JfaWQifX0=--67ba02568a40f9a50821dbe5c2fdf6e84cc4edfb/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')},
{id:4,n:'Pão Doce',d:'Fofinho e levemente adocicado, com cobertura açucarada.',p:1.50,c:'paes',r:4.6,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4MzMsInB1ciI6ImJsb2JfaWQifX0=--c7ee7a24d7867dfcaa54b7ceda3c3a5cce9a8dd6/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')},
{id:5,n:'Pão de Queijo',d:'Quentinho, com queijo derretendo. Receita mineira autêntica!',p:3.50,c:'paes',r:4.9,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4MjgsInB1ciI6ImJsb2JfaWQifX0=--53c459d6b6b31977aaa6f24f6f3e38c4b4dbfaf6/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5'),b:true},
{id:6,n:'Broa de Fubá',d:'Feita com fubá de qualidade. Receita tradicional goiana.',p:3.00,c:'paes',r:4.5,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4MzIsInB1ciI6ImJsb2JfaWQifX0=--cb8f3684c8aab8dd4e88406cb87d2ac0da7e3d92/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')},
{id:7,n:'Rosca Doce',d:'Rosca fofinha coberta com glacê artesanal.',p:4.00,c:'paes',r:4.4,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4MzEsInB1ciI6ImJsb2JfaWQifX0=--fcf5e321f6c13d15dbd64dda1f56b05e93c2ad1b/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')},
{id:8,n:'Pão Integral',d:'Rico em fibras, perfeito para uma alimentação equilibrada.',p:9.00,c:'paes',r:4.3,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4MzUsInB1ciI6ImJsb2JfaWQifX0=--67ba02568a40f9a50821dbe5c2fdf6e84cc4edfb/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')},
{id:9,n:'Coxinha',d:'Crocante, recheio cremoso de frango. Perfeição frita!',p:5.00,c:'salgados',r:4.9,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4MzYsInB1ciI6ImJsb2JfaWQifX0=--1d2b10cfd900c9e868fdb24aa04cba4e9e4c75a2/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5'),b:true},
{id:10,n:'Empada de Frango',d:'Massa crocante, recheio temperado. Clássico irresistível.',p:5.00,c:'salgados',r:4.7,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4MzcsInB1ciI6ImJsb2JfaWQifX0=--75f30fd98f4ae71e4505e2deca6da5c7a1fadf04/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')},
{id:11,n:'Esfiha de Carne',d:'Aberta, generosa, com tempero especial da casa.',p:5.00,c:'salgados',r:4.6,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4MzgsInB1ciI6ImJsb2JfaWQifX0=--73bdf8a48cab0e958e6b8e45bbe88b9f45d5d69f/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')},
{id:12,n:'Pastel de Queijo',d:'Massa fininha e crocante, queijo derretendo a cada mordida.',p:6.00,c:'salgados',r:4.7,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4MzksInB1ciI6ImJsb2JfaWQifX0=--5d04a0e6afa5fbc773af22b6c4bf5e5c9a4c58d7/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')},
{id:13,n:'Enroladinho de Salsicha',d:'Massa assada com salsicha suculenta. Rápido e gostoso.',p:4.00,c:'salgados',r:4.4,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4NDAsInB1ciI6ImJsb2JfaWQifX0=--ec23b7a7a87b96c0bbfa5e764bbb789fa3deca5c/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')},
{id:14,n:'Torta de Frango',d:'Cremosa, tempero caseiro, massa que desmancha.',p:6.00,c:'salgados',r:4.8,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4NDEsInB1ciI6ImJsb2JfaWQifX0=--a07ab18e0ffde39f7ce68c42d49e454c1f84a97b/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')},
{id:15,n:'Quibe Frito',d:'Crocante, temperado, recheio suculento. Feito na hora!',p:5.50,c:'salgados',r:4.5,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4NDIsInB1ciI6ImJsb2JfaWQifX0=--e9f3cfa8f9dfcad9f8a2e0d50e46a8f6547e8e20/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')},
{id:16,n:'X-Bacon Artesanal',d:'Pão brioche, burger 150g, bacon crocante, cheddar.',p:18.00,c:'lanches',r:4.9,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4NDMsInB1ciI6ImJsb2JfaWQifX0=--2a9e64d02f79a70fe8e06c14c7cf49ea5b82e5b8/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5'),b:true},
{id:17,n:'X-Tudo Especial',d:'Tudo que você merece! Burger duplo, ovo, presunto, queijo.',p:22.00,c:'lanches',r:5.0,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4NDQsInB1ciI6ImJsb2JfaWQifX0=--a7a82b7a69d498de43c9e0019d9b39c5f2481c11/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')},
{id:18,n:'Misto Quente',d:'Simples e perfeito: presunto, queijo, pão tostado.',p:8.00,c:'lanches',r:4.5,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4NDUsInB1ciI6ImJsb2JfaWQifX0=--8e3ff9cd9b6a5fdf9f5a5bbcda5c19fa3a99e2dc/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')},
{id:19,n:'Bauru Especial',d:'Rosbife, tomate, queijo derretido no pão francês crocante.',p:12.00,c:'lanches',r:4.6,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4NDYsInB1ciI6ImJsb2JfaWQifX0=--ac2e3e0c9b8e2d3fb01fc5cdd81b88c1d0bedbfc/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')},
{id:20,n:'Hot Dog Tradicional',d:'Salsicha generosa, vinagrete, batata palha, ketchup e mostarda.',p:10.00,c:'lanches',r:4.5,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4NDcsInB1ciI6ImJsb2JfaWQifX0=--b9f1fc83e9c9e23eefc424f63cc38a1b1e3d2ca7/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')},
{id:21,n:'Cachorro Quente Especial',d:'Salsicha dupla, purê, milho, ervilha, molhos artesanais.',p:14.00,c:'lanches',r:4.7,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4NDgsInB1ciI6ImJsb2JfaWQifX0=--bc2eff34e13dd2e1c3a89d5dacd89f1b19c98fef/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')},
{id:22,n:'Croissant Recheado',d:'Folhado amanteigado com presunto e queijo gratinado.',p:9.00,c:'lanches',r:4.6,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4NDksInB1ciI6ImJsb2JfaWQifX0=--f95becc7d76ceef0bb6f6f7a2c5c86fd73f1ece2/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')},
{id:23,n:'Wrap de Frango',d:'Tortilla grelhada, frango desfiado, cream cheese, rúcula.',p:15.00,c:'lanches',r:4.4,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4NTAsInB1ciI6ImJsb2JfaWQifX0=--c6f6b48fe10a38cf78d20ffb8f40f5a5f7d7a3d3/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')},
{id:24,n:'Bolo de Chocolate',d:'Massa fofinha de cacau, cobertura brigadeiro cremoso.',p:6.00,c:'doces',r:4.9,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4NTEsInB1ciI6ImJsb2JfaWQifX0=--e7fd9c8e589fc7a7b7e9c9e8c8f7b91e3c89e9e4/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5'),b:true},
{id:25,n:'Bolo de Cenoura',d:'Coberto com calda de chocolate belga generosa.',p:5.50,c:'doces',r:4.7,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4NTIsInB1ciI6ImJsb2JfaWQifX0=--d3e03c1a74b6c0c3cc5b6d72e8b6f56a7a70e21f/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')},
{id:26,n:'Torta de Limão',d:'Base crocante, creme de limão azedinho, merengue.',p:7.00,c:'doces',r:4.6,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4NTMsInB1ciI6ImJsb2JfaWQifX0=--5f5ed9f9e2f0e0a15f8a6e2be9b5d8c0d5f1ff17/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')},
{id:27,n:'Pudim de Leite',d:'Cremoso, caramelo na medida. Receita da vovó!',p:5.00,c:'doces',r:4.8,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4NTQsInB1ciI6ImJsb2JfaWQifX0=--b7d9fbeacc23a9c3979c87c0e0f54df0cf6bf0ff/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')},
{id:28,n:'Brigadeiro Gourmet',d:'Chocolate 70%, granulado belga. Uma explosão de sabor.',p:3.50,c:'doces',r:4.8,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4NTUsInB1ciI6ImJsb2JfaWQifX0=--1e2c4be6e5ca3b5f5dd3c88a5a3e5e2c0ec7ca86/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')},
{id:29,n:'Sonho Recheado',d:'Massa aerada, recheio de doce de leite artesanal.',p:4.50,c:'doces',r:4.6,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4NTYsInB1ciI6ImJsb2JfaWQifX0=--f0c4fee26d37e1c6cff5dcd51daf8dbbca2b7ce7/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')},
{id:30,n:'Croissant de Chocolate',d:'Folhado amanteigado com recheio de chocolate meio amargo.',p:7.00,c:'doces',r:4.5,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4NDksInB1ciI6ImJsb2JfaWQifX0=--f95becc7d76ceef0bb6f6f7a2c5c86fd73f1ece2/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')},
{id:31,n:'Bolo de Fubá',d:'Com erva-doce e queijo. O sabor de Goiás numa fatia!',p:5.00,c:'doces',r:4.7,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4NTEsInB1ciI6ImJsb2JfaWQifX0=--e7fd9c8e589fc7a7b7e9c9e8c8f7b91e3c89e9e4/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')},
{id:32,n:'Carolina',d:'Massa choux crocante, recheio de creme e cobertura de chocolate.',p:3.00,c:'doces',r:4.4,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4NTUsInB1ciI6ImJsb2JfaWQifX0=--1e2c4be6e5ca3b5f5dd3c88a5a3e5e2c0ec7ca86/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')},
{id:33,n:'Café Expresso',d:'Grãos torrados na hora, encorpado e aromático.',p:4.00,c:'bebidas',r:4.8,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4NTcsInB1ciI6ImJsb2JfaWQifX0=--ba2e77f0a0d9a74d8b85a9c7a4d1f1d4e3f1b8a7/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5'),b:true},
{id:34,n:'Cappuccino',d:'Café expresso, leite vaporizado, espuma e canela.',p:7.00,c:'bebidas',r:4.7,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4NTgsInB1ciI6ImJsb2JfaWQifX0=--a1c5e46ead4b9d5e83f4b39c1b5b4e6a8c2e7d0f/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')},
{id:35,n:'Suco de Laranja',d:'Natural, sem açúcar, feito na hora com laranjas frescas.',p:6.00,c:'bebidas',r:4.5,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4NTksInB1ciI6ImJsb2JfaWQifX0=--c4b7ff1e8d8e5c6adf5fa1ce5b3d8e7c9a2d4f0b/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')},
{id:36,n:'Chocolate Quente',d:'Cremoso, com cacau belga e um toque de baunilha.',p:7.50,c:'bebidas',r:4.8,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4NjAsInB1ciI6ImJsb2JfaWQifX0=--d8a6e3f2c7b45a1e9d8c7b6a5f4e3d2c1b0a9887/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')},
{id:37,n:'Vitamina de Banana',d:'Banana, leite, mel e aveia. Energia pura!',p:8.00,c:'bebidas',r:4.4,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4NjEsInB1ciI6ImJsb2JfaWQifX0=--f1e2d3c4b5a69788796a5b4c3d2e1f0019283746/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')},
{id:38,n:'Chá Gelado',d:'Chá preto com limão e hortelã, refrescante e natural.',p:5.00,c:'bebidas',r:4.3,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4NjIsInB1ciI6ImJsb2JfaWQifX0=--a2b3c4d5e6f708192a3b4c5d6e7f8091a2b3c4d5/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')},
{id:39,n:'Limonada Suíça',d:'Limão batido com leite condensado e gelo. Cremosa e refrescante.',p:7.00,c:'bebidas',r:4.6,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4NTksInB1ciI6ImJsb2JfaWQifX0=--c4b7ff1e8d8e5c6adf5fa1ce5b3d8e7c9a2d4f0b/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')},
{id:40,n:'Café com Leite',d:'Tradicional, cremoso, com leite vaporizado.',p:5.00,c:'bebidas',r:4.5,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4NTcsInB1ciI6ImJsb2JfaWQifX0=--ba2e77f0a0d9a74d8b85a9c7a4d1f1d4e3f1b8a7/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')},
{id:41,n:'Pão na Chapa',d:'Pão francês tostado na manteiga, crocante e quente.',p:4.00,c:'paes',r:4.7,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4MzQsInB1ciI6ImJsb2JfaWQifX0=--bf43ef2e42a0e7ef02a2ef45e24dd26c070b6e30/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')},
{id:42,n:'Bolinho de Chuva',d:'Polvilhado com açúcar e canela, quentinho.',p:2.00,c:'doces',r:4.5,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4NTYsInB1ciI6ImJsb2JfaWQifX0=--f0c4fee26d37e1c6cff5dcd51daf8dbbca2b7ce7/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')},
{id:43,n:'Pão de Batata',d:'Massa fofinha de batata, ideal para lanches.',p:3.00,c:'paes',r:4.4,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4MjgsInB1ciI6ImJsb2JfaWQifX0=--53c459d6b6b31977aaa6f24f6f3e38c4b4dbfaf6/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')},
{id:44,n:'Torta de Palmito',d:'Recheio cremoso de palmito, massa caseira.',p:7.00,c:'salgados',r:4.6,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4NDEsInB1ciI6ImJsb2JfaWQifX0=--a07ab18e0ffde39f7ce68c42d49e454c1f84a97b/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')},
{id:45,n:'Açaí 500ml',d:'Açaí puro batido, com banana e granola crocante.',p:15.00,c:'bebidas',r:4.7,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4NjAsInB1ciI6ImJsb2JfaWQifX0=--d8a6e3f2c7b45a1e9d8c7b6a5f4e3d2c1b0a9887/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')},
{id:46,n:'Empanada',d:'Massa crocante, recheio de carne temperada.',p:6.00,c:'salgados',r:4.5,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4MzcsInB1ciI6ImJsb2JfaWQifX0=--75f30fd98f4ae71e4505e2deca6da5c7a1fadf04/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')},
{id:47,n:'Pão Australiano',d:'Escuro, adocicado, casca crocante. Sabor único!',p:10.00,c:'paes',r:4.3,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4MzUsInB1ciI6ImJsb2JfaWQifX0=--67ba02568a40f9a50821dbe5c2fdf6e84cc4edfb/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')},
{id:48,n:'Frappuccino',d:'Café gelado batido com leite, gelo e chantilly.',p:12.00,c:'bebidas',r:4.6,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4NTgsInB1ciI6ImJsb2JfaWQifX0=--a1c5e46ead4b9d5e83f4b39c1b5b4e6a8c2e7d0f/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5')}
];

const combos=[
{id:100,n:'Combo Café da Manhã',d:'Pão na chapa + café com leite + suco de laranja',p:12.00,c:'combos',r:4.9,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4NTcsInB1ciI6ImJsb2JfaWQifX0=--ba2e77f0a0d9a74d8b85a9c7a4d1f1d4e3f1b8a7/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5'),items:[41,40,35]},
{id:101,n:'Combo Lanche',d:'X-Bacon + batata frita + refrigerante',p:25.00,c:'combos',r:4.8,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4NDMsInB1ciI6ImJsb2JfaWQifX0=--2a9e64d02f79a70fe8e06c14c7cf49ea5b82e5b8/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5'),items:[16]},
{id:102,n:'Combo Família',d:'4 pães de queijo + 4 coxinhas + 1L suco',p:35.00,c:'combos',r:5.0,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4MjgsInB1ciI6ImJsb2JfaWQifX0=--53c459d6b6b31977aaa6f24f6f3e38c4b4dbfaf6/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5'),items:[5,9]},
{id:103,n:'Combo Doce',d:'Bolo de chocolate + brigadeiro + cappuccino',p:16.00,c:'combos',r:4.7,img:mimg('eyJfcmFpbHMiOnsiZGF0YSI6MzY4NTEsInB1ciI6ImJsb2JfaWQifX0=--e7fd9c8e589fc7a7b7e9c9e8c8f7b91e3c89e9e4/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjoiMjAweDIwMCJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--4f0c54a91ba2c5e03aec3a3c67e1f0f2a5ec01e5'),items:[24,28,34]}
];

applyFoodImages();
const allFood=[...allItems,...combos];
const catNames={paes:'Pães',salgados:'Salgados',lanches:'Lanches',doces:'Doces',bebidas:'Bebidas',combos:'Combos'};
const WA_NUM='5562999677514';
const fmt=(v)=>`R$ ${v.toFixed(2).replace('.',',')}`;

/* ─── SVG ICONS ─── */
const SVG={
star:'<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
plus:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
cart:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
minus:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>',
trash:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
whatsapp:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>',
heart:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
skip:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>',
x:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
check:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
bread:'<svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" opacity="0.5"><path d="M12 2C6.48 2 2 5.58 2 10c0 2.13 1.07 4.04 2.76 5.39V20a2 2 0 002 2h10.48a2 2 0 002-2v-4.61C20.93 14.04 22 12.13 22 10c0-4.42-4.48-8-10-8z"/></svg>',
wheat:'<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5"><path d="M2 22l1-1h3l9-9"/><path d="M3 21v-3l9-9"/><path d="M14.5 2.5a2.4 2.4 0 0 1 3.4 0L21.5 6a2.4 2.4 0 0 1 0 3.4L14 17l-7-7 7.5-7.5z"/></svg>',
pin:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>',
clock:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
phone:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>',
shield:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
coffee:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>',
users:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>',
briefcase:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>',
send:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
arrowRight:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
menu:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>',
sparkle:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.4 5.6 21.2 8 14 2 9.2h7.6L12 2z"/></svg>',
pix:'<svg width="36" height="36" viewBox="0 0 512 512" fill="currentColor"><path d="M361.7 199.7l-102 102.1a15 15 0 01-10.6 4.4 15 15 0 01-10.6-4.4l-102-102.1a15 15 0 010-21.2l16.7-16.7-27.6-27.6a45.1 45.1 0 00-63.7 0L7.4 188.7a45.1 45.1 0 000 63.7l54.5 54.5a45.1 45.1 0 0063.7 0l27.6-27.6-16.7-16.7a15 15 0 010-21.2l102-102.1a15 15 0 0110.6-4.4c3.8 0 7.7 1.5 10.6 4.4l102 102.1a15 15 0 010 21.2l-16.7 16.7 27.6 27.6a45.1 45.1 0 0063.7 0l54.5-54.5a45.1 45.1 0 000-63.7l-54.5-54.5a45.1 45.1 0 00-63.7 0l-27.6 27.6 16.7 16.7a15 15 0 010 21.2z"/><path d="M436.2 368l-27.6-27.6-16.7 16.7a15 15 0 01-21.2 0l-102-102.1a15 15 0 010-21.2l16.7-16.7L258 189.6a15 15 0 00-21.2 0L209.2 217l16.7 16.7a15 15 0 010 21.2L123.8 357a15 15 0 01-21.2 0l-16.7-16.7L58.3 368a45.1 45.1 0 000 63.7l54.5 54.5a45.1 45.1 0 0063.7 0l59.4-59.4a15 15 0 0121.2 0l59.4 59.4a45.1 45.1 0 0063.7 0l54.5-54.5a46.6 46.6 0 001.5-63.7z"/><path d="M436.2 80.3l-54.5-54.5a45.1 45.1 0 00-63.7 0l-59.4 59.4a15 15 0 01-21.2 0l-59.4-59.4a45.1 45.1 0 00-63.7 0L60.8 80.3a45.1 45.1 0 000 63.7l27.6 27.6 16.7-16.7a15 15 0 0121.2 0l102 102.1a15 15 0 010 21.2l-16.7 16.7 27.6 27.6a15 15 0 0021.2 0l27.6-27.6-16.7-16.7a15 15 0 010-21.2l102-102.1a15 15 0 0121.2 0l16.7 16.7 27.6-27.6a45.1 45.1 0 00-1.6-63.7z"/></svg>',
creditCard:'<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',
dollarSign:'<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>',
banknote:'<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 6v12M18 6v12"/></svg>',
instagram:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
home:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
refresh:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>',
bag:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>',
award:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>'
};

/* ─── STATE ─── */
let cart=JSON.parse(localStorage.getItem('pdm_cart')||'[]');
let currentRoute='/';
let pmLikes=0, pmSkips=0, pmCards=[], pmIdx=0;
let sugCart=[];

/* ─── DOM ─── */
const $=s=>document.querySelector(s);
const $$=s=>document.querySelectorAll(s);
const app=$('#app');

/* ─── ROUTER ─── */
const routes={
  '/':renderHome,
  '/cardapio':renderCardapio,
  '/padamatch':renderPadaMatch,
  '/quem-somos':renderQuemSomos,
  '/trabalhe-conosco':renderTrabalheConosco,
  '/pedidos':renderPedidos,
  '/contato':renderContato
};

function navigate(path,pushState=true){
  if(path===currentRoute && pushState) return;
  currentRoute=path;
  if(pushState) history.pushState(null,null,path);
  // update nav
  $$('.nav-link').forEach(l=>{
    l.classList.toggle('active',l.dataset.route===path);
  });
  $$('.mobile-link').forEach(l=>{
    l.classList.toggle('active',l.dataset.route===path);
  });
  // close mobile menu
  const mm=$('.mobile-menu');
  const hb=$('.hamburger');
  if(mm) mm.classList.remove('active');
  if(hb) hb.classList.remove('active');
  document.body.style.overflow='';
  // render
  const render=routes[path]||render404;
  app.innerHTML='';
  const content=render();
  app.innerHTML=content;
  app.classList.remove('page-enter');
  void app.offsetWidth;
  app.classList.add('page-enter');
  window.scrollTo({top:0,behavior:'instant'});
  // bind
  bindPage(path);
  updateCartBadge();
  initReveals();
}

function render404(){
  return `<div class="section" style="min-height:80vh;display:flex;align-items:center;justify-content:center;text-align:center">
    <div><h1 style="font-family:'Playfair Display',serif;font-size:4rem;color:var(--gold)">404</h1>
    <p style="color:var(--text-secondary);margin:12px 0 24px">Página não encontrada</p>
    <button class="btn-primary" onclick="navigate('/')">Voltar ao Início</button></div></div>`;
}

window.addEventListener('popstate',()=>navigate(location.pathname,false));

/* ─── PAGE: HOME ─── */
function renderHome(){
  const promos=allItems.filter(i=>i.b).slice(0,6);
  return `
  <section class="hero">
    <div class="hero-bg">
      <div class="hero-grain"></div>
      <div class="hero-gradient-1"></div>
      <div class="hero-gradient-2"></div>
      <div class="hero-particles">${Array.from({length:12},(_,i)=>`<div class="hero-particle" style="left:${Math.random()*100}%;width:${2+Math.random()*3}px;height:${2+Math.random()*3}px;--duration:${8+Math.random()*12}s;--delay:${Math.random()*8}s;--opacity:${0.15+Math.random()*0.3}"></div>`).join('')}</div>
      <div class="float-elements">
        <div class="float-el" style="top:15%;left:8%;width:60px;height:60px;--dur:18s;--delay:0s">${SVG.bread}</div>
        <div class="float-el" style="top:60%;right:10%;width:50px;height:50px;--dur:22s;--delay:3s">${SVG.wheat}</div>
        <div class="float-el" style="bottom:20%;left:15%;width:45px;height:45px;--dur:16s;--delay:6s">${SVG.coffee}</div>
      </div>
    </div>
    <div class="hero-content">
      <div class="hero-badge">${SVG.sparkle}<span>Tradição artesanal desde 2005</span></div>
      <h1 class="hero-title">
        <span class="hero-title-line">Panificadora</span>
        <span class="hero-title-accent">Pão de Milho</span>
      </h1>
      <p class="hero-subtitle">Sabores artesanais feitos com carinho em Goiânia. Do forno para a sua mesa, com a qualidade que você merece.</p>
      <div class="hero-buttons">
        <button class="btn-primary" data-nav="/cardapio">${SVG.menu} Ver Cardápio</button>
        <button class="btn-glass" data-nav="/padamatch">${SVG.heart} PadaMatch</button>
      </div>
      <div class="hero-stats">
        <div class="hero-stat"><span class="hero-stat-number" data-count="200">0</span><span class="hero-stat-label">Produtos</span></div>
        <div class="hero-stat-divider"></div>
        <div class="hero-stat"><span class="hero-stat-number" data-count="18">0</span><span class="hero-stat-label">Anos</span></div>
        <div class="hero-stat-divider"></div>
        <div class="hero-stat"><span class="hero-stat-number" data-count="50000">0</span><span class="hero-stat-label">Clientes</span></div>
      </div>
    </div>
    <div class="hero-scroll-indicator"><div class="scroll-line"></div><span>Explore</span></div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-header reveal">
        <span class="section-tag">${SVG.sparkle} Navegue</span>
        <h2 class="section-title">O que você procura?</h2>
        <p class="section-desc">Explore nossas áreas e descubra tudo que preparamos pra você</p>
      </div>
      <div class="home-nav-grid">
        <div class="home-nav-card glass-card reveal" data-nav="/cardapio">
          <div class="nav-card-icon">${SVG.menu}</div>
          <h3>Cardápio Completo</h3>
          <p>Mais de 48 itens entre pães, salgados, lanches, doces e bebidas.</p>
          <span class="card-arrow">Explorar ${SVG.arrowRight}</span>
        </div>
        <div class="home-nav-card glass-card reveal" data-nav="/padamatch">
          <div class="nav-card-icon">${SVG.heart}</div>
          <h3>PadaMatch</h3>
          <p>Descubra novos sabores deslizando cards. Encontre seu favorito!</p>
          <span class="card-arrow">Jogar ${SVG.arrowRight}</span>
        </div>
        <div class="home-nav-card glass-card reveal" data-nav="/pedidos">
          <div class="nav-card-icon">${SVG.bag}</div>
          <h3>Meu Pedido</h3>
          <p>Monte seu pedido personalizado e envie direto pelo WhatsApp.</p>
          <span class="card-arrow">Pedir ${SVG.arrowRight}</span>
        </div>
      </div>

      <div class="home-promos reveal">
        <h3 style="font-family:'Playfair Display',serif;font-size:1.3rem;margin-bottom:20px">Destaques do Dia</h3>
        <div class="home-promos-scroll">
          ${promos.map(i=>`
          <div class="home-promo-card" data-add="${i.id}">
            <img src="${i.img}" alt="${i.n}" loading="lazy">
            <div class="promo-body">
              <h4>${i.n}</h4>
              <span class="promo-price">${fmt(i.p)}</span>
            </div>
          </div>`).join('')}
        </div>
      </div>

      <div class="cta-banner reveal">
        <div class="cta-glow"></div>
        <h3>Não sabe o que pedir?</h3>
        <p>Experimente o <strong class="text-gold">PadaMatch</strong> — deslize para a direita nos sabores que te agradam!</p>
        <button class="btn-primary" data-nav="/padamatch">${SVG.heart} Experimentar PadaMatch</button>
      </div>
    </div>
  </section>`;
}

/* ─── PAGE: CARDÁPIO ─── */
function renderCardapio(){
  const cats=['todos','paes','salgados','lanches','doces','bebidas','combos'];
  const catLabels={todos:'Todos',paes:'Pães',salgados:'Salgados',lanches:'Lanches',doces:'Doces',bebidas:'Bebidas',combos:'Combos'};
  return `
  <section class="section" style="padding-top:120px">
    <div class="container">
      <div class="float-elements">
        <div class="float-el" style="top:5%;right:5%;width:50px;height:50px;--dur:20s">${SVG.bread}</div>
        <div class="float-el" style="bottom:10%;left:5%;width:40px;height:40px;--dur:25s;--delay:5s">${SVG.wheat}</div>
      </div>
      <div class="section-header reveal">
        <span class="section-tag">${SVG.sparkle} Cardápio</span>
        <h2 class="section-title">Nosso <span class="text-gold">Cardápio</span></h2>
        <p class="section-desc">Feito com ingredientes selecionados e muito carinho</p>
      </div>

      <div class="filter-bar reveal" id="filterBar">
        ${cats.map(c=>`<button class="filter-btn${c==='todos'?' active':''}" data-cat="${c}">${catLabels[c]}</button>`).join('')}
      </div>

      <div class="menu-grid" id="menuGrid">
        ${allFood.map(i=>`
        <div class="menu-card glass-card reveal" data-cat="${i.c}">
          <div class="menu-card-img">
            <img src="${i.img}" alt="${i.n}" loading="lazy">
            <div class="menu-card-overlay"></div>
            ${i.b?'<span class="menu-card-badge best">Popular</span>':`<span class="menu-card-badge">${catNames[i.c]||i.c}</span>`}
          </div>
          <div class="menu-card-body">
            <div class="menu-card-header">
              <h3>${i.n}</h3>
              <span class="menu-rating">${SVG.star} ${i.r}</span>
            </div>
            <p class="menu-card-desc">${i.d}</p>
            <div class="menu-card-footer">
              <span class="menu-price">${fmt(i.p)}</span>
              <button class="btn-add" data-add="${i.id}" title="Adicionar">${SVG.plus}</button>
            </div>
          </div>
        </div>`).join('')}
      </div>

      <div class="section" id="sugSection">
        <div class="section-header reveal">
          <span class="section-tag">${SVG.sparkle} Sugestões</span>
          <h2 class="section-title">Monte seu <span class="text-gold">Lanche</span></h2>
          <p class="section-desc">Selecione o orçamento e escolha o que combina com você</p>
        </div>
        <div class="sug-filters reveal" id="sugFilters">
          <button class="sug-filter-btn active" data-max="10">Até <span class="sug-price-tag">R$ 10</span></button>
          <button class="sug-filter-btn" data-max="20">Até <span class="sug-price-tag">R$ 20</span></button>
          <button class="sug-filter-btn" data-max="30">Até <span class="sug-price-tag">R$ 30</span></button>
          <button class="sug-filter-btn" data-max="50">Até <span class="sug-price-tag">R$ 50</span></button>
          <button class="sug-filter-btn" data-max="999">Sem limite</button>
        </div>
        <div class="sug-grid" id="sugGrid"></div>
        <div class="sug-cart-summary glass-card" id="sugSummary" style="display:none">
          <div class="sug-cart-info">
            <h4>Seu combo</h4>
            <span id="sugItemsLabel">0 itens</span>
          </div>
          <div class="sug-cart-total">
            <span>Total</span>
            <strong id="sugTotalLabel">R$ 0,00</strong>
          </div>
          <button class="btn-primary sug-cart-btn" id="sugAddAll">${SVG.cart} Adicionar tudo</button>
        </div>
      </div>
    </div>
  </section>`;
}

/* ─── PAGE: PADAMATCH ─── */
function renderPadaMatch(){
  return `
  <section class="section" style="padding-top:120px">
    <div class="container">
      <div class="float-elements">
        <div class="float-el" style="top:10%;left:5%;width:50px;height:50px;--dur:18s">${SVG.heart}</div>
        <div class="float-el" style="bottom:15%;right:8%;width:40px;height:40px;--dur:22s;--delay:4s">${SVG.bread}</div>
      </div>
      <div class="section-header reveal">
        <span class="section-tag">${SVG.heart} PadaMatch</span>
        <h2 class="section-title">Descubra novos <span class="text-gold">Sabores</span></h2>
        <p class="section-desc">Deslize para a direita nos itens que te agradam e monte seu pedido ideal</p>
      </div>
      <div class="pm-arena">
        <div class="pm-stack" id="pmStack"></div>
        <div class="pm-empty hidden" id="pmEmpty">
          <div style="font-size:3rem;margin-bottom:8px">${SVG.bag}</div>
          <h3>Você viu tudo!</h3>
          <p>Que tal adicionar seus favoritos ao carrinho?</p>
          <button class="btn-primary pm-restart-btn" id="pmRestart">${SVG.refresh} Recomeçar</button>
        </div>
        <div class="pm-controls" id="pmControls">
          <button class="pm-btn pm-btn-nope" id="pmBtnNope" title="Pular">${SVG.x}</button>
          <button class="pm-btn pm-btn-like" id="pmBtnLike" title="Curtir">${SVG.heart}</button>
        </div>
        <div class="pm-counter" id="pmCounter"></div>
        <div class="pm-score glass-card" id="pmScore">
          <div class="pm-score-item"><span class="pm-score-icon" style="color:var(--green)">${SVG.heart}</span><span id="pmLikeCount">0</span></div>
          <div class="pm-score-item"><span class="pm-score-icon" style="color:var(--text-muted)">${SVG.skip}</span><span id="pmSkipCount">0</span></div>
        </div>
      </div>
    </div>
  </section>`;
}

/* ─── PAGE: QUEM SOMOS ─── */
function renderQuemSomos(){
  return `
  <section class="section" style="padding-top:120px">
    <div class="container">
      <div class="float-elements">
        <div class="float-el" style="top:10%;right:8%;width:55px;height:55px;--dur:20s">${SVG.wheat}</div>
        <div class="float-el" style="bottom:15%;left:5%;width:45px;height:45px;--dur:24s;--delay:3s">${SVG.bread}</div>
      </div>
      <div class="section-header reveal">
        <span class="section-tag">${SVG.sparkle} Nossa História</span>
        <h2 class="section-title">Quem <span class="text-gold">Somos</span></h2>
      </div>
      <div class="sobre-grid">
        <div class="sobre-content reveal">
          <p class="sobre-text">A <strong class="text-gold">Panificadora Pão de Milho</strong> nasceu em 2005 em Goiânia com um sonho: oferecer pães artesanais feitos com ingredientes selecionados e muito carinho.</p>
          <p class="sobre-text">Hoje, somos referência na região com mais de 200 produtos, desde o clássico pão francês até lanches gourmet e sobremesas irresistíveis. Cada receita carrega a tradição goiana e o compromisso com a qualidade.</p>
          <p class="sobre-text">Nosso diferencial está no cuidado com cada etapa: ingredientes frescos, receitas testadas e uma equipe apaixonada pelo que faz.</p>
          <div class="sobre-features">
            <div class="sobre-feature glass-card">
              <div style="color:var(--gold)">${SVG.award}</div>
              <div><strong>Qualidade Artesanal</strong><span>Ingredientes selecionados, receitas tradicionais</span></div>
            </div>
            <div class="sobre-feature glass-card">
              <div style="color:var(--gold)">${SVG.users}</div>
              <div><strong>Equipe Dedicada</strong><span>Profissionais apaixonados pela panificação</span></div>
            </div>
            <div class="sobre-feature glass-card">
              <div style="color:var(--gold)">${SVG.heart}</div>
              <div><strong>Feito com Amor</strong><span>Do forno para a sua mesa, sempre fresquinho</span></div>
            </div>
          </div>
        </div>
        <div class="sobre-visual reveal">
          <div class="sobre-img-grid">
            <div class="sobre-img-card glass-card">
              <img src="${allItems[1].img}" alt="Pão de Milho" loading="lazy">
            </div>
            <div class="sobre-img-card glass-card small">
              <img src="${allItems[4].img}" alt="Pão de Queijo" loading="lazy">
            </div>
            <div class="sobre-stats-card glass-card">
              <div class="stat-item"><span class="stat-number" data-count="18">0</span><span class="stat-label">Anos</span></div>
              <div class="stat-item"><span class="stat-number" data-count="200">0</span><span class="stat-label">Produtos</span></div>
              <div class="stat-item"><span class="stat-number" data-count="50">0</span><span class="stat-label">Mil Clientes</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

/* ─── PAGE: TRABALHE CONOSCO ─── */
function renderTrabalheConosco(){
  return `
  <section class="section" style="padding-top:120px">
    <div class="container">
      <div class="float-elements">
        <div class="float-el" style="top:8%;left:8%;width:50px;height:50px;--dur:18s">${SVG.briefcase}</div>
        <div class="float-el" style="bottom:12%;right:10%;width:45px;height:45px;--dur:22s;--delay:5s">${SVG.users}</div>
      </div>
      <div class="section-header reveal">
        <span class="section-tag">${SVG.briefcase} Vagas</span>
        <h2 class="section-title">Trabalhe <span class="text-gold">Conosco</span></h2>
      </div>
      <p class="jobs-intro reveal">Faça parte da família Pão de Milho! Estamos sempre em busca de pessoas apaixonadas, dedicadas e que queiram crescer junto com a gente.</p>
      <div class="jobs-grid">
        <div class="job-card glass-card reveal">
          <div class="job-icon">${SVG.bread}</div>
          <h3>Padeiro(a)</h3>
          <p>Experiência em panificação artesanal. Responsável pela produção diária de pães e salgados.</p>
          <span class="job-tag">Integral</span>
        </div>
        <div class="job-card glass-card reveal">
          <div class="job-icon">${SVG.coffee}</div>
          <h3>Atendente</h3>
          <p>Atendimento ao cliente com simpatia e agilidade. Organização do salão e vitrine.</p>
          <span class="job-tag">Integral / Meio Período</span>
        </div>
        <div class="job-card glass-card reveal">
          <div class="job-icon">${SVG.users}</div>
          <h3>Confeiteiro(a)</h3>
          <p>Criatividade para desenvolver doces, bolos e sobremesas. Experiência desejável.</p>
          <span class="job-tag">Integral</span>
        </div>
      </div>
      <div class="jobs-cta reveal">
        <p>Envie seu currículo pelo WhatsApp ou venha nos visitar pessoalmente!</p>
        <a href="https://wa.me/${WA_NUM}?text=${encodeURIComponent('Olá! Gostaria de enviar meu currículo para trabalhar na Pão de Milho.')}" target="_blank" class="btn-primary">${SVG.whatsapp} Enviar Currículo</a>
      </div>
    </div>
  </section>`;
}

/* ─── PAGE: PEDIDOS (CART) ─── */
function renderPedidos(){
  return `
  <section class="section" style="padding-top:120px">
    <div class="container">
      <div class="float-elements">
        <div class="float-el" style="top:8%;right:6%;width:45px;height:45px;--dur:20s">${SVG.bag}</div>
      </div>
      <div class="section-header reveal">
        <span class="section-tag">${SVG.cart} Pedido</span>
        <h2 class="section-title">Meu <span class="text-gold">Pedido</span></h2>
        <p class="section-desc">Revise seus itens e finalize pelo WhatsApp</p>
      </div>
      <div class="cart-layout">
        <div class="cart-items glass-card" id="cartItems"></div>
        <div class="cart-summary glass-card" id="cartSummary"></div>
      </div>

      <div class="section" style="padding-top:60px">
        <div class="section-header reveal">
          <span class="section-tag">${SVG.shield} Pagamento</span>
          <h2 class="section-title">Formas de <span class="text-gold">Pagamento</span></h2>
        </div>
        <div class="payment-grid">
          <div class="payment-card glass-card reveal">
            <div class="payment-icon pix-icon">${SVG.pix}</div>
            <h3>PIX</h3>
            <p>Pagamento instantâneo com desconto especial</p>
            <span class="payment-badge">5% desconto</span>
          </div>
          <div class="payment-card glass-card reveal">
            <div class="payment-icon card-icon">${SVG.creditCard}</div>
            <h3>Crédito</h3>
            <p>Aceitamos todas as bandeiras</p>
            <span class="payment-badge">até 3x</span>
          </div>
          <div class="payment-card glass-card reveal">
            <div class="payment-icon debit-icon">${SVG.creditCard}</div>
            <h3>Débito</h3>
            <p>Todas as bandeiras aceitas</p>
            <span class="payment-badge">à vista</span>
          </div>
          <div class="payment-card glass-card reveal">
            <div class="payment-icon cash-icon">${SVG.banknote}</div>
            <h3>Dinheiro</h3>
            <p>Troco disponível na entrega</p>
            <span class="payment-badge">à vista</span>
          </div>
        </div>
        <div class="payment-security reveal">
          <div class="payment-security-inner glass-card">
            <div style="color:var(--gold)">${SVG.shield}</div>
            <div><strong>Pagamento seguro</strong><span>Seus dados estão protegidos</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

/* ─── PAGE: CONTATO ─── */
function renderContato(){
  return `
  <section class="section" style="padding-top:120px">
    <div class="container">
      <div class="float-elements">
        <div class="float-el" style="top:10%;right:8%;width:50px;height:50px;--dur:20s">${SVG.pin}</div>
      </div>
      <div class="section-header reveal">
        <span class="section-tag">${SVG.pin} Contato</span>
        <h2 class="section-title">Fale <span class="text-gold">Conosco</span></h2>
        <p class="section-desc">Estamos prontos para atender você!</p>
      </div>
      <div class="contato-grid">
        <div class="contato-card glass-card reveal">
          <div class="contato-icon whatsapp-icon">${SVG.whatsapp}</div>
          <h3>WhatsApp</h3>
          <p>(62) 99967-7514</p>
          <a href="https://wa.me/${WA_NUM}" target="_blank" class="contato-action">Enviar mensagem ${SVG.arrowRight}</a>
        </div>
        <div class="contato-card glass-card reveal">
          <div class="contato-icon">${SVG.pin}</div>
          <h3>Endereço</h3>
          <p>Goiânia, GO</p>
          <span class="contato-action">Como chegar ${SVG.arrowRight}</span>
        </div>
        <div class="contato-card glass-card reveal">
          <div class="contato-icon">${SVG.clock}</div>
          <h3>Horário</h3>
          <p>Seg-Sáb: 6h-20h<br>Dom: 6h-13h</p>
          <span class="contato-action">Aberto agora</span>
        </div>
      </div>
      <div class="map-container reveal">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d240310.4763863857!2d-49.4296!3d-16.6869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ef0a04fcf8b2d%3A0x8e3c7f5b2e5b2f2a!2sGoi%C3%A2nia%2C%20GO!5e0!3m2!1spt-BR!2sbr!4v1" allowfullscreen loading="lazy"></iframe>
      </div>
    </div>
  </section>`;
}

/* ─── FOOTER (appended to all pages) ─── */
function getFooter(){
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <img src="logo.png" alt="Pão de Milho" class="footer-logo">
          <p>Tradição artesanal desde 2005. Sabores que aquecem o coração de Goiânia.</p>
          <div class="footer-social">
            <a href="https://www.instagram.com/panificadora_paodemilho/" target="_blank" class="social-link" title="Instagram">${SVG.instagram}</a>
            <a href="https://wa.me/${WA_NUM}" target="_blank" class="social-link" title="WhatsApp">${SVG.whatsapp}</a>
          </div>
        </div>
        <div class="footer-links">
          <h4>Navegação</h4>
          <a href="/" data-route="/">Início</a>
          <a href="/cardapio" data-route="/cardapio">Cardápio</a>
          <a href="/padamatch" data-route="/padamatch">PadaMatch</a>
          <a href="/pedidos" data-route="/pedidos">Pedidos</a>
        </div>
        <div class="footer-links">
          <h4>Institucional</h4>
          <a href="/quem-somos" data-route="/quem-somos">Quem Somos</a>
          <a href="/trabalhe-conosco" data-route="/trabalhe-conosco">Trabalhe Conosco</a>
          <a href="/contato" data-route="/contato">Contato</a>
        </div>
        <div class="footer-contact">
          <h4>Contato</h4>
          <p>${SVG.phone} (62) 99967-7514</p>
          <p>${SVG.pin} Goiânia, GO</p>
          <p>${SVG.clock} Seg-Sáb: 6h-20h</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} Panificadora Pão de Milho. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>`;
}

/* ─── BIND PAGE ─── */
function bindPage(path){
  // Append footer to all pages
  app.insertAdjacentHTML('beforeend', getFooter());

  // nav links inside content
  app.querySelectorAll('[data-nav]').forEach(el=>{
    el.addEventListener('click',e=>{e.preventDefault();navigate(el.dataset.nav);});
  });
  // footer links
  app.querySelectorAll('[data-route]').forEach(el=>{
    el.addEventListener('click',e=>{e.preventDefault();navigate(el.dataset.route);});
  });
  // add to cart buttons
  app.querySelectorAll('[data-add]').forEach(btn=>{
    btn.addEventListener('click',e=>{
      e.stopPropagation();
      addToCart(parseInt(btn.dataset.add));
    });
  });

  // page-specific bindings
  if(path==='/') bindHome();
  if(path==='/cardapio') bindCardapio();
  if(path==='/padamatch') bindPadaMatch();
  if(path==='/pedidos') bindPedidos();
  if(path==='/quem-somos') animateCounters();
}

/* ─── BIND: HOME ─── */
function bindHome(){
  animateCounters();
}

/* ─── BIND: CARDÁPIO ─── */
function bindCardapio(){
  const grid=$('#menuGrid');
  const filterBar=$('#filterBar');
  if(!filterBar||!grid) return;
  filterBar.addEventListener('click',e=>{
    const btn=e.target.closest('.filter-btn');
    if(!btn) return;
    filterBar.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const cat=btn.dataset.cat;
    grid.querySelectorAll('.menu-card').forEach(card=>{
      card.classList.toggle('hidden',cat!=='todos'&&card.dataset.cat!==cat);
    });
  });
  // sugestoes
  initSugestoes();
}

/* ─── SUGESTÕES ENGINE ─── */
function initSugestoes(){
  sugCart=[];
  renderSugestoes(10);
  const filters=$('#sugFilters');
  if(filters){
    filters.addEventListener('click',e=>{
      const btn=e.target.closest('.sug-filter-btn');
      if(!btn) return;
      filters.querySelectorAll('.sug-filter-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      sugCart=[];
      renderSugestoes(parseFloat(btn.dataset.max));
    });
  }
}

function getCostBadge(p){
  if(p<=5) return {cls:'low',t:'Econômico'};
  if(p<=12) return {cls:'mid',t:'Médio'};
  return {cls:'high',t:'Premium'};
}

function renderSugestoes(max){
  const grid=$('#sugGrid');
  if(!grid) return;
  const items=[...allFood].filter(i=>i.p<=max).sort(()=>Math.random()-0.5).slice(0,8);
  grid.innerHTML=items.map(i=>{
    const b=i.c==='combos'?{cls:'combo',t:'Combo'}:getCostBadge(i.p);
    const inCart=sugCart.includes(i.id);
    return `
    <div class="sug-card reveal">
      <div class="sug-card-img">
        <img src="${i.img}" alt="${i.n}" loading="lazy">
        <span class="sug-card-badge ${b.cls}">${b.t}</span>
      </div>
      <div class="sug-card-body">
        <h3>${i.n}</h3>
        <p>${i.d}</p>
        <div class="sug-card-footer">
          <span class="sug-card-price">${fmt(i.p)}</span>
          <button class="sug-card-add${inCart?' added':''}" data-sug="${i.id}">${inCart?SVG.check:SVG.plus}</button>
        </div>
      </div>
    </div>`;
  }).join('');

  grid.querySelectorAll('.sug-card-add').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const id=parseInt(btn.dataset.sug);
      if(sugCart.includes(id)){
        sugCart=sugCart.filter(x=>x!==id);
        btn.classList.remove('added');
        btn.innerHTML=SVG.plus;
      } else {
        sugCart.push(id);
        btn.classList.add('added');
        btn.innerHTML=SVG.check;
      }
      updateSugSummary();
    });
  });
  initReveals();
  updateSugSummary();
}

function updateSugSummary(){
  const summary=$('#sugSummary');
  if(!summary) return;
  if(sugCart.length===0){
    summary.style.display='none';
    return;
  }
  summary.style.display='flex';
  const items=sugCart.map(id=>allFood.find(i=>i.id===id)).filter(Boolean);
  const total=items.reduce((s,i)=>s+i.p,0);
  const lbl=$('#sugItemsLabel');
  const tot=$('#sugTotalLabel');
  if(lbl) lbl.textContent=`${items.length} ${items.length===1?'item':'itens'}`;
  if(tot) tot.textContent=fmt(total);

  const addBtn=$('#sugAddAll');
  if(addBtn){
    addBtn.onclick=()=>{
      items.forEach(i=>addToCart(i.id));
      sugCart=[];
      const curMax=$('#sugFilters .sug-filter-btn.active');
      renderSugestoes(curMax?parseFloat(curMax.dataset.max):10);
      showToast('Itens adicionados ao carrinho!');
    };
  }
}

/* ─── BIND: PADAMATCH ─── */
function bindPadaMatch(){
  pmLikes=0; pmSkips=0; pmIdx=0;
  pmCards=[...allFood].sort(()=>Math.random()-0.5);
  renderPMCards();

  const likeBtn=$('#pmBtnLike');
  const nopeBtn=$('#pmBtnNope');
  const restart=$('#pmRestart');

  if(likeBtn) likeBtn.onclick=()=>swipeCard('right');
  if(nopeBtn) nopeBtn.onclick=()=>swipeCard('left');
  if(restart) restart.onclick=()=>{
    pmLikes=0; pmSkips=0; pmIdx=0;
    pmCards=[...allFood].sort(()=>Math.random()-0.5);
    renderPMCards();
    $('#pmEmpty').classList.add('hidden');
    $('#pmStack').classList.remove('hidden');
    $('#pmControls').style.display='flex';
    updatePMScore();
  };
}

function renderPMCards(){
  const stack=$('#pmStack');
  if(!stack) return;
  stack.innerHTML='';
  const visible=pmCards.slice(pmIdx,pmIdx+3).reverse();
  visible.forEach((item,i)=>{
    const card=document.createElement('div');
    card.className='pm-card';
    card.innerHTML=`
      <div class="pm-card-stamp like">QUERO!</div>
      <div class="pm-card-stamp nope">PULAR</div>
      <div class="pm-card-img"><img src="${item.img}" alt="${item.n}" draggable="false"></div>
      <div class="pm-card-content">
        <h3>${item.n}</h3>
        <p>${item.d}</p>
        <div class="pm-card-meta">
          <span class="pm-card-price">${fmt(item.p)}</span>
          <span class="pm-card-rating">${SVG.star} ${item.r}</span>
        </div>
      </div>`;
    card.dataset.id=item.id;
    stack.appendChild(card);
    if(i===visible.length-1) attachSwipe(card);
  });
  updatePMCounter();
  updatePMScore();
}

function attachSwipe(card){
  let startX=0, startY=0, curX=0, isDragging=false;
  const onStart=(x,y)=>{ startX=x; startY=y; curX=0; isDragging=true; card.style.transition='none'; };
  const onMove=(x)=>{
    if(!isDragging) return;
    curX=x-startX;
    const rot=curX*0.1;
    card.style.transform=`translateX(${curX}px) rotate(${rot}deg)`;
    const likeStamp=card.querySelector('.pm-card-stamp.like');
    const nopeStamp=card.querySelector('.pm-card-stamp.nope');
    if(likeStamp) likeStamp.classList.toggle('visible',curX>50);
    if(nopeStamp) nopeStamp.classList.toggle('visible',curX<-50);
  };
  const onEnd=()=>{
    if(!isDragging) return;
    isDragging=false;
    card.style.transition='transform 0.4s ease, opacity 0.4s ease';
    if(Math.abs(curX)>100){
      swipeCard(curX>0?'right':'left');
    } else {
      card.style.transform='';
      card.querySelectorAll('.pm-card-stamp').forEach(s=>s.classList.remove('visible'));
    }
  };

  card.addEventListener('mousedown',e=>{e.preventDefault();onStart(e.clientX,e.clientY);});
  document.addEventListener('mousemove',e=>{if(isDragging)onMove(e.clientX);});
  document.addEventListener('mouseup',onEnd);
  card.addEventListener('touchstart',e=>{onStart(e.touches[0].clientX,e.touches[0].clientY);},{passive:true});
  card.addEventListener('touchmove',e=>{onMove(e.touches[0].clientX);},{passive:true});
  card.addEventListener('touchend',onEnd);
}

function swipeCard(dir){
  const stack=$('#pmStack');
  if(!stack) return;
  const topCard=stack.lastElementChild;
  if(!topCard) return;

  topCard.classList.add('animating');
  const stampClass=dir==='right'?'.pm-card-stamp.like':'.pm-card-stamp.nope';
  const stamp=topCard.querySelector(stampClass);
  if(stamp) stamp.classList.add('visible');

  const xOff=dir==='right'?1000:-1000;
  topCard.style.transition='transform 0.5s ease, opacity 0.5s ease';
  topCard.style.transform=`translateX(${xOff}px) rotate(${dir==='right'?30:-30}deg)`;
  topCard.style.opacity='0';

  if(dir==='right'){
    pmLikes++;
    const id=parseInt(topCard.dataset.id);
    addToCart(id);
  } else {
    pmSkips++;
  }

  setTimeout(()=>{
    pmIdx++;
    if(pmIdx>=pmCards.length){
      const empty=$('#pmEmpty');
      const controls=$('#pmControls');
      if(stack) stack.classList.add('hidden');
      if(empty) empty.classList.remove('hidden');
      if(controls) controls.style.display='none';
    } else {
      renderPMCards();
    }
  },400);
}

function updatePMCounter(){
  const el=$('#pmCounter');
  if(el) el.textContent=`${pmIdx+1} / ${pmCards.length}`;
}

function updatePMScore(){
  const l=$('#pmLikeCount');
  const s=$('#pmSkipCount');
  if(l) l.textContent=pmLikes;
  if(s) s.textContent=pmSkips;
}

/* ─── BIND: PEDIDOS ─── */
function bindPedidos(){
  renderCartItems();
  renderCartSummary();
}

/* ─── CART LOGIC ─── */
function addToCart(id){
  const item=allFood.find(i=>i.id===id);
  if(!item) return;
  const existing=cart.find(c=>c.id===id);
  if(existing) existing.qty++;
  else cart.push({id,n:item.n,p:item.p,qty:1});
  saveCart();
  updateCartBadge();
  showToast(`${item.n} adicionado!`);
  if(currentRoute==='/pedidos'){
    renderCartItems();
    renderCartSummary();
  }
}

function removeFromCart(id){
  cart=cart.filter(c=>c.id!==id);
  saveCart();
  updateCartBadge();
  if(currentRoute==='/pedidos'){
    renderCartItems();
    renderCartSummary();
  }
}

function updateQty(id,delta){
  const item=cart.find(c=>c.id===id);
  if(!item) return;
  item.qty+=delta;
  if(item.qty<=0) return removeFromCart(id);
  saveCart();
  updateCartBadge();
  if(currentRoute==='/pedidos'){
    renderCartItems();
    renderCartSummary();
  }
}

function saveCart(){
  localStorage.setItem('pdm_cart',JSON.stringify(cart));
}

function updateCartBadge(){
  const badge=$('.cart-badge');
  const total=cart.reduce((s,c)=>s+c.qty,0);
  if(badge){
    badge.textContent=total;
    badge.classList.toggle('show',total>0);
  }
}

function renderCartItems(){
  const el=$('#cartItems');
  if(!el) return;
  if(cart.length===0){
    el.innerHTML=`<div class="cart-empty">
      <div style="color:var(--gold);opacity:0.4;margin-bottom:16px">${SVG.bag}</div>
      <p>Seu carrinho está vazio</p>
      <span>Adicione itens do cardápio ou PadaMatch</span>
    </div>`;
    return;
  }
  el.innerHTML=cart.map(c=>`
    <div class="cart-item">
      <div class="cart-item-info">
        <h4>${c.n}</h4>
        <span>${fmt(c.p)} cada</span>
      </div>
      <div class="cart-item-qty">
        <button class="qty-btn" data-qty-minus="${c.id}">${SVG.minus}</button>
        <span class="qty-value">${c.qty}</span>
        <button class="qty-btn" data-qty-plus="${c.id}">${SVG.plus}</button>
      </div>
      <span class="cart-item-price">${fmt(c.p*c.qty)}</span>
      <button class="cart-item-remove" data-remove="${c.id}">${SVG.trash}</button>
    </div>`).join('');

  el.querySelectorAll('[data-qty-minus]').forEach(b=>b.onclick=()=>updateQty(parseInt(b.dataset.qtyMinus),-1));
  el.querySelectorAll('[data-qty-plus]').forEach(b=>b.onclick=()=>updateQty(parseInt(b.dataset.qtyPlus),1));
  el.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>removeFromCart(parseInt(b.dataset.remove)));
}

function renderCartSummary(){
  const el=$('#cartSummary');
  if(!el) return;
  const subtotal=cart.reduce((s,c)=>s+c.p*c.qty,0);
  const count=cart.reduce((s,c)=>s+c.qty,0);
  el.innerHTML=`
    <h3>Resumo</h3>
    <div class="summary-line"><span>Itens (${count})</span><span>${fmt(subtotal)}</span></div>
    <div class="summary-line"><span>Retirada</span><span style="color:var(--green)">Grátis</span></div>
    <div class="summary-divider"></div>
    <div class="summary-total"><span>Total</span><span class="total-value">${fmt(subtotal)}</span></div>
    <button class="btn-whatsapp" id="checkoutBtn" ${cart.length===0?'disabled style="opacity:0.5"':''}>${SVG.whatsapp} Finalizar pelo WhatsApp</button>
    <p class="summary-note">O pedido será enviado diretamente ao nosso WhatsApp</p>`;

  const btn=$('#checkoutBtn');
  if(btn && cart.length>0){
    btn.onclick=()=>{
      let msg='*Pedido — Pão de Milho*\n\n';
      cart.forEach(c=>{ msg+=`• ${c.qty}x ${c.n} — ${fmt(c.p*c.qty)}\n`; });
      msg+=`\n*Total: ${fmt(subtotal)}*`;
      window.open(`https://wa.me/${WA_NUM}?text=${encodeURIComponent(msg)}`,'_blank');
    };
  }
}

/* ─── TOAST ─── */
function showToast(msg){
  const t=$('#toast');
  if(!t) return;
  t.querySelector('span').textContent=msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2500);
}

/* ─── REVEALS ─── */
function initReveals(){
  const obs=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  },{threshold:0.08});
  $$('.reveal:not(.visible)').forEach(el=>obs.observe(el));
}

/* ─── COUNTER ANIMATION ─── */
function animateCounters(){
  $$('[data-count]').forEach(el=>{
    const target=parseInt(el.dataset.count);
    const dur=1500;
    const start=performance.now();
    const step=(now)=>{
      const progress=Math.min((now-start)/dur,1);
      const ease=1-Math.pow(1-progress,3);
      const fmtN=target>=1000?`${Math.floor(ease*target/1000)}k+`:Math.floor(ease*target)+'+';
      el.textContent=fmtN;
      if(progress<1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded',()=>{
  // Loader
  const loader=$('#loader');
  setTimeout(()=>{
    if(loader) loader.classList.add('hidden');
  },2200);

  // Cursor glow
  const glow=$('.cursor-glow');
  if(glow && window.matchMedia('(hover:hover)').matches){
    document.addEventListener('mousemove',e=>{
      glow.style.left=e.clientX+'px';
      glow.style.top=e.clientY+'px';
    });
  }

  // Navbar scroll
  const nav=$('.navbar');
  window.addEventListener('scroll',()=>{
    if(nav) nav.classList.toggle('scrolled',window.scrollY>50);
    // WhatsApp float
    const waf=$('.whatsapp-float');
    if(waf) waf.classList.toggle('show',window.scrollY>300);
  },{ passive:true });

  // Navbar links
  $$('.nav-link').forEach(l=>{
    l.addEventListener('click',e=>{
      e.preventDefault();
      navigate(l.dataset.route);
    });
  });

  // Mobile menu
  const hamburger=$('.hamburger');
  const mobileMenu=$('.mobile-menu');
  if(hamburger && mobileMenu){
    hamburger.addEventListener('click',()=>{
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow=mobileMenu.classList.contains('active')?'hidden':'';
    });
    mobileMenu.querySelectorAll('.mobile-link').forEach(l=>{
      l.addEventListener('click',e=>{
        e.preventDefault();
        navigate(l.dataset.route);
      });
    });
  }

  // Cart button in nav
  const navCart=$('.nav-cart');
  if(navCart) navCart.addEventListener('click',()=>navigate('/pedidos'));

  // Initial route
  navigate(location.pathname, false);
});

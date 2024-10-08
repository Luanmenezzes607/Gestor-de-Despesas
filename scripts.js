const btn = document.querySelector('.btn');
const paginaDespesas = document.querySelector('.despesas');
const paginaRenda = document.querySelector('.renda-page2');
const optionsIcons = document.querySelectorAll('.option-icon');
const close = document.querySelector('.close');
const btnAdicionarRenda = document.querySelector('.btn-ad');
const btnAdicionarDespesas = document.querySelector('.btn-ad2');
const ul = document.querySelector('#ul');
const btnHomeRenda = document.querySelector('.homeRenda')
const btnHomeDespesas = document.querySelector('.homeDespesas')

let inputValue = document.querySelector('.input2');
let campoRenda = document.getElementById('renda');
let campoDespesas = document.getElementById('despesas')
let campoSaldo = document.getElementById('saldo')
let renda = [];
let despesas = [];

//Abre a pagina de renda
btn.addEventListener('click', () => {
    document.querySelector('.select').style.display = 'block'
})

//Fecha a página de despesas e abre a de renda
paginaRenda.addEventListener('click', () =>{
    document.querySelector('.select').style.display = 'block';
    document.querySelector('.select-despesas').style.display = 'none';
})

//Fecha a página de renda e abre a pagina de despesas
paginaDespesas.addEventListener('click', () =>{
    document.querySelector('.select').style.display = 'none'
    document.querySelector('.select-despesas').style.display = 'block'
})

//Pega a posição em qual icone foi clicado
optionsIcons.forEach( i  => {
    i.addEventListener('click', clickIcon)
});

function clickIcon(event){
    const iconClicked = event.currentTarget;
    const userIndex = Array.from(optionsIcons).indexOf(iconClicked)

    document.querySelector('.modal').style.display = 'block'
    document.querySelector('.input1').focus()

    if(document.querySelector('.select').style.display === 'block'){
        btnAdicionarRenda.style.display = 'block'
        btnAdicionarDespesas.style.display = 'none'
    }else{
        btnAdicionarRenda.style.display = 'none'
        btnAdicionarDespesas.style.display = 'block'
    }
}

//Fecha o modal contendo os inputs
close.addEventListener('click', () =>{
    document.querySelector('.modal').style.display = 'none';
    document.querySelector('.input1').value = ''
    document.querySelector('.input2').value = ''
})

//Fecha a aba de renda e volta a tela inicial
btnHomeRenda.addEventListener('click', () =>{
    document.querySelector('.select').style.display = 'none';
    document.querySelector('.select-despesas').style.display= 'none';
})

//Fecha a aba de despesas e volta a tela inicial
btnHomeDespesas.addEventListener('click', () =>{
    document.querySelector('.select').style.display = 'none';
    document.querySelector('.select-despesas').style.display= 'none';
})

//Pega os valores das renda contidos nos inputs e adiciona na tela numa li
btnAdicionarRenda.addEventListener('click', () =>{
    const inputDesc = document.querySelector('.input1').value;
    const inputVal = Number(document.querySelector('.input2').value);
    
    if(inputDesc != '' && inputVal != ''){
    renda.push({

        descricao: inputDesc,
        valor: inputVal
    })

    var soma = 0
    for (var i = 0; i < renda.length; i++){
        soma += renda[i]['valor'];
    }

    document.querySelector('.modal').style.display = 'none'
    document.querySelector('.select-despesas').style.display = 'none';
    document.querySelector('.select').style.display = 'none'
    document.querySelector('.input1').value = ''
    document.querySelector('.input2').value = ''
    saldo()

    campoRenda.textContent = `${soma.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
    adicionarLiRenda()
}else{
    alert('Preencha todos os campos!')
}

    localStorage.setItem('adicionarRenda', JSON.stringify(soma))
})

//Pega os valores das despesas contidos nos inputs e adiciona na tela numa li
btnAdicionarDespesas.addEventListener('click', () =>{
    const inputDescricao = document.querySelector('.input1').value;
    const inputValor = Number(document.querySelector('.input2').value);
    if(inputDescricao != '' && inputValor != ''){
    despesas.push({
        descricao: inputDescricao,
        valor: inputValor
    })

    var somas = 0;

    for(var a = 0; a < despesas.length; a++){
        somas += despesas[a]['valor'];
    }
    
    saldo()
    
    document.querySelector('.modal').style.display = 'none'
    document.querySelector('.select-despesas').style.display = 'none';
    document.querySelector('.select').style.display = 'none'
    document.querySelector('.input1').value = ''
    document.querySelector('.input2').value = ''

     campoDespesas.textContent = `${somas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
    adicionarLiDespesas()
}else{
    alert('Preencha todos os campos!')
}
})

//Adiciona uma li contendo a descrição e o valor da renda
function adicionarLiRenda(){
    let novaLinha = ''
    renda.forEach((item, index)=>{
    novaLinha = novaLinha + 
    `
      <li><span class="descricao">${item.descricao}</span><span>${item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span><i class="fa-solid fa-trash" style="color: #e52424;"  onclick="excluirRenda(${index})"></i></li>
    `
    ul.innerHTML = novaLinha
    })

    localStorage.setItem('ulRenda', JSON.stringify(renda))
}

//Adiciona uma li contendo a descrição e o valor da despesa
function adicionarLiDespesas(){
    let novaLinha = ''

    despesas.forEach((item, index)=>{
    novaLinha = novaLinha + 
    `
      <li><span class="descricao">${item.descricao}</span> <span>${item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span><i class="fa-solid fa-trash" style="color: #e52424;" onclick="excluirDespesa(${index})"></i></li>
    `
    ul2.innerHTML = novaLinha
    })

    localStorage.setItem('ulDespesas', JSON.stringify(despesas))
}

//Faz a subtração entre a o valor da renda e das despesas e mostra o valor do saldo, sendo positivo ou negativo
function saldo(){
    var valorRenda = renda.reduce((acc, item) =>{
        return acc + item.valor
    }, 0)

    var valorDespesas = despesas.reduce((acc, item) =>{
        return acc + item.valor
    }, 0)

    var result = valorRenda - valorDespesas

    campoSaldo.textContent = `${result.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
}

//Exclui as li de renda inseridas dentro do campo ul
function excluirRenda(index){
    renda.splice(index, 1)

    var somaRenda = 0
    for (var i = 0; i < renda.length; i++){
        somaRenda += renda[i]['valor'];
    }

    if(index == 0){
        ul.textContent = ''
    }
    
     campoRenda.textContent = `${somaRenda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
    adicionarLiRenda()
    saldo()

    localStorage.setItem('somaRendaLocalStorage', JSON.stringify(somaRenda))
}

//Exclui as li de despesas inseridas dentro do campo ul
function excluirDespesa(index){
    despesas.splice(index, 1)

    var somaDespesas = 0
    for (var i = 0; i < despesas.length; i++){
        somaDespesas += despesas[i]['valor'];
    }

    if(index == 0){
        ul2.textContent = ''
    }
    campoDespesas.textContent = `${somaDespesas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
    adicionarLiDespesas()
    saldo()
}

//Ao recarregar a página será exibido os dados guardados no localStorage

function recarregar(){

    const listaRenda = localStorage.getItem('ulRenda')
    if(listaRenda){
        renda = JSON.parse(listaRenda)
        adicionarLiRenda()
    }

    const listaDespesas = localStorage.getItem('ulDespesas')
    if(listaDespesas){
        despesas = JSON.parse(listaDespesas)
        adicionarLiDespesas()
    }

    const somaContent = localStorage.getItem('adicionarRenda')
    if(somaContent){
        soma = JSON.parse(somaContent)
        campoRenda.textContent = `R$= ${soma.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
    }

    const rendaContent = localStorage.getItem('somaRendaLocalStorage')
    if(rendaContent){
        somaRenda = JSON.parse(rendaContent)
        campoRenda.textContent = `R$= ${somaRenda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
    }
    
    var soma = 0
    for (var i = 0; i < renda.length; i++){
        soma += renda[i]['valor'];
    }

    var somas = 0
    for (var i = 0; i < despesas.length; i++){
        somas += despesas[i]['valor'];
    }

    campoRenda.textContent = `${soma.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
    campoDespesas.textContent = `${somas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
   
    saldo()
}

recarregar()

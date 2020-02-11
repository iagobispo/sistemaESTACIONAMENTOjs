(function() {
    const $ = q => document.querySelector(q);

    function convertPeriod(mil){
        const hor = Math.floor(mil / 3600000) % 24;//horas    = ms / 3600000;  // 3600000 = 60 * 60 * 1000
        const min = Math.floor(mil / 60000) % 60;//minutos  = ( ms / 60000 ) % 60;     // 60000   = 60 * 1000
        const sec = Math.floor((mil % 60000) / 1000);//segundos = ( ms / 1000 ) % 60;

        var valor = 0
        if (hor >= 24 ){
            valor = 25;
            hor-24 * 2;
                }else if (hor <= 1) {
                valor = 5
        }else{
                
            
            valor = 5;
           const calc = hor * 2 ;
           valor = valor + calc - 2;
        };
        return `${hor}h ${min}m e ${sec}s    O VALOR A SER PAGO É R$ ${valor}`;
    }

    function renderGaragem (){
        const garagem = getGaragem();
        $("#garagem").innerHTML="";

        garagem.forEach(c=> addcartogaragem(c))
    }

    function addcartogaragem(car){
        const row = document.createElement ("tr");

        row.innerHTML =  `
        <td>${car.name}</td> 
        <td>${car.licence}</td>
        <td data-time="${car.time}">${new Date(car.time)
                .toLocaleString("pt-BR", {
                    hour:"numeric", minute: "numeric"
                })}</td>
        <td>
            <button class="delete">x</buton>
        </td>
        `;

        $("#garagem").appendChild(row);
    };

    function checkOut(info){
        let period = new Date() - new Date (info[2].dataset.time);
        period = convertPeriod(period);

        const licence = info[1].textContent;
        const msg = `o veículo ${info[0].textContent} de placa ${licence} permaneceu estacionado por ${period}
        deseja encerrar?`;

        if(!confirm(msg)) return;

        const garagem = getGaragem().filter(c => c.licence !== licence);
        localStorage.garagem = JSON.stringify(garagem);
        renderGaragem();

    }
         
    const getGaragem = () =>garagem = localStorage.garagem ? JSON.parse (localStorage.garagem):[];

    
    
    renderGaragem();
    $("#send").addEventListener("click", e =>{
        const name = $("#name").value
        const licence = $("#licence").value;

        if (!name || !licence){
            alert("os campos são obrigatorio");
            return;
        }

        const car = { name, licence, time: new Date() }
    
        const garagem = getGaragem();
        garagem.push(car);

        localStorage.garagem = JSON.stringify(garagem);
        console.log(garagem);

        addcartogaragem(car);

        $("#name").value = "";
        $("#licence").value = "";
    });

    $("#garagem").addEventListener("click",e => {
        if(e.target.className == "delete")
            checkOut(e.target.parentElement.parentElement.cells);
    })

    
})();

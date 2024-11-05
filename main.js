document.addEventListener('DOMContentLoaded', function(){

    const API = 'https://covid-19-statistics.p.rapidapi.com/reports/total?date=';

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '14c718937fmsha1c1c661bc7e8b7p15b5d8jsnc8142e2b7dcd',
            'X-RapidAPI-Host': 'covid-19-statistics.p.rapidapi.com'
        }
    };

    const yearNow = new Date().getFullYear();

    async function fetchData(urlApi){
        const response = await fetch(urlApi, options);
        const data = response.json();
        return data;
    }

    async function showData(urlApi){
        const datos = await fetchData(urlApi);
        const datos2 = datos.data;
        console.log(datos2);

        //Insertar datos al HTML
        document.querySelector('#datos').innerHTML = `
        <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
            <div class="fw-bold">Fecha:</div>
                ${datos2.date}
            </div>
            <img src="./img/calendar.png" width="5%" class="text-right">
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
            <div class="fw-bold">Casos confirmados:</div>
                ${datos2.confirmed}
            </div>
            <img src="./img/casos.png" width="7%" class="text-right">
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
            <div class="fw-bold">Muertes:</div>
                ${datos2.deaths}
            </div>
            <img src="./img/muertes.png" width="7%" class="text-right">
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <div class="ms-2 me-auto">
            <div class="fw-bold">Recuperados:</div>
                ${datos2.recovered}
            </div>
            <img src="./img/recuperados.png" width="9%" class="text-right">
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
            <div class="fw-bold">Casos Activos:</div>
                ${datos2.active}
            </div>
            <img src="./img/activos.png" width="7%" class="text-right">
        </li>
        `;

    }

    const button = document.querySelector('#button');
    let errores = [];
    const parentErrors = document.querySelector('.errores');

    button.addEventListener('click', function(e){
        e.preventDefault();
        limpiarHTML();

        while(parentErrors.firstChild){
            errores = [];
            parentErrors.removeChild(parentErrors.firstChild);
        }

        let year = document.querySelector('#year').value;
        let month = document.querySelector('#month').value;
        let day = document.querySelector('#day').value;

        let contenedorErrores = document.querySelector('.errores');

        if(year < '2020'){
            errores.push('El año ingresado no existia el COVID-19');
        }
        if(year > yearNow){
            errores.push('El año ingresado es mayor al actual');
        }
        if(month == ''){
            errores.push('El campo del mes no puede ir vacio');
        }
        if(month > '12'){
            errores.push('El mes ingresado no existe.');
        }
        if(day == ''){
            errores.push('El campo del día no puede ir vacio');
        }
        if(day > '31'){
            errores.push('El día ingresado es mayor a 31');
        }

        errores.forEach(error => {
            console.log(error);
            let div = document.createElement('p');
            div.classList.add('alert', 'alert-danger', 'text-center');
            div.textContent = error;
            contenedorErrores.append(div);
            setTimeout(() => {
                errores = [];
                div.remove();
            }, 3000);
        })

        if(errores.length == 0){
            let spinner = document.querySelector('.spinnerJ');
            spinner.classList.remove('hideData');
            setTimeout(() => {
                spinner.classList.add('hideData');
                document.querySelector('#datos').classList.add('showData');
                if(month.length == 1 && day.length == 2){
                    console.log(`${year}-0${month}-${day}`);
                    showData(`${API}${year}-0${month}-${day}`);
                }
                if(day.length == 1 && month.length == 2){
                    console.log(`${year}-${month}-0${day}`);
                    showData(`${API}${year}-${month}-0${day}`)
                }
                if(day.length == 1 && month.length == 1){
                    console.log(`${year}-0${month}-0${day}`);
                    showData(`${API}${year}-0${month}-0${day}`)
                }
                if(day.length == 2 && month.length == 2){
                    console.log(`${year}-${month}-${day}`);
                    showData(`${API}${year}-${month}-${day}`)
                }
            }, 2500);
        }

        
    });

    function limpiarHTML(){
        const datos = document.querySelector('#datos');
        while(datos.firstChild){
            errores = [];
            datos.removeChild(datos.firstChild);
        }
    }

});
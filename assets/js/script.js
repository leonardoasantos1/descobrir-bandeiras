const paisInput = document.getElementById('pais');
const bandeiraImg = document.getElementById('bandeira');
const codigoEncontrado = 200;
const codigoNaoEncontrado = 404; 
const apiURL = 'https://restcountries.com/v3.1/name/';
const outroPais = document.getElementById('outroPais');
const falha = document.getElementById('erro');

        async function buscarPais() {
            if(!paisInput.value) {
                falha.textContent = "Por favor, insira o nome de um país.";
                paisInput.focus();
            } else {
                try {
                    let resposta = await fetch(`${apiURL}${paisInput.value}`);
                    if(resposta.status == codigoNaoEncontrado) {
                        throw new Error('O país digitado não foi encontrado');
                    }
                    if(resposta.status != codigoEncontrado) {
                        throw new Error('Houve um erro no processamento');
                    }
                    let info = await resposta.json();
                    const paisDados = info[0];
                    bandeiraImg.src = paisDados.flags.png;
                    bandeiraImg.style.display = 'block';
                    outroPais.style.display = 'block';
                } catch (error) {
                    alert(error.message);
                }
                falha.textContent='';
            }
        }

        function esconderBandeira() {
            bandeiraImg.style.display = 'none';
            outroPais.style.display = 'none';
            paisInput.value = '';
            paisInput.focus();
            falha.textContent= '';
        }
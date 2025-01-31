async function downloadPage() {
    const urlInput = document.getElementById('urlInput');
    const statusDiv = document.getElementById('status');
    const url = urlInput.value.trim();

    if (!url) {
        statusDiv.innerHTML = 'Por favor, insira uma URL válida.';
        return;
    }

    try {
        statusDiv.innerHTML = 'Baixando a página...';

        // Fazer a requisição para a URL com modo no-cors
        const response = await fetch(url, {
            mode: 'no-cors',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        });

        // Como estamos usando no-cors, não podemos acessar o conteúdo diretamente
        // Vamos informar o usuário sobre a limitação
        statusDiv.innerHTML = `
            Devido a restrições de segurança do navegador (CORS), 
            não é possível baixar diretamente o conteúdo desta página. 
            <br><br>
            Sugestões:
            <br>
            1. Use uma extensão do navegador para baixar páginas
            <br>
            2. Utilize o botão direito do mouse -> "Salvar como..." na página desejada
            <br>
            3. Para uma solução completa, seria necessário criar um servidor backend
        `;

    } catch (error) {
        statusDiv.innerHTML = `Erro ao baixar a página: ${error.message}`;
    }
} 
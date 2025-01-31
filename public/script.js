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

        // Fazer a requisição para nosso servidor backend
        const response = await fetch('http://localhost:3000/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        });

        const data = await response.json();

        if (response.ok) {
            // Criar um blob com o conteúdo HTML
            const blob = new Blob([data.html], { type: 'text/html' });
            
            // Criar um link para download
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(blob);
            
            // Extrair o nome do arquivo da URL
            const fileName = new URL(data.originalUrl).pathname.split('/').pop() || 'pagina';
            downloadLink.download = fileName + '.html';
            
            // Simular o clique no link
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

            statusDiv.innerHTML = 'Download concluído com sucesso!';
        } else {
            throw new Error(data.error || 'Erro ao baixar a página');
        }
    } catch (error) {
        statusDiv.innerHTML = `Erro ao baixar a página: ${error.message}`;
    }
} 
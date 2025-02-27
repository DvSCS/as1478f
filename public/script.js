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

        // Detectar a URL do servidor automaticamente
        const serverUrl = window.location.origin;
        
        const response = await fetch(`${serverUrl}/download`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        });

        const data = await response.json();

        if (response.ok) {
            // Criar um blob com o conteúdo HTML
            const blob = new Blob([data.html], { type: 'text/html;charset=utf-8' });
            
            // Criar um link para download
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(blob);
            
            // Extrair o nome do arquivo da URL
            let fileName;
            try {
                fileName = new URL(data.originalUrl).pathname.split('/').pop() || 'pagina';
            } catch {
                fileName = 'pagina';
            }
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
        console.error('Erro:', error);
        statusDiv.innerHTML = `Erro ao baixar a página: ${error.message}`;
    }
} 
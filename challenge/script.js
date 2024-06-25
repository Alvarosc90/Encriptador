document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const responseDiv = document.querySelector('.response');
    const mensaje1 = document.getElementById('mensaje1');
    const mensaje2 = document.getElementById('mensaje2');
    const copyButton = document.getElementById('copyButton');
    const encryptButton = document.getElementById('encryptButton');
    const decryptButton = document.getElementById('decryptButton');
    const imagen = document.querySelector('.response img');

    const encryptionKeys = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };

    const decryptionKeys = {
        'enter': 'e',
        'imes': 'i',
        'ai': 'a',
        'ober': 'o',
        'ufat': 'u'
    };

    function encrypt(text) {
        return text.split('').map(char => encryptionKeys[char] || char).join('');
    }

    function decrypt(text) {
        let decryptedText = text;
        for (let key in decryptionKeys) {
            const regex = new RegExp(key, 'g');
            decryptedText = decryptedText.replace(regex, decryptionKeys[key]);
        }
        return decryptedText;
    }

    function showResult(processedText) {
        if (!processedText) {
            mensaje1.style.display = 'block'; // Mostrar el mensaje inicial si no hay texto procesado
            mensaje2.textContent = '';
            imagen.style.display = 'block';
            responseDiv.style.justifyContent = 'center';
            copyButton.style.display = 'none';
        } else {
            mensaje1.style.display = 'none';
            mensaje2.textContent = processedText;
            imagen.style.display = 'none';
            responseDiv.style.justifyContent = 'center';
            copyButton.style.display = 'block';
        }
    }

    function disableButtons(text) {
        const hasUpperCaseOrAccent = /[A-ZÁÉÍÓÚ]/.test(text);
        encryptButton.disabled = hasUpperCaseOrAccent;
        decryptButton.disabled = hasUpperCaseOrAccent;
        if (hasUpperCaseOrAccent) {
            alert('Solo se admiten letras minúsculas y sin acento.');
        }
    }

    encryptButton.addEventListener('click', () => {
        const text = inputText.value.toLowerCase();
        if (/[A-ZÁÉÍÓÚ]/.test(text)) {
            alert('Solo se admiten letras minúsculas y sin acento.');
            return;
        }
        const encryptedText = encrypt(text);
        showResult(encryptedText);
    });

    decryptButton.addEventListener('click', () => {
        const text = inputText.value.toLowerCase();
        if (/[A-ZÁÉÍÓÚ]/.test(text)) {
            alert('Solo se admiten letras minúsculas y sin acento.');
            return;
        }
        const decryptedText = decrypt(text);
        showResult(decryptedText);
    });

    copyButton.addEventListener('click', () => {
        const textToCopy = mensaje2.textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('Texto copiado al portapapeles');
        }).catch(err => {
            console.error('Error al copiar el texto: ', err);
        });
    });

    inputText.addEventListener('input', () => {
        const text = inputText.value;
        disableButtons(text);
        if (text.trim() === '') {
            showResult('');
        }
    });

    // Llamada inicial para deshabilitar los botones si hay texto inicial con mayúsculas o acentos
    disableButtons(inputText.value.toLowerCase());
    copyButton.style.display = 'none';

});

   

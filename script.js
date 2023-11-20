// Função para registrar um novo barbeiro
function registerBarber() {
    const barberName = document.getElementById('barberName').value;
    const barberEmail = document.getElementById('barberEmail').value;
    const barberPhone = document.getElementById('barberPhone').value;
    const barberUsername = document.getElementById('barberUsername').value;
    const barberPassword = document.getElementById('barberPassword').value;

    // Verifica se todos os campos estão preenchidos
    if (!barberName || !barberEmail || !barberPhone || !barberUsername || !barberPassword) {
        alert('Todos os campos devem ser preenchidos.');
        return;
    }

    // Objeto representando um barbeiro
    const newBarber = {
        name: barberName,
        email: barberEmail,
        phone: barberPhone,
        username: barberUsername,
        password: barberPassword
    };

    // Verifica se já há dados no armazenamento local
    const existingBarbers = JSON.parse(localStorage.getItem('barbers')) || [];

    // Verifica se o nome de usuário já existe
    if (existingBarbers.some(barber => barber.username === barberUsername)) {
        alert('Nome de usuário já existe. Escolha outro.');
        return;
    }

    // Adiciona o novo barbeiro à lista
    existingBarbers.push(newBarber);

    // Atualiza o armazenamento local com a lista atualizada
    localStorage.setItem('barbers', JSON.stringify(existingBarbers));

    // Atualiza a lista de barbeiros exibida
    updateBarberList(existingBarbers);

    // Limpa os campos do formulário
    document.getElementById('barberName').value = '';
    document.getElementById('barberEmail').value = '';
    document.getElementById('barberPhone').value = '';
    document.getElementById('barberUsername').value = '';
    document.getElementById('barberPassword').value = '';

    // ...

// Exibe uma mensagem de sucesso na tela
const successMessage = document.createElement('div');
successMessage.textContent = 'Cadastro bem-sucedido! Faça o login para continuar.';
successMessage.style.color = 'green'; // Cor verde para indicar sucesso

// Adiciona a mensagem à página
document.body.appendChild(successMessage);

// Redireciona para a tela de login após 2 segundos
setTimeout(() => {
    window.location.href = 'login.html';
}, 2000);

}

// Função para atualizar a lista de barbeiros exibida
function updateBarberList(barbers) {
    const barberListContainer = document.getElementById('barberList');

    // Verifica se o elemento existe
    if (barberListContainer) {
        barberListContainer.innerHTML = '';

        barbers.forEach(barber => {
            const listItem = document.createElement('li');
            listItem.textContent = `Nome: ${barber.name}, Usuário: ${barber.username}`;
            barberListContainer.appendChild(listItem);
        });
    } else {
        console.error('Elemento com id "barberList" não encontrado.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateBarberInfo();
});

function updateBarberInfo() {
    const barberInfoContainer = document.getElementById('barberInfo');

    if (barberInfoContainer) {
        if (isWithinTrialPeriod()) {
            barberInfoContainer.textContent = 'Você está nos 15 dias grátis.';
        } else if (isOnPaidPlan()) {
            barberInfoContainer.textContent = 'Você está no plano pago.';
        } else {
            barberInfoContainer.textContent = 'Você precisa processar o pagamento.';
            // Chame a função de processamento de pagamento quando necessário
            // processPayment();
        }
    }
}

// Função para verificar se o barbeiro está no período de 15 dias grátis
function isWithinTrialPeriod() {
    const firstLoginDate = localStorage.getItem('firstLoginDate');

    if (firstLoginDate) {
        const trialEndDate = new Date(firstLoginDate);
        trialEndDate.setDate(trialEndDate.getDate() + 15);

        const currentDate = new Date();
        return currentDate <= trialEndDate;
    }

    return false;
}

// Função para verificar se o barbeiro está no plano pago
function isOnPaidPlan() {
    const paymentDate = localStorage.getItem('paymentDate');

    if (paymentDate) {
        const lastPaymentDate = new Date(paymentDate);
        const currentDate = new Date();

        // Você pode ajustar a lógica de verificação conforme necessário
        return currentDate.getMonth() === lastPaymentDate.getMonth() && currentDate.getFullYear() === lastPaymentDate.getFullYear();
    }

    return false;
}

// Função para processar o pagamento
function processPayment() {
    // Lógica de processamento do pagamento
    // Atualize a data de pagamento no armazenamento local após o processamento bem-sucedido

    const currentDate = new Date();
    localStorage.setItem('paymentDate', currentDate.toISOString());
}

// Exemplo de uso
if (isWithinTrialPeriod()) {
    console.log('Barbeiro está no período de 15 dias grátis.');
} else if (isOnPaidPlan()) {
    console.log('Barbeiro está no plano pago.');
} else {
    console.log('Barbeiro precisa processar o pagamento.');
    // Chame a função de processamento de pagamento quando necessário
    // processPayment();
}


// Função para realizar o login
function login() {
    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;

    // Obtém a lista de barbeiros do armazenamento local
    const existingBarbers = JSON.parse(localStorage.getItem('barbers')) || [];

    // Verifica se existe um barbeiro com o nome de usuário fornecido
    const loggedInBarber = existingBarbers.find(barber => barber.username === loginUsername);

    // Verifica se a senha fornecida está correta
    if (loggedInBarber && loggedInBarber.password === loginPassword) {
        alert('Login bem-sucedido!');
        
        // Redireciona para a página "plano.html"
        window.location.href = 'plano.html';
    } else {
        alert('Login falhou. Verifique seu usuário e senha.');
    }
}

// Carrega os barbeiros existentes ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const existingBarbers = JSON.parse(localStorage.getItem('barbers')) || [];
    updateBarberList(existingBarbers);
});

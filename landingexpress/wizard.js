const wizardData = {
    objetivo: '',
    estado_web: '',
    rubro: '',
    nombre: '',
    empresa: '',
    web: '',
    email: '',
    telefono: ''
};

const wizardSteps = {
    start: {
        message: "Hola 👋<br>Te haré 3 preguntas rápidas para entender tu negocio y darte una recomendación clara en menos de 1 minuto.",
        type: "options",
        options: [
            { label: "Empezar", next: "q1", value: "" }
        ],
        field: "none"
    },
    q1: {
        message: "¿Qué te gustaría hacer con esta landing?",
        type: "options",
        options: [
            { label: "Vender un producto o servicio", next: "q2", value: "Vender un producto o servicio" },
            { label: "Conseguir clientes o contactos", next: "q2", value: "Conseguir clientes o contactos" },
            { label: "Promocionar una campaña o idea", next: "q2", value: "Promocionar una campaña o idea" }
        ],
        field: "objetivo"
    },
    q2: {
        message: "¿Ya tienes una página web?",
        type: "options",
        options: [
            { label: "Sí, ya tengo web", next: "q3", value: "Sí, ya tengo web" },
            { label: "No tengo web", next: "q3", value: "No tengo web" },
            { label: "Solo uso redes sociales (Instagram / Facebook)", next: "q3", value: "Solo uso redes sociales (Instagram / Facebook)" }
        ],
        field: "estado_web"
    },
    q3: {
        message: "¿En qué rubro trabajas?",
        type: "options",
        options: [
            { label: "Turismo", next: "q4", value: "Turismo" },
            { label: "Servicios", next: "q4", value: "Servicios" },
            { label: "Salud", next: "q4", value: "Salud" },
            { label: "Educación", next: "q4", value: "Educación" },
            { label: "Comercio", next: "q4", value: "Comercio" },
            { label: "Otro", next: "q4", value: "Otro" }
        ],
        field: "rubro"
    },
    q4: {
        message: "Perfecto 👍<br>Ahora necesito algunos datos para enviarte una propuesta personalizada.<br><br>¿Cómo te llamas (nombre completo)?",
        type: "text",
        placeholder: "Tu nombre completo...",
        next: "q5",
        field: "nombre"
    },
    q5: {
        message: "¿Cuál es el nombre de tu empresa o proyecto?",
        type: "text",
        placeholder: "Empresa o proyecto...",
        next: "q6",
        field: "empresa"
    },
    q6: {
        message: "¿Cuál es tu página web? (Si no tienes, deja en blanco)",
        type: "text",
        placeholder: "www.tuweb.com o en blanco...",
        next: "q7",
        field: "web"
    },
    q7: {
        message: "¿Cuál es tu correo electrónico?",
        type: "email",
        placeholder: "correo@ejemplo.com",
        next: "q8",
        field: "email"
    },
    q8: {
        message: "¿Cuál es tu número de teléfono / WhatsApp?",
        type: "tel",
        placeholder: "+56 9 1234 5678",
        next: "result",
        field: "telefono"
    }
};

const IGAPP_WHATSAPP_NUMBER = "56956597550";

let currentStepId = 'start';

function renderWizardStep(stepId) {
    const container = document.getElementById('wizard-content');
    if (!container) return;
    
    container.style.opacity = 0;
    
    setTimeout(() => {
        if (stepId === 'result') {
            renderResult(container);
            container.style.opacity = 1;
            return;
        }

        const step = wizardSteps[stepId];
        let html = `<div class="wizard-message">${step.message}</div>`;
        
        if (step.type === 'options') {
            html += `<div class="wizard-options">`;
            step.options.forEach((opt, index) => {
                // Determine if it's the start button to style it differently
                const btnClass = stepId === 'start' ? 'btn btn-primary btn-block btn-large' : 'wizard-btn-option';
                html += `<button class="${btnClass}" onclick="handleWizardOption('${stepId}', ${index})">${opt.label}</button>`;
            });
            html += `</div>`;
        } else if (step.type === 'text' || step.type === 'email' || step.type === 'tel') {
            html += `
                <div class="wizard-input-group">
                    <input type="${step.type}" id="wizard-input-${stepId}" class="wizard-input" placeholder="${step.placeholder}" onkeypress="handleWizardEnter(event, '${stepId}')">
                    <button class="wizard-btn-next" onclick="handleWizardInput('${stepId}')">→</button>
                </div>
                <p id="wizard-error-${stepId}" class="wizard-error"></p>
            `;
        }

        container.innerHTML = html;
        container.style.opacity = 1;

        const input = document.getElementById(`wizard-input-${stepId}`);
        if (input) input.focus();

    }, 300);
}

window.handleWizardOption = function(stepId, optionIndex) {
    const step = wizardSteps[stepId];
    if (step.field !== "none") {
        wizardData[step.field] = step.options[optionIndex].value;
    }
    currentStepId = step.options[optionIndex].next;
    renderWizardStep(currentStepId);
};

window.handleWizardInput = function(stepId) {
    const step = wizardSteps[stepId];
    const input = document.getElementById(`wizard-input-${stepId}`);
    const errorMsg = document.getElementById(`wizard-error-${stepId}`);
    
    if (step.field !== 'web' && !input.value.trim()) {
        errorMsg.textContent = "Por favor, completa este campo.";
        return;
    }
    
    if (step.type === 'email' && input.value.trim() && !input.value.includes('@')) {
        errorMsg.textContent = "Por favor, ingresa un correo válido.";
        return;
    }
    
    wizardData[step.field] = input.value.trim() || 'No tiene';
    currentStepId = step.next;
    renderWizardStep(currentStepId);
};

window.handleWizardEnter = function(e, stepId) {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleWizardInput(stepId);
    }
};

function renderResult(container) {
    const wave  = '\uD83D\uDC4B'; // 👋
    const thumb = '\uD83D\uDC4D'; // 👍
    const message = `Hola ${wave}\n\nVengo desde IGAPP / Influencer Group.\n\nAcabo de completar el formulario de Landing Express.\n\nEstos son mis datos:\nNombre: ${wizardData.nombre}\nEmpresa: ${wizardData.empresa}\nWeb: ${wizardData.web}\nRubro: ${wizardData.rubro}\nObjetivo: ${wizardData.objetivo}\nEstado web: ${wizardData.estado_web}\n\nQuedo atento/a ${thumb}`;
    
    const waLink = `https://wa.me/${IGAPP_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    container.innerHTML = `
        <div class="wizard-result">
            <div class="wizard-message">
                <p style="margin-bottom: 1rem; color: #10b981; font-weight: 600;">Listo 👌 esto es lo que entendimos de tu caso:</p>
                <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 1.5rem; font-size: 0.95rem;">
                    <strong>Nombre:</strong> ${wizardData.nombre}<br>
                    <strong>Empresa:</strong> ${wizardData.empresa}<br>
                    <strong>Web:</strong> ${wizardData.web}<br>
                    <strong>Rubro:</strong> ${wizardData.rubro}<br>
                    <strong>Objetivo:</strong> ${wizardData.objetivo}<br>
                    <strong>Estado web:</strong> ${wizardData.estado_web}
                </div>
                <p style="font-size: 0.95rem;">Con esta información ya podemos evaluar tu caso y proponerte una Landing Express adaptada a tu objetivo.</p>
                <p style="font-size: 0.95rem;">Te contactaremos en menos de 72 horas hábiles con una propuesta lista o recomendaciones concretas.</p>
            </div>
            
            <a href="${waLink}" target="_blank" class="btn btn-primary btn-block btn-large" style="font-size: 1.1rem; font-weight: 700; background: #25D366; color: #fff; border-color: #25D366;">Enviar a WhatsApp</a>
            <div class="text-center">
                <button onclick="resetWizard()" style="background:none; border:none; color: var(--text-muted); text-decoration: underline; margin-top: 1rem; cursor:pointer;">Editar mis respuestas</button>
            </div>
        </div>
    `;
}

window.resetWizard = function() {
    Object.keys(wizardData).forEach(k => wizardData[k] = '');
    currentStepId = 'start';
    renderWizardStep('start');
};

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('wizard-content')) {
        renderWizardStep('start');
    }
});

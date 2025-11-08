/**
 * Mascara um email exibindo apenas os primeiros 2 caracteres e os últimos 2 caracteres antes do @
 * Exemplo: lucassantos@gmail.com -> lu*******os@gmail.com
 */
export function maskEmail(email: string): string {
    if (!email || !email.includes('@')) {
        return email;
    }

    const [localPart, domain] = email.split('@');

    if (localPart.length <= 4) {
        // Se a parte local tiver 4 ou menos caracteres, mascara tudo exceto o primeiro
        return `${localPart[0]}${'*'.repeat(localPart.length - 1)}@${domain}`;
    }

    // Pega os primeiros 2 e últimos 2 caracteres
    const firstTwo = localPart.substring(0, 2);
    const lastTwo = localPart.substring(localPart.length - 2);
    const maskedLength = localPart.length - 4;

    return `${firstTwo}${'*'.repeat(maskedLength)}${lastTwo}@${domain}`;
}

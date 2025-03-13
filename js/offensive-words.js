// Categorías de palabras y patrones ofensivos

// Groserías y términos ofensivos en español
const SPANISH_PROFANITY = [
    'idiota', 'estupido', 'imbecil', 'mierda', 'puta', 'puto', 'pendejo',
    'cabron', 'joder', 'coño', 'gilipollas', 'maricon', 'zorra', 'perra',
    'cabrón', 'hijueputa', 'malparido', 'gonorrea', 'huevón', 'maricón',
    'chinga', 'verga', 'carajo', 'pinche', 'culero', 'pendeja'
];

// Groserías y términos ofensivos en inglés
const ENGLISH_PROFANITY = [
    'fuck', 'shit', 'bitch', 'ass', 'dick', 'cunt', 'whore',
    'bastard', 'asshole', 'motherfucker', 'pussy', 'cock', 'slut',
    'wanker', 'twat', 'bollocks', 'dickhead', 'prick', 'fag',
    'douchebag', 'jackass', 'dipshit', 'dumbass'
];

// Discurso de odio y términos discriminatorios
const HATE_SPEECH = [
    'negro', 'sudaca', 'marica', 'tortillera', 'retrasado', 'mongolo',
    'indio', 'gitano', 'moro', 'sudamericano', 'inmigrante', 'gabacho',
    'gringo', 'pollo', 'machupichu', 'faggot', 'nigger', 'spic', 'kike',
    'chink', 'wetback', 'beaner', 'gypsy', 'retard'
];

// Patrones de spam y contenido malicioso
const SPAM_PATTERNS = [
    /\b\d{16}\b/, // Números de tarjeta de crédito
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/, // Direcciones de correo
    /https?:\/\/[^\s]+/, // URLs
    /(\W)\1{4,}/, // Caracteres especiales excesivos
    /\b(.+?)\1{2,}\b/i, // Palabras o frases repetidas
    /\b(?:viagra|cialis|porn|xxx|sexy|casino|lottery|bet|gambling|\$\$\$)\b/i // Términos de spam comunes
];

// Términos sexualmente explícitos
const SEXUAL_CONTENT = [
    'porn', 'xxx', 'sexy', 'viagra', 'cialis', 'masturbación',
    'orgasmo', 'prostituta', 'prostíbulo', 'semen', 'vagina',
    'pene', 'tetas', 'culo', 'orgia', 'anal', 'sexual'
];

// Exportar todas las categorías
export const OFFENSIVE_WORDS = [
    ...SPANISH_PROFANITY,
    ...ENGLISH_PROFANITY,
    ...HATE_SPEECH,
    ...SEXUAL_CONTENT
];

export const ALL_SPAM_PATTERNS = SPAM_PATTERNS;
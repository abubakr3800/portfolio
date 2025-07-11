// SMTP Configuration
const SMTP_CONFIG = {
    // Replace with your SMTP token from https://smtpjs.com/
    // You can get a free token by signing up at SMTP.js
    SECURE_TOKEN: "xyythyiuutcygkmk",
    
    // Email settings
    TO_EMAIL: "ahmed.mo.abubakr@gmail.com",
    FROM_EMAIL: "ahmedabubakr148@gmail.com", // Optional: can be overridden by form
    
    // Email template
    SUBJECT_PREFIX: "Portfolio Contact: ",
    
    // Success/Error messages
    SUCCESS_MESSAGE: "Message sent successfully! I'll get back to you soon.",
    ERROR_MESSAGE: "Failed to send message. Please try again or contact me directly."
};

// Export for use in portfolio.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SMTP_CONFIG;
}
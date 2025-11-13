/**
 * Internationalization (i18n) Module
 * Supports English and Simplified Chinese
 * Auto-detects browser language and allows manual switching with localStorage persistence
 */

const i18n = {
    // Supported languages
    supportedLanguages: ['en', 'zh'],
    defaultLanguage: 'en',
    currentLanguage: 'en',

    // Translation dictionary
    translations: {
        en: {
            // Page title and description
            pageTitle: 'Timer',
            pageDescription: 'Easy-to-use timer',

            // Button labels
            startButton: 'START',
            stopButton: 'STOP',
            resetButton: 'RESET',
            setButton: 'SET',

            // Input labels
            hoursLabel: 'Hours:',
            minutesLabel: 'Minutes:',
            secondsLabel: 'Seconds:',

            // Input units
            hoursUnit: 'H',
            minutesUnit: 'M',
            secondsUnit: 'S',

            // ARIA labels
            startStopAriaLabel: 'Start or stop the timer',
            resetAriaLabel: 'Reset the timer to initial state',
            setAriaLabel: 'Set timer with the input values',
            hoursAriaLabel: 'Hours input field',
            minutesAriaLabel: 'Minutes input field',
            secondsAriaLabel: 'Seconds input field',
            timerDisplayAriaLabel: 'Timer display',

            // Footer
            copyright: '© Crue Chan',
            reportIssues: 'Report Issues',

            // UI Controls
            languageToggle: 'EN',
            languageName: 'English'
        },
        zh: {
            // Page title and description
            pageTitle: '计时器',
            pageDescription: '简单易用的计时器',

            // Button labels
            startButton: '开始',
            stopButton: '停止',
            resetButton: '重置',
            setButton: '设置',

            // Input labels
            hoursLabel: '小时:',
            minutesLabel: '分钟:',
            secondsLabel: '秒:',

            // Input units
            hoursUnit: '时',
            minutesUnit: '分',
            secondsUnit: '秒',

            // ARIA labels
            startStopAriaLabel: '启动或停止计时器',
            resetAriaLabel: '将计时器重置为初始状态',
            setAriaLabel: '使用输入值设置计时器',
            hoursAriaLabel: '小时输入框',
            minutesAriaLabel: '分钟输入框',
            secondsAriaLabel: '秒输入框',
            timerDisplayAriaLabel: '计时器显示',

            // Footer
            copyright: '© Crue Chan',
            reportIssues: '报告问题',

            // UI Controls
            languageToggle: '中',
            languageName: '简体中文'
        }
    },

    /**
     * Initialize i18n system
     * Load saved language from localStorage or detect from browser
     */
    init: function() {
        const savedLanguage = localStorage.getItem('timerLanguage');

        if (savedLanguage && this.supportedLanguages.includes(savedLanguage)) {
            this.setLanguage(savedLanguage);
        } else {
            // Auto-detect browser language
            const browserLang = navigator.language || navigator.userLanguage;
            const detectedLang = browserLang.startsWith('zh') ? 'zh' : 'en';
            this.setLanguage(detectedLang);
        }
    },

    /**
     * Set current language and save to localStorage
     * @param {string} lang - Language code ('en' or 'zh')
     */
    setLanguage: function(lang) {
        if (this.supportedLanguages.includes(lang)) {
            this.currentLanguage = lang;
            localStorage.setItem('timerLanguage', lang);
            // Trigger language change event
            this.updateUI();
        }
    },

    /**
     * Get translation for a key
     * @param {string} key - Translation key
     * @returns {string} Translated text
     */
    t: function(key) {
        const lang = this.currentLanguage;
        if (this.translations[lang] && this.translations[lang][key]) {
            return this.translations[lang][key];
        }
        // Fallback to English if translation not found
        if (this.translations['en'][key]) {
            return this.translations['en'][key];
        }
        // Return key itself if no translation found
        return key;
    },

    /**
     * Get other language code (toggle between en and zh)
     * @returns {string} Other language code
     */
    getOtherLanguage: function() {
        return this.currentLanguage === 'en' ? 'zh' : 'en';
    },

    /**
     * Update UI with current language translations
     * This will be called by app.js
     */
    updateUI: function() {
        // Update document language attribute
        document.documentElement.lang = this.currentLanguage;

        // Update page title
        document.title = this.t('pageTitle');

        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const property = element.getAttribute('data-i18n-property') || 'textContent';
            element[property] = this.t(key);
        });

        // Update all elements with data-i18n-aria attribute
        document.querySelectorAll('[data-i18n-aria]').forEach(element => {
            const key = element.getAttribute('data-i18n-aria');
            element.setAttribute('aria-label', this.t(key));
        });

        // Update language toggle button text
        const langToggleBtn = document.getElementById('langToggleBtn');
        if (langToggleBtn) {
            langToggleBtn.textContent = this.t('languageToggle');
            langToggleBtn.title = this.t('languageName');
        }
    }
};

// Auto-initialize on script load
document.addEventListener('DOMContentLoaded', function() {
    if (!i18n.currentLanguage || i18n.currentLanguage === 'en') {
        i18n.init();
    }
});

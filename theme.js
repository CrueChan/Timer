/**
 * Theme Management System
 * Supports dark/light mode and 6 color schemes
 * Auto-detects system preference and allows manual switching with localStorage persistence
 */

const theme = {
    // Theme modes
    modes: ['light', 'dark'],
    currentMode: 'light',

    // Color schemes
    colorSchemes: ['blue', 'purple', 'green', 'orange', 'red', 'cyan'],
    currentScheme: 'blue',

    // Color definitions for each scheme (light mode)
    colors: {
        blue: {
            light: {
                primary: '#14306B',
                primaryHover: '#0d1f47',
                primaryFocus: '#4a90e2',
                background: '#ffffff',
                text: '#000000',
                textSecondary: '#666666',
                border: '#e0e0e0',
                alert: '#ff0000'
            },
            dark: {
                primary: '#3d6bb8',
                primaryHover: '#5a8fd4',
                primaryFocus: '#7ba3e0',
                background: '#1a1a1a',
                text: '#ffffff',
                textSecondary: '#999999',
                border: '#333333',
                alert: '#ff6b6b'
            }
        },
        purple: {
            light: {
                primary: '#7B3FF2',
                primaryHover: '#6a35d1',
                primaryFocus: '#9966ff',
                background: '#ffffff',
                text: '#000000',
                textSecondary: '#666666',
                border: '#e0e0e0',
                alert: '#ff0000'
            },
            dark: {
                primary: '#9d6de0',
                primaryHover: '#b08ce8',
                primaryFocus: '#b08ce8',
                background: '#1a1a1a',
                text: '#ffffff',
                textSecondary: '#999999',
                border: '#333333',
                alert: '#ff6b6b'
            }
        },
        green: {
            light: {
                primary: '#27AE60',
                primaryHover: '#229954',
                primaryFocus: '#52c77a',
                background: '#ffffff',
                text: '#000000',
                textSecondary: '#666666',
                border: '#e0e0e0',
                alert: '#ff0000'
            },
            dark: {
                primary: '#52c77a',
                primaryHover: '#6fd394',
                primaryFocus: '#7ddda8',
                background: '#1a1a1a',
                text: '#ffffff',
                textSecondary: '#999999',
                border: '#333333',
                alert: '#ff6b6b'
            }
        },
        orange: {
            light: {
                primary: '#E67E22',
                primaryHover: '#d67c1b',
                primaryFocus: '#f39c12',
                background: '#ffffff',
                text: '#000000',
                textSecondary: '#666666',
                border: '#e0e0e0',
                alert: '#ff0000'
            },
            dark: {
                primary: '#f39c12',
                primaryHover: '#f8b739',
                primaryFocus: '#fdc55d',
                background: '#1a1a1a',
                text: '#ffffff',
                textSecondary: '#999999',
                border: '#333333',
                alert: '#ff6b6b'
            }
        },
        red: {
            light: {
                primary: '#E74C3C',
                primaryHover: '#c0392b',
                primaryFocus: '#e67e73',
                background: '#ffffff',
                text: '#000000',
                textSecondary: '#666666',
                border: '#e0e0e0',
                alert: '#ff0000'
            },
            dark: {
                primary: '#e67e73',
                primaryHover: '#ec9d96',
                primaryFocus: '#f1b5ad',
                background: '#1a1a1a',
                text: '#ffffff',
                textSecondary: '#999999',
                border: '#333333',
                alert: '#ff6b6b'
            }
        },
        cyan: {
            light: {
                primary: '#1ABC9C',
                primaryHover: '#16a085',
                primaryFocus: '#48c9b0',
                background: '#ffffff',
                text: '#000000',
                textSecondary: '#666666',
                border: '#e0e0e0',
                alert: '#ff0000'
            },
            dark: {
                primary: '#48c9b0',
                primaryHover: '#6ad9c4',
                primaryFocus: '#8ce5d6',
                background: '#1a1a1a',
                text: '#ffffff',
                textSecondary: '#999999',
                border: '#333333',
                alert: '#ff6b6b'
            }
        }
    },

    /**
     * Initialize theme system
     * Load saved preferences or detect from system
     */
    init: function() {
        // Load saved theme from localStorage
        const savedMode = localStorage.getItem('timerThemeMode');
        const savedScheme = localStorage.getItem('timerColorScheme');

        if (savedMode && this.modes.includes(savedMode)) {
            this.currentMode = savedMode;
        } else {
            // Auto-detect system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                this.currentMode = 'dark';
            }
        }

        if (savedScheme && this.colorSchemes.includes(savedScheme)) {
            this.currentScheme = savedScheme;
        }

        this.applyTheme();

        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem('timerThemeMode')) {
                    // Only auto-switch if user hasn't manually set preference
                    this.currentMode = e.matches ? 'dark' : 'light';
                    this.applyTheme();
                }
            });
        }
    },

    /**
     * Set theme mode (light or dark)
     * @param {string} mode - 'light' or 'dark'
     */
    setMode: function(mode) {
        if (this.modes.includes(mode)) {
            this.currentMode = mode;
            localStorage.setItem('timerThemeMode', mode);
            this.applyTheme();
        }
    },

    /**
     * Toggle between light and dark mode
     */
    toggleMode: function() {
        this.setMode(this.currentMode === 'light' ? 'dark' : 'light');
    },

    /**
     * Set color scheme
     * @param {string} scheme - Color scheme name
     */
    setScheme: function(scheme) {
        if (this.colorSchemes.includes(scheme)) {
            this.currentScheme = scheme;
            localStorage.setItem('timerColorScheme', scheme);
            this.applyTheme();
        }
    },

    /**
     * Apply current theme by setting CSS variables
     */
    applyTheme: function() {
        const colorSet = this.colors[this.currentScheme][this.currentMode];
        const root = document.documentElement;

        // Set CSS variables
        root.style.setProperty('--primary-color', colorSet.primary);
        root.style.setProperty('--primary-hover', colorSet.primaryHover);
        root.style.setProperty('--primary-focus', colorSet.primaryFocus);
        root.style.setProperty('--background-color', colorSet.background);
        root.style.setProperty('--text-color', colorSet.text);
        root.style.setProperty('--text-secondary', colorSet.textSecondary);
        root.style.setProperty('--border-color', colorSet.border);
        root.style.setProperty('--alert-color', colorSet.alert);

        // Update document attributes
        document.documentElement.setAttribute('data-theme', this.currentMode);
        document.documentElement.setAttribute('data-color-scheme', this.currentScheme);
    },

    /**
     * Get color for a specific scheme
     * Used for color scheme selector button display
     */
    getSchemeColor: function(scheme) {
        return this.colors[scheme]['light'].primary;
    }
};

// Auto-initialize on script load
document.addEventListener('DOMContentLoaded', function() {
    if (!theme.currentMode || theme.currentMode === 'light') {
        theme.init();
    }
});

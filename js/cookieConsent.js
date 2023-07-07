window.addEventListener('DOMContentLoaded', () => {

    // const cookieStorage = {
    //     getItem: (key) => {
            // const cookies = document.cookie
            //                                .split(';')
            //                                .map(cookie => cookie.split('='))
            //                                .reduce((acc, [key, value]) => ({...acc, 
            //                                                                [key.trim()] : value}), {});
            // return cookies[key];
    //     },
    //     setItem: (key, value) => {
    //         document.cookie = `${key}=${value};expires=Sunday, 16 Jul 2089 06:23:41 GMT`;
    //     }
    // }

    // const storageType = cookieStorage;
    // const consentPropertyType = 'site_consent';

    // const hasConsented = () => storageType.getItem(consentPropertyType) === 'true' ? true : false;
    // const toggleStorage = (prop) => storageType.setItem(consentPropertyType, prop);

    // const popup = document.querySelector('.popup'),
    //       btnConfirm = document.querySelector('[data-confirm]'),
    //       btnCancel = document.querySelector('[data-cancel]');

    // if(hasConsented()) {
    //     console.log('Loading...');       
    // } else {
    //     popup.classList.add('popup_active');
    // }

    // btnConfirm.addEventListener('click', () => {
    //     toggleStorage(true);
    //     popup.classList.remove('popup_active');
    //     console.log('Loading...');
    // });

    // btnCancel.addEventListener('click', () => {
    //     toggleStorage(false);
    //     popup.classList.remove('popup_active');
    // });

    class CookieConsent {
        constructor({popup, btnConfirm, btnCancel, activeClass = ''} = {}) {
            this.popup = document.querySelector(popup);
            this.btnConfirm = document.querySelector(btnConfirm);
            this.btnCancel = document.querySelector(btnCancel);
            this.activeClass = activeClass;
            this.consentPropertyType = 'site_consent';
        }

        getItem = (key) => {
            const cookies = document.cookie
                                           .split(';')
                                           .map(cookie => cookie.split('='))
                                           .reduce((acc, [key, value]) => ({...acc, 
                                                                           [key.trim()] : value}), {});
            return cookies[key];
        }

        setItem = (key, value) => {
            document.cookie = `${key}=${value};expires=Sunday, 16 Jul 2089 06:23:41 GMT`;
        }

        hasConsented = () => {
            if (this.getItem(this.consentPropertyType) === 'true') {
                return true;
            } else {
                return false;
            }
        }

        changeStatus = (prop) => {
            this.setItem(this.consentPropertyType, prop);
            if (this.hasConsented()) {
                // подписка
                msgCookieConsole();
            }
        }

        bindTriggers = () => {
            this.btnConfirm.addEventListener('click', () => {
                this.changeStatus(true);
                this.popup.classList.remove(this.activeClass);
            });
        
            this.btnCancel.addEventListener('click', () => {
                this.changeStatus(false);
                this.popup.classList.remove(this.activeClass);
            });
        }

        init = () => {
            try {
                if (this.hasConsented()) {
                    msgCookieConsole();
                } else {
                    this.popup.classList.add(this.activeClass);
                }

                this.bindTriggers();
            } catch(e) {
                console.error('Переданы не все данные');
            }
        }
    }

    new CookieConsent({
        activeClass: 'popup_active',
        popup: '.popup',
        btnConfirm: '[data-confirm]',
        btnCancel: '[data-cancel]',
    }).init();

    function msgCookieConsole() {
        console.log('Loading...');
    }
});
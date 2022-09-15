function closeModal(modalSelector) {
    const modalWin = document.querySelector(modalSelector);
    modalWin.classList.add('hide');
    modalWin.classList.remove('show');
    document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId) {
    const modalWin = document.querySelector(modalSelector);
    modalWin.classList.add('show');
    modalWin.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    //modal window

    let modalBtn = document.querySelectorAll(triggerSelector),
        modalWin = document.querySelector(modalSelector);

    
    modalBtn.forEach(items => {
        items.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });
    


    modalWin.addEventListener('click', (e) => {
        if (e.target === modalWin || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalWin.style.display == 'block') {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);


}

export default modal;
export {closeModal};
export {openModal};
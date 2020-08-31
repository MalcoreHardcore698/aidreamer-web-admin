import ArrowIcon from './../img/next.svg'

export default {
    nav: false,
    mouseDrag: true,
    controls: true,
    controlsText: [`<img src=${ArrowIcon} alt="Arrow" />`, `<img src=${ArrowIcon} alt="Arrow" />`],
    items: 1,
    gutter: 25,
    edgePadding: 25,
    loop: false,
    center: true,
    responsive: {
        480: {
            items: 1
        },
        768: {
            items: 1
        },
        992: {
            items: 2
        },
        1299: {
            items: 3
        }
    }
}
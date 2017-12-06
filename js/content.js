/* Content.js 匹配页面注入代码
* */
if (jQuery) {
    // jQuery loaded
    console.log('jQuery loaded');
} else {
    // jQuery not loaded
    console.log('jQuery not loaded');
}
// setTimeout(function () {
//     console.log($('body').css('background-color'));
//     $('body').css('background-color','grey');
// }, 1000);
$(document).ready(function (){
    $('body').css('background-color','#C7EDCC');
    }
);
// window.alert('Hello , content js');
// alert('Hello! My Friend');
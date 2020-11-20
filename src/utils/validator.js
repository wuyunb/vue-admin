/**
 * 过滤特殊字符
 * */

export function stripscript(str) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘；：”“'。，、？]")
    var rs = "";
    for (var i = 0; i < str.length; i++) {
        rs = rs + str.substr(i, 1).replace(pattern, '');
    }
    return rs;
}

/**
 * 不能连续字符（如123、abc）连续3位或3位以上
*/

export function LxStr(str){
    var arr = str.split('');
    var flag = true;
    for (var i = 1; i < arr.length-1; i++) {
        var firstIndex = arr[i-1].charCodeAt();
        var secondIndex = arr[i].charCodeAt();
        var thirdIndex = arr[i+1].charCodeAt();
        thirdIndex - secondIndex == 1;
        secondIndex - firstIndex==1;
        if((thirdIndex - secondIndex == 1)&&(secondIndex - firstIndex==1)){
            flag =  false;
        }
    }
    return flag;
}


/**
 *  连续字符 (111,aaa)
*/
// let reg = /(\w)*(\w)\2{2}(\w)*/g

/**
 * 验证邮箱
*/
export function validateEmail (value) {
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
    if (reg.test(value)){
        return true
    } else {
        return false
    }
}
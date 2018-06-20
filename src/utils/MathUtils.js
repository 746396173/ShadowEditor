/**
 * 精度
 */
var NUMBER_PRECISION = 6;

/**
 * 打包数字
 * @param {*} key 
 * @param {*} value 
 */
function parseNumber(key, value) {
    return typeof value === 'number' ? parseFloat(value.toFixed(NUMBER_PRECISION)) : value;
}

/**
 * 数学工具
 */
const MathUtils = {
    NUMBER_PRECISION: NUMBER_PRECISION,
    parseNumber: parseNumber
};

export default MathUtils;
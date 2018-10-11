

export function DateTime (time) {
    function fixedNum (num) {
        return num >= 10 ? '' + num : '0' + num
    }
    let date = new Date(time)
    let year = fixedNum(date.getFullYear())
    let month = fixedNum(date.getMonth() + 1)
    let day = fixedNum(date.getDate())
    let hour = fixedNum(date.getHours())
    let minutes = fixedNum(date.getMinutes())
    let seconds = fixedNum(date.getSeconds())
    let timeStr = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
    return timeStr
}

function isEmpty(value) {
    // null or undefined 인 경우
    if (value === null || value === undefined) return true;

    // String이 비어 있는 경우
    if (typeof value === "string" && value.trim() === "") return true;

    // Array가 비어 있는 경우
    if (Array.isArray(value) && value.length === 0) return true;

    // Object 내에서 Key가 없는 경우, Object 내 Object가 비어 있는 경우 재귀적으로 확인하기
    if (typeof value === "object") {
        return Object.keys(value).length === 0 || Object.values(value).every(isEmpty);
    }

    // 그 외 (primitive) false 처리
    return false;
}
console.log(isEmpty(null)) // 출력: true
console.log(isEmpty({})) // 출력: true
console.log(isEmpty(0)) // 출력 : false
console.log(isEmpty([{}, {a:[]}])) // 출력: true
console.log(isEmpty({a: null, b: ''})) // 출력: true
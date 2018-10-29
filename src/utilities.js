// named export - as many as needed
export const add = (a, b) => a + b
export const name = 'Manam'

// default export - at most one
// normally big functions or classes. but there is no specific rules
const square = x => x * x
export default square

// ======================================
// const add = (a, b) => a + b
// const name = 'Foyez'
// const square = x => x * x

// export {add, name, square as default}
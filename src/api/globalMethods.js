// globalMethods.js

// undefined이면 검증 오류
const isValid = (target) => {
  return target === undefined
};

const responseDataToField = (data, fields) => {
  for (const e in data) {
    fields[e]=data[e]
  }
}

const objectInit = (target) => {
  for (const e in target) {
    console.log(target[e])
    if (typeof target[e] === "boolean") {
      target[e] = false
    } else {
      target[e] = undefined
    }
  }
}
  
export const globalMethods = {
    isValid,
    responseDataToField,
    objectInit
}
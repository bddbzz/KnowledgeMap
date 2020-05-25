function validate(obj, validation) {
    return new Proxy(obj, {
        set(target, key, value) {
            let validate = validation[key]
            if (!validate(value)) {
                throw new Error(`${key}的值不合法`)
            }
            Reflect.set(target, key, value)
            return true
        }
    })
}
let persionValidation = {
    name(value) {
        if (typeof value === "string") {
            return true
        }
        return false
    },
    age(value) {
        if (typeof value === "number") {
            return true
        }
        return false
    }
}
let person = validate({}, persionValidation)
person.name = 11
person.age = '50'

console.log(person.name, person.age)
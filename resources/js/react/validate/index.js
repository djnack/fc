import moment from "jalali-moment";

let error = {};
let textError = "";
let name = "";
let value_back = "";
let item = "";
let data = {};
let nameObject = "";

function phonenumber() {
    let temp = {};
    const regex = /^(0|0098|\+98|98)?(9\d{9})$/i;
    const found = item.match(regex);
    if (!found) {
        temp[nameObject] = textError;
        return temp;
    }
}

function persianalphabet() {
    let temp = {};
    const regex = /^[\u0621-\u064A\s\u0600-\u06FF]+$/i;
    const found = item.match(regex);
    if (!found) {
        temp[nameObject] = textError;
        return temp;
    }
}

function required() {
    let temp = {};
    if (!item) {
        temp[nameObject] = textError;
        return temp;
    }
}

function confirmed() {
    let temp = {};
    if (item !== value_back) {
        temp[nameObject] = textError;
        return temp;
    }
}

function mimes() {
    let temp = {};
    if (!data.type.includes(item.type.split("/")[1])) {
        temp[nameObject] = textError;
        return temp;
    }
}

function after() {
    let num = data.value[0];
    let string = data.value[1];

    let temp = {};
    if (moment(item) < moment().clone().add(num, string)) {
        temp[nameObject] = textError;
        return temp;
    }
}

function before() {
    let num = data.value[0];
    let string = data.value[1];

    let temp = {};
    if (moment(item) > moment().clone().add(num, string)) {
        temp[nameObject] = textError;
        return temp;
    }
}

function minimum() {
    let temp = {};
    if (typeof item === "object") {
        if (item["size"]) {
            if (item.size / 1024 < parseFloat(data.value)) {
                temp[nameObject] = textError;
                return temp;
            }
        }
    } else {
        if (data["type"] === "integer") {
            if (parseFloat(item) < parseFloat(data.value)) {
                temp[nameObject] = textError;
                return temp;
            }
        } else {
            if (item.length < parseInt(data.value)) {
                temp[nameObject] = textError;
                return temp;
            }
        }
    }
}

function maximum() {
    let temp = {};
    if (typeof item === "object") {
        if (item["size"]) {
            if (item.size / 1024 > parseFloat(data.value)) {
                temp[nameObject] = textError;
                return temp;
            }
        }
    } else {
        if (data["type"] === "integer") {
            if (parseFloat(item) > parseFloat(data.value)) {
                temp[nameObject] = textError;
                return temp;
            }
        } else {
            if (item.length > parseInt(data.value)) {
                temp[nameObject] = textError;
                return temp;
            }
        }
    }
}

function numeric() {
    let temp = {};
    if (!item.match(/^[\d.]+$/i)) {
        temp[nameObject] = textError;
        return temp;
    }
}

function integer() {
    let temp = {};
    if (!item.match(/^[\d.]+$/i)) {
        temp[nameObject] = textError;
        return temp;
    }
}

function decimal() {
    let temp = {};
    if (!item.match(/^[\d]+$/i)) {
        temp[nameObject] = textError;
        return temp;
    }
}

function string() {}

function date() {}

function fundmin(name) {
    const regex = /^(min:)(\d)+$/g;
    const found = name.match(regex);
    if (found) {
        return {
            name: "minimum",
            value: name.replace("min:", ""),
        };
    }
}

function fundmax(name) {
    const regex = /^(max:)(\d)+$/g;
    const found = name.match(regex);
    if (found) {
        return {
            name: "maximum",
            value: name.replace("max:", ""),
        };
    }
}

function fundmimes(name) {
    const regex = /^(mimes:)(.)+$/g;
    const found = name.match(regex);
    if (found) {
        let value = name.replace("mimes:", "");
        value = value.replaceAll(" ", "");
        value = value.split(",");
        return {
            name: "mimes",
            value: value,
        };
    }
}

function fundafter(name) {
    const regex = /^(after:)(.)+$/g;
    const found = name.match(regex);
    if (found) {
        let value = name.replace("after:", "");
        value = value.split(",");
        return {
            name: "after",
            value,
        };
    }
}

function fundbefore(name) {
    const regex = /^(before:)(.)+$/g;
    const found = name.match(regex);
    if (found) {
        let value = name.replace("before:", "");
        value = value.split(",");
        return {
            name: "before",
            value,
        };
    }
}

function Validate(...arge) {
    error = {};
    if (arge) {
        if (Array.isArray(arge)) {
            arge.forEach((e) => {
                item = e[0].splice(0, 1)[0];
                const isRequired =
                    e[0].includes("required") || e[0].includes("confirmed");
                const isInteger = e[0].includes("integer");
                const isString = e[0].includes("string");
                const isDate = e[0].includes("date");
                nameObject = Object.keys(e[1])[0].split("_")[0];
                if (isRequired || item) {
                    let invalid;
                    e[0].some((ee) => {
                        if (invalid) {
                            return;
                        }
                        name = ee;
                        data = {};

                        textError = e[1][nameObject + "_" + name];
                        let min = fundmin(name);
                        let max = fundmax(name);
                        let mime = fundmimes(name);
                        let fnafter = fundafter(name);
                        let fnbefore = fundbefore(name);

                        if (min) {
                            textError = e[1][nameObject + "_" + "min"];
                            name = min.name;
                            let type = isInteger ? "integer" : "string";
                            data = {
                                value: min.value,
                                type: type,
                            };
                        } else if (max) {
                            textError = e[1][nameObject + "_" + "max"];
                            name = max.name;
                            let type = isInteger ? "integer" : "string";
                            data = {
                                value: max.value,
                                type: type,
                            };
                        } else if (mime) {
                            textError = e[1][nameObject + "_" + "mimes"];
                            name = mime.name;
                            data = {
                                value: mime.value,
                                type: mime.value,
                            };
                        } else if (fnafter) {
                            textError = e[1][nameObject + "_" + "after"];
                            name = fnafter.name;
                            data = {
                                value: fnafter.value,
                            };
                        } else if (fnbefore) {
                            textError = e[1][nameObject + "_" + "before"];
                            name = fnbefore.name;
                            data = {
                                value: fnbefore.value,
                            };
                        }

                        invalid = eval(`${name.toLocaleLowerCase()}()`);
                        error = {
                            ...error,
                            ...invalid,
                        };
                    });
                }
                value_back = item;
            });
            return error;
        }
    }
}

export default Validate;

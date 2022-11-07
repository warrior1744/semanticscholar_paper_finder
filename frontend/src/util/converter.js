    function toString(obj) {
        Object.keys(obj).forEach(key => {
            if (typeof obj[key] === 'object'){
                return toString(obj[key])
            }
            obj[key]= '' + obj[key]
        })
    }

    const removeDupObjValues = (arr, key) => {
        let uniqueValues = [] 
        arr.filter(element => {
            let value = element
            if(key !== undefined){
                value = element[key]
            }
            const isDuplicate = uniqueValues.includes(value)
    
            if(!isDuplicate){
                uniqueValues.push(value)
                return true
            }
    
            return false
        })
        return uniqueValues
    }


export { toString, removeDupObjValues }
export function NodeListforEach(list, fn){
    for (let i = 0; i < list.length; i++){
        let item = list[i];
        fn(item)
    }
}
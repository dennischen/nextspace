export default function removeArrayItem(array: any[], item: any) {
    for (let i = array.length - 1; i >= 0; i--) {
        if (array[i] === item) {
            array.splice(i, 1)
        }
    }
}
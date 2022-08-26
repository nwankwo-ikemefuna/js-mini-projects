/*
- collect the basket of oranges
- get a new empty basket to store the bad oranges
- go through all the oranges in the basket one after the other
- at each orange, check if the orange is good or not
- if the orange is bad, put it in the basket for bad oranges
- when i'm done sorting the bad oranges, i'll return the basket of bad oranges to my client
*/



/*write a function that would accept an array of strings and return all the strings that their
length is greater than 4*/



const stringsWithLengthGreaterThan4 = (array) => {
    const stringsGreaterThan4 = [];
    
    array.forEach(string => {
        if (string.length > 10) {
            stringsGreaterThan4.push(string)
        } 
    });
    return stringsGreaterThan4;
}

const wStrings = ["sdhjshds", "hsjdhhskj", "hjsjhd", "nssd", "s", "skhdkshd", "js"];

console.log(stringsWithLengthGreaterThan4(wStrings));
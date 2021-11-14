/**
* takes potential type 1 and type 2 and makes it into a list
* @param types rest param with one or two types
* @returns 
*/
export function typesToList(...types : string[]) {
    const typeList = types.filter((type) => type.length > 0);
    return typeList;
}
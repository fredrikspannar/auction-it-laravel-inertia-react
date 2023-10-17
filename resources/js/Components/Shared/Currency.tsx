
// create types for component, this is only used here
interface CurrencyProps {
    price?: number | false;
}

export function Currency({price}:CurrencyProps) {

    // future placeholder to format/convert price into currency
    // but for now fixed into SEK (kr)

    let before = "" + (price !== false ? " " : "");  // some currencies has a prefix
    let after = (price !== false ? " " : "") + "kr"; // .. and some has an affix

    return <>{before}{price}{after}</>
}
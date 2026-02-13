/**
 * 🍽️ Thali Combo Platter - Mixed Methods Capstone
 *
 * Grand Indian Thali restaurant mein combo platter system banana hai.
 * String, Number, Array, aur Object — sab methods mila ke ek complete
 * thali banao. Yeh capstone challenge hai — sab kuch combine karo!
 *
 * Data format: thali = {
 *   name: "Rajasthani Thali",
 *   items: ["dal baati", "churma", "papad"],
 *   price: 250,
 *   isVeg: true
 * }
 *
 * Functions:
 *
 *   1. createThaliDescription(thali)
 *      - Template literal, .join(", "), .toUpperCase(), .toFixed(2) use karo
 *      - Format: "{NAME} (Veg/Non-Veg) - Items: {items joined} - Rs.{price}"
 *      - name ko UPPERCASE karo, price ko 2 decimal places tak
 *      - isVeg true hai toh "Veg", false hai toh "Non-Veg"
 *      - Agar thali object nahi hai ya required fields missing hain, return ""
 *      - Required fields: name (string), items (array), price (number), isVeg (boolean)
 *      - Example: createThaliDescription({name:"Rajasthani Thali", items:["dal","churma"], price:250, isVeg:true})
 *                 => "RAJASTHANI THALI (Veg) - Items: dal, churma - Rs.250.00"
 *
 *   2. getThaliStats(thalis)
 *      - Array of thali objects ka stats nikalo
 *      - .filter() se veg/non-veg count
 *      - .reduce() se average price
 *      - Math.min/Math.max se cheapest/costliest
 *      - .map() se saare names
 *      - Return: { totalThalis, vegCount, nonVegCount, avgPrice (2 decimal string),
 *                  cheapest (number), costliest (number), names (array) }
 *      - Agar thalis array nahi hai ya empty hai, return null
 *
 *   3. searchThaliMenu(thalis, query)
 *      - .filter() + .includes() se search karo (case-insensitive)
 *      - Thali match karti hai agar name ya koi bhi item query include kare
 *      - Agar thalis array nahi hai ya query string nahi hai, return []
 *      - Example: searchThaliMenu(thalis, "dal") => thalis with "dal" in name or items
 *
 *   4. generateThaliReceipt(customerName, thalis)
 *      - Template literals + .map() + .join("\n") + .reduce() se receipt banao
 *      - Format:
 *        "THALI RECEIPT\n---\nCustomer: {NAME}\n{line items}\n---\nTotal: Rs.{total}\nItems: {count}"
 *      - Line item: "- {thali name} x Rs.{price}"
 *      - customerName UPPERCASE mein
 *      - Agar customerName string nahi hai ya thalis array nahi hai/empty hai, return ""
 *
 * @example
 *   createThaliDescription({name:"Rajasthani Thali", items:["dal"], price:250, isVeg:true})
 *   // => "RAJASTHANI THALI (Veg) - Items: dal - Rs.250.00"
 */
export function createThaliDescription(thali) {
  // Your code here
  if(
    typeof thali !== 'object' ||
    thali === null ||
    Array.isArray(thali) ||
    typeof(thali.name) !== "string" ||
    thali.name.length === 0 ||
    !Array.isArray(thali.items) ||
    thali.items.length === 0 ||
    typeof(thali.price) !== 'number' ||
    thali.price < 0 ||
    typeof(thali.isVeg) !== 'boolean'
  ){
    return "";
  }
  const name = thali.name.toUpperCase();
  const items = thali.items.join(", ");
  const price = thali.price.toFixed(2);
  const thaliType = thali.isVeg ? "Veg" : "Non-Veg";
  return `${name} (${thaliType}) - Items: ${items} - Rs.${price}`
}

export function getThaliStats(thalis) {
  // Your code here
  if(!Array.isArray(thalis) || thalis.length === 0 || thalis === null) return null;
  const totalThali = thalis.length;
  const prices = thalis.map((thali) => thali.price);
  const vegThaliCount = thalis.filter((thali) => thali.isVeg === true);
  const nonVegThaliCount = thalis.filter((thali) => thali.isVeg === false);
  const average = prices.reduce((total, price) => total + price, 0) / prices.length;
  const costliest = Math.max(...prices);
  const cheapest = Math.min(...prices);
  const thaliNames = thalis.map((thali) => thali.name);
  return {
    totalThalis: totalThali,
    vegCount: vegThaliCount.length,
    nonVegCount: nonVegThaliCount.length,
    avgPrice: average.toFixed(2),                  
    cheapest: cheapest,
    costliest: costliest,
    names: thaliNames
  }
}

export function searchThaliMenu(thalis, query) {
  // Your code here
  if(
    !Array.isArray(thalis) ||
    thalis.length === 0 ||
    thalis === null ||
    typeof(query) !== "string" ||
    query.length === 0
    ){
      return [];
    }
    const searchResult = thalis.filter((thali) =>{
      const nameResult = thali.name.toLowerCase().includes(query.toLowerCase());
      const itemsResult = thali.items.some((item) => item.toLowerCase().includes(query.toLowerCase()));
      return nameResult || itemsResult;
    })
    return searchResult;
}

export function generateThaliReceipt(customerName, thalis) {
  // Your code here
   if(
    !Array.isArray(thalis) ||
    thalis.length === 0 ||
    thalis === null ||
    typeof(customerName) !== "string" ||
    customerName.length === 0
    ){
      return "";
    }
    const itemCount = thalis.length;
    const total = thalis.reduce((total, price) => total + price.price, 0);
    const lineItem = thalis.map((thali) => `- ${thali.name} x Rs.${thali.price}`).join("\n");
    return `THALI RECEIPT
    ---
    Customer: ${customerName.toUpperCase()}
    ${lineItem}
    ---
    Total: Rs.${total.toFixed(2)}
    Items: ${itemCount}
    `;
}

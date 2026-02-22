import { useEffect, useState } from "react";

function App() {
const [menu, setMenu] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(false);
const [selectedCategory, setSelectedCategory] = useState("All");
const [cart, setCart] = useState([]);
const [tableNumber, setTableNumber] = useState("");
const [orderSuccess, setOrderSuccess] = useState(false);

useEffect(() => {
fetch("https://demo-restaurant-backend.onrender.com/api/menu")
.then(res => res.json())
.then(data => {
setMenu(data);
setLoading(false);
})
.catch(() => {
setError(true);
setLoading(false);
});
}, []);

const categories = ["All", ...new Set(menu.map(item => item.category))];

const filteredMenu =
selectedCategory === "All"
? menu
: menu.filter(item => item.category === selectedCategory);

const addToCart = (item) => {
const existing = cart.find(c => c._id === item._id);

if (existing) {
setCart(cart.map(c =>
c._id === item._id
? { ...c, quantity: c.quantity + 1 }
: c
));
} else {
setCart([...cart, { ...item, quantity: 1 }]);
}
};

const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

const placeOrder = async () => {
if (!tableNumber || cart.length === 0) {
alert("Enter table number and add items");
return;
}

const orderData = {
table_number: tableNumber,
items: cart.map(item => ({
menu_id: item._id,
quantity: item.quantity
}))
};

try {
await fetch("https://demo-restaurant-backend.onrender.com/api/orders",{
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(orderData)
});

setOrderSuccess(true);
setCart([]);
} catch {
alert("Order failed");
}
};

return (

<div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#0f0f0f", color: "white", minHeight: "100vh" }}> <div style={{ position: "fixed", top: "20px", right: "20px", backgroundColor: "#f59e0b", color: "black", padding: "10px 15px", borderRadius: "30px", fontWeight: "bold" }}> Cart: {cartCount} </div> <section style={{ textAlign: "center", padding: "120px 20px" }}> <h1 style={{ fontSize: "48px", marginBottom: "20px" }}> Spice Garden </h1> <p style={{ fontSize: "18px", color: "#aaa", marginBottom: "30px" }}> Fresh food. Zero waiting. </p>

<input
type="number"
placeholder="Enter Table Number"
value={tableNumber}
onChange={(e) => setTableNumber(e.target.value)}
style={{
padding: "10px",
borderRadius: "10px",
border: "none",
marginBottom: "20px"
}}
/>

<br />

<button
onClick={placeOrder}
style={{
backgroundColor: "#22c55e",
border: "none",
padding: "10px 20px",
borderRadius: "10px",
cursor: "pointer",
fontWeight: "bold"
}}
>
Place Order
</button>

{orderSuccess && (

<p style={{ color: "#22c55e", marginTop: "15px" }}> Order placed successfully </p> )} </section> <section id="menu" style={{ padding: "40px 20px", maxWidth: "1000px", margin: "0 auto" }} > <h2 style={{ textAlign: "center", fontSize: "32px", marginBottom: "20px" }}> Our Menu </h2> <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", marginBottom: "30px" }}> {categories.map(cat => ( <button key={cat} onClick={() => setSelectedCategory(cat)} style={{ padding: "8px 18px", borderRadius: "20px", border: "none", cursor: "pointer", backgroundColor: selectedCategory === cat ? "#f59e0b" : "#1f1f1f", color: selectedCategory === cat ? "black" : "white" }} > {cat} </button> ))} </div>

{loading && <p style={{ textAlign: "center" }}>Loading menu...</p>}
{error && <p style={{ textAlign: "center", color: "red" }}>Failed to load menu</p>}

<div style={{ display: "grid", gap: "20px" }}> {filteredMenu.map(item => ( <div key={item._id} style={{ backgroundColor: "#1f1f1f", padding: "20px", borderRadius: "15px" }} > <h3>{item.name}</h3> <p style={{ color: "#aaa" }}>{item.description}</p> <p style={{ color: "#f59e0b", fontWeight: "bold" }}>₹ {item.price}</p>

<button
onClick={() => addToCart(item)}
style={{
marginTop: "10px",
backgroundColor: "#f59e0b",
border: "none",
padding: "8px 15px",
borderRadius: "10px",
cursor: "pointer",
fontWeight: "bold"
}}
>
Add to Cart
</button>

</div> ))} </div> </section> </div> ); }

export default App;
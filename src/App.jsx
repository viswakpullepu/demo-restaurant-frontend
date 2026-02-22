import { useEffect, useState } from "react";

function App() {
const [menu, setMenu] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(false);

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

return (

<div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#0f0f0f", color: "white", minHeight: "100vh" }}> <section style={{ textAlign: "center", padding: "120px 20px" }}> <h1 style={{ fontSize: "48px", marginBottom: "20px" }}> Spice Garden </h1> <p style={{ fontSize: "18px", color: "#aaa", marginBottom: "30px" }}> Fresh food. Zero waiting. </p>

<a
href="#menu"
style={{
backgroundColor: "#f59e0b",
padding: "12px 30px",
borderRadius: "30px",
color: "black",
textDecoration: "none",
fontWeight: "bold"
}}
>
View Menu
</a>

</section> <section id="menu" style={{ padding: "40px 20px", maxWidth: "1000px", margin: "0 auto" }} > <h2 style={{ textAlign: "center", fontSize: "32px", marginBottom: "40px" }}> Featured Dishes </h2>

{loading && (

<p style={{ textAlign: "center", color: "#aaa" }}> Loading menu... </p> )}

{error && (

<p style={{ textAlign: "center", color: "red" }}> Failed to load menu </p> )} <div style={{ display: "grid", gap: "20px" }}> {menu.map(item => ( <div key={item._id} style={{ backgroundColor: "#1f1f1f", padding: "20px", borderRadius: "15px" }} > <h3 style={{ fontSize: "22px" }}> {item.name} </h3> <p style={{ color: "#aaa" }}> {item.description} </p> <p style={{ color: "#f59e0b", fontWeight: "bold", marginTop: "10px" }}> ₹ {item.price} </p> </div> ))} </div> </section> <footer style={{ textAlign: "center", padding: "40px 20px", color: "#666" }}> © 2026 Viswak Pullepu. All rights reserved. </footer> </div> ); }

export default App;
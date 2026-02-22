import { useEffect, useState } from "react";

function Admin() {
const [orders, setOrders] = useState([]);

useEffect(() => {
fetch("https://demo-restaurant-backend.onrender.com/api/orders")
.then(res => res.json())
.then(data => setOrders(data));
}, []);

const markCompleted = async (id) => {
await fetch(`https://demo-restaurant-backend.onrender.com/api/orders/${id}`, {
method: "PUT",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ status: "Completed" })
});
window.location.reload();
};

return (

<div style={{ padding: "40px", background: "#111", minHeight: "100vh", color: "white" }}> <h1>Admin Dashboard</h1>

{orders.map(order => (

<div key={order._id} style={{ background: "#1f1f1f", padding: "20px", marginBottom: "20px", borderRadius: "10px" }}> <p><strong>Table:</strong> {order.table_number}</p> <p><strong>Status:</strong> {order.status}</p> <ul> {order.items.map(item => ( <li key={item.menu_id}> {item.menu_id} × {item.quantity} </li> ))} </ul>

<button
onClick={() => markCompleted(order._id)}
style={{
marginTop: "10px",
padding: "8px 15px",
background: "#22c55e",
border: "none",
borderRadius: "8px",
cursor: "pointer"
}}
>
Mark Completed
</button>

</div> ))} </div> ); }

export default Admin;
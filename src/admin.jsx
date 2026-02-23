import { useEffect, useState } from "react";

function Admin() {
  const [orders, setOrders] = useState([]);
  const [menu, setMenu] = useState([]);
  const [view, setView] = useState("orders");

  useEffect(() => {
    fetch("https://demo-restaurant-backend.onrender.com/api/orders")
      .then(res => res.json())
      .then(data => setOrders(data));

    fetch("https://demo-restaurant-backend.onrender.com/api/menu")
      .then(res => res.json())
      .then(data => setMenu(data));
  }, []);

  const markCompleted = async (id) => {
    await fetch(`https://demo-restaurant-backend.onrender.com/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Completed" })
    });
    window.location.reload();
  };

  const updateMenuItem = async (item) => {
    await fetch(`https://demo-restaurant-backend.onrender.com/api/menu/${item._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item)
    });
    alert("Menu Updated");
  };

  const totalOrders = orders.length;
  const completedOrders = orders.filter(o => o.status === "Completed").length;
  const preparingOrders = orders.filter(o => o.status !== "Completed").length;

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#0f0f0f",
      color: "white",
      padding: "40px",
      fontFamily: "Arial, sans-serif"
    }}>

      <h1 style={{ marginBottom: "20px" }}>Admin Dashboard</h1>

      <div style={{ marginBottom: "30px" }}>
        <button onClick={() => setView("orders")} style={{ marginRight: "10px" }}>
          Orders
        </button>
        <button onClick={() => setView("menu")}>
          Manage Menu
        </button>
      </div>

      {view === "orders" && (
        <>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginBottom: "40px"
          }}>
            <div style={{ background: "#1f1f1f", padding: "20px", borderRadius: "12px" }}>
              <h3>Total Orders</h3>
              <p style={{ fontSize: "28px", fontWeight: "bold" }}>{totalOrders}</p>
            </div>

            <div style={{ background: "#1f1f1f", padding: "20px", borderRadius: "12px" }}>
              <h3>Preparing Orders</h3>
              <p style={{ fontSize: "28px", fontWeight: "bold", color: "#f59e0b" }}>
                {preparingOrders}
              </p>
            </div>

            <div style={{ background: "#1f1f1f", padding: "20px", borderRadius: "12px" }}>
              <h3>Completed Orders</h3>
              <p style={{ fontSize: "28px", fontWeight: "bold", color: "#22c55e" }}>
                {completedOrders}
              </p>
            </div>
          </div>

          <h2>Live Orders</h2>

          {orders.map(order => (
            <div key={order._id} style={{
              background: "#1f1f1f",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "12px"
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px"
              }}>
                <div><strong>Table:</strong> {order.table_number}</div>
                <div>
                  <strong>Status:</strong>{" "}
                  <span style={{
                    color: order.status === "Completed" ? "#22c55e" : "#f59e0b"
                  }}>
                    {order.status}
                  </span>
                </div>
              </div>

              <ul>
                {order.items.map(item => (
                  <li key={item.menu_id}>
                    Item ID: {item.menu_id} × {item.quantity}
                  </li>
                ))}
              </ul>

              {order.status !== "Completed" && (
                <button
                  onClick={() => markCompleted(order._id)}
                  style={{
                    marginTop: "10px",
                    padding: "8px 15px",
                    background: "#22c55e",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
                  Mark Completed
                </button>
              )}
            </div>
          ))}
        </>
      )}

      {view === "menu" && (
        <>
          <h2>Menu Management</h2>

          {menu.map(item => (
            <div key={item._id} style={{
              background: "#1f1f1f",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "12px"
            }}>
              <input
                value={item.name}
                onChange={(e) =>
                  setMenu(menu.map(m =>
                    m._id === item._id ? { ...m, name: e.target.value } : m
                  ))
                }
                placeholder="Dish Name"
              />

              <input
                value={item.category}
                onChange={(e) =>
                  setMenu(menu.map(m =>
                    m._id === item._id ? { ...m, category: e.target.value } : m
                  ))
                }
                placeholder="Category"
              />

              <input
                type="number"
                value={item.price}
                onChange={(e) =>
                  setMenu(menu.map(m =>
                    m._id === item._id ? { ...m, price: e.target.value } : m
                  ))
                }
                placeholder="Price"
              />

              <input
                value={item.image || ""}
                onChange={(e) =>
                  setMenu(menu.map(m =>
                    m._id === item._id ? { ...m, image: e.target.value } : m
                  ))
                }
                placeholder="Image URL"
              />

              <br />

              <button
                onClick={() => updateMenuItem(item)}
                style={{
                  marginTop: "10px",
                  padding: "8px 15px",
                  background: "#f59e0b",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                Save Changes
              </button>
            </div>
          ))}
        </>
      )}

    </div>
  );
}

export default Admin;
import { NavLink, Outlet } from "react-router-dom";

export function MainLayout() {
    return(
        <div>
            <header>
                <nav style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
                    <NavLink to="/">Головна</NavLink>
                    <NavLink to="/about">Про нас</NavLink>
                </nav>
            </header>

            <main style={{ padding: "1rem" }}>
                <Outlet />
            </main>
        </div>
    )
}
import { NavLink, Outlet } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../components/ErrorFallback";



export function MainLayout() {
    const { theme, toggleTheme } = useTheme();

    return(
        <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
            <header>
                <nav className="flex items-center gap-4 p-3">
                    <button onClick={toggleTheme} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Тема: {theme}</button>
                    <NavLink to="/" className="text-blue-500 dark:text-blue-400">Головна</NavLink>
                    <NavLink to="/about" className="text-blue-500 dark:text-blue-400">Про нас</NavLink>
                    <NavLink to="/countries" className="text-blue-500 dark:text-blue-400">Країни</NavLink>
                </nav>
            </header>

            <main className="p-3">
                <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
                    <Outlet />
                </ErrorBoundary>
            </main>
        </div>
    )
}
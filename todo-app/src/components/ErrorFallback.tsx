import { type FallbackProps } from "react-error-boundary";

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps){
    return (
        <div className="p-6 bg-red-100 dark:bg-red900/30 text-red-900 dark:text-red-200 rounded-lg border border-red-500 text-center">
            <h2 className="text=2xl font-bold mb-2">Ой! Щосб пішло не так</h2>
            <p className="mb-4">Ми не змогли завантажити цю сторінку</p>

            <pre className="text-sm bg-white/50 dark:bg-black/50 p-2 rounded mb-4 overflow-auto">
                {(error as Error).message}
            </pre>

            <button onClick={resetErrorBoundary} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Спробувати ще</button>
        </div>
    );
}
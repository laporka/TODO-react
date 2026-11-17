import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

const GET_COUNTRIES = gql`
    query {
        countries {
            code
            name
            emoji
            capital
        }
    }
`;

type Country = {
    code: string;
    name: string;
    emoji: string;
    capital: string;
};

type CountriesData = {
    countries: Country[];
};


export function CountriesPage() {
    const { loading, error, data } = useQuery<CountriesData>(GET_COUNTRIES);

    if (loading) return <div className="p-4 text-blue-500 font-bold">Пошук...</div>;
    if (error) return <div className="p-4 text-red-500 font-bold">Помилка: {error.message}</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">Список країн</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {data?.countries.slice(0, 12).map((country) => (
                    <div key={country.code} className="border rounded-lg p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="text-4xl mb-2 text-center">{country.emoji}</div>
                        <h2 className="text-lg font-bold text-center">{country.name}</h2>
                        <p className="text-center text-sm text-gray-500 dark:text-gray-400">Столиця: {country.capital}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
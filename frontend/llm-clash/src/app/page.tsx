import Link from 'next/link';
import React from 'react';

const Home: React.FC = () => {
    return (
        <div>
            <Link href="/chat" className="block max-w-sm m-4 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Chat</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">It&apos;s just a ChatGPT wrapper, but with fewer features!</p>
            </Link>
            <Link href="/clash" className="block max-w-sm m-4 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Clash</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">Replace yourself with an LLM and see how it will conerse with another LLM after some inital prompting!</p>
            </Link>
        </div>
    );
}

export default Home;

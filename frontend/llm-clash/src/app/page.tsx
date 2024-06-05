import StyledLink from '@/components/styled/StyledLink';
import React from 'react';

const Home: React.FC = () => {
    return (
        <div>
            <StyledLink href="/chat">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Chat</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">It&apos;s just an LLM wrapper, but with fewer features!</p>
            </StyledLink>
            <StyledLink href="/clash">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Clash</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">Set up 2 LLMs against each other and, after some initial prompting, let their conversation run wild!</p>
            </StyledLink>
            <StyledLink href="#" disabled={true}>
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">Coming Soon</span>
                <h5 className="my-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Jailground</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">Chat with a jailbroken version of the most popular LLMs!</p>
            </StyledLink>
        </div>
    );
}

export default Home;

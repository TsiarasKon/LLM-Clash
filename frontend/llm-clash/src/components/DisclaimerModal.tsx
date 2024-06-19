import React, { useState } from 'react';
import { Button, Modal } from 'flowbite-react';

const DisclaimerModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <Modal show={isOpen} dismissible={false} initialFocus={undefined} theme={{ header: {close: {base: 'hidden'} }}}>
            <Modal.Header>Disclaimer</Modal.Header>
            <Modal.Body>
                <div className="space-y-6 text-justify">
                    <p className="text-base leading-relaxed text-gray-400">
                        Jailground does not store your API keys.
                        These are only temporarily used for the duration of your session and are not retained in any persistent storage.
                        However, since typing API keys on a website can never be 100% secure (e.g. due to compromised browsers or an unsafe network), we suggest using temporary API keys and/or with limited credits.
                        Jailground is not responsible for any misuse or unauthorized access to your API keys.
                    </p>
                    <p className="text-base leading-relaxed text-gray-400">
                        Jailground allows you to chat with LLMs created by OpenAI, Anthropic and Meta. 
                        The outputs of those LLMs may not always be correct, complete, or up-to-date and are not intended to replace professional advice at any capacity. 
                        Furthermore, any prompt provided to them may be processed for training purposes or other purposes.
                        For more information consult those companies&apos; respective privacy polices.
                    </p>
                    <p className="text-base leading-relaxed text-gray-400">
                        Jailground was created for the purposes of research on LLM interactions.
                        It is non-monetized and does not generate revenue. There are no advertisements, paid features, or any other form of financial transactions associated with its use.
                    </p>
                    <hr className="text-gray-400 border-y-current" />
                    <p className="text-base leading-relaxed text-gray-400">
                        This web application is currently under construction. If you have any bugs to report or features to suggest, contact us at: <a href="mailto:jailground@gmail.com" className="dark:text-gray-200 outline-none">jailground@gmail.com</a>
                    </p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setIsOpen(false)}>Proceed</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DisclaimerModal;

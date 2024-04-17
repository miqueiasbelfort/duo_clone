import React from 'react';

type Props = {
    children: React.ReactNode
}

function StickerWrapper({ children }: Props) {
    return (
        <div className='hidden lg:block w-[368px] sticky self-end bottom-6'>
            <div className='min-h-[calc(100vh-48px)] static top-6 flex flex-col gap-y-4 '>
                {children}
            </div>
        </div>
    );
};

export default StickerWrapper;
import FeedWrapper from '@/components/feed-wrapper';
import StickerWrapper from '@/components/sticker-wrapper';
import React from 'react';
import Header from './header';
import UserProgress from '@/components/user-progress';

function LearnPage() {
    return (
        <div className='flex flex-row-reverse gap-[48px] px-6'>
            <StickerWrapper>
                <UserProgress
                    activeCourse={{ title: "Spanish", imageSrc: '/es.svg' }}
                    hearts={5}
                    points={100}
                    hasActiveSubscription={false}
                />
            </StickerWrapper>
            <FeedWrapper>
                <Header title="Spanish" />
            </FeedWrapper>
        </div>
    );
};

export default LearnPage;
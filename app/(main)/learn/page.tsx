import { redirect } from 'next/navigation';
import { getUserProgress } from '@/db/queries';
import FeedWrapper from '@/components/feed-wrapper';
import StickerWrapper from '@/components/sticker-wrapper';
import React from 'react';
import Header from './header';
import UserProgress from '@/components/user-progress';

async function LearnPage() {
    const userProgressData = getUserProgress();
    const [userProgress] = await Promise.all([userProgressData])

    if (!userProgress || !userProgress.activeCourse) {
        redirect('/courses')
    };

    return (
        <div className='flex flex-row-reverse gap-[48px] px-6'>
            <StickerWrapper>
                <UserProgress
                    activeCourse={userProgress.activeCourse}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    hasActiveSubscription={false}
                />
            </StickerWrapper>
            <FeedWrapper>
                <Header title={userProgress.activeCourse.title} />
            </FeedWrapper>
        </div>
    );
};

export default LearnPage;
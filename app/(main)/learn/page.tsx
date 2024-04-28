import { redirect } from 'next/navigation';
import { getUnits, getUserProgress } from '@/db/queries';
import FeedWrapper from '@/components/feed-wrapper';
import StickerWrapper from '@/components/sticker-wrapper';
import React from 'react';
import Header from './header';
import UserProgress from '@/components/user-progress';
import { json } from 'stream/consumers';

async function LearnPage() {
    const userProgressData = getUserProgress();
    const unitsData = getUnits();

    const [userProgress, units] = await Promise.all([userProgressData, unitsData])

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
                {units.map(unit => (
                    <div key={unit.id} className='mb-10'>
                        {JSON.stringify(unit)}
                    </div>
                ))}
            </FeedWrapper>
        </div>
    );
};

export default LearnPage;
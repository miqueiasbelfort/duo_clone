import { redirect } from 'next/navigation';
import { geLessonPercentage, getCourseProgress, getUnits, getUserProgress } from '@/db/queries';
import FeedWrapper from '@/components/feed-wrapper';
import StickerWrapper from '@/components/sticker-wrapper';
import React from 'react';
import Header from './header';
import UserProgress from '@/components/user-progress';
import Unit from './unit';

async function LearnPage() {
    const userProgressData = getUserProgress();
    const courseProgressData = getCourseProgress();
    const lessonPercentageData = geLessonPercentage();
    const unitsData = getUnits();

    const [userProgress, units, courseProgress, lessonPercentage] = await Promise.all([userProgressData, unitsData, courseProgressData, lessonPercentageData])

    if (!userProgress || !userProgress.activeCourse) {
        redirect('/courses')
    };

    if (!courseProgress) {
        redirect("/courses");
    }

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
                        <Unit
                            id={unit.id}
                            order={unit.order}
                            description={unit.description}
                            title={unit.title}
                            lessons={unit.lessons}
                            activeLesson={courseProgress.activeLesson}
                            activeLessonPorcentage={lessonPercentage}
                        />
                    </div>
                ))}
            </FeedWrapper>
        </div>
    );
};

export default LearnPage;
import React from 'react';

import { redirect } from 'next/navigation';
import { getLesson, getUserProgress } from '@/db/queries';

import Quiz from './quiz';

async function LessonPage() {

    const lessonData = getLesson();
    const userProgressData = getUserProgress();

    const [lesson, userProgress] = await Promise.all([lessonData, userProgressData]);

    if (!lesson || !userProgress) {
        redirect("/learn")
    }

    const inicialPercentage = lesson.challenges.filter(challenge => challenge.completed).length / lesson.challenges.length * 100;

    return (
        <Quiz
            initialLessonId={lesson.id}
            initialLessonChallenge={lesson.challenges}
            initialHearts={userProgress.hearts}
            inicialPercentage={inicialPercentage}
            userSubscription={null}
        />
    );
};

export default LessonPage;
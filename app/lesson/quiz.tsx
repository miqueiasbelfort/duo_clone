"use client";
import React, { useState } from 'react';

import { challenges, challengesOptions } from '@/db/schema';

import Header from './header';

type Props = {
    initialLessonId: number,
    initialLessonChallenge: (typeof challenges.$inferSelect & {
        completed: boolean,
        challengesOptions: typeof challengesOptions.$inferSelect[]
    })[],
    initialHearts: number,
    inicialPercentage: number,
    userSubscription: any
}

function Quiz({ initialLessonId, initialLessonChallenge, initialHearts, inicialPercentage, userSubscription }: Props) {

    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(inicialPercentage);

    return (
        <>
            <Header
                hearts={hearts}
                percentage={percentage}
                hasActiveSubscription={!!userSubscription?.isActive}
            />
        </>
    );
};

export default Quiz;